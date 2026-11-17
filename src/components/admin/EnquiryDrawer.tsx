import { useState } from "react";
import { fetchApi } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import { X, Mail, Phone, Building, Calendar, Trash2, Check, Loader2 } from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "closed" | "spam";
  internal_notes?: string;
  ip_address?: string;
  created_at: string;
}

interface EnquiryDrawerProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdated: () => void;
}

export function EnquiryDrawer({ enquiry, onClose, onUpdated }: EnquiryDrawerProps) {
  const { csrfToken } = useAdminAuth();
  const [status, setStatus] = useState<string>(enquiry?.status || "new");
  const [notes, setNotes] = useState<string>(enquiry?.internal_notes || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!enquiry) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);

    const res = await fetchApi(`/v1/admin/enquiries/${enquiry.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
        internal_notes: notes,
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setSaving(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      onUpdated();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this enquiry?")) {
      return;
    }

    setDeleting(true);
    const res = await fetchApi(`/v1/admin/enquiries/${enquiry.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setDeleting(false);
    if (res.success) {
      onUpdated();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full sm:max-w-xl bg-surface h-full shadow-2xl flex flex-col border-l border-line animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-line flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-secondary uppercase">
              Enquiry #{enquiry.id}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-ink">{enquiry.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-mist text-secondary hover:text-ink transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 sm:space-y-6">
          {/* Metadata Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-canvas p-4 rounded-xl border border-line">
            <div>
              <span className="text-secondary block mb-1">Email Address:</span>
              <a
                href={`mailto:${enquiry.email}`}
                className="font-semibold text-primary-spruce hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{enquiry.email}</span>
              </a>
            </div>

            <div>
              <span className="text-secondary block mb-1">Telephone:</span>
              <span className="font-semibold text-ink flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{enquiry.phone || "Not provided"}</span>
              </span>
            </div>

            <div>
              <span className="text-secondary block mb-1">Company:</span>
              <span className="font-semibold text-ink flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{enquiry.company || "Not provided"}</span>
              </span>
            </div>

            <div>
              <span className="text-secondary block mb-1">Submitted:</span>
              <span className="font-semibold text-ink flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{new Date(enquiry.created_at).toLocaleDateString("en-CA")}</span>
              </span>
            </div>
          </div>

          {/* Requested Service */}
          <div>
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1.5">
              Target Service
            </label>
            <div className="inline-block px-3 py-1 rounded-md bg-mist text-primary-spruce font-bold text-xs">
              {enquiry.service || "General Inquiry"}
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1.5">
              Client Message
            </label>
            <div className="p-4 rounded-xl bg-canvas border border-line text-sm text-ink leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label
              htmlFor="drawer-status"
              className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1.5"
            >
              Enquiry Status
            </label>
            <select
              id="drawer-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce"
            >
              <option value="new">New (Unread / Needs Review)</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed / Won</option>
              <option value="spam">Mark as Spam</option>
            </select>
          </div>

          {/* Internal Notes */}
          <div>
            <label
              htmlFor="drawer-notes"
              className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1.5"
            >
              Internal Operations Notes
            </label>
            <textarea
              id="drawer-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about phone conversations, quote proposals, or next steps..."
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce"
            />
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-line bg-canvas flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${enquiry.email}?subject=RE: Your inquiry to Aakaar Digital`}
              className="btn-secondary text-xs flex items-center gap-1.5 min-h-[38px] px-3"
            >
              <Mail className="w-4 h-4" />
              <span>Reply</span>
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2.5 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
              title="Delete enquiry"
              aria-label="Delete enquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-xs flex items-center gap-1.5 min-h-[38px] px-4 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4 text-white" />
            ) : null}
            <span>{saveSuccess ? "Saved" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

