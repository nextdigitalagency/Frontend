import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";
import Button from "../../../../Shared/ui/Button/Button";
import { openDrawer } from "../../../../App/store/slices/drawerSlice";

export default function HeroSection() {
	const dispatch = useDispatch();
	const titleMain = "Услуги";

	const text = "Мы разрабатываем сложные digital-продукты,\nоснованные на данных и аналитике.";

	const letterAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
	};

	const container = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.03 } },
	};

	return (
		<div className={styles.firstScreen}>
			<div className={styles.firstScreen_wrapper}>
				<div className={styles.firstScreen_title}>
					{titleMain} <br />
					<motion.span
						className={styles.wordWrapper}
						variants={container}
						initial='hidden'
						animate='visible'>
						{text.split("\n").map((line, idx) => (
							<span key={idx}>
								{line.split("").map((char, i) => (
									<motion.span key={i} variants={letterAnimation} className={styles.letter}>
										{char === " " ? "\u00A0" : char}
									</motion.span>
								))}
								<br />
							</span>
						))}
					</motion.span>
				</div>
				<div className={styles.firstScreen_description}>
					<div className={styles.firstScreen_button}>
						<Button onClick={() => dispatch(openDrawer())}>Начать проект</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
