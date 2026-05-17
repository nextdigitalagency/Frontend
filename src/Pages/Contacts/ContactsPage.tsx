import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import { useLanguage } from "../../Shared/lib/i18n";
import styles from "./ContactsPage.module.scss";

export default function ContactsPage() {
	const dispatch = useDispatch();
	const { isEnglish } = useLanguage();

	return (
		<main className={styles.page}>
			<p className={styles.label}>{isEnglish ? "Contacts / start point" : "Контакты / точка старта"}</p>
			<section className={styles.layout}>
				<div className={styles.copy}>
					<h1>{isEnglish ? "Send the signal. We will assemble the route." : "Дайте сигнал. Мы соберем маршрут."}</h1>
					<p>
						{isEnglish
							? "Tell us what you want to launch, fix or rethink. A short message is enough to start."
							: "Расскажите, что нужно запустить, поправить или переосмыслить. Для старта хватит короткого сообщения."}
					</p>
					<button className={styles.button} onClick={() => dispatch(openDrawer())} type='button'>
						{isEnglish ? "Open brief" : "Открыть бриф"}
					</button>
				</div>
				<div className={styles.cards}>
					<div className={styles.card}>
						<span>mail</span>
						<a href='mailto:hello@aerix.digital'>hello@aerix.digital</a>
					</div>
					<div className={styles.card}>
						<span>phone</span>
						<a href='tel:+79178150110'>+7 917 815-01-10</a>
					</div>
					<div className={styles.card}>
						<span>social</span>
						<p>Telegram · Instagram</p>
					</div>
				</div>
			</section>
		</main>
	);
}
