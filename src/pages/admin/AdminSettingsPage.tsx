"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchApi } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  Lock,
  Users,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Shield,
  Key,
  X,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user, csrfToken } = useAdminAuth();

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Users state (for role: admin)
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("editor");
  const [userSaving, setUserSaving] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    if (user?.role !== "admin") return;
    setUsersLoading(true);
    const res = await fetchApi("/v1/admin/users");
    if (res.success && res.data) {
      setUsers(res.data);
    }
    setUsersLoading(false);
  }, [user?.role]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 12) {
      setPasswordError("New password must be at least 12 characters long.");
      return;
    }

    setPasswordSaving(true);
    const res = await fetchApi("/v1/admin/password", {
      method: "POST",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setPasswordSaving(false);
    if (res.success) {
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError(res.error?.message || "Failed to change password.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);

    if (newUserPassword.length < 12) {
      setUserError("Password must be at least 12 characters long.");
      return;
    }

    setUserSaving(true);
    const res = await fetchApi("/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setUserSaving(false);
    if (res.success) {
      setNewUserModalOpen(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      loadUsers();
    } else {
      setUserError(res.error?.message || "Failed to create user.");
    }
  };

  const handleDeleteUser = async (targetUser: any) => {
    if (targetUser.id === user?.id) {
      alert("You cannot delete your own admin account.");
      return;
    }

    if (!window.confirm(`Are you sure you want to deactivate and remove user ${targetUser.email}?`)) {
      return;
    }

    const res = await fetchApi(`/v1/admin/users/${targetUser.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (res.success) {
      loadUsers();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-heading text-ink">Account & Security Settings</h1>
        <p className="text-sm text-secondary mt-1">
          Manage your administrative password and internal team privileges.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="panel-card p-6 sm:p-8 bg-surface space-y-6">
        <div className="border-b border-line pb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-mist text-primary-spruce flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-ink">Change Admin Password</h2>
            <p className="text-xs text-secondary">
              Minimum 12 characters required. Passwords are encrypted using Argon2id/bcrypt.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs flex items-start gap-2">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Password successfully updated.</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              New Password (12+ characters) *
            </label>
            <input
              type="password"
              required
              minLength={12}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              minLength={12}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
            />
          </div>

          <button
            type="submit"
            disabled={passwordSaving}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            {passwordSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* User Management (Role: Admin only) */}
      {user?.role === "admin" && (
        <div className="panel-card p-6 sm:p-8 bg-surface space-y-6">
          <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-mist text-primary-spruce flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading text-ink">Administrative Users</h2>
                <p className="text-xs text-secondary">
                  Manage team access to the Aakaar Digital admin portal.
                </p>
              </div>
            </div>

            <button
              onClick={() => setNewUserModalOpen(true)}
              className="btn-secondary text-xs flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Admin User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas border-b border-line text-xs font-semibold text-secondary uppercase tracking-wider">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Last Login</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {usersLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-secondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-primary-spruce" />
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td className="p-3">
                        <div className="font-bold text-ink">{u.name}</div>
                        <div className="text-xs text-secondary">{u.email}</div>
                      </td>

                      <td className="p-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-mist text-primary-spruce uppercase">
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3 text-xs text-secondary">
                        {u.last_login_at
                          ? new Date(u.last_login_at).toLocaleString("en-CA")
                          : "Never"}
                      </td>

                      <td className="p-3 text-right">
                        {u.id !== user.id && (
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1 rounded text-red-600 hover:bg-red-500/10"
                            title="Deactivate User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {newUserModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="panel-card w-full max-w-md p-6 bg-surface shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
              <h3 className="text-lg font-bold font-heading text-ink">Add New Admin User</h3>
              <button
                onClick={() => setNewUserModalOpen(false)}
                className="p-1 rounded-lg hover:bg-mist text-secondary hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {userError && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{userError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. David Campbell"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="david@aakaardigital.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Password (12+ characters) *
                </label>
                <input
                  type="password"
                  required
                  minLength={12}
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  System Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
                >
                  <option value="editor">Editor (Articles, Media & Categories)</option>
                  <option value="admin">Administrator (Full Access & User Management)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setNewUserModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={userSaving}
                  className="btn-primary text-xs flex items-center gap-1.5"
                >
                  {userSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

