import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Database, 
  FileText, 
  Download, 
  Trash2, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight, 
  Check, 
  Edit3, 
  Smartphone, 
  Laptop,
  ArrowLeft
} from 'lucide-react';
import { IMAGES } from '../data/mockData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface ProfileViewProps {
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
  onBack?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, onNavigateTab, onBack }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [name, setName] = useState('Aditya Verma');
  const [email, setEmail] = useState('aditya@example.com');
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    triggerHaptic('success');
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 space-y-6 font-sans">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-[#11120D] text-[#FFFBF4] px-4 py-2.5 rounded-xl shadow-lg border border-[#565449]/30 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#D8CFBC]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header with back navigation if on mobile */}
      <div className="flex items-center justify-between pb-3 border-b border-[#565449]/15">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={() => {
                triggerHaptic('tap');
                onBack();
              }}
              className="w-8 h-8 rounded-xl bg-[#D8CFBC]/25 flex items-center justify-center text-[#11120D] hover:bg-[#D8CFBC]/40 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#11120D] tracking-tight">
              My Profile
            </h1>
            <p className="text-xs text-[#565449] mt-0.5">
              Account settings, security credentials, preferences and data management.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={IMAGES.avatarAditya}
              alt={name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#565449]/20 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#3E5C46] ring-2 ring-[#FFFBF4] flex items-center justify-center text-[#FFFBF4] text-[9px] font-bold">
              ✓
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif text-2xl font-bold text-[#11120D]">{name}</h2>
            </div>
            <p className="text-xs text-[#565449] mt-0.5">{email}</p>
            <div className="text-[11px] text-[#565449]/80 mt-1 font-mono">
              Member since August 2025
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('edit-profile')}
          className="px-4 py-2 rounded-xl bg-[#D8CFBC]/25 hover:bg-[#D8CFBC]/40 text-[#11120D] text-xs font-semibold border border-[#565449]/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* 5 Distinct Profile Sections */}
      <div className="space-y-6">
        
        {/* SECTION 1: ACCOUNT */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#565449] font-sans pb-1">
            Account Information
          </div>
          <div className="divide-y divide-[#565449]/10 text-xs">
            <div 
              onClick={() => setActiveModal('edit-profile')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Personal Information</span>
                  <span className="text-[#565449] text-[11px]">{name} · Senior Investigative Reporter</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => setActiveModal('change-email')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Primary Email</span>
                  <span className="text-[#565449] text-[11px]">{email} (Verified)</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => setActiveModal('change-password')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Change Password</span>
                  <span className="text-[#565449] text-[11px]">Last changed 3 months ago</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>
          </div>
        </div>

        {/* SECTION 2: PREFERENCES */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#565449] font-sans pb-1">
            System Preferences
          </div>
          <div className="divide-y divide-[#565449]/10 text-xs">
            <div className="py-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <span className="text-sm">🎨</span>
                <div>
                  <span className="font-semibold text-[#11120D] block">Appearance Theme</span>
                  <span className="text-[#565449] text-[11px]">Editorial Warm (Rethena Palette)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#D8CFBC]/30 text-[#11120D] text-[10px] font-semibold">Default</span>
            </div>

            <div className="py-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Analysis Notifications</span>
                  <span className="text-[#565449] text-[11px]">Notify when async jobs and deepfake scans complete</span>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#11120D] rounded cursor-pointer" />
            </div>

            <div className="py-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Language</span>
                  <span className="text-[#565449] text-[11px]">English (India / International)</span>
                </div>
              </div>
              <span className="text-[#565449] font-medium">English &gt;</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: SECURITY */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#565449] font-sans pb-1">
            Security &amp; Privacy
          </div>
          <div className="divide-y divide-[#565449]/10 text-xs">
            <div 
              onClick={() => showNotification('Privacy policy & biometric ethics opened')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Privacy &amp; Security Shield</span>
                  <span className="text-[#565449] text-[11px]">Zero facial recognition storage · Ephemeral caching</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => setActiveModal('active-sessions')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Laptop className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Active Sessions</span>
                  <span className="text-[#565449] text-[11px]">2 authenticated devices logged in</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>
          </div>
        </div>

        {/* SECTION 4: DATA MANAGEMENT */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#565449] font-sans pb-1">
            Data &amp; Artifacts
          </div>
          <div className="divide-y divide-[#565449]/10 text-xs">
            <div 
              onClick={() => {
                triggerHaptic('selection');
                onNavigateTab('history');
              }}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">My Analyses</span>
                  <span className="text-[#565449] text-[11px]">5 active forensic audits stored</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => {
                triggerHaptic('selection');
                onNavigateTab('reports');
              }}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Saved Reports &amp; Passports</span>
                  <span className="text-[#565449] text-[11px]">3 verifiable PDF certificates exported</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => showNotification('Data export archive (JSON + PDFs) generated')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Download My Data</span>
                  <span className="text-[#565449] text-[11px]">Export audit logs, hashes and findings in standard format</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => showNotification('Account deletion requires confirmation')}
              className="py-3 flex items-center justify-between hover:bg-[#A8433A]/5 rounded-xl px-2 transition-colors cursor-pointer text-[#A8433A]"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4" />
                <div>
                  <span className="font-semibold block">Delete Account</span>
                  <span className="text-[#A8433A]/80 text-[11px]">Permanently remove all user data and audit history</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* SECTION 5: SUPPORT */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#565449] font-sans pb-1">
            Support &amp; Information
          </div>
          <div className="divide-y divide-[#565449]/10 text-xs">
            <div 
              onClick={() => showNotification('Help Documentation & Guides opened')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">Help &amp; Support</span>
                  <span className="text-[#565449] text-[11px]">Forensic verification manuals &amp; FAQ</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565449]" />
            </div>

            <div 
              onClick={() => showNotification('TruthLens v1.2 Forensic Suite. Built for newsrooms.')}
              className="py-3 flex items-center justify-between hover:bg-[#D8CFBC]/10 rounded-xl px-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-[#565449]" />
                <div>
                  <span className="font-semibold text-[#11120D] block">About TruthLens</span>
                  <span className="text-[#565449] text-[11px]">Version 1.2 · Quality-Aware Fusion Engine</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#565449]">v1.2</span>
            </div>
          </div>
        </div>

        {/* AT THE BOTTOM: LOG OUT BUTTON */}
        <div className="pt-2">
          <button
            onClick={() => {
              triggerHaptic('warning');
              onLogout();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#FFFBF4] hover:bg-[#A8433A]/10 border border-[#A8433A]/30 text-[#A8433A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of TruthLens</span>
          </button>
        </div>

      </div>

      {/* Edit Profile Dialog */}
      {activeModal === 'edit-profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11120D]/60 backdrop-blur-xs p-4">
          <div className="bg-[#FFFBF4] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#565449]/20 animate-in fade-in zoom-in-95 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#11120D]">Edit Profile</h3>
            <div>
              <label className="text-xs font-semibold text-[#565449] block mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-[#11120D]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#565449] block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-[#11120D]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#565449] hover:bg-[#D8CFBC]/20 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  showNotification('Profile updated successfully');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#FFFBF4] bg-[#11120D] rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Sessions Dialog */}
      {activeModal === 'active-sessions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11120D]/60 backdrop-blur-xs p-4">
          <div className="bg-[#FFFBF4] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#565449]/20 animate-in fade-in zoom-in-95 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#11120D]">Active Sessions</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#D8CFBC]/20 rounded-xl border border-[#565449]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 text-[#11120D]" />
                  <div>
                    <span className="font-bold text-[#11120D] block">MacBook Pro · Chrome</span>
                    <span className="text-[#565449] text-[10px]">Mumbai, India · Active Now</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#3E5C46]/10 text-[#3E5C46] font-bold text-[10px] rounded">Current</span>
              </div>
              <div className="p-3 bg-[#D8CFBC]/20 rounded-xl border border-[#565449]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#11120D]" />
                  <div>
                    <span className="font-bold text-[#11120D] block">iPhone 16 Pro · Safari</span>
                    <span className="text-[#565449] text-[10px]">Delhi, India · 2 hours ago</span>
                  </div>
                </div>
                <button 
                  onClick={() => showNotification('Session terminated')}
                  className="text-[10px] text-[#A8433A] font-semibold hover:underline"
                >
                  Revoke
                </button>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#FFFBF4] bg-[#11120D] rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      {activeModal === 'change-password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11120D]/60 backdrop-blur-xs p-4">
          <div className="bg-[#FFFBF4] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#565449]/20 animate-in fade-in zoom-in-95 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#11120D]">Change Password</h3>
            <div>
              <label className="text-xs font-semibold text-[#565449] block mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-xs bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-[#11120D]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#565449] block mb-1">New Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2 text-xs bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-[#11120D]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#565449] hover:bg-[#D8CFBC]/20 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  showNotification('Password changed successfully');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#FFFBF4] bg-[#11120D] rounded-xl"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
