# CLAUDE.md - LiveCapture Mobile App

## Project Overview

LiveCapture is a mobile-first app that lets users record audio in real-time (church sermons, lectures, conferences, meetings) while adding timestamped markers, reactions, and photos/videos. After recording, audio is processed through an AI engine to generate structured outputs like summaries, study guides, and social media content.

This is a React Native app built with Expo (managed workflow with dev client for native modules).

## Tech Stack

- **Framework**: React Native with Expo SDK (latest stable)
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Local Database**: expo-sqlite or WatermelonDB (for offline-first recordings storage)
- **Audio Recording**: @siteed/expo-audio-studio (background recording, waveform data, cross-platform)
- **Audio Playback**: react-native-track-player (lock screen controls, notification controls, background playback)
- **Camera**: expo-camera
- **Video**: expo-av (video recording)
- **File System**: expo-file-system
- **Notifications**: @notifee/react-native (foreground service on Android, notification actions)
- **Permissions**: expo-permissions, react-native-permissions
- **Authentication**: Supabase Auth (email + Google + Apple sign-in)
- **Backend/API**: Supabase (database, storage, edge functions)
- **Payments**: RevenueCat (in-app purchases, subscriptions, cross-platform)
- **OTA Updates**: expo-updates (EAS Update)
- **Animations**: react-native-reanimated
- **Icons**: lucide-react-native

## Design Reference Files

The `/design-reference/` folder contains HTML files exported from Google Stitch (AI design tool). These are the source of truth for the app's visual design.

### How to Read and Interpret the HTML Design Files

1. **Open each HTML file** and analyze the DOM structure, CSS styles, colors, fonts, spacing, and layout
2. **Extract the design system** from the HTML files:
   - Background colors, card colors, text colors, accent colors
   - Border radius values, spacing/padding values
   - Font sizes, font weights, line heights
   - Component patterns (cards, buttons, badges, inputs, toggles)
3. **Map HTML elements to React Native components**:
   - `<div>` with flex layout → `<View>` with flexbox
   - `<p>`, `<span>`, `<h1>`-`<h6>` → `<Text>` with appropriate styles
   - `<img>` → `<Image>` or `<ExpoImage>`
   - `<input>` → `<TextInput>`
   - `<button>` → `<TouchableOpacity>` or `<Pressable>`
   - CSS grid/flex → React Native flexbox (note: RN only supports flexbox)
   - CSS `gap` → supported in React Native
   - CSS `border-radius` → `borderRadius`
   - CSS `box-shadow` → React Native `shadow*` props (iOS) + `elevation` (Android)
   - CSS gradients → `expo-linear-gradient`
4. **Convert CSS values to React Native**:
   - `px` values → use numbers directly (React Native uses density-independent pixels)
   - `rem`/`em` → convert to numeric values (1rem ≈ 16)
   - `%` → use flex ratios or Dimensions API
   - Colors: keep hex values as-is
5. **Screenshots matter more than code**: The visual output of the HTML is more important than the HTML structure itself. Prioritize matching the visual design over replicating the DOM hierarchy.

### Design System (extracted from Stitch designs)

```typescript
// theme/colors.ts
export const colors = {
  // Backgrounds
  background: '#0B1120',
  card: '#111B2E',
  surface: '#182336',
  cardBorder: '#1E2D45',

  // Primary
  primary: '#3B82F6', // Electric blue
  primaryLight: '#60A5FA',

  // Status colors
  recording: '#EF4444', // Red
  success: '#22C55E', // Green
  processing: '#F59E0B', // Amber
  uploading: '#F97316', // Orange

  // Reactions
  love: '#EF4444',
  agree: '#3B82F6',
  disagree: '#F97316',
  question: '#8B5CF6',
  important: '#F59E0B',
  funny: '#22C55E',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#7B8BA3',

  // Misc
  divider: '#1E2D45',
  inputBackground: '#111B2E',
} as const;

// theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// theme/typography.ts
export const typography = {
  heading: { fontSize: 24, fontWeight: '700' as const, color: '#FFFFFF' },
  subheading: { fontSize: 18, fontWeight: '600' as const, color: '#FFFFFF' },
  body: { fontSize: 16, fontWeight: '400' as const, color: '#FFFFFF' },
  bodySecondary: { fontSize: 14, fontWeight: '400' as const, color: '#7B8BA3' },
  caption: { fontSize: 12, fontWeight: '400' as const, color: '#7B8BA3' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#7B8BA3',
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  mono: {
    fontSize: 32,
    fontWeight: '300' as const,
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
} as const;

// theme/borderRadius.ts
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
```

