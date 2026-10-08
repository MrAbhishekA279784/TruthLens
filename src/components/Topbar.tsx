import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  ChevronRight, 
  X, 
  Clock, 
  Sparkles, 
  FileCheck 
} from 'lucide-react';
import { TruthLensLogo } from './TruthLensLogo.tsx';
import { HISTORY_ITEMS, HistoryItem, IMAGES } from '../data/mockData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface TopbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTab: (tab: string) => void;
  onSelectResult?: (item: HistoryItem) => void;
  onLogout?: () => void;
}

/**
 * Highlights matching search query substrings within text strings
 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-[#D8CFBC] text-[#11120D] font-bold rounded-xs px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export const Topbar: React.FC<TopbarProps> = ({
  searchQuery,
  onSearchChange,
  onSelectTab,
  onSelectResult,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global shortcut for Search (Ctrl+K / Cmd+K) and Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setShowNotifications(false);
        setShowUserMenu(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter history items matching the search query
  const matchingResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return HISTORY_ITEMS.filter((item) => {
      const nameMatch = item.fileName.toLowerCase().includes(q);
      const typeMatch = item.type.toLowerCase().includes(q);
      const verdictMatch = item.verdict.toLowerCase().includes(q);
      const dateMatch = item.date.toLowerCase().includes(q);
      return nameMatch || typeMatch || verdictMatch || dateMatch;
    });
  }, [searchQuery]);

  const handleSelectHistoryItem = (item: HistoryItem) => {
    triggerHaptic('selection');
    if (onSelectResult) {
      onSelectResult(item);
    } else {
      onSelectTab('home');
    }
    setIsSearchFocused(false);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-[#565449]" />;
      case 'audio':
        return <Mic className="w-4 h-4 text-[#565449]" />;
      default:
        return <ImageIcon className="w-4 h-4 text-[#565449]" />;
    }
  };

  return (
    <header className="glass-panel h-16 px-4 sm:px-6 border-b border-[#565449]/[0.18] flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left side: Mobile Brand logo (visible on mobile/tablet when sidebar is hidden) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            triggerHaptic('tap');
            onSelectTab('home');
          }}
          className="flex lg:hidden items-center cursor-pointer"
          aria-label="TruthLens Forensics Home"
        >
          <TruthLensLogo size="sm" />
        </button>
      </div>

      {/* Center Search Bar with Dropdown & Term Highlighting */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-6" ref={searchContainerRef}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565449] group-focus-within:text-[#11120D] transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsSearchFocused(true);
            }}
            placeholder="Search analyses, media or paste URL..."
            className="w-full pl-10 pr-20 py-2 glass-bone text-xs sm:text-sm text-[#11120D] placeholder-[#565449]/70 rounded-xl border border-[#565449]/15 focus:border-[#11120D] focus:ring-1 focus:ring-[#11120D]/20 outline-none transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
            {searchQuery.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  onSearchChange('');
                  searchInputRef.current?.focus();
                }}
                className="p-1 text-[#565449] hover:text-[#11120D] rounded-md transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-[#565449] bg-[#FFFBF4]/80 border border-[#565449]/20 shadow-2xs">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Search Results Dropdown with Highlighted Terms */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="glass-panel absolute left-0 right-0 mt-2 rounded-2xl shadow-2xl p-2.5 z-50 text-xs animate-in fade-in zoom-in-95 border border-[#565449]/[0.18]">
            <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#565449] border-b border-[#565449]/10 mb-1.5">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#565449]" />
                SEARCH RESULTS ({matchingResults.length})
              </span>
              <span className="text-[10px] font-mono text-[#565449]/80">
                matching &quot;{searchQuery}&quot;
              </span>
            </div>

            {matchingResults.length > 0 ? (
              <div className="space-y-1 max-h-72 overflow-y-auto">
                {matchingResults.map((item) => {
                  const isManipulated = item.verdict === 'Likely Manipulated';
                  const isAuthentic = item.verdict === 'Likely Authentic';

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectHistoryItem(item)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#D8CFBC]/30 active:scale-[0.99] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#D8CFBC]/40 flex items-center justify-center shrink-0">
                          {getMediaIcon(item.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-xs font-semibold text-[#11120D] truncate">
                            {highlightMatch(item.fileName, searchQuery)}
                          </div>
                          <div className="text-[11px] text-[#565449] flex items-center gap-2 mt-0.5">
                            <span className="capitalize">{highlightMatch(item.type, searchQuery)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {highlightMatch(item.date, searchQuery)}
                            </span>
                            {item.duration && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-[10px]">{item.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            isManipulated
                              ? 'bg-[#8B322C]/10 text-[#8B322C] border-[#8B322C]/20'
                              : isAuthentic
                              ? 'bg-[#2D5A3C]/10 text-[#2D5A3C] border-[#2D5A3C]/20'
                              : 'bg-[#565449]/10 text-[#565449] border-[#565449]/20'
                          }`}
                        >
                          {highlightMatch(item.verdict, searchQuery)}
                        </span>
                        <span className="font-mono font-bold text-xs text-[#11120D]">
                          {item.confidence}%
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#565449] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-[#565449] space-y-1">
                <p className="text-xs font-medium">No previous forensic analyses matching &quot;{searchQuery}&quot;</p>
                <p className="text-[11px] text-[#565449]/70">
                  Try searching for keywords like <span className="font-mono text-[#11120D]">video</span>, <span className="font-mono text-[#11120D]">image</span>, <span className="font-mono text-[#11120D]">manipulated</span>, or <span className="font-mono text-[#11120D]">.mp4</span>
                </p>
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-[#565449]/10 px-2 flex items-center justify-between text-[10px] text-[#565449]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#565449]" />
                TruthLens Deep Search
              </span>
              <span className="font-mono">Press ESC to dismiss</span>
            </div>
          </div>
        )}
      </div>

      {/* Right User & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              triggerHaptic('tap');
              setShowNotifications(!showNotifications);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#565449] hover:text-[#11120D] hover:bg-[#D8CFBC]/25 relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5 stroke-[1.8]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#A8433A] ring-2 ring-[#FFFBF4]" />
          </button>

          {showNotifications && (
            <div className="glass-panel absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-2xl p-3.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#565449]/10 font-semibold text-[#11120D]">
                <span>Notifications</span>
                <span className="text-[10px] text-[#565449] hover:text-[#11120D] cursor-pointer">Mark all read</span>
              </div>
              <div className="glass-bone p-2.5 rounded-xl mb-1.5">
                <div className="font-semibold text-[#11120D]">Analysis Completed</div>
                <div className="text-[#565449] text-[11px] mt-0.5">image_0810.jpg verified with 87% authentic confidence.</div>
                <div className="text-[10px] text-[#565449]/70 mt-1 font-mono">1 minute ago</div>
              </div>
              <div className="p-2.5 hover:bg-[#D8CFBC]/20 rounded-xl transition-colors">
                <div className="font-semibold text-[#11120D]">AI Assistant Query</div>
                <div className="text-[#565449] text-[11px] mt-0.5">Forensic reasoning report prepared for video_2025_0812.mp4.</div>
                <div className="text-[10px] text-[#565449]/70 mt-1 font-mono">15 minutes ago</div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              triggerHaptic('tap');
              setShowUserMenu(!showUserMenu);
            }}
            className="flex items-center gap-2 pl-1 pr-1.5 sm:pr-2 py-1 rounded-xl hover:bg-[#D8CFBC]/25 transition-colors cursor-pointer"
          >
            <img
              src={IMAGES.avatarAditya}
              alt="Aditya"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#565449]/20"
            />
            <span className="text-xs sm:text-sm font-semibold text-[#11120D] hidden sm:inline">
              Aditya
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#565449]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-[#FFFBF4] border border-[#565449]/20 rounded-2xl shadow-xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-[#565449]/10 mb-1">
                <div className="font-serif font-bold text-[#11120D] text-sm">Aditya Verma</div>
                <div className="text-[11px] text-[#565449]">aditya@example.com</div>
              </div>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  onSelectTab('profile');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#11120D] hover:bg-[#D8CFBC]/30 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>My Profile</span>
                <User className="w-3.5 h-3.5 text-[#565449]" />
              </button>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  onSelectTab('history');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#11120D] hover:bg-[#D8CFBC]/30 transition-colors cursor-pointer"
              >
                Analysis History
              </button>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  onSelectTab('reports');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#11120D] hover:bg-[#D8CFBC]/30 transition-colors cursor-pointer"
              >
                Saved Passports
              </button>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  onSelectTab('settings');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#11120D] hover:bg-[#D8CFBC]/30 transition-colors cursor-pointer"
              >
                Settings &amp; Calibration
              </button>
              <div className="my-1 border-t border-[#565449]/10" />
              <button
                onClick={() => {
                  triggerHaptic('warning');
                  setShowUserMenu(false);
                  if (onLogout) onLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-[#A8433A] hover:bg-[#A8433A]/10 transition-colors font-medium cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
