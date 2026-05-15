import { useState } from "react";
import { TagsButtons } from "./TagsButtons";
import styles from "../Drawer.module.scss";
import { useLanguage } from "../../../lib/i18n";

type Props = {
	selectedBudgetTag: string | null;
	toggleBudgetTag: (tag: string) => void;
};

export const BudgetSelector = ({ selectedBudgetTag, toggleBudgetTag }: Props) => {
	const { isEnglish } = useLanguage();
	const budgetTags = isEnglish
		? ["$500-1k", "$1k-2k", "$2k-5k", "$5k-10k", "over $10k"]
		: ["50-100 т. ₽", "100 - 200 т. ₽", "200 - 500 т. ₽", "500 - 1 млн. ₽", "более 1 млн. ₽"];

	const [touched, setTouched] = useState(false);
	const error = touched && !selectedBudgetTag ? (isEnglish ? "This field is required" : "Это обязательное поле") : "";

	const handleToggle = (tag: string) => {
		toggleBudgetTag(tag);
		setTouched(true);
	};

	return (
		<div className={styles.budgetWrapper}>
			<h3 className={styles.subtitle}>{isEnglish ? "Your budget" : "Ваш бюджет"}</h3>
			<div className={styles.tags}>
				<TagsButtons
					options={budgetTags}
					selected={selectedBudgetTag}
					onToggle={handleToggle}
					multiple={false}
					touched={touched}
					error={error}
				/>
			</div>
		</div>
	);
};
