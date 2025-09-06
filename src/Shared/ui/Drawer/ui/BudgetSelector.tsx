import { useState } from "react";
import { TagsButtons } from "./TagsButtons";
import styles from "../Drawer.module.scss";

type Props = {
	selectedBudgetTag: string | null;
	toggleBudgetTag: (tag: string) => void;
};

export const BudgetSelector = ({ selectedBudgetTag, toggleBudgetTag }: Props) => {
	const budgetTags = [
		"50-100 т. ₽",
		"100 - 200 т. ₽",
		"200 - 500 т. ₽",
		"500 - 1 млн. ₽",
		"более 1 млн. ₽",
	];

	const [touched, setTouched] = useState(false);
	const error = touched && !selectedBudgetTag ? "Это обязательное поле" : "";

	const handleToggle = (tag: string) => {
		toggleBudgetTag(tag);
		setTouched(true);
	};

	return (
		<div className={styles.budgetWrapper}>
			<h3 className={styles.subtitle}>Ваш бюджет</h3>
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
