import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

const Input = ({ error, ...props }: InputProps) => (
	<div className={styles.inputContainer}>
		<input {...props} className={`${styles.myInput} ${error ? styles.inputError : ""}`} />
		{error && <p className={styles.errorText}>{error}</p>}
	</div>
);

export default Input;
