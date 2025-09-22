import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wrapper } from "../../Shared/ui/Wrapper/Wrapper";
import { ProjectCard } from "./ui/ProjectCard";
import { useProjectsGrid, type Project } from "./hook/useProjectsGrid";
import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(1200);
	const [isDragging, setIsDragging] = useState(false);

	// fetch данных
	useEffect(() => {
		fetch("http://localhost:3000/projects")
			.then((res) => res.json())
			.then((data: Project[]) => setProjects(data))
			.catch(console.error);
	}, []);

	// отслеживаем ширину контейнера
	useEffect(() => {
		const update = () => {
			const w = containerRef.current?.clientWidth ?? window.innerWidth;
			setWidth(w);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	// хук для расчёта сетки
	const { positions, gridWidth, gridHeight } = useProjectsGrid(projects, width);

	return (
		<Wrapper>
			<div className={styles.viewport} ref={containerRef}>
				<motion.div
					className={styles.inner}
					drag
					dragMomentum={false}
					dragElastic={0.1}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={() => setTimeout(() => setIsDragging(false), 0)}
					style={{
						width: gridWidth,
						height: gridHeight,
						position: "relative",
					}}>
					{positions.map((project) => (
						<ProjectCard key={project.id} project={project} isDragging={isDragging} />
					))}
				</motion.div>
			</div>
		</Wrapper>
	);
};

export default ProjectsPage;
