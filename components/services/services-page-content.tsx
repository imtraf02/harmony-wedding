"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Icon } from "@/components/home/icon";
import { contactInfo, services, timelineSteps } from "@/constants/data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const serviceDetails = [
	{
		title: "Chụp Ảnh Cưới",
		description:
			"Bộ ảnh cưới được lên concept theo câu chuyện, địa điểm và phong cách riêng của từng cặp đôi.",
		image: "/images/services/photography.webp",
		alt: "Dịch vụ chụp ảnh cưới ngoại cảnh Đà Lạt Harmony Wedding",
		deliverables: [
			"Tư vấn concept",
			"Chụp ngoại cảnh hoặc studio",
			"Retouch ảnh chọn lọc",
			"Thư viện ảnh online",
		],
	},
	{
		title: "Quay Phim Cưới",
		description:
			"Thước phim highlight giàu cảm xúc, dựng nhịp điện ảnh và giữ lại không khí thật của ngày cưới.",
		image: "/images/services/videography.webp",
		alt: "Dịch vụ quay phim cưới ngoại cảnh Harmony Wedding",
		deliverables: [
			"Kịch bản quay",
			"Highlight film",
			"Full ceremony",
			"Bàn giao file gốc theo gói",
		],
	},
	{
		title: "Trang Điểm Cô Dâu",
		description:
			"Makeup tự nhiên, thanh lịch, bền màu và phù hợp gương mặt, váy cưới, ánh sáng chụp.",
		image: "/images/services/makeup.webp",
		alt: "Dịch vụ trang điểm cô dâu Harmony Wedding",
		deliverables: [
			"Tư vấn layout",
			"Makeup thử theo lịch",
			"Làm tóc cô dâu",
			"Dặm chỉnh trong buổi chụp",
		],
	},
	{
		title: "Thuê Vest & Váy Cưới",
		description:
			"Cung cấp các mẫu vest chú rể lịch lãm và váy cưới thiết kế cao cấp, tôn vinh vóc dáng và phong cách riêng.",
		image: "/images/services/suit-dress-rental.webp",
		alt: "Dịch vụ thuê vest và váy cưới thiết kế cao cấp Harmony Wedding",
		deliverables: [
			"Thử váy & vest không giới hạn",
			"Chỉnh sửa số đo theo form dáng",
			"Giặt ủi khử khuẩn chuyên nghiệp",
			"Phụ kiện đi kèm trọn gói",
		],
	},
	{
		title: "Tổ Chức Tiệc Cưới",
		description:
			"Đồng hành điều phối timeline, hình ảnh, không gian và trải nghiệm trong ngày trọng đại.",
		image: "/images/services/wedding-planning.webp",
		alt: "Dịch vụ tổ chức tiệc cưới Harmony Wedding",
		deliverables: [
			"Timeline ngày cưới",
			"Điều phối ekip",
			"Concept trang trí",
			"Tư vấn trải nghiệm khách mời",
		],
	},
	{
		title: "Chụp Beauty",
		description:
			"Bộ ảnh chân dung nghệ thuật làm nổi bật đường nét thanh tú và biểu cảm tự nhiên của riêng bạn.",
		image: "/images/services/beauty.webp",
		alt: "Dịch vụ chụp ảnh chân dung nghệ thuật Beauty Harmony Wedding",
		deliverables: [
			"Tư vấn layout trang điểm",
			"Chụp cận cảnh với ánh sáng studio",
			"Hậu kỳ da chuyên nghiệp",
			"Bàn giao file chất lượng cao",
		],
	},
	{
		title: "Chụp Baby",
		description:
			"Ghi lại những khoảnh khắc trong trẻo, hồn nhiên và đáng yêu nhất của các bé trong không gian tự nhiên ấm áp.",
		image: "/images/services/baby.webp",
		alt: "Dịch vụ chụp ảnh cho bé Baby Portrait Harmony Wedding",
		deliverables: [
			"Chuẩn bị phụ kiện & bối cảnh",
			"Ekip kiên nhẫn và giàu kinh nghiệm",
			"Hỗ trợ thay trang phục cho bé",
			"Bàn giao album ảnh hoàn thiện",
		],
	},
	{
		title: "Chụp Sinh Nhật",
		description:
			"Lưu giữ nụ cười rạng rỡ và những khoảnh khắc ý nghĩa bên người thân, bạn bè trong ngày đón tuổi mới.",
		image: "/images/services/birthday.webp",
		alt: "Dịch vụ chụp ảnh sinh nhật sự kiện Harmony Wedding",
		deliverables: [
			"Chụp tiệc hoặc chụp ngoại cảnh",
			"Ghi trọn khoảnh khắc thổi nến & cắt bánh",
			"Chụp ảnh tập thể sắc nét",
			"Hậu kỳ nhanh chóng và bàn giao file",
		],
	},
	{
		title: "Đào Tạo Quay Chụp",
		description:
			"Khóa học thực chiến giúp bạn làm chủ thiết bị, tư duy bố cục, ánh sáng và kỹ năng quay phim, chụp ảnh từ cơ bản đến nâng cao.",
		image: "/images/services/teaching-media.webp",
		alt: "Khóa đào tạo quay phim chụp ảnh chuyên nghiệp Harmony Wedding",
		deliverables: [
			"Giáo trình lý thuyết bố cục & ánh sáng",
			"Thực hành trực tiếp với người mẫu",
			"Hướng dẫn setup thiết bị chuyên sâu",
			"Kỹ thuật hậu kỳ hình ảnh & video",
		],
	},
	{
		title: "Đào Tạo Makeup",
		description:
			"Khóa học trang điểm cá nhân hoặc chuyên nghiệp giúp bạn tự tin làm đẹp cho bản thân hoặc trở thành chuyên viên makeup thực thụ.",
		image: "/images/services/teaching-makeup.webp",
		alt: "Khóa đào tạo trang điểm chuyên nghiệp Harmony Wedding",
		deliverables: [
			"Nhận diện dáng khuôn mặt & loại da",
			"Kỹ thuật tạo lớp nền trong suốt",
			"Kỹ năng trang điểm mắt & phối màu",
			"Thực hành trên mẫu thật chuẩn studio",
		],
	},
];

