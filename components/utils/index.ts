import { format, formatDistanceToNow } from 'date-fns';
import type { OrderStatus } from '@sidehusl/types';

// ─── General Utilities ──────────────────────────────────────────

/**
 * Extract initials from a name string.
 * "John Doe" → "JD", "Alice" → "A", undefined/null → "?"
 */
export function getInitials(name?: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format a number as ZAR currency.
 * 49.99 → "R 49.99"
 */
export function formatCurrency(amount: number): string {
  return `R ${amount.toFixed(2)}`;
}

/**
 * Format a date string as a human-readable relative time.
 * "2026-02-20T10:00:00Z" → "2 days ago"
 */
export function formatRelative(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Format a date string into a readable date.
 * "2026-03-15T18:00:00Z" → "15 Mar 2026"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd MMM yyyy');
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

/**
 * Map an event category slug to a display label.
 * "food" → "Food & Drink", "unknown" → "Unknown"
 */
export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

// ─── Order Utilities ────────────────────────────────────────────

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  collected: 'Collected',
  cancelled: 'Cancelled',
};

/**
 * Map an OrderStatus to a human-readable label.
 * "pending" → "Pending"
 */
export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

/**
 * Ordered steps for the order timeline (excluding "cancelled").
 */
export const ORDER_TIMELINE_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'collected',
];
