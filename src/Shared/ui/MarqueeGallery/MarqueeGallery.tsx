import React, { useRef, useEffect, useState } from "react";
import styles from "./MarqueeGallery.module.scss";
import avito from "../../assets/img/companies/avito.png";
import drevo from "../../assets/img/companies/drevo.png";
import vita from "../../assets/img/companies/vita.png";
import garibaldi from "../../assets/img/companies/garibaldi.png";
import sbkk from "../../assets/img/companies/sbkk.png";
import logoupalicha from "../../assets/img/companies/logoupalicha.png";
import cosmoport from "../../assets/img/companies/cosmoport.png";
import volgaterm from "../../assets/img/companies/volgaterm.png";
import farbricaKachestva from "../../assets/img/companies/farbricaKachestva.png";

const images = [
	avito,
	drevo,
	vita,
	garibaldi,
	sbkk,
	logoupalicha,
	cosmoport,
	volgaterm,
	farbricaKachestva,
];

export const MarqueeGallery: React.FC = () => {
	const marqueeRef = useRef<HTMLDivElement>(null);
	const [duration, setDuration] = useState(20); // начальная длительность

	useEffect(() => {
		const updateDuration = () => {
			if (marqueeRef.current) {
				const width = marqueeRef.current.scrollWidth / 2; // половина контента
				const speed = 50;
				setDuration(width / speed);
			}
		};

		updateDuration();
		window.addEventListener("resize", updateDuration);
		return () => window.removeEventListener("resize", updateDuration);
	}, []);

	const loopedImages = [...images, ...images];

	return (
		<div className={styles.wrapper}>
			<div
				ref={marqueeRef}
				className={styles.marquee}
				style={{ animationDuration: `${duration}s` }}>
				{loopedImages.map((src, idx) => (
					<img key={idx} src={src} alt={`img-${idx}`} className={styles.image} />
				))}
			</div>
		</div>
	);
};
