import { useEffect, useState } from "react";
import Link from "@/components/common/Link";
import { fetchApi } from "@/lib/api-client";
import { EnquiryDrawer } from "@/components/admin/EnquiryDrawer";
import {
  Inbox,
  FileText,
  FileEdit,
  Clock,
  ArrowRight,
  Loader2,
  Calendar,
  Activity,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const loadDashboard = async () => {
    setLoading(true);
    const res = await fetchApi("/v1/admin/dashboard");
    if (res.success && res.data) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
      </div>
    );
  }

  const counts = data?.counts || {};
  const recentEnquiries = data?.recent_enquiries || [];
  const recentActivity = data?.recent_activity || [];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">Dashboard</h1>
          <p className="text-sm text-secondary mt-1">
            Overview of Canadian inbound leads, content publications, and system audit logs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/posts/new" className="btn-primary text-xs">
            + New Blog Post
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="panel-card p-6 bg-surface">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              New Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-mist text-primary-spruce flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink font-heading">
            {counts.new_enquiries_week || 0}
          </div>
          <p className="text-xs text-secondary mt-1">Received in last 7 days</p>
        </div>

        <div className="panel-card p-6 bg-surface">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Total Posts
            </span>
            <div className="w-8 h-8 rounded-lg bg-mist text-primary-spruce flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink font-heading">
            {counts.total_posts || 0}
          </div>
          <p className="text-xs text-secondary mt-1">
            {counts.published_posts || 0} published live
          </p>
        </div>

        <div className="panel-card p-6 bg-surface">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Draft Posts
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink font-heading">
            {counts.draft_posts || 0}
          </div>
          <p className="text-xs text-secondary mt-1">Pending editorial review</p>
        </div>

        <div className="panel-card p-6 bg-surface">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Scheduled
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink font-heading">
            {counts.scheduled_posts || 0}
          </div>
          <p className="text-xs text-secondary mt-1">Automated publishing queue</p>
        </div>
      </div>

      {/* Main Grid: Recent Enquiries & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Latest Enquiries */}
        <div className="lg:col-span-7 panel-card bg-surface overflow-hidden">
          <div className="p-6 border-b border-line flex items-center justify-between">
            <h2 className="text-lg font-bold font-heading text-ink flex items-center gap-2">
              <Inbox className="w-5 h-5 text-primary-spruce" />
              <span>Latest Inbound Enquiries</span>
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-primary-spruce hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-line">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enquiry: any) => (
                <div
                  key={enquiry.id}
                  onClick={() => setSelectedEnquiry(enquiry)}
                  className="p-5 hover:bg-mist/40 transition-colors cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-ink truncate">
                        {enquiry.name}
                      </span>
                      {enquiry.status === "new" && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-maple/10 text-maple uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-secondary truncate">
                      {enquiry.service || "General"} &bull; {enquiry.company || enquiry.email}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-secondary block">
                      {new Date(enquiry.created_at).toLocaleDateString("en-CA")}
                    </span>
                    <span className="text-xs font-semibold text-primary-spruce hover:underline">
                      Review &rarr;
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-secondary">
                No recent enquiries found.
              </div>
            )}
          </div>
        </div>

        {/* Right: Recent Audit Log */}
        <div className="lg:col-span-5 panel-card bg-surface overflow-hidden">
          <div className="p-6 border-b border-line">
            <h2 className="text-lg font-bold font-heading text-ink flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-spruce" />
              <span>Recent Activity Log</span>
            </h2>
          </div>

          <div className="divide-y divide-line">
            {recentActivity.length > 0 ? (
              recentActivity.map((log: any) => (
                <div key={log.id} className="p-4 text-xs">
                  <div className="flex items-center justify-between text-secondary mb-1">
                    <span className="font-semibold text-ink">
                      {log.admin_name || "System"}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(log.created_at).toLocaleDateString("en-CA")}
                    </span>
                  </div>
                  <div className="text-secondary font-mono text-xs">
                    action: <span className="text-primary-spruce">{log.action}</span> on{" "}
                    {log.entity} #{log.entity_id}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-secondary">
                No recent activity recorded.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Detail Drawer */}
      <EnquiryDrawer
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdated={() => loadDashboard()}
      />
    </div>
  );
}
