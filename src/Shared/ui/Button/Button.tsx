import styles from "./Button.module.scss";

type btnProps = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

export default function Button({ children, className, onClick, type }: btnProps) {
	return (
		<button type={type} onClick={onClick} className={`${styles.btn} ${className || ""}`}>
			{children}
		</button>
	);
}
