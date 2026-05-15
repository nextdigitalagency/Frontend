import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ru" | "en";

const STORAGE_KEY = "aerix-language";

const detectLanguage = (): Language => {
	if (typeof window === "undefined") return "ru";

	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === "ru" || saved === "en") return saved;

	const browserLanguage = window.navigator.language.toLowerCase();
	return browserLanguage.startsWith("ru") ? "ru" : "en";
};

type LanguageContextValue = {
	language: Language;
	setLanguage: (language: Language) => void;
	toggleLanguage: () => void;
	isEnglish: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguageState] = useState<Language>(detectLanguage);

	const setLanguage = (nextLanguage: Language) => {
		setLanguageState(nextLanguage);
		window.localStorage.setItem(STORAGE_KEY, nextLanguage);
	};

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const value = useMemo(
		() => ({
			language,
			setLanguage,
			toggleLanguage: () => setLanguage(language === "ru" ? "en" : "ru"),
			isEnglish: language === "en",
		}),
		[language]
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used inside LanguageProvider");
	}

	return context;
};
