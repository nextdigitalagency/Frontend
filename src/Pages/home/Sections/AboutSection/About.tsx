import { MarqueeGallery } from "../../../../Shared/ui/MarqueeGallery/MarqueeGallery";
import styles from "./About.module.scss";
import abstract2 from "../../../../Shared/assets/img/abstract2.jpg";
import loopVideo from "../../../../Shared/assets/video/video.mp4";
import { motion } from "framer-motion";

export default function About() {
	const baseTransition = {
		type: "tween" as const,
		duration: 0.4,
		ease: "easeOut" as const,
	};

	const textAnimation = (delay: number) => ({
		hidden: { y: 50, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { ...baseTransition, delay } },
	});

	const cards = [
		{
			number: "01",
			title: "Next digital",
			text: "Развиваем бизнес в диджитал среде. Создаём современные проекты: от маленьких идей до больших продаж. Просто, удобно и с результатом.",
		},
		{
			number: "02",
			title: "Делаем сложное простым",
			text: "Современные сайты и сервисы, которые работают для людей и бизнеса.",
		},
		{
			number: "03",
			title: "Поддержка проектов",
			text: "Берём на себя обновления и развитие, чтобы ваш проект оставался актуальным и эффективным.",
		},
		{
			number: "04",
			title: "Растём вместе с вами",
			text: "Сочетаем дизайн и технологию без компромиссов. Ваш проект — наша забота.",
		},
	];

	return (
		<section className={styles.aboutWrapper}>
			<div className={styles.marqueeWrapper}>
				<MarqueeGallery />
			</div>

			<div className={styles.grid}>
				{cards.map((card, idx) => (
					<div className={styles.card} key={card.number}>
						<motion.span
							initial='hidden'
							whileInView='visible'
							variants={textAnimation(idx * 0.2)}
							viewport={{ once: true }}
							className={styles.number}>
							{card.number}
						</motion.span>
						<motion.h3
							initial='hidden'
							whileInView='visible'
							variants={textAnimation(idx * 0.2 + 0.1)}
							viewport={{ once: true }}
							className={styles.title}>
							{card.title}
						</motion.h3>
						<motion.p
							initial='hidden'
							whileInView='visible'
							variants={textAnimation(idx * 0.2 + 0.2)}
							viewport={{ once: true }}
							className={styles.text}>
							{card.text}
						</motion.p>
					</div>
				))}

				{/* Видео */}
				<div className={styles.videoCardBig}>
					<video src={loopVideo} autoPlay loop muted playsInline className={styles.video} />
				</div>

				{/* Картинка снизу слева */}
				<div className={styles.imageCard}>
					<motion.img
						initial={{ y: 50, x: -50, opacity: 0 }}
						whileInView={{ y: 0, x: 0, opacity: 1 }}
						transition={{ ...baseTransition, delay: 0.5 }}
						viewport={{ once: true }}
						src={abstract2}
						alt='Иллюстрация 3d'
						className={styles.image}
					/>
				</div>
			</div>
		</section>
	);
}
