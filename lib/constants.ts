export const SITE_URL   = process.env.NEXT_PUBLIC_SITE_URL   ?? 'https://localhost:3000';
export const STUDIO_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Harmony Studio';
export const PHONE       = process.env.NEXT_PUBLIC_PHONE        ?? '+84901234567';
export const ZALO_ID     = process.env.NEXT_PUBLIC_ZALO_ID      ?? '0901234567';
export const FACEBOOK_URL   = process.env.NEXT_PUBLIC_FACEBOOK_URL   ?? 'https://facebook.com';
export const INSTAGRAM_URL  = process.env.NEXT_PUBLIC_INSTAGRAM_URL  ?? 'https://instagram.com';

export const PORTFOLIO_STYLES    = ['vintage', 'modern', 'fineart', 'romantic'] as const;
export const LOCATION_TYPES      = ['studio', 'outdoor', 'destination'] as const;
export const SERVICE_TYPES       = ['photography', 'videography', 'wedding-film', 'combo'] as const;
export const CONTACT_STATUSES    = ['new', 'contacted', 'booked', 'completed', 'cancelled'] as const;

export const UPLOAD_MAX_MB = Number(process.env.UPLOAD_MAX_MB ?? 10);
export const UPLOAD_DIR    = process.env.UPLOAD_DIR ?? 'public/uploads';
