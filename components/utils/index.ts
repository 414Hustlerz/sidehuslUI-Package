import { format, formatDistanceToNow, isToday, isTomorrow, parseISO, isAfter, isBefore } from 'date-fns';
import type { OrderStatus, Event, EventCategory, TicketType } from '@414hustlerz/types';

// ─── General Utilities ──────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
}

export function formatPrice(amountCents: number): string {
  if (amountCents === 0) return 'Free';
  const rands = amountCents / 100;
  if (Number.isInteger(rands)) return `R${rands.toLocaleString('en-ZA')}`;
  return `R${rands.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
  if (isTomorrow(date)) return `Tomorrow, ${format(date, 'h:mm a')}`;
  return format(date, 'EEE, d MMM yyyy · h:mm a');
}

export function formatShortDate(dateString: string): string {
  return format(parseISO(dateString), 'd MMM yyyy');
}

export function formatTime(dateString: string): string {
  return format(parseISO(dateString), 'h:mm a');
}

export function formatRelative(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function maskCode(code: string): string {
  if (code.length <= 4) return code;
  return code.slice(0, 2) + '•'.repeat(code.length - 4) + code.slice(-2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

// ─── Event Utilities ────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  food: 'Food & Drink',
  music: 'Music',
  tech: 'Technology',
  arts: 'Arts & Culture',
  sports: 'Sports',
  comedy: 'Comedy',
  wellness: 'Wellness',
  film: 'Film',
  fashion: 'Fashion',
  business: 'Business',
  networking: 'Networking',
  education: 'Education',
  community: 'Community',
  other: 'Other',
};

export function getCategoryLabel(category: string | null): string {
  if (!category) return 'General';
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

export function getCategoryEmoji(category: EventCategory | null): string {
  const map: Record<string, string> = {
    music: '🎵',
    food: '🍔',
    sports: '⚽',
    arts: '🎨',
    tech: '💻',
    community: '🤝',
    other: '🎉',
  };
  return map[category || 'other'] || '🎉';
}

export function getEventDateRange(event: Event): string {
  const start = formatShortDate(event.start_date);
  const end = formatShortDate(event.end_date);
  return start === end ? start : `${start} – ${end}`;
}

export function isEventLive(event: Event): boolean {
  const now = new Date();
  return (
    event.status === 'published' &&
    new Date(event.start_date) <= now &&
    new Date(event.end_date) >= now
  );
}

export function isEventUpcoming(event: Event): boolean {
  return event.status === 'published' && new Date(event.start_date) > new Date();
}

// ─── Order Utilities ────────────────────────────────────────────

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Collection',
  collected: 'Collected',
  cancelled: 'Cancelled',
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export function formatOrderTotal(amount: number): string {
  return formatCurrency(amount);
}

export const ORDER_TIMELINE_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'collected',
];

// ─── Ticket Utilities ──────────────────────────────────────────

export function getTicketTypeAvailability(ticketType: TicketType): {
  available: boolean;
  reason?: string;
  remaining: number;
} {
  const remaining = ticketType.quantity_total - ticketType.quantity_sold;
  const now = new Date();

  if (!ticketType.is_active) {
    return { available: false, reason: 'hidden', remaining };
  }

  if (remaining <= 0) {
    return { available: false, reason: 'SOLD OUT', remaining: 0 };
  }

  if (ticketType.sale_starts_at && isAfter(parseISO(ticketType.sale_starts_at), now)) {
    const dateStr = new Date(ticketType.sale_starts_at).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
    });
    return { available: false, reason: `Sales open ${dateStr}`, remaining };
  }

  if (ticketType.sale_ends_at && isBefore(parseISO(ticketType.sale_ends_at), now)) {
    return { available: false, reason: 'Sales ended', remaining };
  }

  return { available: true, remaining };
}

export function isAllFreeEvent(ticketTypes: TicketType[]): boolean {
  if (ticketTypes.length === 0) return false;
  return ticketTypes.every((t) => t.price === 0);
}

export function getMaxQuantity(ticketType: TicketType): number {
  const remaining = ticketType.quantity_total - ticketType.quantity_sold;
  return Math.min(ticketType.max_per_order, remaining);
}

// ─── Categories ────────────────────────────────────────────────

export * from './categories';

// ─── Haptics ───────────────────────────────────────────────────

export { haptics } from './haptics';

// ─── Validation ────────────────────────────────────────────────

export { validators, getPasswordStrength, maskEmail } from './validation';
export type { PasswordStrength } from './validation';

// ─── Hooks ─────────────────────────────────────────────────────

export { useDebounce } from './useDebounce';
