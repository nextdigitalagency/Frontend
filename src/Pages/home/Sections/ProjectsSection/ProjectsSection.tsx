import styles from "./ProjectsSection.module.scss";
import emessage from "../../../../Shared/assets/img/companies/projects/eMessage600.jpg";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";

const projects = [
	{
		id: 1,
		img: emessage,
		title: "Корпоративный сайт eMessage",
		subtitle: "UI/UX дизайн c акцентом на комфорт, разработка на TypeScript и Next.js",
		link: "#", // ссылка на проект
	},
];

export default function ProjectsSection() {
	return (
		<section className={styles.projects}>
			<SectionInfo
				subtitle={"проекты"}
				title={"Акцент на результатах \nи росте бизнеса"}
				description={
					"Мы помогаем B2B-компаниям расти, создавая цифровые продукты и сервисы, \nкоторые решают реальные бизнес-задачи. Наша работа основана на глубокой аналитике, \nпродуманной стратегии и безупречной технической реализации."
				}
			/>

			<div className={styles.cards}>
				{projects.map((item) => (
					<div key={item.id} className={styles.card}>
						{/* Слева картинка */}
						<div className={styles.cardImage}>
							<img src={item.img} alt={item.title} />
						</div>

						{/* Справа текст */}
						<div className={styles.cardContent}>
							<h2 className={styles.cardTitle}>{item.title}</h2>
							<p className={styles.cardSubtitle}>{item.subtitle}</p>
							<a href={item.link} className={styles.cardButton}>
								Перейти к проекту
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
