export type MarkerType = 'flag' | 'reaction' | 'photo' | 'video' | 'note';
export type ReactionType =
  | 'love'
  | 'agree'
  | 'disagree'
  | 'question'
  | 'important'
  | 'funny';
export type TemplateType = 'sermon' | 'lecture' | 'conference' | 'general';
export type RecordingStatus =
  | 'recording'
  | 'stopped'
  | 'uploading'
  | 'processing'
  | 'completed'
  | 'failed';

export interface Marker {
  id: string;
  recordingId: string;
  timestamp: number;
  type: MarkerType;
  reaction?: ReactionType;
  photoUri?: string;
  videoUri?: string;
  noteText?: string;
  ocrText?: string;
  aiDescription?: string;
  createdAt: string;
}

export interface PhotoCapture {
  id: string;
  recordingId: string;
  timestamp: number;
  localUri: string;
  remoteUrl?: string;
  ocrText?: string;
  aiDescription?: string;
}

export interface VideoCapture {
  id: string;
  recordingId: string;
  timestamp: number;
  duration: number;
  localUri: string;
  remoteUrl?: string;
  thumbnailUri?: string;
}

export interface Recording {
  id: string;
  userId: string;
  title?: string;
  speakerName?: string;
  template: TemplateType;
  status: RecordingStatus;
  audioLocalUri?: string;
  audioRemoteUrl?: string;
  duration: number;
  markers: Marker[];
  photos: PhotoCapture[];
  videos: VideoCapture[];
  transcript?: TranscriptSegment[];
  generatedContent?: GeneratedContent;
  sessionId?: string;
  location?: { lat: number; lng: number; name?: string };
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

export interface GeneratedContent {
  summary?: string;
  keyTakeaways?: string[];
  keyQuotes?: Array<{ text: string; timestamp: number }>;
  scriptureReferences?: string[];
  studyGuide?: {
    reflectionPrompts: string[];
    discussionQuestions: string[];
  };
  socialContent?: {
    quoteCards: Array<{ text: string; imageUri?: string }>;
    videoClips: Array<{
      title: string;
      startTime: number;
      endTime: number;
      uri?: string;
    }>;
    stories: Array<{ slides: string[] }>;
  };
}
