import styles from "./Analytics.module.scss";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";

export default function Analytics() {
	return (
		<div className={styles.wrapper}>
			<SectionInfo
				subtitle={"аналитика"}
				title={"UX-исследование и аудит"}
				description={
					"Комплексное UX-исследование включает сбор данных о поведении и мотивации пользователей, \nаудит текущих процессов и интерфейсов, проведение глубинных и JTBD-интервью, \nтестирование прототипов, анализ конкурентов и построение CJM, что позволяет формировать продукт, ориентированный на реальные потребности и цели аудитории."
				}
			/>
		</div>
	);
}