### Screen-to-File Mapping

The HTML files in `/design-reference/` map to screens as follows. Use this mapping when building each screen:

| HTML File                         | Route                     | Screen                       |
| --------------------------------- | ------------------------- | ---------------------------- |
| screen-01-recording.html          | record                    | Active Recording             |
| screen-02-photo-capture.html      | modal/photo-capture       | Photo Capture Overlay        |
| screen-03-video-capture.html      | modal/video-capture       | Video Capture Overlay        |
| screen-04-recording-complete.html | record/[id]/complete      | Recording Complete           |
| screen-05-processing.html         | record/[id]/processing    | Processing Status            |
| screen-06-sermon-insights.html    | record/[id]/insights      | Results / Insights           |
| screen-07-content-studio.html     | record/[id]/content       | Social Media Content         |
| screen-08-library.html            | (tabs)/library            | Library                      |
| screen-09-playback-timeline.html  | record/[id]/playback      | Playback Timeline            |
| screen-10-welcome.html            | onboarding/welcome        | Welcome                      |
| screen-11-use-case.html           | onboarding/use-case       | Use Case Selection           |
| screen-12-content-prefs.html      | onboarding/content-prefs  | Content Preferences          |
| screen-13-sign-in.html            | auth/sign-in              | Sign In                      |
| screen-14-sign-up.html            | auth/sign-up              | Sign Up                      |
| screen-15-forgot-password.html    | auth/forgot-password      | Forgot Password              |
| screen-16-email-verify.html       | auth/verify               | Email Verification           |
| screen-17-mic-permission.html     | permissions/microphone    | Microphone Permission        |
| screen-18-camera-permission.html  | permissions/camera        | Camera Permission            |
| screen-19-notif-permission.html   | permissions/notifications | Notification Permission      |
| screen-20-profile.html            | (tabs)/profile            | User Profile                 |
| screen-21-edit-profile.html       | profile/edit              | Edit Profile                 |
| screen-22-settings.html           | profile/settings          | Settings                     |
| screen-23-plans.html              | profile/plans             | Subscription Plans           |
| screen-24-credits.html            | profile/credits           | Buy Credits                  |
| screen-25-checkout.html           | profile/checkout          | Payment Checkout             |
| screen-26-empty-library.html      | -                         | Empty Library State          |
| screen-27-offline.html            | -                         | Offline Banner               |
| screen-28-error.html              | record/[id]/error         | Processing Error             |
| screen-29-notifications.html      | notifications             | Notification Center          |
| screen-30-share.html              | modal/share               | Share/Export Sheet           |
| screen-31-create-session.html     | sessions/create           | Create Collaborative Session |
| screen-32-active-session.html     | sessions/[id]             | Active Collaborative Session |
| screen-33-search.html             | search                    | Search Results               |
| screen-34-insights.html           | (tabs)/insights           | Analytics / Insights Tab     |
| screen-35-drafts.html             | (tabs)/drafts             | Drafts Tab                   |
| screen-36-quick-note.html         | modal/quick-note          | Quick Note Input             |
| screen-37-onboarding-complete.html| onboarding/complete       | Onboarding Complete          |
| screen-38-export-progress.html    | modal/export-progress     | Export Progress               |
| screen-39-billing.html            | profile/billing           | Billing History              |
| screen-40-quote-card.html         | record/[id]/quote-card    | Quote Card Customizer        |
| screen-41-video-editor.html       | record/[id]/video-editor  | Video Snippet Editor         |
| screen-09a-transcript.html        | record/[id]/playback      | Transcript (variant 1)       |
| screen-09b-transcript.html        | record/[id]/playback      | Transcript (variant 2)       |

