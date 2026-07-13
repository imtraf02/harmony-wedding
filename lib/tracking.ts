interface TikTokPixel {
	track: (event: string, parameters?: Record<string, unknown>) => void;
	holdConsent: () => void;
	grantConsent: () => void;
	revokeConsent: () => void;
	page: () => void;
}

declare global {
	interface Window {
		ttq?: TikTokPixel;
	}
}

export type ContactMethod = "Zalo" | "Hotline" | "Messenger" | "Facebook" | "GoogleMaps" | "Email";

// Central tracking event trigger
export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
	if (typeof window === "undefined") return;

	// Check if consent has been granted
	const consent = localStorage.getItem("harmony-consent");
	
	if (process.env.NODE_ENV === "development") {
		console.log(`[Tracking Event] ${eventName}:`, {
			consent,
			parameters,
			pixelLoaded: !!window.ttq,
		});
	}

	if (consent !== "granted") {
		// Suppress tracking if consent is not explicitly granted
		return;
	}

	try {
		const ttq = window.ttq;
		if (ttq && typeof ttq.track === "function") {
			ttq.track(eventName, parameters);
		}
	} catch (err) {
		console.error("Tracking event failed:", err);
	}
}

/**
 * Tracks when a user clicks an external contact channel link (Zalo, Hotline, Messenger)
 */
export function trackContactChannel(method: ContactMethod, identifier?: string) {
	trackEvent("Contact", {
		content_type: "contact_channel",
		content_name: method,
		value: identifier || "",
	});
}

/**
 * Tracks a successful consultation form submit lead
 */
export function trackFormSubmission(formName: string = "Đặt lịch tư vấn 15 phút") {
	trackEvent("SubmitForm", {
		content_type: "lead_form",
		content_name: formName,
	});
}
