import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Edit2, Save, X, Camera, ArrowLeft,
  Shield, Trash2, Award, Activity, BarChart3,
  Leaf, CheckCircle, Lock, Eye, EyeOff
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { calculateBadges } from "../utils/badges";
import ThemeToggle from "../components/ThemeToggle";

const STORAGE_KEY = "carbon-calculator-data";

const UserProfile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [saveMsg, setSaveMsg] = useState("");

  // Password change state
  const [pwData, setPwData] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwMsg, setPwMsg] = useState({ text: "", type: "" });

  // Carbon data from localStorage
  const savedCarbon = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const footprint = savedCarbon?.footprint || { total: 0, home: 0, travel: 0, food: 0, waste: 0 };
  const badges = calculateBadges(footprint);
  const earnedBadges = badges.filter((b) => b.achieved);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    updateProfile({ ...editData, avatar: avatarPreview });
    setIsEditing(false);
    setSaveMsg("Profile updated successfully!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleCancelEdit = () => {
    setEditData({ name: user?.name || "", bio: user?.bio || "" });
    setAvatarPreview(user?.avatar || null);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (pwData.newPw.length < 6) {
      setPwMsg({ text: "New password must be at least 6 characters.", type: "error" });
      return;
    }
    if (pwData.newPw !== pwData.confirm) {
      setPwMsg({ text: "Passwords do not match.", type: "error" });
      return;
    }
    setPwMsg({ text: "Password updated successfully!", type: "success" });
    setPwData({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwMsg({ text: "", type: "" }), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "carbon", label: "Carbon Summary", icon: BarChart3 },
    { id: "badges", label: "Badges", icon: Award },
    { id: "settings", label: "Settings", icon: Shield },
  ];

  const joinDate = user?.id
    ? new Date(parseInt(user.id)).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              <span className="font-bold text-foreground">My Profile</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Profile Hero */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-green-200 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-14 h-14 text-green-600" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-7 h-7 text-white" />
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user?.name || "VerdiGo User"}</h1>
              <p className="text-green-100 flex items-center justify-center sm:justify-start gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
              {user?.bio && <p className="mt-2 text-green-50 text-sm italic">"{user.bio}"</p>}
              <p className="text-green-200 text-xs mt-2">Member since {joinDate}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{footprint.total.toFixed(1)}</div>
                <div className="text-xs text-green-100">tons CO₂/yr</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{earnedBadges.length}</div>
                <div className="text-xs text-green-100">badges</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">{badges.length - earnedBadges.length}</div>
                <div className="text-xs text-green-100">to unlock</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                activeTab === id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 border border-border hover:bg-muted px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )}
              </div>

              {saveMsg && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4" /> {saveMsg}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-muted rounded-lg text-foreground">{user?.name || "—"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                  <p className="px-4 py-2 bg-muted rounded-lg text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {user?.email}
                    <span className="ml-auto text-xs text-muted-foreground">(cannot be changed)</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={3}
                      placeholder="Tell us about your eco journey..."
                      className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-muted rounded-lg text-foreground min-h-[60px]">
                      {user?.bio || <span className="text-muted-foreground italic">No bio yet. Click Edit to add one.</span>}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 border border-border hover:bg-muted px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Camera className="w-4 h-4" /> Upload Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CARBON SUMMARY TAB */}
          {activeTab === "carbon" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Carbon Footprint Summary</h2>
              {!savedCarbon ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No data yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">Use the Carbon Footprint Calculator to track your impact.</p>
                  <button
                    onClick={() => navigate("/dashboard/carbon-footprint-calculator")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Open Calculator
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Total", value: footprint.total, color: "bg-red-50 border-red-200 text-red-600", unit: "tons/yr" },
                      { label: "Home", value: footprint.home, color: "bg-yellow-50 border-yellow-200 text-yellow-600", unit: "tons" },
                      { label: "Travel", value: footprint.travel, color: "bg-blue-50 border-blue-200 text-blue-600", unit: "tons" },
                      { label: "Food", value: footprint.food, color: "bg-green-50 border-green-200 text-green-600", unit: "tons" },
                    ].map(({ label, value, color, unit }) => (
                      <div key={label} className={`rounded-xl border p-4 text-center ${color}`}>
                        <div className="text-2xl font-bold">{(value || 0).toFixed(1)}</div>
                        <div className="text-xs font-medium mt-1">{label}</div>
                        <div className="text-xs opacity-70">{unit}</div>
                      </div>
                    ))}
                  </div>

                  {/* Category Bars */}
                  <div className="space-y-3">
                    {[
                      { label: "Home Energy", value: footprint.home, max: 6, color: "bg-yellow-400" },
                      { label: "Travel", value: footprint.travel, max: 6, color: "bg-blue-400" },
                      { label: "Food", value: footprint.food, max: 6, color: "bg-green-400" },
                      { label: "Waste", value: footprint.waste, max: 2, color: "bg-purple-400" },
                    ].map(({ label, value, max, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium text-foreground">{(value || 0).toFixed(2)} tons</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${color} transition-all duration-700`}
                            style={{ width: `${Math.min(((value || 0) / max) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {savedCarbon.lastUpdated && (
                    <p className="text-xs text-muted-foreground text-right">
                      Last updated: {new Date(savedCarbon.lastUpdated).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* BADGES TAB */}
          {activeTab === "badges" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Eco Badges</h2>
                <span className="text-sm text-muted-foreground">{earnedBadges.length} / {badges.length} earned</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      badge.achieved
                        ? "border-green-200 bg-green-50"
                        : "border-border bg-muted/30 opacity-60 grayscale"
                    }`}
                  >
                    <div className={`text-4xl ${!badge.achieved ? "filter grayscale" : ""}`}>{badge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{badge.name}</h4>
                        {badge.achieved && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-foreground">Account Settings</h2>

              {/* Theme */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div>
                  <h3 className="font-medium text-foreground">Theme Preference</h3>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>

              {/* Change Password */}
              <div>
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Change Password
                </h3>
                <form onSubmit={handlePasswordChange} className="space-y-3">
                  {[
                    { key: "current", label: "Current Password" },
                    { key: "newPw", label: "New Password" },
                    { key: "confirm", label: "Confirm New Password" },
                  ].map(({ key, label }) => (
                    <div key={key} className="relative">
                      <input
                        type={showPw[key] ? "text" : "password"}
                        placeholder={label}
                        value={pwData[key]}
                        onChange={(e) => setPwData({ ...pwData, [key]: e.target.value })}
                        className="w-full border border-border rounded-lg px-4 py-2 pr-10 bg-background text-foreground focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw({ ...showPw, [key]: !showPw[key] })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPw[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                  {pwMsg.text && (
                    <p className={`text-sm ${pwMsg.type === "error" ? "text-red-500" : "text-green-600"}`}>
                      {pwMsg.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="border border-red-200 rounded-xl p-4">
                <h3 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Logging out will end your current session.
                </p>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;