import styles from "../Drawer.module.scss";

type Props = {
	onClose: () => void;
};

export const DrawerHeader = ({ onClose }: Props) => (
	<div className={styles.drawerHeader}>
		<div className={styles.logoText}>NEXT Digital</div>
		<button className={styles.close} onClick={onClose}>
			×
		</button>
	</div>
);
