export interface AnalysisResultData {
  id: string;
  passportId: string;
  fileName: string;
  fileSize: string;
  format: string;
  duration: string;
  resolution: string;
  frameRate: string;
  date: string;
  fileHash: string;
  verdict: 'Likely Manipulated' | 'Likely Authentic' | 'Inconclusive';
  confidence: number;
  explanation: string;
  tags: string[];
  publicVerifyUrl: string;
  
  detectedIssues: {
    label: string;
    percentage: number;
    icon: string;
    color: string;
  }[];

  keyframes: {
    timestamp: string;
    seconds: number;
    isSuspicious?: boolean;
    label?: string;
  }[];

  audioFindings: {
    title: string;
    score: number;
    level: 'critical' | 'high' | 'medium' | 'low';
  }[];

  similarMedia: {
    id: string;
    relation: string;
    domain: string;
    timeAgo: string;
    matchPercent: number;
    url: string;
  }[];

  metadataAnalysis: {
    label: string;
    status: 'Not found' | 'Missing' | 'Detected (Possible)' | 'Inconsistent' | 'Verified';
    type: 'critical' | 'warning' | 'success';
  }[];

  modelScores: {
    model: string;
    score: number;
    weight: string;
    verdict: string;
  }[];
}

export const CURRENT_ANALYSIS: AnalysisResultData = {
  id: "video_2025_0812",
  passportId: "#TL-2025-0812-0047",
  fileName: "video_2025_0812.mp4",
  fileSize: "48.2 MB",
  format: "MP4 (H.264, AAC)",
  duration: "01:28",
  resolution: "1920 x 1080",
  frameRate: "30 FPS",
  date: "12 Aug 2025, 10:24 AM",
  fileHash: "3f2a...9e7c",
  verdict: "Likely Manipulated",
  confidence: 92,
  explanation: "This video shows strong signs of AI manipulation, including unnatural facial movements, temporal inconsistencies and synthetic voice patterns.",
  tags: ["Deepfake Detected", "Audio Manipulation", "Temporal Inconsistency"],
  publicVerifyUrl: "https://truthlens.app/verify/3f2a...9e7c",
  
  detectedIssues: [
    { label: "Face manipulation", percentage: 91, icon: "triangle-alert", color: "rose" },
    { label: "Blink rate anomaly", percentage: 84, icon: "circle-dot", color: "rose" },
    { label: "Temporal inconsistency", percentage: 78, icon: "target", color: "amber" },
    { label: "Lip-sync mismatch", percentage: 72, icon: "mic", color: "amber" },
  ],

  keyframes: [
    { timestamp: "00:08", seconds: 8, isSuspicious: false, label: "Baseline Face" },
    { timestamp: "00:12", seconds: 12, isSuspicious: true, label: "Suspicious Frame" },
    { timestamp: "00:14", seconds: 14, isSuspicious: false, label: "Recovery Frame" },
    { timestamp: "00:18", seconds: 18, isSuspicious: false, label: "Natural Blink" },
  ],

  audioFindings: [
    { title: "Synthetic voice patterns detected", score: 87, level: "critical" },
    { title: "Unnatural frequency artifacts", score: 82, level: "critical" },
    { title: "Missing natural breath patterns", score: 76, level: "high" },
    { title: "Room noise inconsistencies", score: 68, level: "medium" },
  ],

  similarMedia: [
    {
      id: "sm-1",
      relation: "Possible previous version",
      domain: "youtube.com",
      timeAgo: "3 months ago",
      matchPercent: 82,
      url: "https://youtube.com/watch?v=sample1",
    },
    {
      id: "sm-2",
      relation: "Related frame",
      domain: "twitter.com",
      timeAgo: "5 months ago",
      matchPercent: 76,
      url: "https://twitter.com/news/status/123",
    },
    {
      id: "sm-3",
      relation: "Visually similar",
      domain: "newsportal.com",
      timeAgo: "8 months ago",
      matchPercent: 68,
      url: "https://newsportal.com/story/archive",
    },
  ],

  metadataAnalysis: [
    { label: "EXIF data", status: "Not found", type: "critical" },
    { label: "Camera info", status: "Missing", type: "critical" },
    { label: "Editing software", status: "Detected (Possible)", type: "warning" },
    { label: "Creation time", status: "Inconsistent", type: "warning" },
  ],

  modelScores: [
    { model: "Spatial Face Forensics (ViT-Base)", score: 91.4, weight: "35%", verdict: "Manipulated" },
    { model: "AASIST Audio Anti-Spoofing", score: 87.2, weight: "25%", verdict: "Synthetic" },
    { model: "Temporal Consistency Tracker", score: 78.5, weight: "20%", verdict: "Inconsistent" },
    { model: "FFT Frequency Artifact Analyzer", score: 82.0, weight: "10%", verdict: "Artifacts" },
    { model: "WhatsApp Recompression Calibrator", score: -7.5, weight: "10%", verdict: "Robustness Applied" },
  ],
};

export interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  duration?: string;
  type: 'video' | 'image' | 'audio';
  verdict: 'Likely Manipulated' | 'Likely Authentic' | 'Inconclusive';
  confidence: number;
}

export const HISTORY_ITEMS: HistoryItem[] = [
  {
    id: "h1",
    fileName: "video_2025_0812.mp4",
    date: "12 Aug 2025",
    duration: "01:28",
    type: "video",
    verdict: "Likely Manipulated",
    confidence: 92,
  },
  {
    id: "h2",
    fileName: "image_0810.jpg",
    date: "10 Aug 2025",
    type: "image",
    verdict: "Likely Authentic",
    confidence: 87,
  },
  {
    id: "h3",
    fileName: "audio_message.m4a",
    date: "8 Aug 2025",
    duration: "00:36",
    type: "audio",
    verdict: "Inconclusive",
    confidence: 64,
  },
  {
    id: "h4",
    fileName: "news_clip.jpg",
    date: "5 Aug 2025",
    type: "image",
    verdict: "Likely Manipulated",
    confidence: 91,
  },
  {
    id: "h5",
    fileName: "interview.mp4",
    date: "2 Aug 2025",
    duration: "03:12",
    type: "video",
    verdict: "Likely Authentic",
    confidence: 78,
  },
];

export const IMAGES = {
  suspectMan: "/src/assets/images/suspect_man_portrait_1791307628498.jpg",
  onboardingWoman: "/src/assets/images/onboarding_woman_portrait_1791307641742.jpg",
  newsBroadcast: "/src/assets/images/news_broadcast_frame_1791307655000.jpg",
  avatarAditya: "/src/assets/images/user_avatar_aditya_1791307667186.jpg",
  systemArchitecture: "/src/assets/images/system_architecture_1791437052239.jpg",
};
