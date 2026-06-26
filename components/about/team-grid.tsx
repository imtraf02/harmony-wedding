"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const teamMembers = [
  {
    name: "Hiếu Trần",
    role: "Founder & Lead Photographer",
    bio: "Người định hình phong cách nghệ thuật cho Harmony. Với hơn 13 năm kinh nghiệm, anh đi tìm vẻ đẹp trong sự tự nhiên, mộc mạc và những cái chạm khẽ khàng.",
    fbLink: "https://www.facebook.com/hieutranharmonymedia",
  },
  {
    name: "Gia Hân",
    role: "Lead Makeup Artist",
    bio: "Chuyên gia trang điểm cô dâu với triết lý tôn vinh vẻ đẹp nguyên bản, tự nhiên và bền màu trong suốt buổi chụp cưới ngoại cảnh hay tiệc chính.",
    fbLink: "https://www.facebook.com/gia.hann.36890",
  },
  {
    name: "Harmony Studio",
    role: "Official Studio Profile",
    bio: "Không gian sáng tạo đặt tại Đồng Nai. Nơi kết nối cảm xúc, cùng các cặp đôi thảo luận ý tưởng và chuẩn bị phục trang cho ngày trọng đại.",
    fbLink: "https://www.facebook.com/profile.php?id=61550358332202",
  }
];

export function TeamGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl" data-reveal>
          <p className="mb-6 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Đội ngũ sáng lập
            <span className="h-px w-16 bg-neutral-300" />
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1.1] text-black">
            Những Người Kể Chuyện Bằng Ánh Sáng
          </h2>
          <p className="mt-6 text-sm leading-7 text-neutral-500 font-light">
            Chúng tôi là những người bạn đồng hành lặng lẽ trong ngày cưới của hai bạn, giữ nhịp cảm xúc chậm rãi và ghi lại những khoảnh khắc chân thật nhất.
          </p>
        </div>

        {/* Typography-First Team Directory */}
        <div className="border-t border-black/10 divide-y divide-black/10" data-reveal>
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group grid gap-6 py-10 md:grid-cols-[1fr_1.5fr_1fr] md:items-center transition-colors hover:bg-neutral-50/50 px-4 -mx-4 rounded-sm duration-300"
            >
              <div>
                <h3 className="font-serif text-3xl text-neutral-900 group-hover:text-black transition-colors">
                  {member.name}
                </h3>
                <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {member.role}
                </p>
              </div>
              
              <div>
                <p className="text-sm leading-7 text-neutral-500 font-light max-w-xl">
                  {member.bio}
                </p>
              </div>
              
              <div className="md:text-right">
                <Link
                  href={member.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-black transition-colors"
                >
                  Facebook Profile
                  <span className="font-serif text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
