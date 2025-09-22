import styles from "./TaskSection.module.scss";

export default function TaskSection() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.content}>
				<h2>Контекст и задача</h2>
				<div className={styles.text}>
					<p>
						Задача — вовлечь пользователя в знакомство с объектом и сконвертировать первичный
						интерес в заявку на бронирование или визит в офис продаж.
					</p>
					<p>
						Работа велась поэтапно: при получении РНС был запущен лендинг, далее он был переработан
						в главную страницу сайта и запускались остальные страницы, включая листинг квартир и
						интеграцию с CRM.
					</p>
				</div>
			</div>
		</section>
	);
}
