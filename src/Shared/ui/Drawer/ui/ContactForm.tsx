// ContactForm.tsx
import { useFormContext } from "react-hook-form"; // FieldError не нужно импортировать
import Input from "../../Input/Input";
import styles from "../Drawer.module.scss";

export const ContactForm = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getErrorMessage = (error: any): string | undefined => error?.message;

	return (
		<div className={styles.formWrapper}>
			<h3 className={styles.subtitle}>Ваши контакты</h3>
			<div className={styles.inputs}>
				<div className={styles.inputWrapper}>
					<Input
						type='text'
						placeholder='Имя*'
						{...register("name", {
							required: "Это поле обязательно",
							pattern: {
								value: /^[A-Za-zА-Яа-яЁё\s'-]+$/,
								message: "Имя может содержать только буквы",
							},
						})}
						error={getErrorMessage(errors.name)}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<Input
						type='tel'
						placeholder='Телефон*'
						{...register("phone", {
							required: "Это поле обязательно",
							pattern: {
								value: /^\+7\d{10}$/,
								message: "Некорректный телефон",
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
							required: "Это поле обязательно",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Некорректный email",
							},
						})}
						error={getErrorMessage(errors.email)}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<Input
						type='text'
						placeholder='Компания*'
						{...register("company", { required: "Это поле обязательно" })}
						error={getErrorMessage(errors.company)}
					/>
				</div>
			</div>
		</div>
	);
};
