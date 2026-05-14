import { buildMetadata } from '@/lib/metadata';
import { Breadcrumb }    from '@/components/shared/Breadcrumb';
import { SectionTitle }  from '@/components/shared/SectionTitle';
import { ContactForm }   from '@/components/shared/ContactForm';
import { STUDIO_NAME, PHONE, ZALO_ID, FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';

export const metadata = buildMetadata({
  title      : 'Contact & Booking | Harmony Studio',
  description: 'Book your wedding photography or videography session. Reach out for a free consultation and custom proposal.',
  path       : '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumb items={[{ name: 'Contact', path: '/contact' }]} />

        <section className="mt-12">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
            {/* Info Side */}
            <div>
              <SectionTitle
                eyebrow="Get in Touch"
                title="Let's Start Your Journey"
                subtitle="We would love to hear about your wedding plans. Fill out the form or reach out directly through our social channels."
                centered={false}
              />

              <div className="space-y-12 mt-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Phone & Zalo</h4>
                    <p className="text-xl font-medium text-foreground">{PHONE}</p>
                    <p className="text-sm text-muted-foreground mt-1">Zalo: {ZALO_ID}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Studio Location</h4>
                    <p className="text-xl font-medium text-foreground">123 Wedding Street, District 1</p>
                    <p className="text-sm text-muted-foreground mt-1">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Social Media</h4>
                    <div className="flex gap-4 mt-2">
                      <a href={FACEBOOK_URL} className="text-sm text-muted-foreground hover:text-gold transition-colors underline underline-offset-4 decoration-border">Facebook</a>
                      <span className="text-border">/</span>
                      <a href={INSTAGRAM_URL} className="text-sm text-muted-foreground hover:text-gold transition-colors underline underline-offset-4 decoration-border">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-card rounded-3xl border border-border shadow-sm">
                <h4 className="text-lg mb-4 font-cormorant text-foreground">Office Hours</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between"><span>Monday — Friday</span> <span>09:00 - 18:00</span></li>
                  <li className="flex justify-between"><span>Saturday</span> <span>10:00 - 16:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span className="italic text-gold">By appointment</span></li>
                </ul>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
