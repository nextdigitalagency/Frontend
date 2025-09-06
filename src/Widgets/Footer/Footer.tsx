import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import Button from "../../Shared/ui/Button/Button";
import styles from "./Footer.module.scss";
import { motion } from "framer-motion";

export default function Footer() {
	const dispatch = useDispatch();

	const textAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<motion.div
					className={styles.col}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.3 }}
					variants={textAnimation}>
					<h3 className={styles.logo}>Next Digital</h3>
					<p className={styles.desc}>Создаем. Дизайним. Разрабатываем.</p>
				</motion.div>

				<div className={styles.cta}>
					<Button className={styles.button} onClick={() => dispatch(openDrawer())}>
						Начать проект
					</Button>
				</div>
			</div>

			<motion.div
				className={styles.fullscreen_menu_footer}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
				}}>
				<motion.div variants={textAnimation} className={styles.fullscreen_menu_copyright}>
					<p>© {new Date().getFullYear()} Next. Все права защищены.</p>
					<p className={styles.policy}>Политика конфидециальности</p>
				</motion.div>
				<motion.div variants={textAnimation} className={styles.fullscreen_menu_contacts}>
					<p>+7 917 815-01-10 </p> | <p> info@gmail.com</p>
				</motion.div>
				<motion.div variants={textAnimation} className={styles.fullscreen_menu_social}>
					<p>Telegram</p>
					<p>Instagram</p>
				</motion.div>
			</motion.div>
		</footer>
	);
}
