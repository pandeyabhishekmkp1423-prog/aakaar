import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "@/components/common/Image";
import { useAdminAuth } from "@/lib/admin-auth";
import { Shield, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Login failed. Please verify credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-canvas">
      <div className="w-full max-w-md panel-card p-8 sm:p-10 bg-surface shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#0B0E0B] border border-[#22291C] p-2.5 flex items-center justify-center shadow-lg">
            <Image
              src="/Angular White and Neon Lime Logo.png"
              alt="Aakaar Digital"
              width={56}
              height={56}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold font-heading text-ink">Admin Sign In</h1>
          <p className="text-xs text-secondary mt-1">
            Aakaar Digital &bull; Management Portal
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aakaardigital.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
              />
              <Mail className="w-4 h-4 text-secondary absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
              />
              <Lock className="w-4 h-4 text-secondary absolute left-3 top-3" />
            </div>
          </div>

          <div className="text-[11px] text-secondary flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary-spruce shrink-0" />
            <span>Rate-limited with lockout after 5 failed attempts.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

