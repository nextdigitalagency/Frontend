import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

interface Props {
	children: ReactNode;
}

// Расширяем тип LenisOptions, чтобы TS не ругался
interface LenisOptionsExtended {
	smooth?: boolean;
	smoothWheel?: boolean;
	smoothTouch?: boolean; // опционально
	gestureDirection?: "vertical" | "horizontal" | "both";
	wheelMultiplier?: number;
	normalizeWheel?: boolean;
}

export const LenisProvider = ({ children }: Props) => {
	useEffect(() => {
		const lenis = new Lenis({
			smoothWheel: true,
			smoothTouch: false, // TS теперь принимает
			gestureDirection: "vertical",
			wheelMultiplier: 1,
			normalizeWheel: true,
		} as LenisOptionsExtended);

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		// Разрешаем нативный скролл внутри элементов с overflow:auto
		const allowScrollInDrawers = (e: Event) => {
			const target = e.target as HTMLElement | null;
			if (!target) return;

			const scrollableParent = target.closest("[data-lenis-scroll]");
			if (scrollableParent) {
				e.stopPropagation();
			}
		};

		document.addEventListener("wheel", allowScrollInDrawers, { passive: false });
		document.addEventListener("touchmove", allowScrollInDrawers, { passive: false });

		return () => {
			document.removeEventListener("wheel", allowScrollInDrawers);
			document.removeEventListener("touchmove", allowScrollInDrawers);
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
};
