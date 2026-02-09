export type SubscriptionPlan = 'free' | 'plus' | 'pro';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  plan: SubscriptionPlan;
  credits: number;
  createdAt: string;
}
