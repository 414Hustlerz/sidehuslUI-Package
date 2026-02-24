// Types derived from backend API schemas at ../SideHusl-v2/backend/app/schemas/
// These match what the API actually returns (BaseSchema includes id + created_at)

export type UserRole = 'customer' | 'vendor' | 'organiser' | 'admin';

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export type EventCategory =
  | 'music'
  | 'food'
  | 'sports'
  | 'arts'
  | 'tech'
  | 'community'
  | 'other';

export type StoreStatus = 'setup' | 'ready' | 'open' | 'busy' | 'paused' | 'closed';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'collected'
  | 'cancelled';

export type PaymentMethod = 'cash' | 'card';

export type AccessType = 'standard' | 'vip' | 'backstage' | 'press';

export type TransferStatus = 'pending' | 'accepted' | 'declined' | 'cancelled' | 'expired';

export type PollStatus = 'draft' | 'active' | 'ended';

export type AnnouncementPriority = 'normal' | 'emergency';

export type ContentReportType = 'poll' | 'vendor_rating' | 'event_rating' | 'announcement';

export type ContentReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

// ─── Base ────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: string;
  created_at: string;
}

// ─── User / Profile ─────────────────────────────────────────────────────

export interface Profile extends BaseEntity {
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
}

// ─── Events ─────────────────────────────────────────────────────────────

export interface Event extends BaseEntity {
  organiser_id: string;
  title: string;
  description: string | null;
  category: EventCategory | null;
  venue_name: string | null;
  venue_address: string | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  status: EventStatus;
  vendor_fee: number | null;
  vendor_application_deadline: string | null;
  max_vendors: number | null;
  code_pattern: string | null;
  transfers_enabled: boolean;
  max_transfers_per_ticket: number | null;
  cancellation_reason: string | null;
  admin_notes: string | null;
}

export interface EventWithOrganiser extends Event {
  organiser: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
}

// ─── Event Lineup ───────────────────────────────────────────────────────

export interface EventLineup extends BaseEntity {
  event_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  start_time: string | null;
  end_time: string | null;
  stage: string | null;
  sort_order: number;
}

// ─── Event Sponsor ──────────────────────────────────────────────────────

export interface EventSponsor extends BaseEntity {
  event_id: string;
  name: string;
  tier: string | null;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
}

// ─── Event Access ───────────────────────────────────────────────────────

export interface EventAccess extends BaseEntity {
  event_id: string;
  user_id: string;
  access_type: AccessType;
  granted_at: string;
  checked_in_at: string | null;
  revoked: boolean;
}

export interface EventAccessResponse {
  has_access: boolean;
  granted_at: string | null;
  access_type: AccessType | null;
  checked_in_at: string | null;
  revoked: boolean;
}

export interface TicketResponse {
  event_name: string;
  event_date: string;
  ticket_code_masked: string;
  access_type: AccessType;
  checked_in_at: string | null;
  qr_payload: Record<string, unknown>;
}

// ─── Stores & Menu Items ────────────────────────────────────────────────

export interface Store extends BaseEntity {
  vendor_id: string;
  event_id: string;
  display_name: string;
  description: string | null;
  banner_url: string | null;
  status: StoreStatus;
  status_reason: string | null;
  is_active: boolean;
}

export interface VendorProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface StorePublic extends Store {
  menu_items: MenuItem[];
  vendor_profile: VendorProfile;
}

export interface MenuItem extends BaseEntity {
  store_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_available: boolean;
}

// ─── Orders ─────────────────────────────────────────────────────────────

export interface OrderItem extends BaseEntity {
  order_id: string;
  menu_item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  notes: string | null;
}

export interface Order extends BaseEntity {
  order_number: string;
  customer_id: string;
  store_id: string;
  event_id: string;
  status: OrderStatus;
  total_amount: number;
  estimated_prep_time: number | null;
  notes: string | null;
  collection_code: string | null;
  payment_method: PaymentMethod;
  cancel_reason: string | null;
  cancelled_by: string | null;
  confirmed_at: string | null;
  preparing_at: string | null;
  ready_at: string | null;
  collected_at: string | null;
  cancelled_at: string | null;
  items: OrderItem[];
}

// ─── Engagement ─────────────────────────────────────────────────────────

export interface PollOption extends BaseEntity {
  poll_id: string;
  text: string;
  sort_order: number;
  vote_count: number;
}

export interface Poll extends BaseEntity {
  event_id: string;
  created_by: string;
  question: string;
  status: PollStatus;
  ends_at: string | null;
  published_at: string | null;
  ended_at: string | null;
  poll_options: PollOption[];
}

export interface PollResult {
  event_id: string;
  question: string;
  status: PollStatus;
  total_votes: number;
  poll_options: PollOption[];
}

export interface VendorRating extends BaseEntity {
  order_id: string;
  vendor_id: string;
  rated_by: string;
  rating: number;
  comment: string | null;
}

export interface EventRating extends BaseEntity {
  event_id: string;
  rated_by: string;
  rating: number;
  comment: string | null;
}

export interface Announcement extends BaseEntity {
  event_id: string;
  message: string;
  priority: AnnouncementPriority;
  sent_by: string;
  recipient_count: number | null;
}

// ─── Transfers ──────────────────────────────────────────────────────────

export interface Transfer extends BaseEntity {
  event_id: string;
  ticket_code: string;
  sender_id: string;
  recipient_id: string | null;
  recipient_email: string;
  status: TransferStatus;
  transfer_number: string;
  initiated_at: string;
  resolved_at: string | null;
  resolved_reason: string | null;
}

// ─── Notifications ──────────────────────────────────────────────────────

export interface Notification extends BaseEntity {
  user_id: string;
  type: string;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
}

// ─── Wallet (mock - not implemented in API) ─────────────────────────────

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  created_at: string;
}

// ─── My Events (event with user's access data) ────────────────────────

export interface MyEvent extends EventWithOrganiser {
  access_type: AccessType;
  granted_at: string;
  checked_in_at: string | null;
}

// ─── Organiser Profile (for Following) ─────────────────────────────────

export interface OrganiserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  event_count: number;
  location?: string;
}

// ─── Follow Relationship ───────────────────────────────────────────────

export interface Follow extends BaseEntity {
  follower_id: string;
  following_id: string;
}

// ─── Re-export API types ───────────────────────────────────────────────

export * from './api.types';