## Project Structure

```
livecapture/
├── CLAUDE.md                          # This file
├── app.json                           # Expo config
├── tsconfig.json
├── tailwind.config.js                 # NativeWind config
├── package.json
├── eas.json                           # EAS Build config
│
├── design-reference/                  # HTML files from Stitch (read-only reference)
│   ├── screen-01-recording.html
│   ├── screen-02-photo-capture.html
│   ├── ...
│   └── screen-36-quick-note.html
│
├── app/                               # Expo Router file-based routing
│   ├── _layout.tsx                    # Root layout (providers, auth gate)
│   ├── index.tsx                      # Entry redirect (to onboarding or tabs)
│   │
│   ├── (tabs)/                        # Main tab navigator
│   │   ├── _layout.tsx                # Tab bar config (Library, Insights, Drafts, Profile)
│   │   ├── library.tsx                # Screen 8: Library / My Recordings
│   │   ├── insights.tsx               # Screen 34: Analytics / Insights
│   │   ├── drafts.tsx                 # Screen 35: Drafts
│   │   └── profile.tsx                # Screen 20: User Profile
│   │
│   ├── record/                        # Recording flow
│   │   ├── index.tsx                  # Screen 1: Active Recording
│   │   └── [id]/
│   │       ├── complete.tsx           # Screen 4: Recording Complete
│   │       ├── processing.tsx         # Screen 5: Processing Status
│   │       ├── insights.tsx           # Screen 6: Sermon Insights
│   │       ├── content.tsx            # Screen 7: Content Studio
│   │       ├── playback.tsx           # Screen 9: Playback Timeline
│   │       └── error.tsx              # Screen 28: Processing Error
│   │
│   ├── auth/                          # Authentication
│   │   ├── sign-in.tsx                # Screen 13
│   │   ├── sign-up.tsx                # Screen 14
│   │   ├── forgot-password.tsx        # Screen 15
│   │   └── verify.tsx                 # Screen 16
│   │
│   ├── onboarding/                    # First-time user flow
│   │   ├── welcome.tsx                # Screen 10
│   │   ├── use-case.tsx               # Screen 11
│   │   └── content-prefs.tsx          # Screen 12
│   │
│   ├── permissions/                   # Permission request screens
│   │   ├── microphone.tsx             # Screen 17
│   │   ├── camera.tsx                 # Screen 18
│   │   └── notifications.tsx          # Screen 19
│   │
│   ├── profile/                       # Profile sub-screens
│   │   ├── edit.tsx                   # Screen 21
│   │   ├── settings.tsx               # Screen 22
│   │   ├── plans.tsx                  # Screen 23
│   │   ├── credits.tsx                # Screen 24
│   │   └── checkout.tsx               # Screen 25
│   │
│   ├── sessions/                      # Collaborative Sessions (future)
│   │   ├── create.tsx                 # Screen 31
│   │   └── [id].tsx                   # Screen 32
│   │
│   ├── search.tsx                     # Screen 33
│   ├── notifications.tsx              # Screen 29
│   │
│   └── modal/                         # Modal screens (presented over current screen)
│       ├── photo-capture.tsx          # Screen 2
│       ├── video-capture.tsx          # Screen 3
│       ├── quick-note.tsx             # Screen 36
│       └── share.tsx                  # Screen 30
│
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                        # Base design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── SectionLabel.tsx       # Uppercase small label (e.g., "REACTIONS", "TIMELINE")
│   │   │   ├── PillChip.tsx           # Filter chips, status pills
│   │   │   ├── Avatar.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── BottomSheet.tsx
│   │   │
│   │   ├── recording/                 # Recording-specific components
│   │   │   ├── RecordButton.tsx       # Large circular record/stop button with glow
│   │   │   ├── WaveformVisualizer.tsx # Audio waveform bars
│   │   │   ├── RecordingTimer.tsx     # Large mono timer display "00:15:32"
│   │   │   ├── LiveIndicator.tsx      # Red dot + "LIVE" pulsing label
│   │   │   ├── ReactionPalette.tsx    # 6 circular reaction buttons row
│   │   │   ├── MarkerTimeline.tsx     # Scrollable list of timestamped markers
│   │   │   ├── MarkerCard.tsx         # Individual marker in the timeline
│   │   │   ├── CaptureBar.tsx         # Photo/Video/Thumbnail bottom bar
│   │   │   └── QuickNoteSheet.tsx     # Bottom sheet for text note input
│   │   │
│   │   ├── library/                   # Library components
│   │   │   ├── RecordingCard.tsx      # Recording list item card
│   │   │   ├── FilterChips.tsx        # Scrollable filter pills
│   │   │   ├── SearchBar.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── player/                    # Audio playback components
│   │   │   ├── MiniPlayer.tsx         # Persistent bottom mini player bar
│   │   │   ├── FullPlayer.tsx         # Waveform + controls + scrubber
│   │   │   └── PlaybackTimeline.tsx   # Interactive timeline with markers
│   │   │
│   │   ├── results/                   # AI results components
│   │   │   ├── InsightCard.tsx
│   │   │   ├── TimelineEntry.tsx      # Quote/photo/reaction entry with timestamp
│   │   │   ├── ScriptureReference.tsx
│   │   │   ├── StudyGuideSection.tsx
│   │   │   └── KeyTakeaways.tsx
│   │   │
│   │   ├── content/                   # Content studio components
│   │   │   ├── QuoteCardPreview.tsx
│   │   │   ├── VideoClipPreview.tsx
│   │   │   ├── StoryPreview.tsx
│   │   │   └── PlatformIcons.tsx      # Instagram, YouTube, TikTok, etc.
│   │   │
│   │   ├── auth/                      # Auth components
│   │   │   ├── SocialSignInButton.tsx # Google/Apple sign-in buttons
│   │   │   ├── AuthInput.tsx          # Styled input with icon
│   │   │   └── OrDivider.tsx          # "or" line divider
│   │   │
│   │   └── common/                    # Shared components
│   │       ├── TabBar.tsx             # Custom bottom tab bar
│   │       ├── Header.tsx
│   │       ├── PermissionScreen.tsx   # Reusable permission request layout
│   │       ├── OnboardingLayout.tsx   # Shared onboarding page layout
│   │       ├── StatusBadge.tsx        # COMPLETED, PROCESSING, UPLOADING badges
│   │       └── NotificationBanner.tsx # Offline/error banners
│   │
│   ├── hooks/                         # Custom hooks
│   │   ├── useRecorder.ts            # Audio recording logic (start, stop, pause, resume)
│   │   ├── useMarkers.ts             # Marker management during recording
│   │   ├── usePermissions.ts         # Unified permission checking/requesting
│   │   ├── useAuth.ts                # Authentication state and actions
│   │   ├── usePlayer.ts              # Audio playback controls
│   │   ├── useUpload.ts              # File upload with progress
│   │   └── useRecordings.ts          # CRUD for recordings list
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── recordingStore.ts         # Current recording session state
│   │   ├── libraryStore.ts           # Recordings list, filters, search
│   │   ├── authStore.ts              # User auth state
│   │   ├── settingsStore.ts          # App settings and preferences
│   │   └── onboardingStore.ts        # Onboarding progress
│   │
│   ├── services/                      # Business logic and API calls
│   │   ├── audio/
│   │   │   ├── recorder.ts           # Audio recording service (wraps expo-audio-studio)
│   │   │   ├── foregroundService.ts  # Android foreground service for background recording
│   │   │   └── player.ts             # Audio playback service (wraps track-player)
│   │   ├── camera/
│   │   │   ├── photoCapture.ts       # Timestamped photo capture
│   │   │   └── videoCapture.ts       # Timestamped video recording
│   │   ├── markers/
│   │   │   └── markerManager.ts      # Create, store, sync markers
│   │   ├── api/
│   │   │   ├── client.ts             # Supabase client
│   │   │   ├── recordings.ts         # Recordings CRUD API
│   │   │   ├── processing.ts         # AI processing API
│   │   │   └── auth.ts               # Auth API
│   │   ├── storage/
│   │   │   ├── localStorage.ts       # SQLite/WatermelonDB for offline recordings
│   │   │   └── fileManager.ts        # Audio/photo/video file management
│   │   ├── upload/
│   │   │   └── uploadManager.ts      # Background upload queue with retry
│   │   └── notifications/
│   │       └── notificationService.ts # Push notifications + foreground service
│   │
│   ├── types/                         # TypeScript type definitions
│   │   ├── recording.ts              # Recording, Marker, PhotoCapture types
│   │   ├── template.ts               # Output template types
│   │   ├── user.ts                   # User, subscription types
│   │   └── navigation.ts             # Route params
│   │
│   ├── theme/                         # Design system tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── borderRadius.ts
│   │   └── index.ts                   # Re-exports all theme tokens
│   │
│   ├── utils/                         # Utility functions
│   │   ├── formatTime.ts             # "00:15:32" formatting
│   │   ├── formatDuration.ts         # "1h 12min" formatting
│   │   ├── formatDate.ts
│   │   └── permissions.ts            # Permission helpers
│   │
│   └── constants/                     # App constants
│       ├── reactions.ts               # Reaction types, icons, colors
│       ├── templates.ts               # Available output templates
│       └── plans.ts                   # Subscription plan definitions
│
├── assets/                            # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── native/                            # Native module code (if needed)
│   ├── ios/
│   │   └── widget/                    # iOS Home Screen Widget + Live Activity (future)
│   └── android/
│       └── widget/                    # Android Home Screen Widget (future)
│
└── __tests__/                         # Test files mirroring src/ structure
```

