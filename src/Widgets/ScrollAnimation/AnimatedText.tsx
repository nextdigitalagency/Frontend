import { useEffect, useRef } from "react";
import Lenis from "lenis";

import Picture1 from "../../Shared/assets/img/screen.png";
import Picture2 from "../../Shared/assets/img/brush.png";
import Picture3 from "../../Shared/assets/img/star.png";

import styles from "./AnimatedText.module.scss";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	const container = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});

	return (
		<main className={styles.main}>
			<div className={styles.fullscreen} />

			<div ref={container}>
				<Slide src={Picture1} left='-40%' progress={scrollYProgress} direction='left' />
				<Slide src={Picture2} left='-25%' progress={scrollYProgress} direction='right' />
				<Slide src={Picture3} left='-75%' progress={scrollYProgress} direction='left' />
			</div>

			<div className={styles.fullscreen} />
		</main>
	);
}

type SlideProps = {
	src: string;
	left: string;
	direction: string;
	progress: MotionValue<number>;
};

const Slide = ({ src, left, progress, direction }: SlideProps) => {
	const dir = direction == "left" ? -1 : 1;
	const x = useTransform(progress, [0, 1], [-250 * dir, 250 * dir]);
	return (
		<motion.div style={{ left, x }} className={styles.slide}>
			<Phrase src={src} title={"Frontend"} />
			<Phrase src={src} title={"Backend"} />
			<Phrase src={src} title={"Frontend"} />
			<Phrase src={src} title={"Design"} />
			<Phrase src={src} title={"Web"} />
			<Phrase src={src} title={"ML"} />
			<Phrase src={src} title={"Mobile"} />
			<Phrase src={src} title={"Mobile"} />
		</motion.div>
	);
};

type PhraseProps = {
	src: string;
	title: string;
};

const Phrase = ({ src, title }: PhraseProps) => {
	return (
		<div className={styles.phrase}>
			<p className={styles.title}>{title}</p>
			<span className={styles.imageWrapper}>
				<img src={src} alt='image' />
			</span>
		</div>
	);
};
