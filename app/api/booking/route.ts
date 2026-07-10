import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const { name, phone, weddingDate, location, service, message, formName } = data;

		// Server-side validation
		if (!name || !phone || !service) {
			return NextResponse.json(
				{ error: "Vui lòng nhập đầy đủ các trường bắt buộc (Tên, Số điện thoại, Dịch vụ)." },
				{ status: 400 }
			);
		}

		const bookingItem = {
			id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
			name,
			phone,
			weddingDate: weddingDate || "Không cung cấp",
			location: location || "Không cung cấp",
			service,
			message: message || "",
			formName: formName || "Đặt lịch tư vấn",
			submittedAt: new Date().toISOString(),
		};

		// Log to server console
		console.log("\n[NEW LEAD SUBMISSION] ━━━━━━━━━━━━━━━━━━━━━━━━");
		console.log(`Họ tên:       ${bookingItem.name}`);
		console.log(`Điện thoại:   ${bookingItem.phone}`);
		console.log(`Dịch vụ:      ${bookingItem.service}`);
		console.log(`Ngày cưới:    ${bookingItem.weddingDate}`);
		console.log(`Địa điểm:     ${bookingItem.location}`);
		console.log(`Ghi chú:      ${bookingItem.message}`);
		console.log(`Nguồn Form:   ${bookingItem.formName}`);
		console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

		// Append to a local bookings.json file in scratch folder for simple mock persistence
		const scratchDir = path.join(process.cwd(), "scratch");
		if (!fs.existsSync(scratchDir)) {
			fs.mkdirSync(scratchDir, { recursive: true });
		}

		const filePath = path.join(scratchDir, "bookings.json");
		let currentBookings = [];

		if (fs.existsSync(filePath)) {
			try {
				const fileData = fs.readFileSync(filePath, "utf-8");
				currentBookings = JSON.parse(fileData);
			} catch (e) {
				console.error("Error reading bookings file, resetting:", e);
			}
		}

		currentBookings.push(bookingItem);
		fs.writeFileSync(filePath, JSON.stringify(currentBookings, null, 2), "utf-8");

		return NextResponse.json({ success: true, id: bookingItem.id }, { status: 200 });
	} catch (error) {
		console.error("API Booking route error:", error);
		return NextResponse.json(
			{ error: "Đã có lỗi hệ thống xảy ra khi lưu lịch hẹn." },
			{ status: 500 }
		);
	}
}
