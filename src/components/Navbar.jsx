import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import { FiMenu } from "react-icons/fi";
import Logo from "../assets/Logo.png";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const [visible, setVisible] = useState(true);

	const lastScrollY = useRef(0);
	const timerId = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY === 0) {
				setVisible(true);
				if (timerId.current) clearTimeout(timerId.current);
				lastScrollY.current = 0;
				return;
			}

			if (currentScrollY > lastScrollY.current) {
				setVisible(false);
				if (timerId.current) clearTimeout(timerId.current);
			} else {
				setVisible(true);
				if (timerId.current) clearTimeout(timerId.current);
				timerId.current = setTimeout(() => {
					setVisible(false);
				}, 1500);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (timerId.current) clearTimeout(timerId.current);
		};
	}, []);

	return (
		<>
			<nav
				className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 
                    transition-transform duration-300 
                    ${visible ? "translate-y-0" : "-translate-y-full"}`}
			>
				<div className="flex items-center">
					<img src={Logo} alt="Logo" className="w-14 h-14" />
					<div className="text-2xl font-bold text-white hidden sm:block">
						Rahul
					</div>
				</div>

				<div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
					<button
						onClick={() => setMenuOpen(true)}
						className="text-white text-3xl focus:outline-none"
						aria-label="Open menu"
					>
						<FiMenu />
					</button>
				</div>

				<div className="hidden lg:block">
					<a
						href="#contact"
						className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
					>
						Reach Out
					</a>
				</div>
			</nav>

			<OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
		</>
	);
}
