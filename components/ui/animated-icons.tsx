"use client";

import { motion } from "motion/react";

// 1. Animated Phone Icon (Rings/Vibrates on hover)
export function AnimatedPhone({ className = "size-5", style }: { className?: string; style?: React.CSSProperties }) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={style}
			whileHover="animate"
		>
			<motion.path
				d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
				variants={{
					animate: {
						rotate: [0, -10, 10, -10, 10, -10, 10, 0],
						transition: {
							duration: 0.5,
							ease: "easeInOut",
						},
					},
				}}
				style={{ originX: "0.5", originY: "0.5" }}
			/>
		</motion.svg>
	);
}

// 2. Animated Message Circle Icon (Messenger - dots pulse on hover)
export function AnimatedMessageCircle({ className = "size-5", style }: { className?: string; style?: React.CSSProperties }) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={style}
			whileHover="animate"
		>
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
			<motion.circle
				cx="8"
				cy="12"
				r="1"
				fill="currentColor"
				variants={{
					animate: {
						scale: [1, 1.4, 1],
						transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0 },
					},
				}}
			/>
			<motion.circle
				cx="12"
				cy="12"
				r="1"
				fill="currentColor"
				variants={{
					animate: {
						scale: [1, 1.4, 1],
						transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.15 },
					},
				}}
			/>
			<motion.circle
				cx="16"
				cy="12"
				r="1"
				fill="currentColor"
				variants={{
					animate: {
						scale: [1, 1.4, 1],
						transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.3 },
					},
				}}
			/>
		</motion.svg>
	);
}

// 3. Animated Arrow Right (Slides to the right on hover)
export function AnimatedArrowRight({ className = "size-4", style }: { className?: string; style?: React.CSSProperties }) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={style}
			whileHover="animate"
		>
			<motion.line
				x1="5"
				y1="12"
				x2="19"
				y2="12"
				variants={{
					animate: {
						x1: 5,
						x2: 21,
						transition: { duration: 0.3, ease: "easeOut" },
					},
				}}
			/>
			<motion.polyline
				points="12 5 19 12 12 19"
				variants={{
					animate: {
						x: 2,
						transition: { duration: 0.3, ease: "easeOut" },
					},
				}}
			/>
		</motion.svg>
	);
}

// 4. Animated Heart (Beats/Pulses on hover)
export function AnimatedHeart({ className = "size-5", style }: { className?: string; style?: React.CSSProperties }) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={style}
			whileHover="animate"
		>
			<motion.path
				d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
				variants={{
					animate: {
						scale: [1, 1.15, 0.95, 1.1, 1],
						transition: {
							duration: 0.6,
							ease: "easeInOut",
						},
					},
				}}
				style={{ originX: "0.5", originY: "0.5" }}
			/>
		</motion.svg>
	);
}
