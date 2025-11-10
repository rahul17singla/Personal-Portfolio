import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import experiences from "../constants/experiences";

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
	const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
	const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
	const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

	const isAbove = idx % 2 === 0;
	const cardY = useTransform(
		scrollYProgress,
		[start, end],
		[isAbove ? 30 : -30, 0]
	);
	const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]); // for mobile slide-in

	if (layout === "desktop") {
		return (
			<div
				className="relative flex-1 flex justify-center items-center min-w-0"
				key={`${exp.company}-${exp.role}-${idx}`}
			>
				<motion.div
					className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
					style={{ scale: markerScale, opacity: markerOpacity }}
				/>
				<motion.div
					className={`absolute ${
						isAbove ? "-top-8" : "-bottom-8"
					} w-[3px] bg-white/40`}
					style={{ height: 40, opacity: cardOpacity }}
				/>
				<motion.article
					className={`absolute ${
						isAbove ? "bottom-12" : "top-12"
					} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
					style={{ opacity: cardOpacity, y: cardY }}
					transition={{ duration: 0.4, delay: idx * 0.15 }}
				>
					<h3 className="text-xl font-semibold">{exp.role}</h3>
					<p className="text-md text-gray-400">{exp.company}</p>
					<p className="text-md text-gray-400 mb-1">{exp.duration}</p>
					<p className="text-sm text-gray-300 break-words">
						{exp.description}
					</p>
				</motion.article>
			</div>
		);
	}

	// mobile
	return (
		<div
			key={`${exp.company}-${exp.role}-m-${idx}`}
			className="relative flex items-start"
		>
			<motion.div
				className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
				style={{ scale: markerScale, opacity: markerOpacity }}
			/>
			<motion.article
				className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
				style={{ opacity: cardOpacity, x: cardX }}
				transition={{ duration: 0.4, delay: idx * 0.15 }}
			>
				<h3 className="text-lg font-semibold break-words">
					{exp.role}
				</h3>
				<p className="text-sm text-gray-400 break-words">
					{exp.company}
				</p>
				<p className="text-sm text-gray-400 mb-2 break-words">
					{exp.duration}
				</p>
				<p className="text-sm text-gray-300 break-words">
					{exp.description}
				</p>
			</motion.article>
		</div>
	);
}

const Experience = () => {
	const sceneRef = React.useRef(null);

	// Detect screen size
	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Dynamic scene height
	const SCENE_HEIGHT_VH = isMobile
		? 100 * experiences.length * 1.6
		: 100 * experiences.length * 1.2;

	// Scroll progress
	const { scrollYProgress } = useScroll({
		target: sceneRef,
		offset: ["start start", "end end"],
	});

	const numExperiences = experiences.length;
	const thresholds = React.useMemo(
		() =>
			Array.from(
				{ length: numExperiences },
				(_, i) => (i + 1) / numExperiences
			),
		[numExperiences]
	);

	// Progress bars
	const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
	const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

	return (
		<section id="experience" className="relative bg-black text-white">
			<div
				ref={sceneRef}
				style={{ minHeight: `${SCENE_HEIGHT_VH}vh` }}
				className="relative"
			>
				<div className="sticky top-0 h-screen flex flex-col">
					{/* Title */}
					<div className="shrink-0 px-6 pt-8">
						<h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
							Experience
						</h2>
					</div>

					{/* Timeline */}
					<div className="flex-1 flex items-center justify-center px-6 pb-10">
						{/* ====================== DESKTOP ====================== */}
						<div className="relative w-full max-w-7xl hidden md:block">
							<div className="relative h-[6px] bg-white/15 rounded">
								<motion.div
									className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
									style={{ width: lineWidth }}
								/>
							</div>

							<div className="relative flex justify-between mt-0">
								{experiences.map((exp, idx) => {
									const start =
										idx === 0 ? 0 : thresholds[idx - 1];
									const end = thresholds[idx];
									return (
										<ExperienceItem
											key={`${exp.company}-${exp.role}-${idx}`}
											exp={exp}
											idx={idx}
											start={start}
											end={end}
											scrollYProgress={scrollYProgress}
											layout="desktop"
										/>
									);
								})}
							</div>
						</div>

						{/* ====================== MOBILE ====================== */}
						<div className="relative w-full max-w-md md:hidden">
							<div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
								<motion.div
									className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
									style={{ height: lineHeight }}
								/>
							</div>

							<div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
								{experiences.map((exp, idx) => {
									const start =
										idx === 0 ? 0 : thresholds[idx - 1];
									const end = thresholds[idx];
									return (
										<ExperienceItem
											key={`${exp.company}-${exp.role}-m-${idx}`}
											exp={exp}
											idx={idx}
											start={start}
											end={end}
											scrollYProgress={scrollYProgress}
											layout="mobile"
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
