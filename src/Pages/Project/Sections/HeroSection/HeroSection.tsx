import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HeroSection.module.scss";
import bgImage from "../../../../Shared/assets/img/test.jpg";

const Hero = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollY } = useScroll();
	const [sectionTop, setSectionTop] = useState(0);
	const [sectionHeight, setSectionHeight] = useState(1500);
	const [windowHeight, setWindowHeight] = useState(0);
	const [currentScroll, setCurrentScroll] = useState(0);

	useLayoutEffect(() => {
		if (sectionRef.current) {
			const rect = sectionRef.current.getBoundingClientRect();
			setSectionTop(rect.top + window.scrollY);
			setSectionHeight(rect.height);
			setWindowHeight(window.innerHeight);
		}
	}, []);

	useLayoutEffect(() => {
		return scrollY.onChange((latest) => setCurrentScroll(latest));
	}, [scrollY]);

	const maxY = sectionHeight - windowHeight;
	const initialCenterTop = windowHeight * 0.25;

	const yBg = useTransform(scrollY, [sectionTop, sectionTop + sectionHeight], ["0%", "20%"]);

	const yCenter = useTransform(scrollY, [sectionTop, sectionTop + maxY], ["0%", "10%"]);

	const bottomStyle = (isLeft: boolean) => {
		const isFixed = currentScroll < sectionTop + maxY;
		return {
			position: isFixed ? "fixed" : "absolute",
			bottom: 40,
			left: isLeft ? 20 : undefined,
			right: !isLeft ? 20 : undefined,
			textAlign: !isLeft ? "right" : undefined,
			zIndex: 2,
		} as const;
	};

	const centerStyle = () => {
		const scrollOffset = currentScroll - sectionTop;
		const isFixed = scrollOffset < maxY;
		const top = isFixed ? initialCenterTop : initialCenterTop + maxY;
		return {
			position: isFixed ? "fixed" : "absolute",
			top: `${top}px`,
			left: "50%",
			transform: "translateX(-50%)",
			zIndex: 2,
		} as const;
	};

	return (
		<section className={styles.hero} ref={sectionRef}>
			<motion.div className={styles.bg} style={{ backgroundImage: `url(${bgImage})`, y: yBg }} />

			<div style={centerStyle()}>
				<motion.div className={styles.center} style={{ y: yCenter }}>
					<h1>РТ-Инжиниринг: редизайн и проектирование внутреннего портала</h1>
					<a
						href='https://example.com'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.linkButton}>
						jois.moscow
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className={styles.linkIcon}>
							<rect x='1' y='1' width='14' height='14' rx='2' ry='2' />
							<path d='M5 11L11 5' />
							<path d='M11 5H5' />
							<path d='M11 5V11' />
						</svg>
					</a>
				</motion.div>
			</div>

			<div className={styles.bottomTexts}>
				<div style={bottomStyle(true)}>
					<motion.div>
						<p>Текст в левом нижнем углу</p>
					</motion.div>
				</div>

				<div style={bottomStyle(false)}>
					<motion.div>
						<p>Название компании</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
