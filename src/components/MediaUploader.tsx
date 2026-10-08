import React, { useState } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Mic as AudioIcon, 
  ScanLine, 
  Link as LinkIcon 
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface MediaUploaderProps {
  selectedMediaType: 'image' | 'video' | 'audio';
  onSelectMediaType: (type: 'image' | 'video' | 'audio') => void;
  onStartAnalysis: (type: 'image' | 'video' | 'audio', sampleName?: string) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  selectedMediaType = 'image',
  onSelectMediaType,
  onStartAnalysis,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Human-designed media selector ordering: Audio -> IMAGE (Center & Active) -> Video
  const mediaTypes = [
    { id: 'audio' as const, label: 'Audio', icon: AudioIcon },
    { id: 'image' as const, label: 'Image', icon: ImageIcon },
    { id: 'video' as const, label: 'Video', icon: VideoIcon },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    triggerHaptic('success');
    const defaultName = selectedMediaType === 'image' 
      ? 'photo_0810.jpg' 
      : selectedMediaType === 'video' 
        ? 'video_2025_0812.mp4' 
        : 'audio_memo.wav';
    onStartAnalysis(selectedMediaType, defaultName);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      triggerHaptic('success');
      onStartAnalysis(selectedMediaType, e.target.files[0].name);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-7 mb-6 font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shadow-xs shrink-0">
            <ScanLine className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#11120D] tracking-tight leading-tight">
              Analyze Media
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#565449] mt-0.5">
              Upload any image, video or audio to detect manipulation and get detailed forensic insights.
            </p>
          </div>
        </div>

        {/* Quick Utilities: Paste URL */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => {
              triggerHaptic('tap');
              setShowUrlModal(true);
            }}
            className="btn-glass-secondary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-medium cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#565449]" />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      {/* Media Type Selector: Balanced 3-column Grid centered around Image */}
      {/* Audio (left)  ->  IMAGE (CENTER & ACTIVE)  ->  Video (right) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-5">
        {mediaTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedMediaType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => {
                triggerHaptic('selection');
                onSelectMediaType(type.id);
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-3 sm:py-3.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer font-sans select-none text-center sm:text-left ${
                isSelected
                  ? 'card-active-smoky font-semibold ring-1 ring-[#11120D]'
                  : 'glass-bone text-[#565449] hover:text-[#11120D]'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected 
                    ? 'bg-[#FFFBF4]/15 text-[#FFFBF4]' 
                    : 'bg-[#D8CFBC]/30 text-[#565449]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold tracking-tight leading-none">
                  {type.label}
                </span>
                {isSelected && (
                  <span className="hidden md:inline-block text-[10px] text-[#D8CFBC] font-mono mt-0.5 leading-none">
                    Active Mode
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Drag & Drop Upload Zone - Frosted Tactile Glass */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`glass-dropzone rounded-3xl p-6 sm:p-9 flex flex-col items-center justify-center text-center ${
          isDragging ? 'bg-[#D8CFBC]/40 scale-[0.995]' : ''
        }`}
      >
        <div className="w-13 h-13 rounded-2xl bg-[#FFFBF4]/80 border border-[#565449]/15 flex items-center justify-center text-[#11120D] mb-3 shadow-2xs backdrop-blur-md">
          <UploadCloud className="w-6 h-6 stroke-[1.8]" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11120D] mb-1">
          Drag &amp; drop your {selectedMediaType} here
        </h3>
        <p className="text-xs font-sans text-[#565449] mb-4">
          or choose a forensic file from your local device
        </p>

        <label className="cursor-pointer">
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileSelect}
            accept={
              selectedMediaType === 'video' 
                ? 'video/mp4,video/mov,video/avi' 
                : selectedMediaType === 'image' 
                  ? 'image/jpeg,image/png,image/webp' 
                  : 'audio/mp3,audio/wav,audio/m4a'
            }
          />
          <span className="btn-primary-solid inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-semibold cursor-pointer">
            Choose File
          </span>
        </label>

        <div className="mt-4 text-[11px] font-sans text-[#565449]/80 font-medium">
          Supported formats: {selectedMediaType === 'image' ? 'JPG, PNG, WEBP, TIFF' : selectedMediaType === 'video' ? 'MP4, MOV, AVI' : 'MP3, WAV, AAC, M4A'} · Up to 500MB
        </div>
      </div>

      {/* URL Modal Dialog */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11120D]/50 backdrop-blur-xs p-4">
          <div className="bg-[#FFFBF4] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#565449]/20 animate-in fade-in zoom-in-95">
            <h4 className="font-serif text-xl font-bold text-[#11120D] mb-1">Paste Media URL</h4>
            <p className="text-xs font-sans text-[#565449] mb-4">
              Enter any direct image, video, or audio link for forensic inspection.
            </p>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={`https://example.com/media/file.${selectedMediaType === 'image' ? 'jpg' : selectedMediaType === 'video' ? 'mp4' : 'wav'}`}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl mb-4 focus:outline-none focus:ring-1 focus:ring-[#11120D] text-[#11120D]"
            />
            <div className="flex justify-end gap-2 font-sans">
              <button
                onClick={() => setShowUrlModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-[#565449] hover:bg-[#D8CFBC]/25 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUrlModal(false);
                  triggerHaptic('success');
                  onStartAnalysis(selectedMediaType, urlInput || `url_source_${selectedMediaType}`);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#FFFBF4] bg-[#11120D] hover:bg-[#11120D]/90 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Analyze Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
