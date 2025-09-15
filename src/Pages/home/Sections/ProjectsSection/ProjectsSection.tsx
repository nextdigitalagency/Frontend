import styles from "./ProjectsSection.module.scss";
import cosmoport from "../../../../Shared/assets/img/companies/projects/cosmoport600.png";
import emessage from "../../../../Shared/assets/img/companies/projects/eMessage600.jpg";
import vita from "../../../../Shared/assets/img/companies/projects/vita600.png";
import palich from "../../../../Shared/assets/img/companies/projects/Palich600.jpg";
import sbkk from "../../../../Shared/assets/img/companies/projects/sbkk600.png";
import fabrica from "../../../../Shared/assets/img/companies/projects/fabrica600.jpg";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";

const projects = [
	{
		id: 1,
		img: emessage,
		title: "Корпоративный сайт eMessage",
		subtitle: "UI/UX дизайн c акцентом на комфорт, разработка на TypeScript и Next.js",
	},
	{
		id: 2,
		img: vita,
		title: "Мобильное приложение аптечной сети «Вита»",
		subtitle:
			"UI/UX-дизайн с упором на удобство, кроссплатформенная разработка на Flutter (Dart), интеграции с CRM и системой лояльности",
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
		img: palich,
		title: "Интернет-магазин «У Палыча»",
		subtitle:
			"Разработка на Next.js и TypeScript, интеграция с системой заказов, онлайн-оплатой и доставкой",
	},
	{
		id: 6,
		img: fabrica,
		title: "Cosmoport",
		subtitle: "Сервис для космических путешествий",
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
