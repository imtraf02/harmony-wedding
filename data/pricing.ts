export interface PricingPackage {
  id          : string;
  name        : string;
  price       : number;
  priceLabel  : string;
  description : string;
  services    : string[];
  badge?      : string;
  highlighted : boolean;
}

export const packages: PricingPackage[] = [
  {
    id         : 'photo-basic',
    name       : 'Photo Essential',
    price      : 15000000,
    priceLabel : '15.000.000 ₫',
    description: 'Perfect for intimate ceremonies and elopements.',
    services   : [
      '8 hours photography coverage',
      '1 photographer',
      '300+ edited photos',
      'Online gallery delivery',
      'Print-ready files',
    ],
    highlighted: false,
  },
  {
    id         : 'photo-premium',
    name       : 'Photo Premium',
    price      : 25000000,
    priceLabel : '25.000.000 ₫',
    description: 'Full-day coverage with two photographers for complete storytelling.',
    badge      : 'Most Popular',
    services   : [
      '10 hours photography coverage',
      '2 photographers',
      '500+ edited photos',
      'Online gallery within 3 weeks',
      'Print-ready files + album layout',
      'Same-day social media edits (10 photos)',
    ],
    highlighted: true,
  },
  {
    id         : 'video-basic',
    name       : 'Video Essential',
    price      : 18000000,
    priceLabel : '18.000.000 ₫',
    description: 'Cinematic 4K film for your most important day.',
    services   : [
      '8 hours videography',
      '1 cinematographer',
      'Highlight reel (3 min)',
      'Full ceremony edit',
      '4K delivery',
    ],
    highlighted: false,
  },
  {
    id         : 'video-cinema',
    name       : 'Cinema Package',
    price      : 35000000,
    priceLabel : '35.000.000 ₫',
    description: 'Full cinematic experience with drone coverage.',
    badge      : 'Best Value',
    services   : [
      '10 hours full-day coverage',
      '2-person crew + drone operator',
      'Highlight reel (5 min)',
      'Feature film (25 min)',
      'Ceremony & reception in full',
      'DJI Drone aerial footage',
    ],
    highlighted: true,
  },
  {
    id         : 'combo',
    name       : 'Photo + Video Combo',
    price      : 48000000,
    priceLabel : '48.000.000 ₫',
    description: 'The complete package for couples who want it all.',
    badge      : 'Best Deal',
    services   : [
      'Full-day photo + video coverage',
      '3-person crew (2 photo + 1 video)',
      '500+ edited photos',
      'Highlight reel (5 min)',
      'Feature film (25 min)',
      'Drone aerial footage',
      'Same-day social media pack',
      'Free pre-wedding session',
    ],
    highlighted: false,
  },
];

export const faqs = [
  {
    question: 'How far in advance should I book?',
    answer  : 'We recommend booking at least 6–12 months in advance, especially for peak season (October–December). For 2025 dates, many weekends are already reserved.',
  },
  {
    question: 'Do you travel outside the city?',
    answer  : 'Yes! We travel anywhere in Vietnam and internationally. Travel fees apply for locations more than 100 km from our studio.',
  },
  {
    question: 'What is your payment schedule?',
    answer  : 'We require a 30% deposit to confirm your date. The remaining balance is due 2 weeks before your wedding day.',
  },
  {
    question: 'How long until we receive our photos/videos?',
    answer  : 'Photos are delivered within 3–4 weeks. Videos take 8–12 weeks depending on the package. Rush delivery is available for an additional fee.',
  },
  {
    question: 'Can we customize a package?',
    answer  : 'Absolutely. Every wedding is unique. Contact us and we will create a custom proposal that fits your vision and budget.',
  },
];
