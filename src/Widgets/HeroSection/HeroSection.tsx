import React from "react";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
	const titleMain = "Крупнейший интегратор";
	const titleSpan = "digital-решений";

	return (
		<div className={styles.firstScreen}>
			<div className={styles.firstScreen_wrapper}>
				<div className={styles.firstScreen_title}>
					{titleMain} <br />
					<span>
						{titleSpan.split("").map((char, i) => (
							<span key={i} className={styles.letter} style={{ animationDelay: `${i * 0.1}s` }}>
								{char === " " ? "\u00A0" : char}
							</span>
						))}
					</span>
				</div>
				<div className={styles.firstScreen_tags}>web, mobile, analytics</div>
			</div>
		</div>
	);
}
