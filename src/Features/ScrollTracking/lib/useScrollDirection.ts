import { useState, useEffect, useRef } from "react";
import type { ScrollDirection } from "./types";

export const useScrollDirection = (): ScrollDirection => {
	const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
		direction: null,
		scrollY: 0,
	});
	const lastScrollY = useRef(0);

	useEffect(() => {
		const updateScrollDirection = () => {
			const scrollY = window.scrollY;
			const direction = scrollY > lastScrollY.current ? "down" : "up";

			if (direction !== scrollDirection.direction || scrollY !== lastScrollY.current) {
				setScrollDirection({ direction, scrollY });
			}
			lastScrollY.current = scrollY > 0 ? scrollY : 0;
		};

		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateScrollDirection();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollDirection.direction]);

	return scrollDirection;
};
