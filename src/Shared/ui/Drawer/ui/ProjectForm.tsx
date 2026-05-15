import { useState } from "react";
import { TagsButtons } from "./TagsButtons";
import styles from "../Drawer.module.scss";
import { useLanguage } from "../../../lib/i18n";

type Props = {
	selectedTags: string[];
	toggleTag: (tag: string) => void;
	error?: string;
	touched?: boolean;
};

export const ProjectForm = ({ selectedTags, toggleTag, error, touched }: Props) => {
	const { isEnglish } = useLanguage();
	const [text, setText] = useState("");
	const [textError, setTextError] = useState<string | null>(null);
	const [touchedTextarea, setTouchedTextarea] = useState(false);

	const projectTags = isEnglish
		? ["corporate", "online store", "landing page", "design", "ux audit", "seo", "crm"]
		: ["корпоративный", "интернет-магазин", "лендинг", "дизайн", "ux-аудит", "seo", "crm"];

	const validateTextarea = (value: string) => {
		if (!value.trim()) {
			return isEnglish ? "This field is required" : "Это обязательное поле";
		}
		if (value.trim().length < 50) {
			return isEnglish ? "At least 50 characters" : "Минимум 50 символов";
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
			<h3 className={styles.subtitle}>{isEnglish ? "About the project" : "О проекте"}</h3>

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
					placeholder={isEnglish ? "Tell us about your project*" : "Расскажите о вашем проекте*"}
					value={text}
					onChange={handleChange}
					onBlur={handleBlur}
					className={textError ? styles.textareaError : ""}
				/>
				<button type='button' className={styles.fileButton}>
					{isEnglish ? "Attach a file" : "📎 прикрепить файл"}
				</button>
				{textError && <p className={styles.errorText}>{textError}</p>}
			</div>

			<div className={styles.guidingQuestions}>
				<ol>
					<li>{isEnglish ? "What does your company do?" : "Чем занимается ваша компания?"}</li>
					<li>{isEnglish ? "How can we help?" : "С чем мы можем помочь?"}</li>
					<li>{isEnglish ? "What timeline and budget do you expect?" : "На какой срок работы и бюджет рассчитываете?"}</li>
					<li>
						{isEnglish
							? "Telegram / WhatsApp, if messaging is more convenient"
							: "Telegram / Whatsapp, если удобнее общаться в мессенджере"}
					</li>
				</ol>
			</div>
		</div>
	);
};
