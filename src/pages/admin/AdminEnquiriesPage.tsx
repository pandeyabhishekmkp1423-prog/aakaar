import { useEffect, useState, useCallback } from "react";
import { fetchApi } from "@/lib/api-client";
import { EnquiryDrawer } from "@/components/admin/EnquiryDrawer";
import {
  Search,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({ total: 0, page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [page, setPage] = useState(1);

  // Active drawer
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();
    query.set("page", page.toString());
    query.set("per_page", "15");
    if (search) query.set("q", search);
    if (statusFilter) query.set("status", statusFilter);
    if (serviceFilter) query.set("service", serviceFilter);

    const res = await fetchApi(`/v1/admin/enquiries?${query.toString()}`);
    if (res.success && res.data) {
      setEnquiries(res.data);
      if (res.meta) setMeta(res.meta);
    }
    setLoading(false);
  }, [page, search, statusFilter, serviceFilter]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const handleExportCsv = () => {
    const apiUrl =
      (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
      "http://localhost:8000";
    window.open(`${apiUrl}/v1/admin/enquiries/export.csv`, "_blank");
  };

  const softwareServices = [
    "Web Development",
    "Mobile App Development",
    "Custom Software",
    "CRM Solutions",
    "LMS Platforms",
    "WhatsApp Automation",
    "Integrations & Automation",
    "Maintenance & Support",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-ink">Inbound Enquiries</h1>
          <p className="text-xs sm:text-sm text-secondary mt-1">
            Manage incoming sales leads, inquiries, and status workflows.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="btn-secondary text-xs flex items-center gap-2 self-start sm:self-auto min-h-[40px] px-3.5"
        >
          <Download className="w-4 h-4" />
          <span>Export All to CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="panel-card p-3 sm:p-4 bg-surface flex flex-col md:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by client name, email, company, or message..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
          />
          <Search className="w-4 h-4 text-secondary absolute left-3 top-3" />
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce w-full sm:w-auto min-w-[140px]"
          >
            <option value="">All Statuses</option>
            <option value="new">New (Unread)</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed / Won</option>
            <option value="spam">Spam</option>
          </select>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce w-full sm:w-auto min-w-[160px]"
          >
            <option value="">All Services</option>
            {softwareServices.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="panel-card bg-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[620px]">
            <thead className="bg-canvas border-b border-line text-xs font-semibold text-secondary uppercase tracking-wider">
              <tr>
                <th className="p-3.5 sm:p-4">Client</th>
                <th className="p-3.5 sm:p-4">Service</th>
                <th className="p-3.5 sm:p-4">Status</th>
                <th className="p-3.5 sm:p-4">Submitted</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary-spruce" />
                    <span>Loading enquiries...</span>
                  </td>
                </tr>
              ) : enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="hover:bg-mist/30 transition-colors cursor-pointer group"
                  >
                    <td className="p-3.5 sm:p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{enquiry.name}</span>
                        {enquiry.status === "new" && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-maple/10 text-maple uppercase">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-secondary mt-0.5">
                        {enquiry.email} {enquiry.company ? `• ${enquiry.company}` : ""}
                      </div>
                    </td>

                    <td className="p-3.5 sm:p-4">
                      <span className="text-xs font-medium text-ink bg-mist px-2.5 py-1 rounded-md inline-block">
                        {enquiry.service || "General Inquiry"}
                      </span>
                    </td>

                    <td className="p-3.5 sm:p-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          enquiry.status === "new"
                            ? "bg-maple/10 text-maple"
                            : enquiry.status === "qualified"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : enquiry.status === "contacted"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-canvas text-secondary"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>

                    <td className="p-3.5 sm:p-4 text-xs text-secondary whitespace-nowrap">
                      {new Date(enquiry.created_at).toLocaleDateString("en-CA")}
                    </td>

                    <td className="p-3.5 sm:p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEnquiry(enquiry);
                        }}
                        className="text-xs font-bold text-primary-spruce hover:underline p-1 min-h-[36px] inline-flex items-center"
                      >
                        Details &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>No enquiries found matching your search.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {meta.total_pages > 1 && (
          <div className="p-3.5 sm:p-4 bg-canvas border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
            <span>
              Total {meta.total} enquiries &bull; Page {meta.page} of {meta.total_pages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg border border-line bg-surface text-ink hover:bg-mist disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= meta.total_pages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg border border-line bg-surface text-ink hover:bg-mist disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Slide-over Drawer */}
      <EnquiryDrawer
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdated={() => loadEnquiries()}
      />
    </div>
  );
}
