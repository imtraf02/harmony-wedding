import type {
	AlbumDetail,
	AlbumFeatureImage,
	AlbumItem,
	AlbumValue,
	ContactInfo,
	MenuItem,
	PortfolioItem,
	ServiceItem,
	StatItem,
	TestimonialItem,
	TimelineStep,
} from "@/types/home";

const localImage = (path: string) => `/images/wedding/${path}`;

export const menuItems: MenuItem[] = [
	{ label: "Trang Chủ", href: "/" },
	{ label: "Về Chúng Tôi", href: "/about" },
	{ label: "Dịch Vụ", href: "/services" },
	{ label: "Tác Phẩm", href: "/portfolio" },
	{ label: "Mẫu Đồ", href: "/mau-do" },
	{ label: "Bảng Giá", href: "/pricing" },
	{ label: "Cẩm Nang", href: "/blog" },
	{ label: "Liên Hệ", href: "/contact" },
];

export const weddingImages = {
	hero: "/images/home/hero-banner.webp",
	about: "/images/home/about-us.webp",
	process: "/images/home/timeline.webp",
};

export const services: ServiceItem[] = [
	{
		title: "Chụp Ảnh Cưới",
		description: "Những khung hình tĩnh lặng, giàu cảm xúc và có chiều sâu.",
		icon: "camera",
	},
	{
		title: "Quay Phim Cưới",
		description: "Thước phim điện ảnh được dựng theo nhịp câu chuyện của bạn.",
		icon: "film",
	},
	{
		title: "Trang Điểm Cô Dâu",
		description:
			"Vẻ đẹp thanh lịch, tự nhiên và bền vững trong từng khoảnh khắc.",
		icon: "dress",
	},
	{
		title: "Thuê Vest & Váy Cưới",
		description:
			"Các mẫu vest và váy cưới thiết kế cao cấp, tinh tế và thanh lịch.",
		icon: "dress-rental",
	},
	{
		title: "Tổ Chức Tiệc Cưới",
		description: "Kịch bản chỉn chu, tinh giản và trọn vẹn cho ngày trọng đại.",
		icon: "calendar",
	},
	{
		title: "Chụp Beauty",
		description: "Tôn vinh đường nét cá nhân qua ảnh chân dung nghệ thuật.",
		icon: "moodboard",
	},
	{
		title: "Chụp Baby",
		description: "Lưu giữ nét thơ ngây và khoảnh khắc đầu đời đáng yêu của bé.",
		icon: "heart",
	},
	{
		title: "Chụp Sinh Nhật",
		description: "Ghi lại niềm vui đón tuổi mới bên bạn bè và người thân.",
		icon: "calendar",
	},
	{
		title: "Đào Tạo Quay Chụp",
		description: "Khóa học nhiếp ảnh và quay phim thực chiến từ cơ bản đến nâng cao.",
		icon: "aperture",
	},
	{
		title: "Đào Tạo Makeup",
		description: "Khóa học trang điểm cá nhân và chuyên nghiệp chuẩn xu hướng.",
		icon: "edit",
	},
];

