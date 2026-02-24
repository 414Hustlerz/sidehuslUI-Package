import { format, formatDistanceToNow, isToday, isTomorrow, parseISO } from 'date-fns';
import type { OrderStatus, Event, EventCategory } from '@414hustlerz/types';

// ─── General Utilities ──────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
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
