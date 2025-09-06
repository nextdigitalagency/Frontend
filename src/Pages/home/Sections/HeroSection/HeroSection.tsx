import { useEffect, useState } from "react";
import styles from "./HeroSection.module.scss";
import Button from "../../../../Shared/ui/Button/Button";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../../../App/store/slices/drawerSlice";

export default function HeroSection() {
	const dispatch = useDispatch();
	const titleMain = "Крупнейшее агентство";

	const words = ["web-разработки", "IT-продуктов", "онлайн-инструментов", "digital-решений"];

	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [isFadingOut, setIsFadingOut] = useState(false);

	useEffect(() => {
		if (currentWordIndex === words.length - 1) return;

		const timeout = setTimeout(() => {
			setIsFadingOut(true);

			setTimeout(() => {
				setCurrentWordIndex((prev) => prev + 1);
				setIsFadingOut(false);
			}, 100);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [currentWordIndex, words.length]);

	const currentWord = words[currentWordIndex];

	return (
		<div className={styles.firstScreen}>
			<div className={styles.firstScreen_wrapper}>
				<div className={styles.firstScreen_title}>
					{titleMain} <br />
					<span className={styles.wordWrapper}>
						{currentWord.split("").map((char, i) => (
							<span
								key={i}
								className={`${styles.letter} ${
									isFadingOut ? styles.fadeOutLetter : styles.fadeInLetter
								}`}
								style={{ animationDelay: `${i * 0.05}s` }}>
								{char === " " ? "\u00A0" : char}
							</span>
						))}
					</span>
				</div>
				<div className={styles.firstScreen_description}>
					<div className={styles.firstScreen_tags}>web, mobile, analytics, seo</div>
					<div className={styles.firstScreen_button}>
						<Button onClick={() => dispatch(openDrawer())}>НАЧАТЬ ПРОЕКТ</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
