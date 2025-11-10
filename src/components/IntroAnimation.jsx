import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
	const greetings = useMemo(
		() => [
			"Hello",
			"नमस्ते",
			"Hola",
			"Bonjour",
			"Salam",
			"Ciao",
			"Olá",
			"Здравствуйте",
			"Merhaba",
			"Γειά",
			"Hej",
			"Hallo",
		],
		[]
	);

	const [index, setIndex] = useState(0);

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (index < greetings.length - 1) {
			const id = setInterval(() => setIndex((i) => i + 1), 180);
			return () => clearInterval(id);
		} else {
			const t = setTimeout(() => setVisible(false), 300);
			return () => clearTimeout(t);
		}
	}, [index, greetings.length]);

	return (
		<AnimatePresence onExitComplete={onFinish}>
			{visible && (
				<motion.div
					className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
					initial={{ y: 0 }}
					exit={{
						y: "-110%",
						transition: {
							duration: 1.05,
							ease: [0.22, 1, 0.36, 1],
						},
					}}
				>
					<motion.h1
						key={index}
						className="text-5xl md:text-7xl lg:text-8xl font-bold"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.12 }}
					>
						{greetings[index]}
					</motion.h1>

					<svg
						className="absolute left-0 bottom-0 w-full h-36 md:h-48 lg:h-64"
						viewBox="0 0 1440 320"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							fill="#000"
							d="M0,128 C160,200 1280,200 1440,128 L1440,320 L0,320 Z"
						/>
					</svg>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
