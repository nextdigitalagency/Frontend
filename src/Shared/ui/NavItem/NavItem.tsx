import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./NavItem.module.scss";

interface NavItemProps {
	to: string;
	children: React.ReactNode;
	onClick?: () => void;
	index?: number; // для задержки анимации
}

export const NavItem: React.FC<NavItemProps> = ({ to, children, onClick, index = 0 }) => {
	const ref = useRef<HTMLParagraphElement>(null);
	const isInView = useInView(ref, { once: true });

	return (
		<AnimatePresence>
			<motion.p
				ref={ref}
				className={styles.navItem}
				initial={{ opacity: 0, x: -18 }}
				animate={isInView ? { opacity: 1, x: 0 } : {}}
				exit={{ opacity: 0, x: -18 }}
				transition={{ duration: 0.4, delay: index * 0.1 }}>
				<Link to={to} onClick={onClick}>
					{children}
				</Link>
			</motion.p>
		</AnimatePresence>
	);
};
