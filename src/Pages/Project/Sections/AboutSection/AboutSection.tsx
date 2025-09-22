import styles from "./AboutSection.module.scss";

export default function AboutSection() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.content}>
				<h1>
					MR Group — один из лидеров в девелопменте жилой и коммерческой недвижимости бизнес-класса.
				</h1>
				<p>
					Входит в ТОП-4 застройщиков жилья бизнес-класса в рейтинге Forbes. Среди проектов компании
					— строящийся жилой комплекс JOIS, для которого мы разработали сначала лендинг, а затем и
					сайт.
				</p>
			</div>
		</section>
	);
}
