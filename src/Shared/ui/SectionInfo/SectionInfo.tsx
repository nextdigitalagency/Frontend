import { motion } from "framer-motion";
import styles from "./SectionInfo.module.scss";

type SectionInfoProps = {
	subtitle: string;
	title: string;
	description: string;
	titleDelay?: number;
	textDelay?: number;
};

export default function SectionInfo({
	subtitle,
	title,
	description,
	titleDelay = 0.1,
	textDelay = 0.3,
}: SectionInfoProps) {
	return (
		<div className={styles.header}>
			<p className={styles.subtitle}>{subtitle}</p>
			<div className={styles.textBlock}>
				<motion.h2
					initial={{ y: 100, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: titleDelay }}
					viewport={{ once: true }}>
					{title.split("\n").map((line, idx) => (
						<span key={idx}>
							{line}
							<br />
						</span>
					))}
				</motion.h2>

				<motion.p
					initial={{ y: 100, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: textDelay }}
					viewport={{ once: true }}>
					{description.split("\n").map((line, idx) => (
						<span key={idx}>
							{line}
							<br />
						</span>
					))}
				</motion.p>
			</div>
		</div>
	);
}
