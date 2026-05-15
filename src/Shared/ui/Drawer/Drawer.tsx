import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./Drawer.module.scss";
import { DrawerHeader } from "./ui/DrawerHeader";
import { ContactForm } from "./ui/ContactForm";
import { ProjectForm } from "./ui/ProjectForm";
import { BudgetSelector } from "./ui/BudgetSelector";
import { ConsentCheckbox } from "./ui/ConsentCheckbox";
import { useLanguage } from "../../lib/i18n";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

// описываем все поля формы
type FormValues = {
	name: string;
	phone: string;
	email: string;
	company: string;
	tags: string[];
};

export const Drawer = ({ isOpen, onClose }: Props) => {
	const [show, setShow] = useState(isOpen);
	const [closing, setClosing] = useState(false);
	const [selectedBudgetTag, setSelectedBudgetTag] = useState<string | null>(null);
	const [consent, setConsent] = useState(false);
	const { isEnglish } = useLanguage();

	// прокидываем тип
	const methods = useForm<FormValues>({
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			company: "",
			tags: [],
		},
	});

	const {
		handleSubmit,
		setValue,
		watch,
		formState: { isValid, errors },
	} = methods;

	const selectedTags = watch("tags");

	// регистрация поля tags для валидации
	useEffect(() => {
		methods.register("tags", {
			validate: (value) => (value && value.length > 0 ? true : isEnglish ? "This field is required" : "Это поле обязательно"),
		});
	}, [methods, isEnglish]);

	const onSubmit = (data: FormValues) => {
		console.log("Form submitted:", { ...data, selectedTags, selectedBudgetTag, consent });
	};

	const [tagsTouched, setTagsTouched] = useState(false);

	const toggleTag = (tag: string) => {
		const updated = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

		setValue("tags", updated, { shouldValidate: true });
		setTagsTouched(true);
	};

	const toggleBudgetTag = (tag: string) =>
		setSelectedBudgetTag((prev) => (prev === tag ? null : tag));

	useEffect(() => {
		if (isOpen) {
			setShow(true);
			setClosing(false);
		} else {
			setClosing(true);
			const timer = setTimeout(() => setShow(false), 500);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	if (!show) return null;

	return ReactDOM.createPortal(
		<div className={`${styles.overlay} ${closing ? styles.closing : ""}`} onClick={onClose}>
			<div
				className={`${styles.content} ${closing ? styles.closing : ""}`}
				data-lenis-scroll
				onClick={(e) => e.stopPropagation()}>
				<DrawerHeader onClose={onClose} />
				<div className={styles.inner}>
					<h2 className={styles.title}>
						{isEnglish ? "Want to discuss a project? Fill out the brief" : "Хотите обсудить проект? Заполните анкету"}
					</h2>
					<p className={styles.description}>
						{isEnglish
							? "We keep all information about your project confidential."
							: "Мы гарантируем конфиденциальность всей информации о вашем проекте."}
					</p>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ContactForm />
							<ProjectForm
								selectedTags={selectedTags}
								toggleTag={toggleTag}
								error={errors.tags?.message}
								touched={tagsTouched}
							/>
							<BudgetSelector
								selectedBudgetTag={selectedBudgetTag}
								toggleBudgetTag={toggleBudgetTag}
							/>
							<ConsentCheckbox consent={consent} setConsent={setConsent} />
							<button type='submit' className={styles.startButton} disabled={!consent || !isValid}>
								{isEnglish ? "contact us" : "связаться с нами"}
							</button>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>,
		document.getElementById("drawer-root")!
	);
};
