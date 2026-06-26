"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
	const [progress, setProgress] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const updateProgress = () => {
			const currentScroll = window.scrollY;
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;

			if (totalHeight > 0) {
				setProgress((currentScroll / totalHeight) * 100);
			}
			setIsScrolled(currentScroll > 24);
		};

		window.addEventListener("scroll", updateProgress, { passive: true });
		updateProgress(); // Run once initially

		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	return (
		<div
			className={`fixed inset-x-0 z-50 h-0.5 w-full bg-neutral-100 transition-all duration-500 ${
				isScrolled ? "top-16" : "top-[5.5rem] md:top-24"
			}`}
		>
			<div
				className="h-full bg-black transition-all duration-75 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
