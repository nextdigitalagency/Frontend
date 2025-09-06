import { motion } from "framer-motion";
import styles from "./DirectionSection.module.scss";
import sampleVideo from "../../../../Shared/assets/video/abstract.mp4"; // импорт видео

export default function DirectionSection() {
	const baseTransition = {
		type: "tween",
		duration: 0.4,
		ease: "easeOut",
	};

	const textAnimation = (delay: number) => ({
		hidden: { y: 50, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { ...baseTransition, delay } },
	});

	const cards = [
		{
			title: "Консультация и обсуждение",
			text: "Выясняем цели и задачи клиента, формируем общее понимание проекта.",
		},
		{
			title: "Исследование и аудит",
			text: "Анализируем рынок, конкурентов и целевую аудиторию, выявляем возможности роста. Формируем отчёты и рекомендации.",
		},
		{
			title: "Визуализация и оформление",
			text: "Разрабатываем UI, создаём концепции и адаптивные макеты, документируем решения.",
		},
		{
			video: sampleVideo, // видео вместо фото
		},
		{
			title: "Кодирование и интеграция",
			text: "Верстаем и программируем проект, ведём документацию по коду и архитектуре.",
		},
		{
			title: "Проверка, запуск и сопровождение",
			text: "Тестируем проект, исправляем баги, проводим финальную проверку. После запуска обеспечиваем поддержку, обновления и оптимизацию для стабильной работы и долгосрочной эффективности.",
		},
	];

	return (
		<section className={styles.directions}>
			<div className={styles.header}>
				<p className={styles.subtitle}>подход к работе</p>
				<div className={styles.textBlock}>
					<motion.h2
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
						viewport={{ once: true }}>
						Синтез передового опыта <br /> и digital продуктов
					</motion.h2>

					<motion.p
						initial={{ y: 100, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
						viewport={{ once: true }}>
						Мы взяли все самое лучшее из мира дизайна, маркетинга и технологий, <br /> чтобы
						создавать уникальные digital продукты.
					</motion.p>
				</div>
			</div>

			<div className={styles.grid}>
				{cards.map((card, idx) => {
					const isVideoCard = !!card.video;
					return isVideoCard ? (
						<div className={styles.videoCard} key={idx}>
							<motion.video
								src={card.video}
								autoPlay
								loop
								muted
								playsInline
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ ...baseTransition, delay: idx * 0.2 }}
								viewport={{ once: true }}
								className={styles.video}
							/>
						</div>
					) : (
						<div className={styles.card} key={idx}>
							<motion.span
								className={styles.number}
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ ...baseTransition, delay: idx * 0.2 }}
								viewport={{ once: true }}>
								{String(idx + 1).padStart(2, "0")}
							</motion.span>
							<motion.h3
								className={styles.title}
								initial='hidden'
								whileInView='visible'
								variants={textAnimation(idx * 0.2 + 0.05)}
								viewport={{ once: true }}>
								{card.title}
							</motion.h3>
							<motion.p
								className={styles.text}
								initial='hidden'
								whileInView='visible'
								variants={textAnimation(idx * 0.2 + 0.1)}
								viewport={{ once: true }}>
								{card.text}
							</motion.p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
