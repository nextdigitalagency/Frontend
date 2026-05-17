import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import { useLanguage } from "../../Shared/lib/i18n";
import styles from "./ProjectsComingSoon.module.scss";

export default function ProjectsComingSoon() {
	const dispatch = useDispatch();
	const { isEnglish } = useLanguage();

	return (
		<main className={styles.page}>
			<p className={styles.label}>{isEnglish ? "Projects / coming soon" : "Проекты / скоро"}</p>
			<section className={styles.hero}>
				<div className={styles.copy}>
					<h1>{isEnglish ? "Case studies are being assembled behind the scenes." : "Кейсы собираются за кулисами."}</h1>
					<p>
						{isEnglish
							? "We are preparing the project wall: visuals, tasks, stack and launch results. For now, this page works as a preview of the future portfolio."
							: "Готовим стену проектов: визуалы, задачи, стек и результаты запусков. Пока эта страница работает как превью будущего портфолио."}
					</p>
					<div className={styles.actions}>
						<button className={styles.button} onClick={() => dispatch(openDrawer())} type='button'>
							{isEnglish ? "Start yours" : "Запустить свой"}
						</button>
						<Link className={styles.ghostButton} to='/approach'>
							{isEnglish ? "See services" : "Смотреть услуги"}
						</Link>
					</div>
				</div>
				<div className={styles.panel}>
					<div className={styles.panelItem}>
						<strong>01</strong>
						<span>{isEnglish ? "web platforms" : "web-платформы"}</span>
					</div>
					<div className={styles.panelItem}>
						<strong>02</strong>
						<span>{isEnglish ? "interfaces" : "интерфейсы"}</span>
					</div>
					<div className={styles.panelItem}>
						<strong>03</strong>
						<span>{isEnglish ? "launch systems" : "системы запуска"}</span>
					</div>
				</div>
			</section>
			<div className={styles.meta}>
				<span>Aerix digital production</span>
				<span>hello@aerix.digital</span>
			</div>
		</main>
	);
}
