export const validators = {
  email: (value: string): string | undefined => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Enter a valid email address';
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
    if (!/[0-9]/.test(value)) return 'Include at least one number';
    return undefined;
  },

  confirmPassword: (password: string, confirm: string): string | undefined => {
    if (!confirm) return 'Please confirm your password';
    if (password !== confirm) return 'Passwords do not match';
    return undefined;
  },

  fullName: (value: string): string | undefined => {
    if (!value.trim()) return 'Full name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  },

  phone: (value: string): string | undefined => {
    if (!value.trim()) return 'Phone number is required';
    const cleaned = value.replace(/[\s\-()]/g, '');
    if (!/^\+?\d{8,15}$/.test(cleaned)) return 'Enter a valid phone number';
    return undefined;
  },

  otp: (value: string): string | undefined => {
    if (!value) return 'Enter the verification code';
    if (value.length !== 6) return 'Code must be 6 digits';
    if (!/^\d{6}$/.test(value)) return 'Code must contain only numbers';
    return undefined;
  },

  businessName: (value: string): string | undefined => {
    if (!value.trim()) return 'Business name is required';
    if (value.trim().length < 2) return 'Must be at least 2 characters';
    return undefined;
  },

  accountNumber: (value: string): string | undefined => {
    if (!value.trim()) return 'Account number is required';
    if (!/^\d{6,20}$/.test(value.trim())) return 'Enter a valid account number';
    return undefined;
  },
};

export type PasswordStrength = 'weak' | 'fair' | 'strong';

export function getPasswordStrength(password: string): { strength: PasswordStrength; score: number } {
  if (!password) return { strength: 'weak', score: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { strength: 'weak', score: score / 6 };
  if (score <= 4) return { strength: 'fair', score: score / 6 };
  return { strength: 'strong', score: score / 6 };
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local.length > 2
    ? local[0] + '***' + local[local.length - 1]
    : local[0] + '***';
  return `${masked}@${domain}`;
}