## Data Models

```typescript
// src/types/recording.ts

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
  timestamp: number; // Milliseconds into the recording
  type: MarkerType;
  reaction?: ReactionType;
  photoUri?: string;
  videoUri?: string;
  noteText?: string;
  ocrText?: string; // Extracted text from photo (after processing)
  aiDescription?: string; // AI description of photo/video content
  createdAt: string; // ISO date
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
  duration: number; // Seconds
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
  duration: number; // Seconds
  markers: Marker[];
  photos: PhotoCapture[];
  videos: VideoCapture[];
  transcript?: TranscriptSegment[];
  generatedContent?: GeneratedContent;
  sessionId?: string; // For collaborative sessions (future)
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
```

## Implementation Phases

Build in this order. Each phase should result in a working app that can be tested.

### Phase 1: Foundation (Week 1)

1. **Initialize Expo project** with TypeScript template
2. **Set up NativeWind** (Tailwind for React Native)
3. **Create the theme** from design tokens above
4. **Build base UI components** (`src/components/ui/`): Button, Card, Badge, Input, Toggle, SectionLabel, PillChip
   - Read the HTML design files to extract exact styles for each component
   - Create a simple test screen that renders all UI components for visual verification
5. **Set up Expo Router** with the tab layout (Library, Insights, Drafts, Profile)
6. **Build the custom TabBar** component matching the design (deep navy background, blue active icon)
7. **Create placeholder screens** for all 36 routes (just the name centered on screen)

