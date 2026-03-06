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
  is_free: boolean;
  ticket_price: string | null;
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
  items?: OrderItem[];
  stores?: OrderStoreInfo;
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

// ─── Order Store Info (enriched orders) ─────────────────────────────────

export interface OrderStoreInfo {
  display_name: string;
  events: Pick<Event, 'title' | 'start_date' | 'venue_name'>;
}

// ─── Saved Events ──────────────────────────────────────────────────────

export interface SavedEvent {
  event_id: string;
  events: Pick<Event, 'title' | 'venue_name' | 'start_date' | 'status' | 'image_url'>;
}

// ─── Event Policies ────────────────────────────────────────────────────

export interface EventPolicy {
  content: string;
  version: number;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

// ─── Emergency Contacts ────────────────────────────────────────────────

export interface EmergencyContact extends BaseEntity {
  event_id: string;
  name: string;
  phone: string;
  role: string | null;
  sort_order: number;
  is_active: boolean;
}

// ─── Incidents ─────────────────────────────────────────────────────────

export type IncidentType = 'medical' | 'fight' | 'theft' | 'harassment' | 'hazard' | 'other';
export type IncidentStatus = 'submitted' | 'acknowledged' | 'handling' | 'resolved' | 'escalated';

export interface Incident extends BaseEntity {
  event_id: string;
  reported_by: string;
  incident_type: IncidentType;
  description: string;
  location_detail: string | null;
  occurred_at: string | null;
  status: IncidentStatus;
  incident_number: string;
}

// ─── Notification Preferences ──────────────────────────────────────────

export interface NotificationPreferences {
  user_id: string;
  preferences: Record<string, boolean>;
}

// ─── Help Center ───────────────────────────────────────────────────────

export interface HelpCategory extends BaseEntity {
  title: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface HelpArticleSummary {
  id: string;
  title: string;
  slug: string;
  published_at: string;
}

export interface HelpCategoryWithArticles extends HelpCategory {
  articles: HelpArticleSummary[];
}

export interface HelpArticle extends BaseEntity {
  title: string;
  slug: string;
  body: string;
  tags: string[] | null;
  category: Pick<HelpCategory, 'id' | 'title' | 'slug'>;
  published_at: string;
}

// ─── Disputes ──────────────────────────────────────────────────────────

export type DisputeReason = 'wrong_items' | 'missing_items' | 'quality' | 'not_received' | 'overcharged' | 'other';
export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed';

export interface Dispute extends BaseEntity {
  order_id: string;
  customer_id: string;
  dispute_number: string;
  reason: DisputeReason;
  description: string;
  status: DisputeStatus;
  resolution: string | null;
  resolution_type: string | null;
  refund_approved: boolean | null;
  refund_amount: number | null;
  resolved_at: string | null;
}

// ─── Support Tickets ───────────────────────────────────────────────────

export type TicketCategory = 'order' | 'account' | 'event' | 'vendor' | 'other';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_user' | 'resolved' | 'closed' | 'escalated';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface SupportTicket extends BaseEntity {
  ticket_number: string;
  user_id: string;
  category: TicketCategory;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  event_id: string | null;
  order_id: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  closed_at: string | null;
}

export interface TicketMessage extends BaseEntity {
  ticket_id: string;
  sender_id: string;
  body: string;
  is_internal: boolean;
}

export interface SupportTicketWithMessages extends SupportTicket {
  messages: TicketMessage[];
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

// ─── Vendor Applications ────────────────────────────────────────────────

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface VendorApplication extends BaseEntity {
  vendor_id: string;
  event_id: string;
  proposed_menu: string;
  notes: string | null;
  status: ApplicationStatus;
  event_fee: string | null;
  fee_paid: boolean;
  reviewed_at: string | null;
  rejection_reason: string | null;
  vendor_profiles: VendorProfileData | null;
}

export interface VendorApplicationWithVendor extends VendorApplication {
  vendor: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    business_type?: string;
  };
  event_title?: string;
}

// ─── Application Messages ───────────────────────────────────────────────

export interface ApplicationMessage extends BaseEntity {
  application_id: string;
  sender_id: string;
  sender_type: 'organiser' | 'vendor';
  sender_name: string;
  message: string;
}

// ─── Vendor Profile (extended) ──────────────────────────────────────────

export interface VendorProfileData extends BaseEntity {
  user_id: string;
  business_name: string | null;
  business_description: string | null;
  logo_url: string | null;
}

// ─── Business Profile ───────────────────────────────────────────────────

export interface BusinessProfileData extends BaseEntity {
  user_id: string;
  company_name: string | null;
  registration_number: string | null;
  business_type: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  bank_name: string | null;
  account_number_last4: string | null;
  branch_code: string | null;
}

// ─── Platform Application ───────────────────────────────────────────────

export type PlatformApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface PlatformApplication extends BaseEntity {
  user_id: string;
  application_type: string;
  business_name: string;
  business_description: string | null;
  documentation_urls: string[];
  status: PlatformApplicationStatus;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  cipc_registration_number: string | null;
  director_name: string | null;
  director_id_verified: boolean;
  verification_status: string | null;
  verification_reference: string | null;
  verified_at: string | null;
}

// ─── Ticket Codes ───────────────────────────────────────────────────────

export type TicketCodeStatus = 'available' | 'used' | 'invalid';

export interface TicketCode extends BaseEntity {
  event_id: string;
  code: string;
  status: TicketCodeStatus;
  used_at: string | null;
  attendee_name: string | null;
}

// ─── Sponsor Tier ───────────────────────────────────────────────────────

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze';

// ─── Financial Types ────────────────────────────────────────────────────

export type TransactionType =
  | 'vendor_fee'
  | 'ticket_sale'
  | 'refund'
  | 'payout'
  | 'platform_fee'
  | 'order_payment'
  | 'event_fee'
  | 'order_sale';

export type TransactionStatus = 'pending' | 'settled' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  status: TransactionStatus;
  event_id?: string | null;
  event_title?: string | null;
  store_name?: string | null;
  created_at: string;
}

export type PayoutStatus = 'pending' | 'processing' | 'processed' | 'failed';

export interface Payout {
  id: string;
  amount: number;
  status: PayoutStatus;
  bank_name: string | null;
  account_last4: string | null;
  period_start: string | null;
  period_end: string | null;
  processed_at: string | null;
}

export interface OrganiserFinancialSummary {
  total_revenue: number;
  vendor_fees_collected: number;
  ticket_sales: number;
  platform_fees: number;
  net_earnings: number;
  total_paid_out: number;
  pending_payouts: number;
}

export interface VendorFinancialSummary {
  order_revenue: number;
  platform_fees: number;
  net_earnings: number;
  total_paid_out: number;
  pending_payouts: number;
  orders_fulfilled: number;
  avg_order_value: number;
}

// ─── Enriched types (used by business app) ──────────────────────────────

export interface VendorStore extends StorePublic {
  event_id: string;
  event_title: string;
  event_date: string;
  order_count: number;
  revenue: number;
}

export interface OrderWithStore extends Order {
  store_name: string;
  customer_name?: string;
}

// ─── Business-side ratings (enriched with names) ────────────────────────

export interface VendorRatingWithNames extends VendorRating {
  customer_name: string;
  store_name: string;
}

export interface EventRatingWithNames extends EventRating {
  user_name: string;
}

// ─── Re-export API types ───────────────────────────────────────────────

export * from './api.types';
