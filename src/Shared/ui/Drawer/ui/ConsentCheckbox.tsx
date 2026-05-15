import styles from "../Drawer.module.scss";
import { useLanguage } from "../../../lib/i18n";

type Props = {
	consent: boolean;
	setConsent: (val: boolean) => void;
};

export const ConsentCheckbox = ({ consent, setConsent }: Props) => {
	const { isEnglish } = useLanguage();

	return (
		<div className={styles.consentWrapper}>
			<label className={styles.checkboxLabel}>
				<input type='checkbox' checked={consent} onChange={() => setConsent(!consent)} />
				<span>
					{isEnglish
						? "By clicking Contact us, I agree to the processing of my personal data under the "
						: "Нажимая кнопку «Связаться с нами» я соглашаюсь на обработку своих персональных данных по условиям "}
					<a href='/privacy' target='_blank' rel='noopener noreferrer'>
						{isEnglish ? "Privacy Policy" : "Политики конфиденциальности"}
					</a>
				</span>
			</label>
		</div>
	);
};
