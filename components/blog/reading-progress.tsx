"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const updateProgress = () => {
			const currentScroll = window.scrollY;
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;

			if (totalHeight > 0) {
				setProgress((currentScroll / totalHeight) * 100);
			}
		};

		window.addEventListener("scroll", updateProgress, { passive: true });
		updateProgress(); // Run once initially

		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	return (
		<div className="fixed top-0 inset-x-0 z-55 h-0.5 w-full bg-neutral-100/30">
			<div
				className="h-full bg-black transition-all duration-75 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