### Phase 2: Authentication & Onboarding (Week 1-2)

1. **Set up Supabase** client and auth
2. **Build auth screens** (13-16): Sign In, Sign Up, Forgot Password, Email Verification
   - Read the corresponding HTML files for exact layout
   - Implement Google + Apple social sign-in
3. **Build onboarding screens** (10-12): Welcome, Use Case Selection, Content Preferences
   - Store selections in local storage + Supabase user metadata
4. **Build permission screens** (17-19): Microphone, Camera, Notifications
   - Implement actual permission requesting via expo-permissions
   - Skip already-granted permissions
5. **Auth gate in root layout**: redirect to onboarding/auth if not signed in

### Phase 3: Core Recording (Week 2-3)

1. **Set up audio recording service** using @siteed/expo-audio-studio
   - Configure background recording (iOS UIBackgroundModes, Android foreground service)
   - Implement waveform data extraction for visualization
2. **Build the recording screen** (Screen 1):
   - RecordButton with animated glow ring
   - WaveformVisualizer with real audio data
   - RecordingTimer (large mono font)
   - LiveIndicator (pulsing red dot)
   - ReactionPalette (6 reaction buttons)
   - MarkerTimeline (scrollable feed)
   - CaptureBar (photo, stop, video buttons)
3. **Implement marker system**:
   - Tap reaction → create marker with current timestamp
   - Markers stored in Zustand during recording, persisted to SQLite on stop
