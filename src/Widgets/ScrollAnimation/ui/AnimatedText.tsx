import React, { useRef, useEffect, useState } from "react";
import styles from "./AnimatedText.module.scss";
import { useScrollDirection } from "../../../Features/ScrollTracking/lib/useScrollDirection";
import type { AnimatedTextProps } from "./types";

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	children,
	speed = 0.2,
	className = "",
}) => {
	const [translateX, setTranslateX] = useState(0);
	const { direction } = useScrollDirection();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;

			const container = containerRef.current;
			const containerRect = container.getBoundingClientRect();

			// Позиция контейнера относительно viewport
			const containerTop = containerRect.top;
			const containerBottom = containerRect.bottom;
			const containerHeight = containerRect.height;

			// Насколько контейнер виден на экране (0-1)
			const visibility = Math.max(
				0,
				Math.min(
					1,
					(window.innerHeight - Math.max(0, -containerTop, containerBottom - window.innerHeight)) /
						containerHeight
				)
			);

			// Интенсивность анимации based on видимости контейнера
			const intensity = visibility * speed;

			if (direction === "down" && containerTop < window.innerHeight && containerBottom > 0) {
				// Скроллим вниз и контейнер виден
				setTranslateX((prev) => Math.min(prev + intensity * 25, 1000));
			} else if (direction === "up" && containerTop < window.innerHeight && containerBottom > 0) {
				// Скроллим вверх и контейнер виден
				setTranslateX((prev) => Math.max(prev - intensity * 25, -1000));
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [direction, speed]);

	return (
		<div ref={containerRef} className={`${styles.container} ${className}`}>
			<div
				className={styles.animatedText}
				style={{
					transform: `translateX(calc(-50% + ${translateX}px))`,
					transition: "transform 0.1s ease-out",
				}}>
				{children}
			</div>
		</div>
	);
};
