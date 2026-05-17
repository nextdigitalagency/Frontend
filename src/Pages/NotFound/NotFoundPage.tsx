import { Link } from "react-router-dom";
import { useLanguage } from "../../Shared/lib/i18n";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
	const { isEnglish } = useLanguage();

	return (
		<main className={styles.page}>
			<section className={styles.panel}>
				<div className={styles.copy}>
					<span>{isEnglish ? "Route lost / creative fallback" : "Маршрут потерян / креативная заглушка"}</span>
					<h1>{isEnglish ? "This page slipped into the next sprint." : "Эта страница ушла в следующий спринт."}</h1>
					<p>
						{isEnglish
							? "The link exists as an idea, but the interface is not assembled yet. You can return home or start a project from here."
							: "Ссылка уже существует как идея, но интерфейс еще не собран. Можно вернуться на главную или сразу начать проект."}
					</p>
					<div className={styles.actions}>
						<Link className={styles.button} to='/'>
							{isEnglish ? "Go home" : "На главную"}
						</Link>
						<Link className={styles.ghostButton} to='/contacts'>
							{isEnglish ? "Contacts" : "Контакты"}
						</Link>
					</div>
				</div>
				<div className={styles.card}>
					<strong>404</strong>
					<p>{isEnglish ? "Not empty. Just not released yet." : "Не пусто. Просто еще не в релизе."}</p>
				</div>
			</section>
		</main>
	);
}
