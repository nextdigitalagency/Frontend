import styles from "../Drawer.module.scss";
import Button from "../../Button/Button";

type Props = {
	options: string[];
	selected: string[] | string | null;
	onToggle: (tag: string) => void;
	error?: string;
	multiple?: boolean;
	touched?: boolean;
};

export const TagsButtons = ({
	options,
	selected,
	onToggle,
	error,
	multiple = true,
	touched,
}: Props) => {
	const showError = touched && !!error;

	return (
		<div className={styles.tagsWrapper}>
			<div className={styles.tags}>
				{options.map((tag) => {
					const isActive = multiple ? (selected as string[]).includes(tag) : selected === tag;

					const isErrorTag = showError; // всегда красим при ошибке

					return (
						<Button
							type='button'
							key={tag}
							className={`${styles.tag} ${isActive ? styles.active : ""} ${
								isErrorTag ? styles.errorTag : ""
							}`}
							onClick={() => onToggle(tag)}>
							{tag}
						</Button>
					);
				})}
			</div>
			{showError && <p className={styles.errorText}>{error}</p>}
		</div>
	);
};
