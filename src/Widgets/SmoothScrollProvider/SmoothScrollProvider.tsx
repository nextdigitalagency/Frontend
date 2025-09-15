import { motion, useSpring, useMotionValue } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

interface Props {
	children: ReactNode;
}

export const SmoothScrollLayout = ({ children }: Props) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const y = useMotionValue(0);
	const smoothY = useSpring(y, { damping: 25, stiffness: 120 });

	useEffect(() => {
		const handleScroll = () => {
			y.set(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [y]);

	useEffect(() => {
		if (scrollRef.current) {
			document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`;
		}
	}, [children]);

	return (
		<>
			<motion.div
				ref={scrollRef}
				style={{
					position: "fixed",
					zIndex: 10,
					top: 0,
					left: 0,
					width: "100%",
					y: smoothY.get() ? -smoothY.get() : 0,
				}}>
				{children}
			</motion.div>
		</>
	);
};
