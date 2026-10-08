import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  Mic 
} from 'lucide-react';
import { HISTORY_ITEMS, HistoryItem, IMAGES } from '../data/mockData.ts';

interface HistoryListProps {
  onSelectItem?: (item: HistoryItem) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ onSelectItem }) => {
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [query, setQuery] = useState('');

  const filteredItems = HISTORY_ITEMS.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery = item.fileName.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-4 font-sans">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#565449] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your analyses..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm glass-bone rounded-xl text-[#11120D] placeholder-[#565449]/70 focus:outline-none focus:ring-1 focus:ring-[#11120D]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 glass-bone rounded-xl overflow-x-auto">
          {[
            { id: 'all' as const, label: 'All' },
            { id: 'image' as const, label: 'Images' },
            { id: 'video' as const, label: 'Videos' },
            { id: 'audio' as const, label: 'Audio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#11120D] text-[#FFFBF4] shadow-xs'
                  : 'text-[#565449] hover:text-[#11120D] hover:bg-[#D8CFBC]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          const isManipulated = item.verdict === 'Likely Manipulated';
          const isAuthentic = item.verdict === 'Likely Authentic';

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem && onSelectItem(item)}
              className="glass-card glass-card-interactive rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer group"
            >
              {/* Left Item Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Media Thumbnail */}
                <div className="w-12 h-12 rounded-xl bg-[#11120D] overflow-hidden shrink-0 relative flex items-center justify-center border border-[#565449]/20">
                  {item.type === 'video' ? (
                    <img
                      src={IMAGES.suspectMan}
                      alt={item.fileName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : item.type === 'image' ? (
                    <img
                      src={IMAGES.onboardingWoman}
                      alt={item.fileName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#11120D] flex items-center justify-center text-[#D8CFBC]">
                      <Mic className="w-5 h-5" />
                    </div>
                  )}
                  {item.duration && (
                    <span className="absolute bottom-0.5 right-0.5 bg-[#11120D]/80 text-[9px] font-mono text-[#FFFBF4] px-1 rounded-xs">
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* File info */}
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-[#11120D] group-hover:underline truncate">
                    {item.fileName}
                  </div>
                  <div className="text-[11px] text-[#565449] mt-0.5 flex items-center gap-2">
                    <span>{item.date}</span>
                    {item.duration && (
                      <>
                        <span>·</span>
                        <span>{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Verdict Badge */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                      isManipulated
                        ? 'bg-[#A8433A]/10 text-[#A8433A] border-[#A8433A]/20'
                        : isAuthentic
                          ? 'bg-[#3E5C46]/10 text-[#3E5C46] border-[#3E5C46]/20'
                          : 'bg-[#8F6E38]/10 text-[#8F6E38] border-[#8F6E38]/20'
                    }`}
                  >
                    {item.verdict}
                  </span>
                  <div className="font-mono text-[11px] text-[#565449] mt-0.5 font-bold">
                    {item.confidence}%
                  </div>
                </div>

                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#565449] group-hover:text-[#11120D] transition-colors">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="p-8 text-center bg-[#FFFBF4] rounded-2xl border border-[#565449]/15 text-[#565449] text-xs">
            No analyses found matching your query.
          </div>
        )}
      </div>
    </div>
  );
};
