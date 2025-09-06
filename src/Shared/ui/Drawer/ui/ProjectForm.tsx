import { useState } from "react";
import { TagsButtons } from "./TagsButtons";
import styles from "../Drawer.module.scss";

type Props = {
	selectedTags: string[];
	toggleTag: (tag: string) => void;
	error?: string;
	touched?: boolean;
};

export const ProjectForm = ({ selectedTags, toggleTag, error, touched }: Props) => {
	const [text, setText] = useState("");
	const [textError, setTextError] = useState<string | null>(null);
	const [touchedTextarea, setTouchedTextarea] = useState(false);

	const projectTags = [
		"корпоративный",
		"интернет-магазин",
		"лендинг",
		"дизайн",
		"ux-аудит",
		"seo",
		"crm",
	];

	const validateTextarea = (value: string) => {
		if (!value.trim()) {
			return "Это обязательное поле";
		}
		if (value.trim().length < 50) {
			return "Минимум 50 символов";
		}
		return null;
	};

	const handleBlur = () => {
		setTouchedTextarea(true);
		setTextError(validateTextarea(text));
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
		if (touchedTextarea) {
			setTextError(validateTextarea(e.target.value));
		}
	};

	return (
		<div className={styles.projectWrapper}>
			<h3 className={styles.subtitle}>О проекте</h3>

			<div className={styles.tags}>
				<TagsButtons
					options={projectTags}
					selected={selectedTags}
					onToggle={toggleTag}
					error={error}
					touched={touched}
				/>
			</div>

			<div className={styles.textareaWrapper}>
				<textarea
					placeholder='Расскажите о вашем проекте*'
					value={text}
					onChange={handleChange}
					onBlur={handleBlur}
					className={textError ? styles.textareaError : ""}
				/>
				<button type='button' className={styles.fileButton}>
					📎 прикрепить файл
				</button>
				{textError && <p className={styles.errorText}>{textError}</p>}
			</div>

			<div className={styles.guidingQuestions}>
				<ol>
					<li>Чем занимается ваша компания?</li>
					<li>С чем мы можем помочь?</li>
					<li>На какой срок работы и бюджет рассчитываете?</li>
					<li>Telegram / Whatsapp, если удобнее общаться в мессенджере</li>
				</ol>
			</div>
		</div>
	);
};
