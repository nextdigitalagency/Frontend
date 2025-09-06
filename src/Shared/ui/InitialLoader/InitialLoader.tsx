import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./InitialLoader.module.scss";
import { Helmet } from "@dr.pogodin/react-helmet";

const words = ["NEXT", "DIGITAL", "AGENCY"];

export default function InitialLoader({ onFinish }: { onFinish: () => void }) {
	const [index, setIndex] = useState(0);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		if (finished) return;

		const interval = setInterval(() => {
			setIndex((prev) => {
				if (prev === words.length - 1) {
					// После последнего слова скрываем loader
					setTimeout(() => {
						setFinished(true);
						onFinish();
					}, 1000); // ждём последний цикл
				}
				return (prev + 1) % words.length;
			});
		}, 1000); // общий цикл — 1s

		return () => clearInterval(interval);
	}, [finished, onFinish]);

	return (
		<AnimatePresence>
			<Helmet>
				<title>Next: Загрузка данных</title>
				<meta name='description' content='Next: Загрузка данных' />
				<meta property='og:title' content='Next: digital-агентство' />
				<meta property='og:description' content='Next: Загрузка данных' />
				<meta property='og:type' content='website' />
			</Helmet>
			{!finished && (
				<motion.div
					className={styles.loaderWrapper}
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6 }}>
					<div className={styles.loaderContent}>
						<AnimatePresence mode='wait'>
							<motion.span
								key={index}
								initial={{ y: 40, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -40, opacity: 0 }}
								transition={{ duration: 0.3, ease: "easeOut" }} // вход и выход по 0.3s
								className={styles.word}>
								{words[index]}
							</motion.span>
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
