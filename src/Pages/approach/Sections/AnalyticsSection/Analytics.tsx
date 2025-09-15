import {
	FaSearch,
	FaClipboardCheck,
	FaDraftingCompass,
	FaUsers,
	FaProjectDiagram,
} from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Analytics.module.scss";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";

const steps = [
	{
		icon: <FaSearch />,
		title: "Сбор данных",
		desc: "На первом этапе мы глубоко погружаемся в контекст использования продукта: проводим интервью с пользователями, организуем опросы и анализируем их поведение в цифровой среде. Это позволяет выявить ключевые мотивации, барьеры и сценарии взаимодействия.",
		size: "large",
	},
	{
		icon: <FaClipboardCheck />,
		title: "Аудит интерфейсов",
		desc: "Мы оцениваем удобство существующих решений, выявляем проблемные зоны и точки роста. На основе best practices и реальных пользовательских данных формируем список рекомендаций по улучшению UX.",
		size: "small",
	},
	{
		icon: <FaDraftingCompass />,
		title: "Прототипирование",
		desc: "Создаются прототипы, в которых тестируются новые сценарии взаимодействия. Это даёт возможность проверить гипотезы до стадии разработки и минимизировать затраты на переделки.",
		size: "small",
	},
	{
		icon: <FaUsers />,
		title: "JTBD-интервью",
		desc: "С помощью методологии Jobs-to-be-Done мы фокусируемся не только на том, что делают пользователи, но и на том, зачем они это делают. Это открывает глубинные мотивы и помогает выстраивать продукт вокруг реальных задач.",
		size: "large",
	},
	{
		icon: <FaProjectDiagram />,
		title: "CJM и конкуренты",
		desc: "Финальный этап включает построение карты пути пользователя (Customer Journey Map), которая наглядно показывает все точки контакта и эмоции на каждом шаге. Также мы проводим анализ конкурентов, чтобы выявить сильные и слабые стороны рынка.",
		size: "large",
	},
];

const textVariants = {
	hidden: { opacity: 0, y: 100 },
	visible: (custom: { itemIndex: number; stepIndex: number }) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: custom.stepIndex * 0.1,
			ease: "easeOut" as const,
		},
	}),
};

export default function Analytics() {
	return (
		<div className={styles.wrapper}>
			<SectionInfo
				subtitle={"аналитика"}
				title={"UX-исследование и аудит"}
				description={
					"Комплексное UX-исследование включает сбор данных о поведении и мотивации пользователей, аудит текущих процессов и интерфейсов, проведение глубинных и JTBD-интервью, тестирование прототипов, анализ конкурентов и построение CJM."
				}
			/>

			<div className={styles.steps}>
				{steps.map((step, stepIndex) => (
					<div
						key={stepIndex}
						className={`${styles.step} ${step.size === "large" ? styles.large : styles.small}`}>
						<motion.div
							className={styles.number}
							variants={textVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.2 }}
							custom={{ itemIndex: 0, stepIndex }}>
							{stepIndex + 1 < 10 ? `0${stepIndex + 1}` : stepIndex + 1}
						</motion.div>

						<motion.div
							className={styles.icon}
							variants={textVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.2 }}
							custom={{ itemIndex: 1, stepIndex }}>
							{step.icon}
						</motion.div>

						<motion.h3
							variants={textVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.2 }}
							custom={{ itemIndex: 2, stepIndex }}>
							{step.title}
						</motion.h3>

						<motion.p
							variants={textVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.2 }}
							custom={{ itemIndex: 3, stepIndex }}>
							{step.desc}
						</motion.p>
					</div>
				))}
			</div>
		</div>
	);
}