export const portfolioItems: PortfolioItem[] = [
	{
		location: "Sunny Garden",
		image: localImage("sunny-garden/1.webp"),
		alt: "Cô dâu chú rể ngập tràn hạnh phúc tại phim trường Sunny Garden - Harmony Wedding",
		slug: "sunny-garden",
	},
	{
		location: "Đường Phố Sài Gòn",
		image: localImage("duong-pho-ho-chi-minh-2/1.webp"),
		alt: "Album ảnh cưới đường phố Sài Gòn đầy phóng khoáng - Harmony Wedding",
		slug: "duong-pho-ho-chi-minh-2",
	},
	{
		location: "Đà Lạt",
		image: localImage("da-lat/7.webp"),
		alt: "Cặp đôi giữa núi đồi hoàng hôn Đà Lạt - Harmony Wedding",
		slug: "da-lat",
	},
	{
		location: "Vũ Garden",
		image: localImage("vu-garden/1.webp"),
		alt: "Cặp đôi lãng mạn tại vườn hồng Vũ Garden - Harmony Wedding",
		slug: "vu-garden",
	},
	{
		location: "An Garden",
		image: localImage("an-garden/1.webp"),
		alt: "Album ảnh cưới An Garden đầy trong trẻo và tự nhiên - Harmony Wedding",
		slug: "an-garden",
	},
	{
		location: "Studio Phông Hoa",
		image: localImage("studio-phong-hoa-do-trang/1.webp"),
		alt: "Ảnh chân dung cưới Studio phông hoa đỏ trắng - Harmony Wedding",
		slug: "studio-phong-hoa-do-trang",
	},
	{
		location: "Đường Phố Sài Gòn",
		image: localImage("duong-pho-ho-chi-minh/2.webp"),
		alt: "Ảnh cưới phong cách cổ điển trên đường phố Sài Gòn - Harmony Wedding",
		slug: "duong-pho-ho-chi-minh",
	},
	{
		location: "Studio Tối Giản",
		image: localImage("studio-phong-trang-tron/1.webp"),
		alt: "Ảnh cưới Studio phông trắng trơn tối giản và thanh lịch - Harmony Wedding",
		slug: "studio-phong-trang-tron",
	},
	{
		location: "Studio Phông Vải",
		image: localImage("studio-phong-vai-lanh-trang/1.webp"),
		alt: "Ảnh cưới Studio phông vải lạnh trắng tinh tế - Harmony Wedding",
		slug: "studio-phong-vai-lanh-trang",
	},
	{
		location: "Studio Hàn Quốc",
		image: localImage("studio-han-quoc/1.webp"),
		alt: "Ảnh cưới phong cách Hàn Quốc nhẹ nhàng - Harmony Wedding",
		slug: "studio-han-quoc",
	},
	{
		location: "Sunny Garden",
		image: localImage("sunny-garden/15.webp"),
		alt: "Ảnh cưới chụp cận cảnh cô dâu rạng rỡ tại Sunny Garden - Harmony Wedding",
		slug: "sunny-garden",
	},
	{
		location: "Đường Phố Sài Gòn",
		image: localImage("duong-pho-ho-chi-minh-2/5.webp"),
		alt: "Cô dâu chú rể nắm tay đi dạo giữa lòng Sài Gòn - Harmony Wedding",
		slug: "duong-pho-ho-chi-minh-2",
	},
	{
		location: "Đà Lạt",
		image: localImage("da-lat/2.webp"),
		alt: "Cặp đôi cười rạng rỡ giữa rừng thông Đà Lạt - Harmony Wedding",
		slug: "da-lat",
	},
	{
		location: "Vũ Garden",
		image: localImage("vu-garden/6.webp"),
		alt: "Cô dâu lộng lẫy bên khung cửa sổ cổ kính Vũ Garden - Harmony Wedding",
		slug: "vu-garden",
	},
	{
		location: "An Garden",
		image: localImage("an-garden/3.webp"),
		alt: "Bối cảnh nhà kính An Garden thơ mộng - Harmony Wedding",
		slug: "an-garden",
	},
	{
		location: "Studio Phông Hoa",
		image: localImage("studio-phong-hoa-do-trang/3.webp"),
		alt: "Ảnh cưới phong cách cổ điển bên phông hoa studio - Harmony Wedding",
		slug: "studio-phong-hoa-do-trang",
	},
	{
		location: "Đường Phố Sài Gòn",
		image: localImage("duong-pho-ho-chi-minh/6.webp"),
		alt: "Khoảnh khắc lãng mạn của cặp đôi bên xe máy cổ trên phố - Harmony Wedding",
		slug: "duong-pho-ho-chi-minh",
	},
	{
		location: "Studio Tối Giản",
		image: localImage("studio-phong-trang-tron/3.webp"),
		alt: "Cặp đôi thanh lịch trong studio tối giản - Harmony Wedding",
		slug: "studio-phong-trang-tron",
	},
	{
		location: "Studio Phông Vải",
		image: localImage("studio-phong-vai-lanh-trang/3.webp"),
		alt: "Vẻ đẹp sang trọng của cặp đôi bên phông nền vải lạnh - Harmony Wedding",
		slug: "studio-phong-vai-lanh-trang",
	},
	{
		location: "Studio Hàn Quốc",
		image: localImage("studio-han-quoc/3.webp"),
		alt: "Cặp đôi ngọt ngào trong studio phong cách Hàn Quốc - Harmony Wedding",
		slug: "studio-han-quoc",
	},
];

