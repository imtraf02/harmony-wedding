export interface ServiceInfo {
  slug        : string;
  title       : string;
  subtitle    : string;
  description : string;
  features    : string[];
  heroImage   : string;
}

export const services: ServiceInfo[] = [
  {
    slug       : 'photography',
    title      : 'Wedding Photography',
    subtitle   : 'Every glance. Every tear. Every smile.',
    description: 'We capture the soul of your wedding day with natural light, documentary-style storytelling. From quiet morning preparations to the last dance, every frame is crafted with intention.',
    features   : [
      'Full-day coverage (10–12 hours)',
      'Two professional photographers',
      'Same-day social media highlights',
      'Online private gallery within 4 weeks',
      'Edited high-resolution images (400–800 photos)',
      'Print-ready files with commercial license',
    ],
    heroImage: '/uploads/portfolio/photo-hero.webp',
  },
  {
    slug       : 'videography',
    title      : 'Wedding Videography',
    subtitle   : 'Cinematic films that last forever.',
    description: 'Our 4K cinematic wedding films are crafted to feel like a short film about your love story — not just a recording. We blend storytelling, emotion, and music into something truly timeless.',
    features   : [
      '4K cinematic full-day coverage',
      'Two-person crew with gimbal & drone',
      'Highlight reel (3–5 minutes)',
      'Feature film (20–30 minutes)',
      'Ceremony & reception in full',
      'Delivered within 12 weeks',
    ],
    heroImage: '/uploads/portfolio/video-hero.webp',
  },
  {
    slug       : 'wedding-film',
    title      : 'Wedding Documentary Film',
    subtitle   : 'Your story. Told in depth.',
    description: 'A complete wedding documentary that goes beyond the day itself — including pre-wedding interviews, behind-the-scenes moments, and a full feature-length cinematic film.',
    features   : [
      'Pre-wedding couple session',
      'Family & friend interviews',
      'Full-day multi-camera coverage',
      'Feature documentary (45–60 minutes)',
      'Professional color grade & sound mix',
      'USB delivery + private streaming link',
    ],
    heroImage: '/uploads/portfolio/film-hero.webp',
  },
];
