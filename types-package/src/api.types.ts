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
  ticket_id?: string;
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
  organiser_id?: string;
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

// ─── Event detail (GET /events/:id/full) ────────────────────────────────

export interface EventDetailResponse {
  event: import('./index').Event;
  organiser: Pick<import('./index').Profile, 'id' | 'full_name' | 'avatar_url'> | null;
  attendee_count: number;
  attendee_avatars?: string[];
  lineups: import('./index').EventLineup[];
  sponsors: import('./index').EventSponsor[];
  is_saved: boolean;
  has_access: boolean;
  access_type: import('./index').AccessType | null;
  timing_status: string;
  ticket_types?: import('./index').TicketType[];
  user_tickets?: import('./index').Ticket[];
}

// ─── Organiser public profile (GET /organisers/:id/profile) ─────────

export interface OrganiserProfileResponse {
  organiser: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  events: import('./index').Event[];
  event_count: number;
  follower_count: number;
}

// ─── Composite response types ──────────────────────────────────────────

export interface FullEventResponse {
  event: import('./index').EventWithOrganiser;
  lineups: import('./index').EventLineup[];
  sponsors: import('./index').EventSponsor[];
  announcements: import('./index').Announcement[];
}

export interface HubResponse {
  event: import('./index').Event;
  active_orders: import('./index').Order[];
  announcements: import('./index').Announcement[];
}

export interface EventSummaryResponse {
  event_id: string;
  access_type: string;
  checked_in_at: string | null;
  orders_count: number;
  total_spent: number;
  polls_voted: number;
}

export interface MyEventPollResponse {
  id: string;
  question: string;
  status: import('./index').PollStatus;
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
  content_type: import('./index').ContentReportType;
  target_id: string;
  reason: string;
}

// ─── Security ──────────────────────────────────────────────────────────

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface EmailChangeRequest {
  new_email: string;
}

// ─── Incidents ─────────────────────────────────────────────────────────

export interface CreateIncidentRequest {
  incident_type: import('./index').IncidentType;
  description: string;
  location_detail?: string;
  occurred_at?: string;
}

// ─── Notification Preferences ──────────────────────────────────────────

export interface UpdateNotificationPrefsRequest {
  preferences: Record<string, boolean>;
}

// ─── Disputes ──────────────────────────────────────────────────────────

export interface CreateDisputeRequest {
  reason: import('./index').DisputeReason;
  description: string;
}

// ─── Support Tickets ───────────────────────────────────────────────────

export interface CreateTicketRequest {
  category: import('./index').TicketCategory;
  subject: string;
  message: string;
  event_id?: string;
  order_id?: string;
}

export interface CreateTicketMessageRequest {
  body: string;
}

// ─── Search ───────────────────────────────────────────────────────────

export interface SearchRequest {
  query: string;
  type?: 'events' | 'organisers' | 'vendors';
  lat?: number;
  lng?: number;
  limit?: number;
  offset?: number;
}

export interface SearchEventResult {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  venue_name: string | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  status: string;
  organiser_id: string;
  rank: number;
  distance_km: number | null;
}

export interface SearchOrganiserResult {
  id: string;
  full_name: string;
  avatar_url: string | null;
  rank: number;
}

export interface SearchVendorResult {
  id: string;
  user_id: string;
  business_name: string;
  business_description: string | null;
  logo_url: string | null;
  avg_rating: string | null;
  total_ratings: number;
  rank: number;
}

export interface SearchResponse {
  events: SearchEventResult[];
  organisers: SearchOrganiserResult[];
  vendors: SearchVendorResult[];
}

// ─── Pagination ────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_next: boolean;
}

// ─── Vendor Applications ────────────────────────────────────────────────

export interface VendorApplicationCreateRequest {
  event_id: string;
  proposed_menu?: string;
  notes?: string;
}

export interface VendorApplicationRejectRequest {
  rejection_reason: string;
}

export interface VendorApplicationFilters {
  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
}

// ─── Application Messages ───────────────────────────────────────────────

export interface ApplicationMessageCreateRequest {
  message: string;
}

// ─── Business Profile ───────────────────────────────────────────────────

