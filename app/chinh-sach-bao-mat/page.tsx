import type { Metadata } from "next";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import { getInfoData } from "@/lib/content";

interface PolicySection {
	heading: string;
	content: string;
	bullets?: string[];
	extendedContent?: string;
	contactDetails?: boolean;
}

export async function generateMetadata(): Promise<Metadata> {
	const infoData = await getInfoData();
	return {
		title: infoData.privacyPolicy.seo.title,
		description: infoData.privacyPolicy.seo.description,
		alternates: {
			canonical: "/chinh-sach-bao-mat",
		},
	};
}

export async function PrivacyPolicyPage() {
	const infoData = await getInfoData();
	const policy = infoData.privacyPolicy;

	return (
		<main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
			<Header variant="solid" />

			<BreadcrumbJsonLd
				items={[
					{ name: "Trang Chủ", href: "/" },
					{ name: "Chính Sách Bảo Mật", href: "/chinh-sach-bao-mat" },
				]}
			/>

			{/* Decorative background watermark */}
			<div className="absolute right-[-4vw] top-[24%] -translate-y-1/2 text-[16vw] font-serif font-semibold text-black/[0.015] select-none pointer-events-none tracking-widest uppercase hidden lg:block">
				Privacy
			</div>

			<div className="pt-32 pb-16 md:pt-44 md:pb-24 relative z-10">
				<div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
					<div className="border-b border-black/[0.05] pb-12 mb-16">
						<p className="mb-5 flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Thông tin pháp lý
							<span className="h-px w-10 bg-neutral-300" />
						</p>
						<h1 className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.15] text-neutral-900 tracking-tight">
							{policy.title.split(" ").slice(0, 2).join(" ")} <br />
							{policy.title.split(" ").slice(2).join(" ")}
						</h1>
						<p className="mt-6 text-xs text-neutral-400">Cập nhật lần cuối: {policy.lastUpdated}</p>
					</div>

					<div className="mx-auto max-w-[800px] text-[0.96rem] leading-relaxed text-neutral-700 space-y-10 font-light">
						{policy.sections.map((section: PolicySection, idx: number) => (
							<section key={idx}>
								<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
									{section.heading}
								</h2>
								<p dangerouslySetInnerHTML={{ __html: section.content }} />
								{section.bullets && (
									<ul className="list-disc pl-6 mt-3 space-y-2">
										{section.bullets.map((bullet: string, bIdx: number) => (
											<li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
										))}
									</ul>
								)}
								{section.extendedContent && (
									<p className="mt-3" dangerouslySetInnerHTML={{ __html: section.extendedContent }} />
								)}
								{section.contactDetails && (
									<ul className="list-none pl-0 mt-3 space-y-2 font-normal text-neutral-800">
										<li>Studio: {siteConfig.address}</li>
										<li>Hotline hỗ trợ: {siteConfig.links.phone} / {siteConfig.links.phoneSecondary}</li>
										<li>Email: {siteConfig.email}</li>
									</ul>
								)}
							</section>
						))}
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}

export default PrivacyPolicyPage;
