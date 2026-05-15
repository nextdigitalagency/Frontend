import { motion } from "framer-motion";
import { type ReactNode, useRef } from "react";
import styles from "./PageTransition.module.scss";

interface PageTransitionProps {
	children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
	// useRef хранит состояние: первый рендер или нет
	const isFirstRender = useRef(true);

	return (
		<>
			{/* Верхняя панель (закрытие страницы) */}
			<motion.div
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 0 }}
				exit={{ scaleY: 1 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
				className={styles.fadeIn}>
				AERIX
			</motion.div>

			{/* Нижняя панель (открытие страницы) */}
			<motion.div
				initial={{ scaleY: 1 }}
				animate={{ scaleY: 0 }}
				exit={isFirstRender.current ? { scaleY: 0 } : { scaleY: 0 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
				className={styles.fadeOut}
				onAnimationComplete={() => {
					isFirstRender.current = false;
				}}>
				AERIX
			</motion.div>

			{children}
		</>
	);
};

export default PageTransition;
