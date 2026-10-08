/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Topbar } from './components/Topbar.tsx';
import { MediaUploader } from './components/MediaUploader.tsx';
import { ImageAnalysis } from './components/ImageAnalysis.tsx';
import { VideoAnalysis } from './components/VideoAnalysis.tsx';
import { AudioAnalysis } from './components/AudioAnalysis.tsx';
import { EvidenceTabs } from './components/EvidenceTabs.tsx';
import { PassportCard } from './components/PassportCard.tsx';
import { OriginTrace } from './components/OriginTrace.tsx';
import { HistoryList } from './components/HistoryList.tsx';
import { AiAssistant } from './components/AiAssistant.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { LoginView } from './components/LoginView.tsx';
import { MobileNav } from './components/MobileNav.tsx';
import { IMAGES } from './data/mockData.ts';
import { triggerHaptic } from './utils/haptics.ts';
import { 
  CheckCircle2, 
  Sparkles, 
  Share2 
} from 'lucide-react';

export default function App() {
  // Mock authentication state (logged in by default for preview, logout navigates to LoginView)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  
  // Navigation active tab: 'home' | 'new-analysis' | 'history' | 'ai' | 'origin-trace' | 'reports' | 'settings' | 'profile'
  const [currentTab, setCurrentTab] = useState<string>('home');
  
  // Media selector default is IMAGE as requested
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video' | 'audio'>('image');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    triggerHaptic('success');
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectMediaTypeWithLoading = (type: 'image' | 'video' | 'audio') => {
    setSelectedMediaType(type);
    setIsLoadingAnalytics(true);
    setTimeout(() => {
      setIsLoadingAnalytics(false);
    }, 800);
  };

  const handleStartAnalysis = (type: 'image' | 'video' | 'audio', sampleName?: string) => {
    setSelectedMediaType(type);
    setIsSimulatingAnalysis(true);
    setIsLoadingAnalytics(true);
    setAnalysisProgress(15);
    triggerHaptic('tap');

    const stepInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsSimulatingAnalysis(false);
            setIsLoadingAnalytics(false);
            setCurrentTab('home');
            showToast(`Analysis complete for ${sampleName || 'media asset'}!`);
          }, 350);
          return 100;
        }
        return prev + 20;
      });
    }, 240);
  };

  const handleLogout = () => {
    triggerHaptic('warning');
    setIsAuthenticated(false);
    showToast('Logged out of TruthLens');
  };

  // Unauthenticated screen
  if (!isAuthenticated) {
    return (
      <LoginView
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setCurrentTab('home');
          showToast('Welcome back to TruthLens, Aditya');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF4] text-[#11120D] selection:bg-[#D8CFBC] selection:text-[#11120D] flex flex-col justify-between font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 bg-[#11120D] text-[#FFFBF4] px-4 py-3 rounded-2xl shadow-xl border border-[#565449]/30 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#D8CFBC] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Analysis Simulation Modal */}
      {isSimulatingAnalysis && (
        <div className="fixed inset-0 z-50 bg-[#11120D]/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FFFBF4] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#565449]/20 animate-in fade-in zoom-in-95 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D8CFBC]/30 text-[#11120D] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#11120D]">
                  Running Forensic Pipeline
                </h3>
                <p className="text-xs font-sans text-[#565449]">
                  Extracting sensor noise, verifying {selectedMediaType} landmarks, and calibrating confidence...
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 font-sans">
              <div className="flex justify-between text-xs font-semibold text-[#11120D]">
                <span>Verification in progress</span>
                <span className="font-mono text-[#565449]">{analysisProgress}%</span>
              </div>
              <div className="w-full h-2 bg-[#D8CFBC]/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#11120D] rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs font-sans font-medium text-[#565449]">
              <div className="flex items-center gap-2 text-[#3E5C46]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E5C46]" />
                <span>SHA-256 fingerprinting &amp; duplicate cache search</span>
              </div>
              <div className="flex items-center gap-2 text-[#3E5C46]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E5C46]" />
                <span>Error Level Analysis (ELA) quantization scan</span>
              </div>
              <div className={`flex items-center gap-2 ${analysisProgress > 40 ? 'text-[#3E5C46]' : 'text-[#565449]/60'}`}>
                {analysisProgress > 40 ? <CheckCircle2 className="w-3.5 h-3.5 text-[#3E5C46]" /> : <div className="w-3.5 h-3.5 rounded-full border border-[#565449]/30" />}
                <span>Grad-CAM facial landmark boundary inspection</span>
              </div>
              <div className={`flex items-center gap-2 ${analysisProgress > 70 ? 'text-[#3E5C46]' : 'text-[#565449]/60'}`}>
                {analysisProgress > 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-[#3E5C46]" /> : <div className="w-3.5 h-3.5 rounded-full border border-[#565449]/30" />}
                <span>Cross-modal fusion &amp; WhatsApp compression calibration</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Responsive App Container */}
      <div className="flex-1 flex min-h-screen">
        {/* Left Desktop Sidebar (Hidden on mobile/tablet screens naturally) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onOpenUpload={() => setCurrentTab('home')}
          />
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <Topbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectTab={setCurrentTab}
            onSelectResult={(item) => {
              setSelectedMediaType(item.type);
              setCurrentTab('home');
              showToast(`Loaded forensic record for ${item.fileName}`);
            }}
            onLogout={handleLogout}
          />

          {/* Viewport Router */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1720px] w-full mx-auto pb-24 lg:pb-8">
            
            {/* TAB 1: HOME / NEW ANALYSIS */}
            {(currentTab === 'home' || currentTab === 'new-analysis') && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Main Workspace */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Analyze Media Card (Image is Active by Default) */}
                  <MediaUploader
                    selectedMediaType={selectedMediaType}
                    onSelectMediaType={handleSelectMediaTypeWithLoading}
                    onStartAnalysis={handleStartAnalysis}
                  />

                  {/* Media Forensic Viewer — Shows appropriate analysis based on active selector */}
                  {selectedMediaType === 'image' ? (
                    <ImageAnalysis
                      isLoading={isLoadingAnalytics}
                      onViewDetailed={() => {
                        const el = document.getElementById('evidence-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onDownloadReport={() => showToast('TruthLens Forensic Report downloaded!')}
                      onShare={() => showToast('Verification link copied to clipboard!')}
                    />
                  ) : selectedMediaType === 'video' ? (
                    <VideoAnalysis
                      isLoading={isLoadingAnalytics}
                      onViewDetailed={() => {
                        const el = document.getElementById('evidence-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onDownloadReport={() => showToast('TruthLens Forensic Report downloaded!')}
                      onShare={() => showToast('Verification link copied to clipboard!')}
                    />
                  ) : (
                    <div className="mb-6">
                      <AudioAnalysis isLoading={isLoadingAnalytics} />
                    </div>
                  )}

                  {/* Evidence Section with 7 Tabs */}
                  <div id="evidence-section" className="pt-2">
                    <EvidenceTabs isLoading={isLoadingAnalytics} />
                  </div>
                </div>

                {/* Right Column: TruthLens Passport Card */}
                <div className="lg:col-span-4">
                  <PassportCard
                    isLoading={isLoadingAnalytics}
                    onDownloadPdf={() => showToast('TruthLens Authenticity Passport PDF downloaded!')}
                    onShare={() => showToast('Share link copied to clipboard!')}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: HISTORY */}
            {currentTab === 'history' && (
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#565449]/15">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#11120D] tracking-tight">
                      Analysis History
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-[#565449] mt-1">
                      Review all previous visual, video, and acoustic forensic assessments.
                    </p>
                  </div>
                </div>

                <HistoryList
                  onSelectItem={(item) => {
                    setCurrentTab('home');
                    setSelectedMediaType(item.type);
                    setIsLoadingAnalytics(true);
                    setTimeout(() => setIsLoadingAnalytics(false), 800);
                    showToast(`Loaded results for ${item.fileName}`);
                  }}
                />
              </div>
            )}

            {/* TAB 3: TRUTHLENS AI ASSISTANT (Replaces WhatsApp) */}
            {currentTab === 'ai' && (
              <AiAssistant />
            )}

            {/* TAB 4: ORIGIN TRACE */}
            {currentTab === 'origin-trace' && (
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#565449]/15">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#11120D] tracking-tight">
                      Origin Trace &amp; Reverse Verification
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-[#565449] mt-1">
                      Trace original source frames and discover related recompressed uploads.
                    </p>
                  </div>
                </div>

                <OriginTrace isLoading={isLoadingAnalytics} />
              </div>
            )}

            {/* TAB 5: REPORTS */}
            {currentTab === 'reports' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#565449]/15">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#11120D] tracking-tight">
                      Authenticity Passports &amp; Certificates
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-[#565449] mt-1">
                      Cryptographically signed public authenticity verification documents.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PassportCard
                    isLoading={isLoadingAnalytics}
                    onDownloadPdf={() => showToast('Passport PDF exported!')}
                    onShare={() => showToast('Public verify link copied!')}
                  />
                  <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between font-sans">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#11120D] mb-2">
                        Public Verification Architecture
                      </h3>
                      <p className="text-xs text-[#565449] leading-relaxed mb-4">
                        Each TruthLens Passport is anchored with a SHA-256 media hash and calibrated confidence score. 
                        Recipients can scan the embedded QR code or visit the verification URL to independently inspect model findings without exposing sensitive original media.
                      </p>
                      <div className="p-4 bg-[#D8CFBC]/20 rounded-2xl border border-[#565449]/15 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#565449]">Report Status</span>
                          <span className="text-[#3E5C46] font-bold">Publicly Verifiable</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#565449]">Tamper Seal</span>
                          <span className="font-mono text-[#11120D]">SHA-256 Validated</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast('Report shared to public registry!')}
                      className="w-full py-3 rounded-xl bg-[#11120D] hover:bg-[#11120D]/90 text-[#FFFBF4] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share to Verification Registry</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {currentTab === 'settings' && (
              <ProfileView
                onLogout={handleLogout}
                onNavigateTab={setCurrentTab}
                onBack={() => setCurrentTab('home')}
              />
            )}

            {/* TAB 7: PROFILE (Fixes the previously blank Profile page!) */}
            {currentTab === 'profile' && (
              <ProfileView
                onLogout={handleLogout}
                onNavigateTab={setCurrentTab}
                onBack={() => setCurrentTab('home')}
              />
            )}

          </main>

          {/* Mobile Bottom Navigation (Visible on mobile/tablet screens naturally) */}
          <MobileNav
            currentTab={currentTab === 'settings' ? 'profile' : currentTab}
            onSelectTab={setCurrentTab}
          />
        </div>
      </div>

    </div>
  );
}
