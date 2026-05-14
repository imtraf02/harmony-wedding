'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const SERVICES = [
  // ... (rest of the services array remains the same)
  {
    slug: 'photography',
    title: 'Chụp ảnh cưới',
    description: 'Phong cách phóng sự, ánh sáng tự nhiên giúp lưu giữ trọn vẹn những cảm xúc chân thật nhất.',
    number: '01',
    icon: 'camera',
    href: '/services/photography',
  },
  {
    slug: 'videography',
    title: 'Quay phim cưới',
    description: 'Những thước phim 4K điện ảnh kết hợp flycam, kể lại câu chuyện tình yêu của bạn một cách sống động.',
    number: '02',
    icon: 'video',
    href: '/services/videography',
  },
  {
    slug: 'wedding-film',
    title: 'Phóng sự cưới',
    description: 'Trải nghiệm phim tài liệu trọn vẹn — từ hậu trường đến những thước phim dài đầy ý nghĩa.',
    number: '03',
    icon: 'film',
    href: '/services/wedding-film',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function ServiceCards() {
  return (
    <section className="py-24 md:py-40 bg-luxury" aria-label="Dịch vụ của chúng tôi">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div 
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-label-luxury text-gold">
            Dịch vụ của chúng tôi
          </p>
          <h2 className="text-display font-cormorant font-light text-obsidian">
            Kể lại câu chuyện <em className="italic">của riêng bạn</em>
          </h2>
          <p className="text-smoke font-light leading-relaxed max-w-[520px]">
            Dù bạn cần chụp ảnh, quay phim hay một trải nghiệm trọn gói —
            chúng tôi luôn có những giải pháp phù hợp nhất.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="grid md:grid-cols-3 divider-hairline border-black/5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service, index) => (
            <motion.div key={service.slug} variants={itemVariants}>
              <Link
                href={service.href}
                id={`service-card-${service.slug}`}
                className={cn(
                  "group relative flex flex-col bg-luxury-surface h-full p-12 transition-all duration-700 hover:bg-white hover:shadow-luxury",
                  index !== 0 && "md:border-l border-black/5"
                )}
              >
                {/* Top accent line */}
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 top-0 h-0.5
                    bg-gold scale-x-0 transition-transform duration-700 group-hover:scale-x-100
                  "
                />

                {/* Số thứ tự */}
                <span className="font-cormorant text-xs tracking-[0.3em] text-gold/40 mb-10 block">
                  {service.number}
                </span>

                {/* Icon khung vuông */}
                <div
                  className="w-14 h-14 mb-8 flex items-center justify-center border border-gold/20 group-hover:border-gold transition-colors duration-500 shadow-gold-sm"
                  aria-hidden="true"
                >
                  <svg
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-gold"
                  >
                    {service.icon === 'camera' && (
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    )}
                    {service.icon === 'video' && (
                      <>
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </>
                    )}
                    {service.icon === 'film' && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
                        <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" />
                        <line x1="17" y1="7" x2="22" y2="7" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Tiêu đề */}
                <h3 className="text-headline font-cormorant font-normal text-obsidian mb-6">
                  {service.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <em className="italic font-light">{service.title.split(' ').at(-1)}</em>
                </h3>

                <p className="text-smoke text-sm font-light leading-relaxed mb-10 flex-1">
                  {service.description}
                </p>

                {/* CTA */}
                <span
                  className="
                    inline-flex items-center gap-3 text-[10px] font-bold
                    tracking-[0.2em] uppercase text-gold
                    transition-all duration-500
                    group-hover:gap-5 group-hover:text-obsidian
                  "
                >
                  Khám phá
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}