import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import Button from "../../Shared/ui/Button/Button";
import styles from "./Footer.module.scss";
import { useLanguage } from "../../Shared/lib/i18n";

export default function Footer() {
	const dispatch = useDispatch();
	const { isEnglish } = useLanguage();
	const footerRef = useRef<HTMLElement | null>(null);
	const [isFooterVisible, setIsFooterVisible] = useState(false);

	useEffect(() => {
		const footer = footerRef.current;
		if (!footer) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFooterVisible(entry.isIntersecting);
			},
			{ threshold: 0.01 }
		);

		observer.observe(footer);

		return () => observer.disconnect();
	}, []);

	return (
		<footer id='footer' className={styles.footer} ref={footerRef}>
			<div className={`${styles.footerContainer} ${isFooterVisible ? styles.visible : ""}`}>
				<div className={styles.main}>
					<div className={styles.container}>
						<div className={styles.col}>
							<h3 className={styles.logo}>Aerix</h3>
							<p className={styles.desc}>
								{isEnglish ? "We create. Design. Develop." : "Создаем. Дизайним. Разрабатываем."}
							</p>
						</div>

						<div className={styles.cta}>
							<Button className={styles.button} onClick={() => dispatch(openDrawer())}>
								{isEnglish ? "Start a project" : "Начать проект"}
							</Button>
						</div>
					</div>
					<div className={styles.fullscreen_menu_footer}>
						<div className={styles.fullscreen_menu_copyright}>
							<p>
								© {new Date().getFullYear()} Aerix.{" "}
								{isEnglish ? "All rights reserved." : "Все права защищены."}
							</p>
							<p className={styles.policy}>{isEnglish ? "Privacy policy" : "Политика конфидециальности"}</p>
						</div>
						<div className={styles.fullscreen_menu_contacts}>
							<p>+7 917 815-01-10 </p> | <p> hello@aerix.digital</p>
						</div>
						<div className={styles.fullscreen_menu_social}>
							<p>Telegram</p>
							<p>Instagram</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
