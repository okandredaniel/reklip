export interface OutputTemplate {
  id: string;
  name: string;
  description: string;
  outputs: OutputType[];
}

export type OutputType =
  | 'summary'
  | 'key_takeaways'
  | 'study_guide'
  | 'scripture_references'
  | 'quote_cards'
  | 'video_clips'
  | 'stories'
  | 'transcript';
