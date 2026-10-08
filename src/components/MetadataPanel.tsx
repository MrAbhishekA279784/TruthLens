import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';
import { CURRENT_ANALYSIS } from '../data/mockData.ts';

export const MetadataPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* File Information Section */}
      <div className="glass-card rounded-3xl p-5 sm:p-7">
        <h4 className="font-serif text-xl font-bold text-[#11120D] mb-4 flex items-center gap-2.5">
          <FileText className="w-4.5 h-4.5 text-[#565449]" />
          <span>File Information</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">File name</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono truncate block">
              {CURRENT_ANALYSIS.fileName}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">File size</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.fileSize}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">Format</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.format}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">Duration</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.duration}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">Resolution</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.resolution}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-bone">
            <span className="text-[11px] text-[#565449] block mb-0.5">Frame rate</span>
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.frameRate}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata Forensic Analysis */}
      <div className="glass-card rounded-3xl p-5 sm:p-7">
        <h4 className="font-serif text-xl font-bold text-[#11120D] mb-4 flex items-center gap-2.5">
          <Layers className="w-4.5 h-4.5 text-[#565449]" />
          <span>Metadata Analysis</span>
        </h4>

        <div className="space-y-2.5 font-sans">
          {CURRENT_ANALYSIS.metadataAnalysis.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3.5 rounded-2xl glass-bone"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#11120D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#565449]" />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <AlertTriangle
                  className={`w-3.5 h-3.5 ${
                    item.type === 'critical' ? 'text-[#A8433A]' : 'text-[#8F6E38]'
                  }`}
                />
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                    item.type === 'critical'
                      ? 'bg-[#A8433A]/10 text-[#A8433A] border border-[#A8433A]/20'
                      : 'bg-[#8F6E38]/10 text-[#8F6E38] border border-[#8F6E38]/20'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Credentials (C2PA) */}
      <div className="glass-card rounded-3xl p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#D8CFBC]/30 text-[#11120D] flex items-center justify-center shrink-0 border border-[#565449]/15">
            <ShieldAlert className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h4 className="font-serif text-xl font-bold text-[#11120D]">
                Content Credentials (C2PA)
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-[#A8433A]/10 text-[#A8433A] border border-[#A8433A]/20 font-sans font-bold text-[10px]">
                Not found
              </span>
            </div>
            <p className="text-xs font-sans text-[#565449] mt-2 leading-relaxed">
              No verified provenance information or cryptographic hardware signature available for this file. 
              Social platforms frequently strip C2PA headers, so lack of metadata is not standalone proof of manipulation, but flags the asset as unauthenticated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