4. **Android foreground service** via Notifee:
   - Persistent notification showing "Recording in progress - 00:15:32"
   - Notification actions: Pause, Stop, Add Marker (flag)
5. **Build photo capture** (Screen 2):
   - Camera overlay with recording indicator still visible
   - Photo timestamped to current recording position
   - Photo saved locally and linked to recording
6. **Build video capture** (Screen 3):
   - Video recording with timestamp linking
   - Duration limit (e.g., 60 seconds per clip)
7. **Build quick note input** (Screen 36):
   - Bottom sheet with text input
   - Timestamp badge showing when note is linked

### Phase 4: Library & Playback (Week 3-4)

1. **Set up local database** (SQLite) for offline-first storage
2. **Build library screen** (Screen 8):
   - Recording cards with status badges
   - Filter chips (All, Sermons, Lectures, Meetings)
   - Search functionality
3. **Build empty library state** (Screen 26)
4. **Build recording detail / playback** (Screen 9):
   - Audio player with waveform scrubber using react-native-track-player
   - Lock screen / notification media controls
   - Interactive timeline with tappable markers (jump to timestamp)
5. **Build mini player** component (persistent at bottom of library/insights)

### Phase 5: Upload & Processing (Week 4-5)

1. **Build upload manager**:
   - Background upload queue
   - Retry logic for failed uploads
   - Progress tracking per recording
2. **Build recording complete screen** (Screen 4):
   - Editable title and speaker name
   - Template selector
   - Content output toggles
3. **Build processing status screen** (Screen 5):
   - Progress ring with percentage
   - Step-by-step checklist
4. **Build error/retry screen** (Screen 28)
5. **Implement offline banner** (Screen 27): detect connectivity, show banner, queue uploads
6. **API integration**: upload audio + markers + photos + videos to Supabase storage, trigger processing

### Phase 6: Results & Content (Week 5-6)

1. **Build sermon insights screen** (Screen 6):
   - Key takeaways card
   - Timeline with quotes, photos, reactions
   - Study guide section with reflection prompts
   - Scripture references with external links
2. **Build content studio screen** (Screen 7):
   - Quote card previews (grid)
   - Video clip previews
   - Story previews
   - Platform-specific export icons
3. **Build share/export sheet** (Screen 30):
   - Format selection (PDF, Text, Word, Markdown)
   - Platform sharing
   - Content inclusion toggles
4. **Build search results** (Screen 33): full-text search across transcripts, markers, photos

### Phase 7: Profile, Settings & Monetization (Week 6-7)

1. **Build profile screen** (Screen 20): stats, plan info, quick actions
2. **Build edit profile** (Screen 21)
3. **Build settings screen** (Screen 22): recording, AI, storage, notification toggles
4. **Set up RevenueCat** for subscriptions and credits
5. **Build plans screen** (Screen 23): Free, Plus, Pro comparison
6. **Build credits screen** (Screen 24): credit packages
7. **Build checkout screen** (Screen 25): payment via RevenueCat
8. **Build notification center** (Screen 29)

### Phase 8: Analytics & Drafts (Week 7)

