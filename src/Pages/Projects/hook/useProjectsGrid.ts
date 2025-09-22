import { useMemo } from "react";

const CARD_W = 400;
const CARD_H = 200;
const GAP = 40;
const PATTERN = [7, 6];

export type Project = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	image?: string;
};

export type PositionedProject = Project & {
	top: number;
	left: number;
	index: number;
};

export function useProjectsGrid(projects: Project[], containerWidth: number) {
	const rows = useMemo(() => {
		const r = [];
		let sum = 0;
		let idx = 0;
		while (sum < projects.length) {
			const count = PATTERN[idx % PATTERN.length];
			const remaining = projects.length - sum;
			r.push(Math.min(count, remaining));
			sum += Math.min(count, remaining);
			idx++;
		}
		return r;
	}, [projects]);

	const positions = useMemo(() => {
		const pos: PositionedProject[] = [];
		let cardIndex = 0;

		for (let r = 0; r < rows.length; r++) {
			const count = rows[r];
			const rowWidth = count * CARD_W + Math.max(0, count - 1) * GAP;
			const centerStart = (containerWidth - rowWidth) / 2;
			const halfStep = (CARD_W + GAP) / 50;
			const leftStart = centerStart + (r % 2 === 1 ? halfStep : 0);
			const top = r * (CARD_H + GAP);

			for (let c = 0; c < count; c++) {
				if (!projects[cardIndex]) break;
				pos.push({
					...projects[cardIndex],
					top,
					left: leftStart + c * (CARD_W + GAP),
					index: cardIndex,
				});
				cardIndex++;
			}
		}

		return pos;
	}, [rows, containerWidth, projects]);

	// размеры сетки для dragConstraints
	const gridWidth = useMemo(() => {
		if (rows.length === 0) return 0;
		const maxCols = Math.max(...rows);
		return maxCols * CARD_W + (maxCols - 1) * GAP;
	}, [rows]);

	const gridHeight = useMemo(() => {
		return rows.length * CARD_H + (rows.length - 1) * GAP;
	}, [rows]);

	return { positions, gridWidth, gridHeight };
}
