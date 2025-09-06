import { motion } from "framer-motion";
import styles from "./ProjectsSection.module.scss";
import cosmoport from "../../../../Shared/assets/img/companies/projects/cosmoport600.png";
import garibaldi from "../../../../Shared/assets/img/companies/projects/garibaldi600.png";
import sbkk from "../../../../Shared/assets/img/companies/projects/sbkk600.png";

const projects = [
	{
		id: 1,
		img: cosmoport,
		title: "Корпоративный сайт eMessage",
		subtitle: "UI/UX дизайн c акцентом на комфорт, разработка на TypeScript и Next.js",
	},
	{
		id: 2,
		img: garibaldi,
		title: "Интернет-магазин продуктов Garibaldi",
		subtitle: "TypeScript, Next.js, интеграция с 1С и amoCRM",
	},
	{
		id: 3,
		img: sbkk,
		title: "Разработка производственного сайта Самарского БКК",
		subtitle: "UX-проектирование, дизайн и разработка на React и Next.js",
	},
	{
		id: 4,
		img: cosmoport,
		title: "Лендинг ТРК Космопорт",
		subtitle: "UI/UX дизайн c акцентом на комфорт, разработка на TypeScript и Next.js",
	},
	{
		id: 5,
		img: sbkk,
		title: "Cosmoport",
		subtitle: "Сервис для космических путешествий",
	},
	{
		id: 6,
		img: sbkk,
		title: "Cosmoport",
		subtitle: "Сервис для космических путешествий",
	},
];

export default function ProjectsSection() {
	return (
		<section className={styles.projects}>
			<div className={styles.header}>
				<p className={styles.subtitle}>проекты</p>
				<div className={styles.textBlock}>
					<motion.h2
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
						viewport={{ once: true }}>
						Акцент на результатах <br /> и росте бизнеса
					</motion.h2>

					<motion.p
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
						viewport={{ once: true }}>
						Мы помогаем B2B-компаниям расти, создавая цифровые продукты и сервисы,
						<br /> которые решают реальные бизнес-задачи. Наша работа основана на глубокой
						аналитике, <br />
						продуманной стратегии и безупречной технической реализации.
					</motion.p>
				</div>
			</div>

			<div className={styles.cards}>
				{projects.map((item) => (
					<div key={item.id}>
						<div className={styles.card}>
							<div className={styles.cardImage}>
								<img src={item.img} alt={item.title} />
							</div>
						</div>
						<h2 className={styles.cardTitle}>{item.title}</h2>
						<p className={styles.cardSubtitle}>{item.subtitle}</p>
					</div>
				))}
			</div>
		</section>
	);
}