const faqs = [
	{
		question: "Nên đặt lịch trước bao lâu?",
		answer:
			"Tối thiểu 4-6 tuần để có đủ thời gian tư vấn concept, chọn lịch chụp và chuẩn bị trang phục.",
	},
	{
		question: "Có hỗ trợ chọn địa điểm chụp không?",
		answer:
			"Có. Ekip sẽ đề xuất studio, ngoại cảnh hoặc địa điểm riêng theo phong cách bạn muốn.",
	},
	{
		question: "Khi nào nhận ảnh hoàn thiện?",
		answer:
			"Thời gian bàn giao phụ thuộc gói dịch vụ, thông thường từ 1-2 tuần sau khi chọn ảnh.",
	},
];

export function ServicesPageContent() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

	useScrollReveal(rootRef);

	const toggleFaq = (index: number) => {
		setOpenFaqIndex(openFaqIndex === index ? null : index);
	};

	return (
		<div ref={rootRef}>
			<section className="relative isolate overflow-hidden bg-white pt-28 text-black lg:pt-32">
				<div className="mx-auto grid max-w-[1720px] gap-12 px-5 pb-16 md:px-10 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:px-16">
					<div>
						<p
							className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700"
							data-reveal
						>
							Dịch vụ
							<span className="h-px w-16 bg-black" />
						</p>
						<h1
							className="font-serif text-[clamp(3.4rem,14vw,6rem)] leading-[0.88] lg:text-[clamp(4.4rem,7vw,8rem)]"
							data-reveal
						>
							Trọn Vẹn Cho Ngày Cưới
						</h1>
						<p
							className="mt-8 max-w-xl text-base leading-8 text-neutral-600"
							data-reveal
						>
							Từ album cưới, phim highlight, makeup đến điều phối ngày cưới,
							Harmony xây dựng một trải nghiệm thống nhất về hình ảnh, cảm xúc
							và nhịp câu chuyện.
						</p>
						<div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
							<Link
								className="inline-flex h-14 items-center justify-center bg-black px-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white"
								href={`tel:${contactInfo.hotline.split(" - ")[0].replace(/\./g, "")}`}
							>
								Tư vấn dịch vụ
							</Link>
							<Link
								className="inline-flex h-14 items-center justify-center border border-black/20 px-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-black"
								href="/portfolio"
							>
								Xem album
							</Link>
						</div>
					</div>

					<div
						className="relative h-[56vh] min-h-[380px] overflow-hidden bg-neutral-100 lg:h-[74vh]"
						data-reveal
					>
						<Image
							alt="Cặp đôi trong bộ ảnh cưới ngoại cảnh Harmony Wedding"
							className="object-cover"
							fill
							priority
							sizes="(min-width: 1024px) 58vw, 100vw"
							src="/images/services/services-hero.webp"
						/>
					</div>
				</div>
			</section>

			<section className="bg-black py-6 text-white">
				<div className="mx-auto grid max-w-[1720px] gap-4 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-16">
					{services.map((service, index) => (
						<article
							className={`flex items-center gap-4 border-white/10 py-5 ${index % 5 !== 4 && index !== services.length - 1 ? "lg:border-r lg:pr-6" : ""}`}
							data-reveal
							key={service.title}
						>
							<Icon className="size-9 shrink-0" name={service.icon} />
							<h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
								{service.title}
							</h2>
						</article>
					))}
				</div>
			</section>

			<section className="bg-white py-16 lg:py-24">
				<div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
					<div className="mb-12 max-w-3xl" data-reveal>
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
							Chi tiết dịch vụ
							<span className="h-px w-16 bg-black" />
						</p>
						<h2 className="font-serif text-[clamp(2.7rem,8vw,5rem)] leading-[0.98]">
							Một ekip, một tinh thần hình ảnh
						</h2>
					</div>

					<div className="grid gap-10">
						{serviceDetails.map((service, index) => (
							<article
								className="grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-center"
								data-reveal
								key={service.title}
							>
								<div className={index % 2 === 1 ? "lg:order-2" : ""}>
									<p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">
										0{index + 1}
									</p>
									<h3 className="mt-5 font-serif text-[clamp(2.2rem,6vw,4.2rem)] leading-none">
										{service.title}
									</h3>
									<p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
										{service.description}
									</p>
									<ul className="mt-8 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
										{service.deliverables.map((item) => (
											<li className="border-b border-black/10 pb-3" key={item}>
												{item}
											</li>
										))}
									</ul>
								</div>
								<div className="relative h-[46vh] min-h-[320px] overflow-hidden bg-neutral-100 lg:h-[62vh]">
									<Image
										alt={service.alt}
										className="object-cover"
										fill
										sizes="(min-width: 1024px) 55vw, 100vw"
										src={service.image}
									/>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-neutral-50 py-16 lg:py-24">
				<div className="mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.32fr_0.68fr] lg:px-16">
					<div data-reveal>
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
							Quy trình
							<span className="h-px w-16 bg-black" />
						</p>
						<h2 className="font-serif text-[clamp(2.6rem,7vw,4.8rem)] leading-[1]">
							Làm việc rõ ràng từ đầu đến cuối
						</h2>
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						{timelineSteps.map((step, index) => (
							<article
								className="border border-black/10 bg-white p-6"
								data-reveal
								key={step.title}
							>
								<div className="flex items-center justify-between">
									<Icon className="size-9" name={step.icon} />
									<span className="text-[0.68rem] font-semibold tracking-[0.22em] text-neutral-400">
										0{index + 1}
									</span>
								</div>
								<h3 className="mt-8 text-[0.78rem] font-semibold uppercase tracking-[0.22em]">
									{step.title}
								</h3>
								<p className="mt-4 text-sm leading-7 text-neutral-600">
									{step.description}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-5 pb-16 md:px-10 lg:px-16 lg:pb-24">
				<div className="mx-auto max-w-[860px] border-t border-black/10">
					{faqs.map((item, index) => {
						const isOpen = openFaqIndex === index;
						return (
							<article
								className="border-b border-black/10"
								key={item.question}
								data-reveal
							>
								<button
									aria-expanded={isOpen}
									className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
									onClick={() => toggleFaq(index)}
									type="button"
								>
									<h3 className="font-serif text-lg font-medium text-neutral-900 md:text-xl transition-colors group-hover:text-neutral-500">
										{item.question}
									</h3>
									<span
										className={`ml-4 text-lg font-light transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
									>
										＋
									</span>
								</button>
								<div
									className={`grid transition-all duration-300 ease-in-out ${
										isOpen
											? "grid-rows-[1fr] opacity-100"
											: "grid-rows-[0fr] opacity-0"
									}`}
								>
									<div className="overflow-hidden">
										<p className="pb-6 text-sm leading-7 text-neutral-600">
											{item.answer}
										</p>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</div>
	);
}
