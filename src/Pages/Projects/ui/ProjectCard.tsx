import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./ProjectsCard.module.scss";
import type { Project } from "../hook/useProjectsGrid";

type Props = {
	project: Project & { top: number; left: number; index: number };
	isDragging: boolean;
};

export const ProjectCard = ({ project, isDragging }: Props) => {
	const navigate = useNavigate();
	const duration = 5 + Math.random() * 5;
	const delay = Math.random() * 2;
	const amplitude = 10;

	const handleClick = () => {
		if (!isDragging) {
			navigate(`/projects/${project.slug}`);
		}
	};

	return (
		<motion.div
			className={styles.card}
			style={{
				top: `${project.top}px`,
				left: `${project.left}px`,
				position: "absolute",
				cursor: "pointer",
			}}
			onClick={handleClick}
			animate={{ scale: [1, 1.02, 1], y: [0, -amplitude, 0] }}
			transition={{
				duration,
				delay: project.index * 0.1 + delay,
				repeat: Infinity,
				repeatType: "loop",
				ease: "easeInOut",
			}}>
			<div className={styles.cardInner}>
				{project.image && (
					<img src={project.image} alt={project.name} className={styles.cardImage} />
				)}
				<div className={styles.cardOverlay}>
					<h3>{project.name}</h3>
					<p>{project.description}</p>
				</div>
			</div>
		</motion.div>
	);
};
