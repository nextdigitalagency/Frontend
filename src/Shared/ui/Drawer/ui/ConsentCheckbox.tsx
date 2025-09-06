import styles from "../Drawer.module.scss";

type Props = {
	consent: boolean;
	setConsent: (val: boolean) => void;
};

export const ConsentCheckbox = ({ consent, setConsent }: Props) => (
	<div className={styles.consentWrapper}>
		<label className={styles.checkboxLabel}>
			<input type='checkbox' checked={consent} onChange={() => setConsent(!consent)} />
			<span>
				Нажимая кнопку «Связаться с нами» я соглашаюсь на обработку своих персональных данных по
				условиям{" "}
				<a href='/privacy' target='_blank' rel='noopener noreferrer'>
					Политики конфиденциальности
				</a>
			</span>
		</label>
	</div>
);
