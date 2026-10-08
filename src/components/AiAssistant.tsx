import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User as UserIcon, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { AiIcon } from './AiIcon.tsx';
import { triggerHaptic } from '../utils/haptics.ts';
import { CURRENT_ANALYSIS, IMAGES } from '../data/mockData.ts';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  evidenceBadge?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: `Hello Aditya. I am TruthLens AI, your media authenticity copilot. I have inspected ${CURRENT_ANALYSIS.fileName} (#TL-2025-0812-0047). The verdict is Likely Manipulated with 92% calibrated confidence. How can I assist your investigation?`,
    timestamp: '10:20 AM',
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Why was this video flagged as manipulated?',
    timestamp: '10:21 AM',
  },
  {
    id: 'm3',
    sender: 'assistant',
    text: 'This video was classified as Likely Manipulated with 92% confidence based on multi-signal evidence:\n\n1. Facial Boundary Artifacts (91.4% anomaly): Vision Transformer models identified synthetic blending along the jawline.\n2. Temporal Inconsistency (78.5% jitter): Abnormal blink frequency and optical boundary flicker.\n3. Synthetic Voice Pattern (87.2% spoof): Spectral energy cutoffs typical of neural voice cloning.',
    timestamp: '10:21 AM',
    evidenceBadge: '92% Confidence · Multi-Signal Fusion',
  },
  {
    id: 'm4',
    sender: 'user',
    text: 'Where exactly was the problem in the timeline?',
    timestamp: '10:22 AM',
  },
  {
    id: 'm5',
    sender: 'assistant',
    text: 'The primary spatial anomaly peaks between 00:10 and 00:16 (centered at frame 00:12). Acoustic spoofing is concentrated in segment 00:31 – 00:45 where natural room reverberation drops below the noise floor.',
    timestamp: '10:22 AM',
    evidenceBadge: 'Peak Anomaly: Frame 00:12',
  },
];

const SUGGESTED_PROMPTS = [
  "Why was this flagged?",
  "Show suspicious timestamps",
  "Explain the confidence score",
  "What does Inconclusive mean?",
  "Summarize this report",
];

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    triggerHaptic('tap');
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic contextual mock response generation
    setTimeout(() => {
      triggerHaptic('success');
      let botResponse = '';
      let badge: string | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('why') || lower.includes('flagged')) {
        botResponse = `The media exhibits strong spatial and spectral artifacts characteristic of generative AI manipulation. Facial boundary blending failed Error Level Analysis (ELA), and the vocal track lacks ambient room impulse response.`;
        badge = 'Forensic Verdict: Likely Manipulated';
      } else if (lower.includes('timestamp') || lower.includes('time') || lower.includes('where')) {
        botResponse = `Significant visual tampering was pinpointed between 00:10 and 00:16 (peak at frame 00:12). Additionally, audio frequency anomaly was logged at 00:31–00:45.`;
        badge = 'Suspicious Timestamps Identified';
      } else if (lower.includes('confidence') || lower.includes('score')) {
        botResponse = `Our 92% confidence score is calibrated using temperature scaling and WhatsApp-style recompression penalty (-7.5%). The raw Vision Transformer scored 91.4%, while audio anti-spoofing scored 87.2%.`;
        badge = 'Quality-Aware Calibration Active';
      } else if (lower.includes('inconclusive')) {
        botResponse = `"Inconclusive" is returned when media resolution is below threshold (<360p), heavy compression destroys high-frequency details, or signals disagree. Rather than forcing a high-error guess, TruthLens admits uncertainty for journalistic safety.`;
        badge = 'Uncertainty Handling Policy';
      } else if (lower.includes('summarize') || lower.includes('report')) {
        botResponse = `Forensic Summary for ${CURRENT_ANALYSIS.fileName}:\n• Status: Likely Manipulated (92%)\n• File Hash: SHA-256 ${CURRENT_ANALYSIS.fileHash}\n• C2PA Credentials: Not found (unverified origin)\n• Key evidence: Facial landmark jitter (00:12), synthetic speech frequencies (87.2%), and absence of camera EXIF headers.`;
        badge = 'Full Passport Summary Prepared';
      } else {
        botResponse = `I analyzed your inquiry against the current forensic artifact set (${CURRENT_ANALYSIS.fileName}). Optical flow analysis, spectrogram spikes, and perceptual hash (pHash 0x9e81b2c4f03a) confirm generative intervention. Would you like me to extract keyframes or compare similar media?`;
        badge = 'Copilot Analysis';
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidenceBadge: badge,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopy = (id: string, text: string) => {
    triggerHaptic('tap');
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#565449]/15 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shadow-xs">
            <AiIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#11120D] tracking-tight">
              TruthLens AI
            </h1>
            <p className="text-xs sm:text-sm text-[#565449]">
              Your media authenticity assistant · Contextual forensic explanation
            </p>
          </div>
        </div>

        {/* Current Active Media Context Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#D8CFBC]/25 border border-[#565449]/15 text-xs text-[#565449]">
          <FileText className="w-3.5 h-3.5 text-[#11120D]" />
          <span className="font-mono text-[#11120D] font-semibold">{CURRENT_ANALYSIS.fileName}</span>
          <span>·</span>
          <span className="font-semibold text-[#A8433A]">92%</span>
        </div>
      </div>

      {/* Message Feed Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 py-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in duration-200`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-semibold ${
                  isUser
                    ? 'bg-[#D8CFBC]/40 text-[#11120D] ring-1 ring-[#565449]/20'
                    : 'bg-[#11120D] text-[#FFFBF4] shadow-xs'
                }`}
              >
                {isUser ? <UserIcon className="w-4 h-4" /> : <AiIcon className="w-4 h-4 text-[#FFFBF4]" />}
              </div>

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                {msg.evidenceBadge && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#D8CFBC]/30 text-[#11120D] text-[10px] font-mono font-medium border border-[#565449]/15">
                    <AlertTriangle className="w-3 h-3 text-[#A8433A]" />
                    {msg.evidenceBadge}
                  </span>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#11120D] text-[#FFFBF4] rounded-tr-xs shadow-xs'
                      : 'glass-card text-[#11120D] rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Footer timestamp & copy */}
                <div className={`flex items-center gap-2 px-1 text-[10px] text-[#565449] ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-[#11120D] transition-colors cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-[#3E5C46]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shrink-0">
              <AiIcon className="w-4 h-4 text-[#FFFBF4]" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#D8CFBC]/20 border border-[#565449]/15 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#565449] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#565449] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#565449] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pill Carousel */}
      <div className="py-2 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-xl glass-bone text-[#11120D] text-xs font-medium whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="pt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask TruthLens AI about manipulation signals, timestamps, or confidence..."
            className="w-full pl-4 pr-12 py-3.5 glass-bone rounded-2xl text-xs sm:text-sm text-[#11120D] placeholder-[#565449]/70 focus:outline-none focus:ring-1 focus:ring-[#11120D] shadow-xs"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 w-9 h-9 rounded-xl bg-[#11120D] disabled:opacity-40 hover:bg-[#11120D]/90 text-[#FFFBF4] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center text-[10px] text-[#565449]/80 mt-1.5">
          TruthLens AI answers are grounded in model logs, ELA frequency maps, and C2PA provenance signatures.
        </div>
      </div>
    </div>
  );
};
