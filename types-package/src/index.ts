// ─── Event ──────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  image_url: string | null;
  start_date: string;
  venue_name: string;
  category: string;
}

export interface EventWithOrganiser extends Event {
  organiser?: {
    id: string;
    name: string;
    avatar_url?: string | null;
  };
}

// ─── Profile ────────────────────────────────────────────────────
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
}

// ─── Store / Vendor ─────────────────────────────────────────────
export type StoreStatus =
  | 'open'
  | 'ready'
  | 'busy'
  | 'paused'
  | 'closed'
  | 'setup';

export interface StorePublic {
  id: string;
  display_name: string;
  description: string | null;
  banner_url: string | null;
  status: StoreStatus;
  status_reason?: string | null;
}

// ─── Menu ───────────────────────────────────────────────────────
export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
}

// ─── Order ──────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'collected'
  | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
}

// ─── Notification ───────────────────────────────────────────────
export type NotificationType =
  | 'order_ready'
  | 'order_confirmed'
  | 'announcement'
  | 'poll_published'
  | 'transfer_received';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

// ─── Poll ───────────────────────────────────────────────────────
export interface PollOption {
  id: string;
  text: string;
  vote_count: number;
}

export type PollStatus = 'active' | 'ended';

export interface Poll {
  id: string;
  question: string;
  status: PollStatus;
  poll_options: PollOption[];
}

// ─── Announcement ───────────────────────────────────────────────
export type AnnouncementPriority = 'normal' | 'emergency';

export interface Announcement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  created_at: string;
}
