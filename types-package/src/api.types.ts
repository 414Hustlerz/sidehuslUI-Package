import type {
  EventWithOrganiser,
  EventLineup,
  EventSponsor,
  Announcement,
  Order,
  Wallet,
  PollStatus,
  ContentReportType,
} from './index';

// API error shape returned by the Flask backend
export interface ApiError {
  error: string;
  status_code: number;
}

// ─── Request types (matching backend input schemas) ─────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface JoinEventRequest {
  ticket_code: string;
}

export interface PlaceOrderRequest {
  store_id: string;
  items: CartItemRequest[];
  notes?: string;
  payment_method: 'cash' | 'card';
}

export interface CartItemRequest {
  menu_item_id: string;
  quantity: number;
  notes?: string;
}

export interface CartValidateRequest {
  store_id: string;
  items: CartItemRequest[];
}

export interface VendorRatingRequest {
  rating: number;
  comment?: string;
}

export interface EventRatingRequest {
  rating: number;
  comment?: string;
}

export interface PollVoteRequest {
  option_id: string;
}

export interface InitiateTransferRequest {
  recipient_email: string;
}

export interface ResolveTransferRequest {
  reason?: string;
}

// ─── Query filter types ─────────────────────────────────────────────────

export interface EventFilters {
  published_only?: boolean;
  category?: string;
  search?: string;
  start_after?: string;
  start_before?: string;
}

export interface OrderFilters {
  event_id?: string;
  status?: string;
}

export interface NotificationFilters {
  unread_only?: boolean;
  limit?: number;
}

export interface TransferListFilters {
  direction?: 'sent' | 'received' | 'all';
}

export interface MyEventsFilters {
  status?: 'active' | 'upcoming' | 'history';
}

// ─── Composite response types ──────────────────────────────────────────

export interface FullEventResponse {
  event: EventWithOrganiser;
  lineups: EventLineup[];
  sponsors: EventSponsor[];
  announcements: Announcement[];
}

export interface HubResponse {
  event: EventWithOrganiser;
  orders: Order[];
  announcements: Announcement[];
  wallet: Wallet | null;
  countdown: { ends_at: string; seconds_remaining: number } | null;
}

export interface EventSummaryResponse {
  event: EventWithOrganiser;
  orders_count: number;
  total_spent: number;
  polls_voted: number;
}

export interface MyEventPollResponse {
  id: string;
  question: string;
  status: PollStatus;
  user_vote: string | null;
  winner: string | null;
  winner_percent: number | null;
}

export interface CartValidationResponse {
  valid: boolean;
  errors?: string[];
  total?: number;
}

export interface ReportContentRequest {
  content_type: ContentReportType;
  target_id: string;
  reason: string;
}
