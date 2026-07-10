import type { Metadata } from "next";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
	title: "Chính Sách Bảo Mật - Harmony Wedding",
	description:
		"Chính sách bảo mật thông tin khách hàng, sử dụng cookie và pixel theo dõi tại Harmony Wedding Studio.",
	alternates: {
		canonical: "/chinh-sach-bao-mat",
	},
};

export function PrivacyPolicyPage() {
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
						<h1 className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.98] text-neutral-900 tracking-tight">
							Chính Sách <br />
							Bảo Mật Thông Tin
						</h1>
						<p className="mt-6 text-xs text-neutral-400">Cập nhật lần cuối: Ngày 10 tháng 07 năm 2026</p>
					</div>

					<div className="mx-auto max-w-[800px] text-[0.96rem] leading-relaxed text-neutral-700 space-y-10 font-light">
						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								1. Giới thiệu chung
							</h2>
							<p>
								Chào mừng bạn đến với <strong>Harmony Wedding</strong>. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin khi bạn truy cập website hoặc sử dụng dịch vụ của chúng tôi.
							</p>
						</section>

						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								2. Thông tin chúng tôi thu thập
							</h2>
							<p>
								Khi bạn điền biểu mẫu tư vấn trên website hoặc kết nối với chúng tôi qua các kênh liên lạc trực tiếp, chúng tôi có thể thu thập các thông tin bao gồm:
							</p>
							<ul className="list-disc pl-6 mt-3 space-y-2">
								<li>Họ và tên của bạn và bạn đời.</li>
								<li>Số điện thoại, tài khoản Zalo hoặc Facebook để liên hệ.</li>
								<li>Ngày cưới dự kiến và địa điểm/khu vực chụp hình mong muốn.</li>
								<li>Các gói dịch vụ cưới mà bạn đang quan tâm.</li>
								<li>Ý kiến, ghi chú hoặc yêu cầu đặc biệt của bạn.</li>
							</ul>
						</section>

						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								3. Cách chúng tôi sử dụng thông tin
							</h2>
							<p>Chúng tôi chỉ sử dụng thông tin thu thập được cho các mục đích:</p>
							<ul className="list-disc pl-6 mt-3 space-y-2">
								<li>Tư vấn ý tưởng chụp ảnh, lên moodboard và gửi báo giá dịch vụ cưới phù hợp nhất.</li>
								<li>Đặt lịch hẹn làm việc trực tiếp tại studio hoặc xếp lịch chụp hình ngoại cảnh/phim trường.</li>
								<li>Cải thiện chất lượng dịch vụ chăm sóc khách hàng và trải nghiệm trên website.</li>
								<li>Đo lường, tối ưu hóa các chiến dịch quảng cáo trên các nền tảng số (như TikTok và Facebook) dựa trên sự đồng ý của bạn.</li>
							</ul>
						</section>

						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								4. Sử dụng Cookie và Công cụ đo lường
							</h2>
							<p>
								Website của chúng tôi sử dụng cookie để lưu trữ thông tin duyệt web và tối ưu hóa tính năng hiển thị. Đồng thời, chúng tôi tích hợp <strong>TikTok Pixel</strong> để hỗ trợ đo lường hiệu quả quảng cáo.
							</p>
							<p className="mt-3">
								Chúng tôi tôn trọng quyền lựa chọn của bạn. Pixel sẽ không kích hoạt thu thập thông tin cho đến khi bạn nhấn chọn <strong>“Đồng ý”</strong> trên Banner Cookie Consent hiển thị trên trang web. Bạn hoàn toàn có thể từ chối mà không ảnh hưởng đến bất kỳ trải nghiệm duyệt ảnh nào khác trên site.
							</p>
						</section>

						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								5. Bảo mật thông tin dữ liệu
							</h2>
							<p>
								Harmony Wedding áp dụng các phương thức kỹ thuật và bảo mật phù hợp để ngăn chặn việc truy cập trái phép, tiết lộ, thay đổi hoặc phá hủy dữ liệu cá nhân của bạn. Thông tin của bạn được lưu trữ nội bộ và chỉ nhân viên được phân công phục vụ lịch trình cưới của bạn mới có quyền tiếp cận. Chúng tôi cam kết tuyệt đối không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại.
							</p>
						</section>

						<section>
							<h2 className="font-serif text-xl text-neutral-900 font-medium mb-4">
								6. Liên hệ và Yêu cầu xóa dữ liệu
							</h2>
							<p>
								Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này hoặc muốn yêu cầu chỉnh sửa, xóa bỏ toàn bộ thông tin đã đăng ký trên website, vui lòng liên hệ với điều phối viên của chúng tôi qua:
							</p>
							<ul className="list-none pl-0 mt-3 space-y-2 font-normal text-neutral-800">
								<li>Studio: {siteConfig.address}</li>
								<li>Hotline hỗ trợ: {siteConfig.links.phone} / {siteConfig.links.phoneSecondary}</li>
								<li>Email: {siteConfig.email}</li>
							</ul>
						</section>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}

export default PrivacyPolicyPage;
