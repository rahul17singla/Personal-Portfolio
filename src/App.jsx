import { useState } from "react";

import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import IntroAnimation from "./components/INtroAnimation";

export default function App() {
	const [introDone, setIntroDone] = useState(false);

	return (
		<>
			{!introDone && (
				<IntroAnimation onFinish={() => setIntroDone(true)} />
			)}

			{introDone && (
				<div className="relative animated-gradient text-white">
					<CustomCursor />
					<ParticlesBackground />
					<Navbar />
					<Home />
					<About />
					<Skills />
					<Experience />
					<Projects />
					<Contact />
					<Footer />
				</div>
			)}
		</>
	);
}
