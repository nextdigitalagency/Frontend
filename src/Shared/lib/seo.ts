export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://aerix.ru").replace(/\/$/, "");

export const siteName = "Aerix";
export const siteTitle = "Создать сайт под ключ | Веб-студия и digital-агентство Aerix";
export const siteDescription =
	"Aerix разрабатывает сайты под ключ, интернет-магазины, лендинги, корпоративные сайты и web-сервисы для бизнеса: дизайн, frontend, backend, SEO и поддержка.";

export const siteTitleEn = "Custom Website Development | Web Studio and Digital Agency Aerix";
export const siteDescriptionEn =
	"Aerix builds custom websites, online stores, landing pages, corporate websites and web services for business: design, frontend, backend, SEO and support.";

export const seoKeywords = [
	"сделать веб сайт",
	"создать сайт",
	"заказать сайт",
	"разработка сайта",
	"сайт под ключ",
	"веб студия",
	"web студия",
	"digital агентство",
	"агентство разработки сайтов",
	"разработка интернет магазина",
	"создание корпоративного сайта",
	"дизайн сайта",
	"SEO продвижение сайта",
].join(", ");

export const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	"@id": `${SITE_URL}/#organization`,
	name: siteName,
	url: SITE_URL,
	description: siteDescription,
	areaServed: "RU",
	priceRange: "$$",
	serviceType: [
		"Создание сайтов",
		"Разработка сайтов под ключ",
		"Web-разработка",
		"UI/UX дизайн",
		"SEO оптимизация",
		"Поддержка digital-продуктов",
	],
};

export const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	url: SITE_URL,
	name: siteName,
	description: siteDescription,
	publisher: {
		"@id": `${SITE_URL}/#organization`,
	},
	potentialAction: {
		"@type": "SearchAction",
		target: `${SITE_URL}/?q={search_term_string}`,
		"query-input": "required name=search_term_string",
	},
};

export const homeServicesSchema = {
	"@context": "https://schema.org",
	"@type": "ItemList",
	itemListElement: [
		"Разработка сайта под ключ",
		"Создание лендинга",
		"Создание корпоративного сайта",
		"Разработка интернет-магазина",
		"UI/UX дизайн сайта",
		"SEO оптимизация сайта",
	].map((name, index) => ({
		"@type": "ListItem",
		position: index + 1,
		item: {
			"@type": "Service",
			name,
			provider: {
				"@id": `${SITE_URL}/#organization`,
			},
			areaServed: "RU",
		},
	})),
};
