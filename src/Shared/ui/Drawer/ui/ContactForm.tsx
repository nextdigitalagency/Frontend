// ContactForm.tsx
import { useFormContext } from "react-hook-form"; // FieldError не нужно импортировать
import Input from "../../Input/Input";
import styles from "../Drawer.module.scss";
import { useLanguage } from "../../../lib/i18n";

export const ContactForm = () => {
	const { isEnglish } = useLanguage();
	const {
		register,
		formState: { errors },
	} = useFormContext();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getErrorMessage = (error: any): string | undefined => error?.message;

	return (
		<div className={styles.formWrapper}>
			<h3 className={styles.subtitle}>{isEnglish ? "Your contacts" : "Ваши контакты"}</h3>
			<div className={styles.inputs}>
				<div className={styles.inputWrapper}>
					<Input
						type='text'
						placeholder={isEnglish ? "Name*" : "Имя*"}
						{...register("name", {
							required: isEnglish ? "This field is required" : "Это поле обязательно",
							pattern: {
								value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
								message: isEnglish ? "Name can contain only letters" : "Имя может содержать только буквы",
							},
						})}
						error={getErrorMessage(errors.name)}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<Input
						type='tel'
						placeholder={isEnglish ? "Phone*" : "Телефон*"}
						{...register("phone", {
							required: isEnglish ? "This field is required" : "Это поле обязательно",
							pattern: {
								value: /^\+7\d{10}$/,
								message: isEnglish ? "Invalid phone number" : "Некорректный телефон",
							},
							onChange: (e) => {
								let value = e.target.value;

								if (!value.startsWith("+7")) {
									if (value[0] === "7") value = "+7" + value.slice(1);
									else value = "+7" + value.replace(/\D/g, "");
								}

								e.target.value = value;
							},
						})}
						error={getErrorMessage(errors.phone)}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<Input
						type='email'
						placeholder='E-mail*'
						{...register("email", {
							required: isEnglish ? "This field is required" : "Это поле обязательно",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: isEnglish ? "Invalid email" : "Некорректный email",
							},
						})}
						error={getErrorMessage(errors.email)}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<Input
						type='text'
						placeholder={isEnglish ? "Company*" : "Компания*"}
						{...register("company", { required: isEnglish ? "This field is required" : "Это поле обязательно" })}
						error={getErrorMessage(errors.company)}
					/>
				</div>
			</div>
		</div>
	);
};
