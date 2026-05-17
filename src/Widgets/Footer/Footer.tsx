import { useDispatch } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import styles from "./Footer.module.scss";
import { useLanguage } from "../../Shared/lib/i18n";

export default function Footer() {
	const dispatch = useDispatch();
	const { isEnglish } = useLanguage();

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.main}>
					<div className={styles.footerHero}>
						<p className={styles.eyebrow}>{isEnglish ? "Aerix / digital production" : "Aerix / digital-продакшн"}</p>
						<h2>{isEnglish ? "Let's build the next web layer." : "Соберем следующий web-слой."}</h2>
						<button className={styles.footerButton} onClick={() => dispatch(openDrawer())} type='button'>
							{isEnglish ? "Start a project" : "Начать проект"}
							<ArrowUpRight size={18} aria-hidden='true' />
						</button>
					</div>

					<div className={styles.footerMeta}>
						<div className={styles.metaBlock}>
							<span>mail</span>
							<a href='mailto:hello@aerix.digital'>hello@aerix.digital</a>
						</div>
						<div className={styles.metaBlock}>
							<span>phone</span>
							<a href='tel:+79178150110'>+7 917 815-01-10</a>
						</div>
						<div className={styles.metaBlock}>
							<span>social</span>
							<p>Telegram · Instagram</p>
						</div>
						<div className={styles.metaBlock}>
							<span>legal</span>
							<p>© {new Date().getFullYear()} Aerix</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