export const albumHero = {
	image: localImage("da-lat/2.webp"),
	alt: "Album ảnh cưới Harmony Wedding - Cặp đôi tại Đà Lạt",
};

export const albumFilters = [
	"Tất cả album",
	"An Garden",
	"Đà Lạt",
	"Đường Phố Hồ Chí Minh",
	"Studio",
	"Sunny Garden",
	"Vũ Garden",
];

export const albumItems: AlbumItem[] = [
	{
		slug: "sunny-garden",
		title: "Sunny Garden",
		category: "Sunny Garden",
		location: "Sunny Garden",
		image: localImage("sunny-garden/1.webp"),
		alt: "Album ảnh cưới Sunny Garden - Harmony Wedding",
		width: 1706,
		height: 2560,
	},
	{
		slug: "studio-phong-trang-tron",
		title: "Studio Phông Trắng Trơn",
		category: "Studio",
		location: "Studio",
		image: localImage("studio-phong-trang-tron/1.webp"),
		alt: "Album ảnh cưới Studio Phòng Trắng Tròn - Harmony Wedding",
		width: 1365,
		height: 2048,
	},
	{
		slug: "duong-pho-ho-chi-minh-2",
		title: "Đường Phố Hồ Chí Minh - Bộ 2",
		category: "Đường Phố Hồ Chí Minh",
		location: "Đường Phố Hồ Chí Minh",
		image: localImage("duong-pho-ho-chi-minh-2/1.webp"),
		alt: "Album ảnh cưới Đường Phố Hồ Chí Minh Bộ 2 - Harmony Wedding",
		width: 1706,
		height: 2560,
	},
	{
		slug: "duong-pho-ho-chi-minh",
		title: "Đường Phố Hồ Chí Minh",
		category: "Đường Phố Hồ Chí Minh",
		location: "Đường Phố Hồ Chí Minh",
		image: localImage("duong-pho-ho-chi-minh/2.webp"),
		alt: "Album ảnh cưới Đường Phố Hồ Chí Minh - Harmony Wedding",
		width: 5472,
		height: 3648,
	},
	{
		slug: "da-lat",
		title: "Đà Lạt",
		category: "Đà Lạt",
		location: "Đà Lạt",
		image: localImage("da-lat/7.webp"),
		alt: "Album ảnh cưới Đà Lạt - Harmony Wedding",
		width: 2048,
		height: 1366,
	},
	{
		slug: "an-garden",
		title: "An Garden",
		category: "An Garden",
		location: "An Garden",
		image: localImage("an-garden/1.webp"),
		alt: "Album ảnh cưới An Garden - Harmony Wedding",
		width: 6720,
		height: 4480,
	},
	{
		slug: "studio-phong-hoa-do-trang",
		title: "Studio Phông Hoa Đỏ Trắng",
		category: "Studio",
		location: "Studio",
		image: localImage("studio-phong-hoa-do-trang/1.webp"),
		alt: "Album ảnh cưới Studio Phòng Hoa Đỏ Trắng - Harmony Wedding",
		width: 1366,
		height: 2048,
	},
	{
		slug: "vu-garden",
		title: "Vũ Garden",
		category: "Vũ Garden",
		location: "Vũ Garden",
		image: localImage("vu-garden/1.webp"),
		alt: "Album ảnh cưới Vũ Garden - Harmony Wedding",
		width: 1365,
		height: 2048,
	},
	{
		slug: "studio-phong-vai-lanh-trang",
		title: "Studio Phông Vải Lạnh Trắng",
		category: "Studio",
		location: "Studio",
		image: localImage("studio-phong-vai-lanh-trang/1.webp"),
		alt: "Album ảnh cưới Studio Phông Vải Lạnh Trắng - Harmony Wedding",
		width: 1365,
		height: 2048,
	},
	{
		slug: "studio-han-quoc",
		title: "Studio Phong Cách Hàn Quốc",
		category: "Studio",
		location: "Studio",
		image: localImage("studio-han-quoc/1.webp"),
		alt: "Album ảnh cưới Studio Phong Cách Hàn Quốc - Harmony Wedding",
		width: 1365,
		height: 2048,
	},
];