export interface BusinessProfileUpdateRequest {
  company_name?: string;
  registration_number?: string;
  business_type?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  bank_name?: string;
  account_number_last4?: string;
  branch_code?: string;
}

// ─── Vendor Profile ─────────────────────────────────────────────────────

export interface VendorProfileUpdateRequest {
  business_name?: string;
  business_description?: string;
  logo_url?: string;
}

// ─── OAuth ──────────────────────────────────────────────────────────────

export interface OAuthProfileRequest {
  full_name: string;
  phone?: string;
  role?: 'customer' | 'vendor' | 'organiser';
}

// ─── Financial Filters ──────────────────────────────────────────────────

export interface FinancialTransactionFilters {
  type?: import('./index').TransactionType;
  page?: number;
  per_page?: number;
}

export interface PayoutFilters {
  page?: number;
  per_page?: number;
}

export interface TransactionListResponse {
  transactions: import('./index').Transaction[];
  total: number;
  page: number;
  per_page: number;
}

export interface PayoutListResponse {
  payouts: import('./index').Payout[];
  total: number;
  page: number;
  per_page: number;
}

// ─── Platform Application ───────────────────────────────────────────────

export interface PlatformApplicationCreateRequest {
  business_name: string;
  business_description?: string;
  documentation_urls?: string[];
  cipc_registration_number?: string;
  director_name?: string;
}

export interface PlatformApplicationRejectRequest {
  rejection_reason: string;
}

// ─── Ticket Code ────────────────────────────────────────────────────────

export interface TicketCodeUploadRequest {
  codes: string[];
}

// ─── Ticket Sales ──────────────────────────────────────────────────────

export interface PurchaseTicketRequest {
  ticket_type_id: string;
  quantity: number;
}

export interface PurchaseTicketResponse {
  purchase_id: string;
  checkout_url: string;
  checkout_id: string;
}

export interface PurchaseDetailResponse {
  purchase: import('./index').TicketPurchase;
  tickets: import('./index').Ticket[];
}

export interface MyTicketsResponse {
  upcoming: import('./index').MyTicketsEvent[];
  past: import('./index').MyTicketsEvent[];
}

export interface EventTicketsResponse {
  event: Pick<import('./index').Event, 'id' | 'title' | 'venue_name' | 'start_date'>;
  tickets: import('./index').Ticket[];
}

export interface RefundTicketResponse {
  ticket: import('./index').Ticket;
  refund_amount: number;
  message: string;
}

export interface BulkRefundRequest {
  ticket_ids: string[];
}

export interface BulkRefundResponse {
  tickets: import('./index').Ticket[];
  total_refund_amount: number;
}

export interface RSVPRequest {
  ticket_type_id: string;
}

export interface RSVPResponse {
  ticket: import('./index').Ticket;
  event_access: import('./index').EventAccessResponse;
}

export interface TransferTicketRequest {
  recipient_email: string;
  ticket_id: string;
}

export interface CreateTicketTypeRequest {
  name: string;
  description?: string;
  price: number;
  quantity_total: number;
  max_per_order: number;
  sale_starts_at?: string;
  sale_ends_at?: string;
  sort_order?: number;
}

export interface UpdateTicketTypeRequest {
  name?: string;
  description?: string;
  price?: number;
  quantity_total?: number;
  max_per_order?: number;
  sale_starts_at?: string | null;
  sale_ends_at?: string | null;
  is_active?: boolean;
  sort_order?: number;
}

export interface ValidateEntryRequest {
  ticket_code: string;
}

export interface ValidateEntryResponse {
  valid: boolean;
  ticket: import('./index').Ticket | null;
  holder: Pick<import('./index').Profile, 'id' | 'full_name' | 'avatar_url'> | null;
  reason?: string;
}

export interface CheckInSummary {
  total_sold: number;
  checked_in: number;
}

// ─── Admin Settings ────────────────────────────────────────────────────

export interface PlatformSettings {
  platform_fee_percent: number;
}

export interface PendingPayout {
  organiser: Pick<import('./index').Profile, 'id' | 'full_name'>;
  event: Pick<import('./index').Event, 'id' | 'title'>;
  gross_revenue: number;
  platform_fee: number;
  net_amount: number;
}
