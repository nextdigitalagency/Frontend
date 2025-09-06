import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";
import styles from "./Engineering.module.scss";

export default function Engineering() {
	return (
		<div className={styles.wrapper}>
			<SectionInfo
				subtitle={"проектирование"}
				title={"Проектирование и системный анализ"}
				description={
					"Мы последовательно прорабатываем каждый шаг проектирования: изучаем требования и ограничения, структурируем информацию и создаём информационную архитектуру, моделируем пользовательские сценарии, создаём низкоуровневые и высокоуровневые прототипы, подключаем интерактивность и тестируем макеты, а затем итеративно уточняем детали интерфейса до полной готовности."
				}
			/>
		</div>
	);
}
