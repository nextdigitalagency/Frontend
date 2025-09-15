import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import styles from "./ProjectsPage.module.scss";

const CARD_W = 400;
const CARD_H = 200;
const GAP = 40;
const TOTAL_CARDS = 33;
const PATTERN = [7, 6];

function buildRows(total: number) {
	const rows = [];
	let sum = 0;
	let idx = 0;
	while (sum < total) {
		const count = PATTERN[idx % PATTERN.length];
		const remaining = total - sum;
		rows.push(Math.min(count, remaining));
		sum += Math.min(count, remaining);
		idx++;
	}
	return rows; // e.g. [7,5,7,5,6] for 30
}

const ProjectsPage = () => {
	const rows = useMemo(() => buildRows(TOTAL_CARDS), []);
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(1200);

	useEffect(() => {
		const update = () => {
			const w = containerRef.current?.clientWidth ?? window.innerWidth;
			setWidth(w);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const positions = useMemo(() => {
		const pos = [];
		let cardIndex = 0;
		for (let r = 0; r < rows.length; r++) {
			const count = rows[r];
			const rowWidth = count * CARD_W + Math.max(0, count - 1) * GAP;
			const centerStart = (width - rowWidth) / 2;
			const halfStep = (CARD_W + GAP) / 50; // смещение "кирпича"
			const leftStart = centerStart + (r % 2 === 1 ? halfStep : 0);
			const top = r * (CARD_H + GAP);

			for (let c = 0; c < count; c++) {
				const left = leftStart + c * (CARD_W + GAP);
				pos.push({ index: cardIndex, top, left });
				cardIndex++;
			}
		}
		return pos;
	}, [rows, width]);

	return (
		<Wrapper>
			<div className={styles.viewport} ref={containerRef}>
				<motion.div className={styles.inner} drag dragMomentum={false} dragElastic={0.1}>
					{positions.map((p) => {
						const duration = 5 + Math.random() * 5; // 5-10 секунд
						const delay = Math.random() * 2; // небольшой сдвиг для волны
						const amplitude = 10; // амплитуда волны в px

						return (
							<motion.div
								key={p.index}
								className={styles.card}
								style={{ top: p.top + "px", left: p.left + "px" }}
								animate={{
									scale: [1, 1.02, 1], // пульсация
									y: [0, -amplitude, 0], // движение волной вверх-вниз
								}}
								transition={{
									duration,
									delay: p.index * 0.1 + delay,
									repeat: Infinity,
									repeatType: "loop",
									ease: "easeInOut",
								}}>
								<div className={styles.cardInner}>Card {p.index + 1}</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</Wrapper>
	);
};

export default ProjectsPage;