1. **Build insights tab** (Screen 34): recording stats, reaction breakdown, content created
2. **Build drafts tab** (Screen 35): unpublished content grid, bulk actions

### Phase 9: Polish & Launch Prep (Week 8)

1. App icon and splash screen
2. Loading states and skeleton screens for all list views
3. Haptic feedback on marker creation
4. Animated transitions between screens
5. Error boundaries and crash reporting
6. Performance optimization (FlatList, memo, lazy loading)
7. EAS Build configuration for iOS and Android
8. App Store and Play Store metadata, screenshots, descriptions

## Key Implementation Notes

### Background Recording Architecture

```
┌─ iOS ──────────────────────────────────────┐
│ UIBackgroundModes: ["audio"]               │
│ expo-audio-studio handles recording        │
│ Recording survives: screen lock, app       │
│   switch, other app usage                  │
│ Recording stops: force quit from switcher  │
└────────────────────────────────────────────┘

┌─ Android ──────────────────────────────────┐
│ Notifee Foreground Service                 │
│ FOREGROUND_SERVICE_MICROPHONE permission   │
│ Persistent notification with controls      │
│ Recording survives: screen lock, app       │
│   switch, app removed from recents         │
│ Recording stops: force stop from settings, │
│   system low memory kill                   │
└────────────────────────────────────────────┘
```

### Offline-First Strategy

1. All recordings are stored locally first (audio file + SQLite metadata)
2. Markers are stored locally during recording
3. Photos/videos saved to local file system
4. Upload queue processes when online
5. User can record, browse library, and play back entirely offline
6. Only AI processing requires network

### Navigation Flow

```
App Launch
  ├── First time? → Onboarding (Welcome → Use Case → Content Prefs → Permissions)
  ├── Not signed in? → Auth (Sign In / Sign Up)
  └── Signed in? → Tabs (Library)

Record button (FAB or from Library)
  → Recording Screen
    ├── Photo Capture (modal)
    ├── Video Capture (modal)
    └── Quick Note (bottom sheet)
  → Recording Complete
    → Processing Status
      → Insights / Results
        ├── Content Studio
        └── Share/Export (bottom sheet)

Tabs: Library | Insights | Drafts | Profile
  Profile → Edit Profile | Settings | Plans | Credits | Checkout
```

### Important Conventions

- **File naming**: PascalCase for components, camelCase for hooks/utils/services
- **Component structure**: each component in its own file, no barrel exports except for `ui/`
- **Styles**: prefer NativeWind classes, fall back to StyleSheet for complex/dynamic styles
- **State**: Zustand for global state, React state for local UI state
- **Async**: use React Query (TanStack Query) for server state, Zustand for client state
- **Error handling**: try-catch in services, error boundaries in UI
- **Testing**: Jest + React Native Testing Library for components, Jest for services
- **Commits**: conventional commits (feat:, fix:, chore:, etc.)

### App Configuration (app.json essentials)

```json
{
  "expo": {
    "name": "LiveCapture",
    "slug": "livecapture",
    "scheme": "livecapture",
    "ios": {
      "bundleIdentifier": "com.livecapture.app",
      "supportsTablet": true,
      "infoPlist": {
        "UIBackgroundModes": ["audio"],
        "NSMicrophoneUsageDescription": "LiveCapture needs your microphone to record audio.",
        "NSCameraUsageDescription": "LiveCapture needs your camera to capture photos and videos during recordings.",
        "NSPhotoLibraryUsageDescription": "LiveCapture saves captured photos to your library."
      }
    },
    "android": {
      "package": "com.livecapture.app",
      "permissions": [
        "RECORD_AUDIO",
        "CAMERA",
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_MICROPHONE",
        "POST_NOTIFICATIONS",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "plugins": [
      "expo-router",
      "expo-camera",
      "expo-file-system",
      [
        "expo-audio",
        {
          "microphonePermission": "LiveCapture needs your microphone to record audio."
        }
      ]
    ]
  }
}
```