export const albumDetails: AlbumDetail[] = [
	{
		slug: "da-lat",
		eyebrow: "Đà Lạt",
		title: "Đà Lạt",
		scriptTitle: "Thiên Đường Tình Yêu",
		description:
			"Đà Lạt luôn có một sức hút đặc biệt bởi không khí se lạnh, khung cảnh thơ mộng và những khoảnh khắc lãng mạn.",
		imageCount: "45 ảnh",
		location: "Đà Lạt, Việt Nam",
		heroImage: localImage("da-lat/2.webp"),
		heroAlt: "Cặp đôi cưới trong rừng thông Đà Lạt",
		gallery: [
			{
				image: localImage("da-lat/1.webp"),
				alt: "Cô dâu chú rể đi giữa rừng thông Đà Lạt trong bộ ảnh cưới",
				featured: true,
				width: 1366,
				height: 2048,
			},
			{
				image: localImage("da-lat/2.webp"),
				alt: "Khoảnh khắc cô dâu chú rể gần nhau trong rừng thông Đà Lạt",
				width: 2048,
				height: 1366,
			},
			{
				image: localImage("da-lat/7.webp"),
				alt: "Cặp đôi giữa núi đồi hoàng hôn Đà Lạt - Ảnh cưới lãng mạn",
				width: 2048,
				height: 1366,
			},
			{
				image: localImage("da-lat/15.webp"),
				alt: "Cặp đôi bên hồ sương mờ Đà Lạt trong album ảnh cưới",
				width: 2048,
				height: 1366,
			},
			{
				image: localImage("da-lat/10.webp"),
				alt: "Cô dâu chú rể trong ánh sáng rừng thông Đà Lạt - Harmony Wedding",
				width: 1366,
				height: 2048,
			},
		],
		info: [
			{
				title: "Địa điểm",
				description: "Đà Lạt, Lâm Đồng",
				icon: "location",
			},
			{
				title: "Phong cách",
				description: "Tự nhiên, Lãng mạn",
				icon: "heart",
			},
		],
	},
];

export const featuredAlbumImages: AlbumFeatureImage[] = [
	{
		image: localImage("da-lat/1.webp"),
		alt: "Ảnh cưới cặp đôi trong rừng thông Đà Lạt - Harmony Wedding",
		featured: true,
		width: 1366,
		height: 2048,
	},
	{
		image: localImage("da-lat/7.webp"),
		alt: "Cặp đôi bên xe cổ trong album ảnh cưới Đà Lạt - Harmony Wedding",
		width: 2048,
		height: 1366,
	},
	{
		image: localImage("da-lat/10.webp"),
		alt: "Cặp đôi trao nhẫn cưới trong buổi chụp hình cưới Đà Lạt",
		width: 1366,
		height: 2048,
	},
	{
		image: localImage("da-lat/15.webp"),
		alt: "Cô dâu trong váy cưới nhìn về thung lũng Đà Lạt",
		width: 2048,
		height: 1366,
	},
];

export const albumValues: AlbumValue[] = [
	{
		title: "Ảnh Chất Luyên Cao",
		description: "Thiết bị hiện đại, hình ảnh sắc nét",
		icon: "camera",
	},
	{
		title: "Cảm Xúc Chân Thật",
		description: "Lưu giữ khoảnh khắc tự nhiên nhất",
		icon: "heart",
	},
	{
		title: "Phong Cách Đa Dạng",
		description: "Phù hợp với mọi cá tính của cặp đôi",
		icon: "diamond",
	},
	{
		title: "Hậu Kỳ Chỉn Chu",
		description: "Màu sắc tinh tế, hoàn thiện tỉ mỉ",
		icon: "clock",
	},
];

export const stats: StatItem[] = [
	{ value: 100, suffix: "+", label: "Bộ Ảnh Cưới" },
	{ value: 13, suffix: "+", label: "Năm Kinh Nghiệm" },
	{ value: 100, suffix: "%", label: "Khách Hàng Hài Lòng" },
];

export const albumStats: AlbumValue[] = [
	{
		title: "100+",
		description: "Bộ ảnh cưới",
		icon: "camera",
	},
	{
		title: "1000+",
		description: "Khoảnh khắc đẹp",
		icon: "heart",
	},
	{
		title: "13+",
		description: "Năm kinh nghiệm",
		icon: "diamond",
	},
	{
		title: "100%",
		description: "Khách hàng hài lòng",
		icon: "clock",
	},
];

