import { FaClipboardList, FaLayerGroup, FaPenFancy, FaCogs } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";
import styles from "./Engineering.module.scss";

const steps = [
	{
		title: "Изучаем требования",
		description: `Мы начинаем с глубокого анализа бизнес-задач, пользовательских целей и технических ограничений проекта. 
Изучаем существующие системы, конкурентов и тенденции отрасли, чтобы сформировать полное понимание контекста. 
Также проводим интервью с ключевыми стейкхолдерами и собираем данные о пользователях для точного проектирования.`,
		icon: <FaClipboardList />,
	},
	{
		title: "Структурируем информацию",
		description: `После анализа требований мы создаём информационную архитектуру проекта. 
Определяем основные разделы, блоки контента и их взаимосвязи, чтобы пользователи легко ориентировались в продукте. 
Создаём карты пользовательских потоков, схемы навигации и документируем логику взаимодействия, чтобы команда разработки понимала структуру системы.`,
		icon: <FaLayerGroup />,
	},
	{
		title: "Создаём прототипы",
		description: `На этом этапе мы создаём низкоуровневые и высокоуровневые прототипы интерфейсов. 
Применяем интерактивные макеты, чтобы проверять сценарии использования и поведение пользователей. 
Включаем анимации, элементы управления и реальные данные, чтобы протестировать интерфейс и выявить узкие места до начала разработки.`,
		icon: <FaPenFancy />,
	},
	{
		title: "Итеративная доработка",
		description: `Завершающий этап проектирования — это итеративная доработка интерфейса на основе тестирования и обратной связи. 
Уточняем детали визуального дизайна, взаимодействий и контента, исправляем выявленные проблемы и оптимизируем пользовательский опыт. 
Результатом становится готовый продукт, полностью соответствующий требованиям бизнеса и ожиданиям пользователей.`,
		icon: <FaCogs />,
	},
];

export default function Engineering() {
	const timelineRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: timelineRef,
		offset: ["start start", "end end"],
	});
	const blueLineHeight = useTransform(scrollYProgress, [0, 1], ["5%", "100%"]);

	return (
		<div className={styles.wrapper}>
			<SectionInfo
				subtitle={"проектирование"}
				title={"Проектирование и системный анализ"}
				description={
					"Мы последовательно прорабатываем каждый шаг проектирования: изучаем требования и ограничения, структурируем информацию и создаём информационную архитектуру, моделируем пользовательские сценарии, создаём низкоуровневые и высокоуровневые прототипы, подключаем интерактивность и тестируем макеты, а затем итеративно уточняем детали интерфейса до полной готовности."
				}
			/>

			<div className={styles.timelineWrapper} ref={timelineRef}>
				<div className={styles.timelineLine}></div>
				<motion.div className={styles.timelineLineFilled} style={{ height: blueLineHeight }} />

				{/* Шаги */}
				{steps.map((step, index) => (
					<div
						key={index}
						className={`${styles.step} ${index % 2 === 0 ? styles.right : styles.left}`}>
						<div className={styles.icon}>{step.icon}</div>

						<motion.div
							className={styles.content}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false, amount: 0.5 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</motion.div>
					</div>
				))}
			</div>
		</div>
	);
}
