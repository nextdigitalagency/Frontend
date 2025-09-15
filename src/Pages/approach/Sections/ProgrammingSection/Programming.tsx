import { motion } from "framer-motion";
import SectionInfo from "../../../../Shared/ui/SectionInfo/SectionInfo";
import styles from "./Programming.module.scss";
import { FaLaptopCode, FaServer, FaDatabase, FaBug, FaRocket } from "react-icons/fa";

const steps = [
	{
		icon: <FaLaptopCode />,
		title: "Frontend",
		desc: "Реализуем интерфейс приложения: верстаем страницы, подключаем дизайн-систему и создаём переиспользуемые UI-компоненты. Настраиваем адаптивность и анимации, обеспечиваем быструю загрузку и удобство работы на любых устройствах.",
		size: "large",
	},
	{
		icon: <FaServer />,
		title: "Backend",
		desc: "Проектируем архитектуру сервера, реализуем бизнес-логику и настраиваем API для обмена данными с клиентской частью. Обеспечиваем стабильность, безопасность и масштабируемость серверного решения.",
		size: "small",
	},
	{
		icon: <FaDatabase />,
		title: "База данных",
		desc: "Выбираем подходящую СУБД и строим структуру хранения данных. Настраиваем связи, индексы и миграции, чтобы система работала быстро и надёжно даже при высокой нагрузке.",
		size: "small",
	},
	{
		icon: <FaBug />,
		title: "Тестирование",
		desc: "Проводим модульное, интеграционное и нагрузочное тестирование. Автоматизируем проверки, чтобы минимизировать количество ошибок и гарантировать стабильность приложения перед релизом.",
		size: "large",
	},
	{
		icon: <FaRocket />,
		title: "Запуск и поддержка",
		desc: "Настраиваем CI/CD, деплой на сервер или в облако, оптимизируем производительность. После релиза обеспечиваем поддержку, обновления и развитие продукта.",
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

export default function Programming() {
	return (
		<div className={styles.wrapper}>
			<SectionInfo
				subtitle='Разработка'
				title='Процесс разработки'
				description={`На этапе разработки мы превращаем утверждённый дизайн в полноценное цифровое решение. Определяем архитектуру проекта, настраиваем окружение и выбираем технологический стек. Реализуем фронтенд и бэкенд, подключаем API и сторонние сервисы, создаём базу данных и обеспечиваем масштабируемость приложения. Проводим тестирование и используем систему контроля версий, чтобы гарантировать качество и прозрачность работы. Итогом становится готовое приложение с полностью реализованным функционалом.`}
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