export const timelineSteps: TimelineStep[] = [
	{
		title: "Tư Vấn",
		description: "Lắng nghe mong muốn, gu thẩm mỹ và nhịp sống của hai bạn.",
		icon: "chat",
		image: "/images/home/timeline-tuvan.webp",
		alt: "Bước 1: Bàn tay ghi chú trong buổi tư vấn ảnh cưới Harmony Wedding",
	},
	{
		title: "Lên Ý Tưởng",
		description:
			"Xây dựng moodboard, bối cảnh, phục trang và tinh thần hình ảnh.",
		icon: "moodboard",
		image: "/images/home/timeline-lenytuong.webp",
		alt: "Bước 2: Moodboard lên ý tưởng chụp ảnh cưới Harmony Wedding",
	},
	{
		title: "Chụp Hình",
		description:
			"Dẫn dắt tự nhiên để cảm xúc thật xuất hiện trong từng khung hình.",
		icon: "aperture",
		image: "/images/home/timeline-chupanh.webp",
		alt: "Bước 3: Máy ảnh trong buổi chụp hình cưới chuyên nghiệp",
	},
	{
		title: "Hậu Kỳ",
		description:
			"Xử lý màu sắc tinh tế, giữ lại chất liệu và vẻ đẹp nguyên bản.",
		icon: "edit",
		image: "/images/home/timeline-hauky.webp",
		alt: "Bước 4: Không gian hậu kỳ chỉnh sửa ảnh cưới Harmony Wedding",
	},
	{
		title: "Bàn Giao",
		description: "Trao album, phim và thư viện số với trải nghiệm riêng tư.",
		icon: "package",
		image: "/images/home/timeline-bangiao.webp",
		alt: "Bước 5: Album cưới được bàn giao cho khách hàng Harmony Wedding",
	},
];

export const testimonials: TestimonialItem[] = [
	{
		name: "Thuỳ Linh",
		role: "Cô dâu · Album Đà Lạt",
		quote:
			"Ekip của Harmony làm việc vô cùng chuyên nghiệp. Từng khoảnh khắc tự nhiên, những cái chạm tay khẽ khàng đều được ghi lại trọn vẹn và đầy tinh tế.",
	},
	{
		name: "Minh Anh",
		role: "Cô dâu · Album Sunny Garden",
		quote:
			"Không hề có cảm giác gượng gạo trước ống kính. Ekip đã dẫn dắt chúng tôi tìm lại cảm xúc thật và biến nó thành những kỷ niệm vượt thời gian.",
	},
	{
		name: "Hoàng Nam",
		role: "Chú rể · Album Concept Studio",
		quote:
			"Tinh tế trong từng khung hình, chỉn chu trong từng chi tiết hậu kỳ. Harmony thực sự đã mang lại một trải nghiệm hình ảnh tuyệt vời.",
	},
	{
		name: "Bích Phương",
		role: "Cô dâu · Album Phố Sài Gòn",
		quote:
			"Một trải nghiệm chụp ảnh cưới nhẹ nhàng và lãng mạn. Ekip rất nhiệt tình, chu đáo và biết cách khai thác những góc mặt đẹp nhất.",
	},
	{
		name: "Quốc Khánh",
		role: "Chú rể · Album Vũ Garden",
		quote:
			"Sự tinh tế, tự nhiên trong màu ảnh của Harmony là điều làm chúng tôi ấn tượng nhất. Cảm ơn ekip đã ghi lại những ký ức trọn đời tuyệt vời.",
	},
	{
		name: "Lan Anh",
		role: "Cô dâu · Album Ngày Cưới",
		quote:
			"Gói chụp trọn gói rất tiện lợi và chỉn chu. Layout makeup tự nhiên, tone màu ảnh ấm áp đúng gu. Rất hài lòng và an tâm khi chọn Harmony.",
	},
];

export const contactInfo: ContactInfo = {
	hotline: "0357.256.845 - 0388.660.678",
	zalo: "0357.256.845 - 0388.660.678",
	facebook: "Harmony Wedding / Hiếu Trần",
	address: "45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai",
	email: "giahan6845@gmail.com / studiohieutrancanon@gmail.com",
};
