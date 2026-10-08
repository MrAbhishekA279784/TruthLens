import React, { useState } from 'react';
import { 
  KeyframeTimeline 
} from './KeyframeTimeline.tsx';
import { 
  Heatmap 
} from './Heatmap.tsx';
import { 
  AudioAnalysis 
} from './AudioAnalysis.tsx';
import { 
  OriginTrace 
} from './OriginTrace.tsx';
import { 
  MetadataPanel 
} from './MetadataPanel.tsx';
import { CURRENT_ANALYSIS } from '../data/mockData.ts';
import { 
  Activity, 
  Info
} from 'lucide-react';

interface EvidenceTabsProps {
  isLoading?: boolean;
  onSelectKeyframe?: (timestamp: string) => void;
}

export const EvidenceTabs: React.FC<EvidenceTabsProps> = ({ 
  isLoading = false,
  onSelectKeyframe 
}) => {
  const [activeTab, setActiveTab] = useState<string>('evidence');

  const tabs = [
    { id: 'evidence', label: 'Evidence' },
    { id: 'details', label: 'Details' },
    { id: 'model-scores', label: 'Model Scores' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'origin-trace', label: 'Origin Trace' },
    { id: 'similar-media', label: 'Similar Media' },
    { id: 'safety-notes', label: 'Safety Notes' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Bar — Editorial Segmented Control */}
      <div className="flex items-center gap-1.5 p-1 bg-[#D8CFBC]/25 backdrop-blur-md rounded-2xl w-full max-w-full overflow-x-auto border border-[#565449]/15">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#11120D] text-[#FFFBF4] shadow-xs'
                  : 'text-[#565449] hover:text-[#11120D] hover:bg-[#D8CFBC]/30'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: EVIDENCE */}
      {activeTab === 'evidence' && (
        <div className="space-y-5 animate-in fade-in">
          {/* 3 Evidence Cards in Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <KeyframeTimeline isLoading={isLoading} onSelectKeyframe={onSelectKeyframe} />
            <Heatmap isLoading={isLoading} />
            <AudioAnalysis isLoading={isLoading} />
          </div>

          {/* Detected Issues Bottom Bar */}
          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="font-serif text-base sm:text-lg font-bold text-[#11120D] shrink-0">
                Detected Issues
              </div>

              {/* Progress bars for detected issues */}
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:ml-6 font-sans">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="w-20 h-3 rounded skeleton-shimmer-subtle" />
                        <div className="w-8 h-3 rounded skeleton-shimmer" />
                      </div>
                      <div className="w-full h-1.5 bg-[#D8CFBC]/40 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:ml-6 font-sans">
                  {CURRENT_ANALYSIS.detectedIssues.map((issue) => (
                    <div key={issue.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#565449] font-medium truncate pr-1">
                          {issue.label}
                        </span>
                        <span className="font-mono font-bold text-[#A8433A]">
                          {issue.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#D8CFBC]/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#A8433A] rounded-full"
                          style={{ width: `${issue.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: DETAILS */}
      {activeTab === 'details' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#11120D]">
                Detailed Forensic Diagnostics
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#565449] mt-0.5">
                Multi-signal deepfake analysis breakdown across visual, audio, and compression layers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl glass-bone space-y-2">
              <span className="font-serif font-bold text-[#11120D] text-base block">1. Facial & Spatial Artifacts</span>
              <p className="text-[#565449] leading-relaxed">
                Vision Transformer detected boundary blending inconsistencies around the subject&apos;s jawline and perioral region between timestamps 00:10 and 00:16. FFT frequency maps show synthetic checkerboard patterns typical of GAN/Diffusion generators.
              </p>
              <div className="text-[#A8433A] font-semibold font-mono text-[11px] pt-1">
                Spatial Anomaly Score: 0.914 · Confidence: High
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-bone space-y-2">
              <span className="font-serif font-bold text-[#11120D] text-base block">2. Audio Acoustic Forensics</span>
              <p className="text-[#565449] leading-relaxed">
                Wav2Vec2 spoof classifier flagged synthetic pitch contours with unnatural spectral cutoffs above 7.8 kHz. Acoustic room reverberation is mathematically absent in the vocal track compared to background noise.
              </p>
              <div className="text-[#A8433A] font-semibold font-mono text-[11px] pt-1">
                Acoustic Spoof Score: 0.872 · Confidence: High
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-bone space-y-2">
              <span className="font-serif font-bold text-[#11120D] text-base block">3. Temporal Consistency</span>
              <p className="text-[#565449] leading-relaxed">
                Optical flow tracking between frames revealed unnatural eye blink cadence (0.12 Hz vs natural 0.28 Hz) and micromovement flickering across consecutive frames.
              </p>
              <div className="text-[#565449] font-semibold font-mono text-[11px] pt-1">
                Temporal Jitter Score: 0.785 · Lip-sync Delta: 180ms
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-bone space-y-2">
              <span className="font-serif font-bold text-[#11120D] text-base block">4. WhatsApp Compression Robustness</span>
              <p className="text-[#565449] leading-relaxed">
                Asset underwent H.264 CRF 32 re-encoding. Our calibrated fusion model adjusted baseline confidence by -7.5% to account for social media recompression noise without triggering false positives.
              </p>
              <div className="text-[#3E5C46] font-semibold font-mono text-[11px] pt-1">
                Calibrated ECE: 0.041 · Robustness Filter Applied
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: MODEL SCORES */}
      {activeTab === 'model-scores' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#11120D]">
                Model Stacking & Ensemble Scores
              </h3>
              <p className="text-xs font-sans text-[#565449] mt-0.5">
                Trained weights and individual detector outputs aggregated via quality-aware fusion.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#D8CFBC]/30 text-[#11120D] px-3 py-1 rounded-xl border border-[#565449]/20 font-semibold">
              Fusion Engine v1.2
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-sans">
              <thead>
                <tr className="border-b border-[#565449]/15 text-[#565449] uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Model / Signal</th>
                  <th className="py-2.5 px-3">Raw Score</th>
                  <th className="py-2.5 px-3">Ensemble Weight</th>
                  <th className="py-2.5 px-3">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#565449]/10">
                {CURRENT_ANALYSIS.modelScores.map((ms) => (
                  <tr key={ms.model} className="hover:bg-[#D8CFBC]/15 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#11120D]">{ms.model}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#11120D]">{ms.score}%</td>
                    <td className="py-3 px-3 font-mono text-[#565449]">{ms.weight}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-[#D8CFBC]/25 text-[#11120D] border border-[#565449]/15">
                        {ms.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: METADATA */}
      {activeTab === 'metadata' && (
        <div className="animate-in fade-in">
          <MetadataPanel />
        </div>
      )}

      {/* Tab 5: ORIGIN TRACE */}
      {activeTab === 'origin-trace' && (
        <div className="animate-in fade-in">
          <OriginTrace isLoading={isLoading} />
        </div>
      )}

      {/* Tab 6: SIMILAR MEDIA */}
      {activeTab === 'similar-media' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 animate-in fade-in">
          <h3 className="font-serif text-2xl font-bold text-[#11120D]">
            Similar Media & Repost Matches
          </h3>
          <p className="text-xs font-sans text-[#565449]">
            Perceptual hash matching across public social platforms and past TruthLens submissions.
          </p>

          <div className="space-y-3 font-sans">
            {CURRENT_ANALYSIS.similarMedia.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl glass-bone flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#11120D]">{item.relation}</div>
                  <div className="text-xs text-[#565449] mt-0.5">
                    {item.domain} · First observed {item.timeAgo}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#3E5C46] bg-[#3E5C46]/10 px-2.5 py-1 rounded-lg border border-[#3E5C46]/20">
                    {item.matchPercent}% Match
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#11120D] hover:underline"
                  >
                    Open Source ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: SAFETY NOTES */}
      {activeTab === 'safety-notes' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 animate-in fade-in text-xs sm:text-sm text-[#565449] leading-relaxed font-sans">
          <div className="flex items-center gap-3 text-[#11120D] font-bold text-base">
            <Info className="w-5 h-5 text-[#565449]" />
            <span className="font-serif text-xl font-bold">Ethical Guidelines & Forensic Limitations</span>
          </div>
          <p>
            1. <strong>Probabilistic Assessment:</strong> TruthLens produces calibrated probability estimates based on mathematical and biometric signals. Results are designed for newsrooms, fact-checkers, and investigators, and do not constitute certified courtroom evidence.
          </p>
          <p>
            2. <strong>No Facial Recognition:</strong> TruthLens does not identify individuals, scrape identity databases, or perform facial recognition. Analysis is restricted purely to spatial, acoustic, and metadata authenticity checks.
          </p>
          <p>
            3. <strong>Data Privacy & Hashing:</strong> Uploaded media is analyzed ephemerally and automatically removed after 7 days unless saved. Only salted cryptographic hashes (SHA-256 and pHash) are retained for caching and duplicate detection.
          </p>
        </div>
      )}
    </div>
  );
};
