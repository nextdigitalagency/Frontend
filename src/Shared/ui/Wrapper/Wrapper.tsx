import type { ReactNode } from "react";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
	children: ReactNode;
	className?: string;
}

export const Wrapper = ({ children, className }: WrapperProps) => {
	return <div className={`${styles.wrapper} ${className || ""}`}>{children}</div>;
};
