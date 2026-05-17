import type { FC } from "react";
import { useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";

import { openDrawer } from "../../../App/store/slices/drawerSlice";
import Button from "../../../Shared/ui/Button/Button";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import Footer from "../../../Widgets/Footer/Footer";
import abstractVideo from "../../../Shared/assets/video/video.mp4";
import { useLanguage } from "../../../Shared/lib/i18n";
import { organizationSchema, seoKeywords, SITE_URL } from "../../../Shared/lib/seo";
import styles from "./Approach.module.scss";

const fadeUp = {
	initial: { opacity: 0, y: 36 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.28 },
	transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
} as const;

const ru = {
	heroTitle: "Продуктовая аналитика, UX/UI, брендинг и разработка",
	heroLead:
		"Собираем digital-продукты полного цикла: от смысла и сценариев до интерфейса, кода, аналитики и поддержки после запуска.",
	heroTags: ["B2B", "Сервисы", "E-commerce", "Недвижимость", "Образование"],
	heroNote: "Сначала разбираем задачу, потом выбираем состав команды и маршрут запуска.",
	start: "Начать проект",
	brief: "Обсудить задачу",
	fieldsLabel: "Направления",
	fieldsTitle: "Каждое направление можно запустить отдельно или собрать в один производственный контур.",
	fieldsLead:
		"Вместо витрины кейсов пока показываем, как именно будет устроена работа: что входит в направление, для каких задач подходит и какой результат клиент получает на выходе.",
	servicesLabel: "Услуги",
	servicesTitle: "Детальный набор работ без лишней упаковки.",
	advantagesLabel: "Преимущества",
	advantagesTitle: "Погружаемся в бизнес и проектируем решения, которые можно реально запустить.",
	ctaTitle: "Есть задача, но пока нет точного ТЗ?",
	ctaText: "Опишите продукт, сроки и текущую проблему. Мы соберем первый маршрут и скажем, с чего лучше начать.",
	fields: [
		{
			number: "01",
			title: "Продуктовый дизайн и аналитика",
			short: "Исследуем сценарии, метрики и ограничения, чтобы интерфейс решал задачу бизнеса.",
			text:
				"Проектируем интерфейсы, которые учитывают потребности аудитории, коммерческие цели и техническую реализацию. На выходе получается структура продукта, понятные сценарии и дизайн-система для роста.",
			items: ["UX-исследования", "CJM и user flow", "Прототипы", "UX/UI сервисов", "UX-аудит"],
			projectTypes: "Сайты, личные кабинеты, e-commerce, web-сервисы, клиентские порталы",
			signal: "Подходит, если есть идея, устаревший интерфейс или продукт, который теряет конверсию.",
		},
		{
			number: "02",
			title: "Коммуникационный дизайн и digital-first брендинг",
			short: "Формируем визуальную систему, которая работает в digital-среде, а не только в презентации.",
			text:
				"Создаем коммуникацию вокруг продукта: позиционирование, визуальные принципы, digital-айдентику, motion и контентные правила. Бренд начинает одинаково уверенно жить в сайте, соцсетях и интерфейсах.",
			items: ["Аналитика и стратегия", "Креатив", "Digital-айдентика", "Motion", "Контент-продакшн"],
			projectTypes: "Промосайты, корпоративные сайты, лендинги, продуктовые презентации",
			signal: "Подходит, если нужно выглядеть дороже, понятнее и современнее до запуска публичных кейсов.",
		},
		{
			number: "03",
			title: "Разработка",
			short: "Собираем frontend, backend, интеграции и инфраструктуру под реальный запуск.",
			text:
				"На старте фиксируем технические требования, стек, роли, админку, интеграции и этапы релиза. Разработка идет итерациями, чтобы не потерять скорость и не накопить технический долг до запуска.",
			items: ["Front-end", "Back-end", "API-интеграции", "QA", "DevOps", "Админ-панель"],
			projectTypes: "Корпоративные сайты, каталоги, сервисы, интернет-магазины, внутренние порталы",
			signal: "Подходит, если нужна не картинка, а рабочая система с формами, данными и аналитикой.",
		},
		{
			number: "04",
			title: "Поддержка и развитие продукта",
			short: "После релиза развиваем продукт по данным, задачам бизнеса и обратной связи пользователей.",
			text:
				"Остаемся рядом после запуска: проверяем формы, скорость, события аналитики, добавляем разделы, улучшаем конверсию и поддерживаем стабильность. Работа идет понятными спринтами.",
			items: ["Продуктовая аналитика", "Дизайн-поддержка", "Техническая поддержка", "SEO-база", "Новые фичи"],
			projectTypes: "Живые сайты и сервисы, которым нужны регулярные улучшения",
			signal: "Подходит, если проект уже работает, но застрял, устарел или требует постоянных доработок.",
		},
	],
	serviceGroups: [
		{
			title: "Продуктовый дизайн и аналитика",
			items: [
				["UX-исследования и проектирование", "Интервью, CJM, сценарии, прототипы и проверка гипотез."],
				["UX/UI-дизайн сервисов", "Интерфейсы, UI-kit, состояния, адаптивы и дизайн-система."],
				["UX-аудит", "Поиск слабых мест навигации, контента, сценариев и конверсии."],
			],
		},
		{
			title: "Коммуникационный дизайн",
			items: [
				["Аналитика и стратегия", "Смысловая база, позиционирование и визуальные принципы."],
				["Digital-айдентика", "Система, которая работает в сайте, интерфейсе и контенте."],
				["Motion и контент", "Анимация, 3D, иллюстрации и визуальные материалы для продукта."],
			],
		},
		{
			title: "Разработка",
			items: [
				["Front-end", "React, TypeScript, адаптив, производительность, анимации."],
				["Back-end", "NestJS, API, базы данных, интеграции, отправка заявок."],
				["QA и DevOps", "Тестирование, деплой, домены, SSL, Docker и мониторинг."],
			],
		},
	],
	advantages: [
		["01", "Единая команда", "Дизайн, разработка, аналитика и запуск не расходятся по разным логикам."],
		["02", "Запуск без хаоса", "Сразу фиксируем ограничения, стек, роли, сроки и критические сценарии."],
		["03", "Решения под задачу", "Не продаем шаблонный набор услуг, а собираем состав работ под цель проекта."],
	],
};

const en = {
	heroTitle: "Product analytics, UX/UI, branding and development",
	heroLead:
		"We build full-cycle digital products: from strategy and scenarios to interface, code, analytics and post-launch support.",
	heroTags: ["B2B", "Services", "E-commerce", "Real estate", "Education"],
	heroNote: "First we understand the task, then choose the team and the launch route.",
	start: "Start a project",
	brief: "Discuss the task",
	fieldsLabel: "Fields",
	fieldsTitle: "Each direction can start separately or become one production system.",
	fieldsLead:
		"Instead of a public case wall, we show how the work is structured: what is inside each direction, what tasks it fits and what the client receives.",
	servicesLabel: "Services",
	servicesTitle: "A clear set of work without unnecessary packaging.",
	advantagesLabel: "Advantages",
	advantagesTitle: "We dive into the business and design solutions that can actually launch.",
	ctaTitle: "Have a task, but no clear brief yet?",
	ctaText: "Describe the product, timeline and current problem. We will suggest the first route and the best starting point.",
	fields: [
		{
			number: "01",
			title: "Product design and analytics",
			short: "We study scenarios, metrics and constraints so the interface solves the business task.",
			text:
				"We design interfaces around audience needs, commercial goals and technical reality. The output is product structure, clear flows and a design system for growth.",
			items: ["UX research", "CJM and user flow", "Prototypes", "Service UX/UI", "UX audit"],
			projectTypes: "Websites, accounts, e-commerce, web services, customer portals",
			signal: "Fits when there is an idea, an outdated interface or a product losing conversion.",
		},
		{
			number: "02",
			title: "Communication design and digital-first branding",
			short: "We build a visual system that works in digital, not only in a presentation.",
			text:
				"We create product communication: positioning, visual principles, digital identity, motion and content rules. The brand lives consistently in website, social content and interfaces.",
			items: ["Analytics and strategy", "Creative", "Digital identity", "Motion", "Content production"],
			projectTypes: "Promo sites, corporate sites, landing pages, product presentations",
			signal: "Fits when the product needs to look sharper, clearer and more mature before public cases appear.",
		},
		{
			number: "03",
			title: "Development",
			short: "We build frontend, backend, integrations and infrastructure for a real launch.",
			text:
				"At the start we fix requirements, stack, roles, admin tools, integrations and release steps. Development runs in iterations to keep speed and avoid technical debt.",
			items: ["Front-end", "Back-end", "API integrations", "QA", "DevOps", "Admin panel"],
			projectTypes: "Corporate sites, catalogs, services, online stores, internal portals",
			signal: "Fits when you need a working system with forms, data and analytics, not just visuals.",
		},
		{
			number: "04",
			title: "Product support and growth",
			short: "After release we grow the product through data, business tasks and user feedback.",
			text:
				"We stay close after launch: check forms, speed and analytics events, add sections, improve conversion and keep stability. Work happens in clear sprints.",
			items: ["Product analytics", "Design support", "Technical support", "SEO base", "New features"],
			projectTypes: "Live websites and services that need regular improvements",
			signal: "Fits when the project already works but is stuck, outdated or needs constant iterations.",
		},
	],
	serviceGroups: [
		{
			title: "Product design and analytics",
			items: [
				["UX research and design", "Interviews, CJM, scenarios, prototypes and hypothesis checks."],
				["Service UX/UI", "Interfaces, UI-kit, states, responsive layouts and design system."],
				["UX audit", "Navigation, content, scenario and conversion weak-point analysis."],
			],
		},
		{
			title: "Communication design",
			items: [
				["Analytics and strategy", "Meaning base, positioning and visual principles."],
				["Digital identity", "A system that works in website, interface and content."],
				["Motion and content", "Animation, 3D, illustrations and visual product materials."],
			],
		},
		{
			title: "Development",
			items: [
				["Front-end", "React, TypeScript, responsive UI, performance and animation."],
				["Back-end", "NestJS, API, databases, integrations and lead delivery."],
				["QA and DevOps", "Testing, deployment, domains, SSL, Docker and monitoring."],
			],
		},
	],
	advantages: [
		["01", "One team", "Design, development, analytics and launch stay in the same logic."],
		["02", "Launch without chaos", "We fix constraints, stack, roles, timeline and critical scenarios from the start."],
		["03", "Task-based solutions", "We do not sell a template package. We assemble the work around the project goal."],
	],
};

const SectionLabel = ({ number, label }: { number: string; label: string }) => (
	<p className={styles.sectionLabel}>
		<span>{number}</span>
		<span>/</span>
		{label}
	</p>
);

const Approach: FC = () => {
	const dispatch = useDispatch();
	const { isEnglish, language } = useLanguage();
	const content = isEnglish ? en : ru;
	const [activeField, setActiveField] = useState(0);
	const pageTitle = isEnglish
		? "Website Development Services | Design, SEO and Support | Aerix"
		: "Услуги создания сайтов | Разработка, дизайн и SEO | Aerix";
	const pageDescription = isEnglish
		? "Aerix services: custom website development, online stores, landing pages, corporate websites, UI/UX design, SEO optimization, analytics and support."
		: "Услуги Aerix: создание сайтов под ключ, разработка интернет-магазинов, лендингов, корпоративных сайтов, UI/UX дизайн, SEO оптимизация, аналитика и поддержка.";

	return (
		<Wrapper>
			<Helmet>
				<html lang={language} />
				<title>{pageTitle}</title>
				<meta name='description' content={pageDescription} />
				<meta name='keywords' content={seoKeywords} />
				<meta name='robots' content='index, follow, max-image-preview:large' />
				<link rel='canonical' href={`${SITE_URL}/approach`} />
				<meta property='og:locale' content='ru_RU' />
				<meta property='og:site_name' content='Aerix' />
				<meta property='og:title' content={pageTitle} />
				<meta property='og:description' content={pageDescription} />
				<meta property='og:url' content={`${SITE_URL}/approach`} />
				<meta property='og:type' content='website' />
				<meta name='twitter:card' content='summary_large_image' />
				<script type='application/ld+json'>
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Service",
						name: isEnglish ? "Website and digital product development" : "Создание сайтов и digital-продуктов",
						description:
							isEnglish
								? "Custom website development, online stores, web services, UI/UX design, SEO optimization and technical support."
								: "Разработка сайтов под ключ, интернет-магазинов, web-сервисов, UI/UX дизайн, SEO оптимизация и техническая поддержка.",
						provider: organizationSchema,
						areaServed: "RU",
						serviceType: isEnglish
							? ["Website development", "Web development", "UI/UX design", "SEO optimization"]
							: ["Создание сайтов", "Web-разработка", "UI/UX дизайн", "SEO оптимизация"],
					})}
				</script>
			</Helmet>

			<main className={styles.page}>
				<section className={styles.hero}>
					<div className={styles.heroGhost}>FIELDS</div>
					<motion.div {...fadeUp} className={styles.heroTop}>
						<SectionLabel number='00' label={isEnglish ? "services · aerix" : "услуги · aerix"} />
						<button className={styles.heroLink} onClick={() => dispatch(openDrawer())} type='button'>
							{content.start}
							<ArrowUpRight size={17} aria-hidden='true' />
						</button>
					</motion.div>
					<motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className={styles.heroGrid}>
						<h1>{content.heroTitle}</h1>
						<div className={styles.heroAside}>
							<p>{content.heroLead}</p>
							<div className={styles.tagCloud}>
								{content.heroTags.map((tag) => (
									<span key={tag}>{tag}</span>
								))}
							</div>
						</div>
					</motion.div>
					<motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className={styles.heroBottom}>
						<div className={styles.videoCell}>
							<video src={abstractVideo} autoPlay loop muted playsInline />
						</div>
						<p>{content.heroNote}</p>
					</motion.div>
				</section>

				<section className={styles.fieldsSection}>
					<motion.div {...fadeUp} className={styles.sectionHead}>
						<SectionLabel number='01' label={content.fieldsLabel} />
						<h2>{content.fieldsTitle}</h2>
						<p>{content.fieldsLead}</p>
					</motion.div>

					<div className={styles.fieldAccordion}>
						{content.fields.map((field, index) => {
							const isActive = activeField === index;
							return (
								<motion.article {...fadeUp} className={styles.fieldItem} key={field.number}>
									<button
										className={`${styles.fieldTrigger} ${isActive ? styles.activeField : ""}`}
										onClick={() => setActiveField(isActive ? -1 : index)}
										type='button'>
										<span>{field.number}</span>
										<strong>{field.title}</strong>
										<em>{field.short}</em>
										<ChevronDown size={26} aria-hidden='true' />
									</button>
									<AnimatePresence initial={false}>
										{isActive && (
											<motion.div
												className={styles.fieldPanel}
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
												<div className={styles.fieldPanelInner}>
													<p>{field.text}</p>
													<ul>
														{field.items.map((item) => (
															<li key={item}>{item}</li>
														))}
													</ul>
													<div className={styles.fieldMeta}>
														<div>
															<span>{isEnglish ? "Project types" : "Типы проектов"}</span>
															<p>{field.projectTypes}</p>
														</div>
														<div>
															<span>{isEnglish ? "Signal" : "Когда нужно"}</span>
															<p>{field.signal}</p>
														</div>
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.article>
							);
						})}
					</div>
				</section>

				<section className={styles.servicesSection}>
					<motion.div {...fadeUp} className={styles.sectionHead}>
						<SectionLabel number='02' label={content.servicesLabel} />
						<h2>{content.servicesTitle}</h2>
					</motion.div>
					<div className={styles.serviceGrid}>
						{content.serviceGroups.map((group, groupIndex) => (
							<motion.article
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: groupIndex * 0.06 }}
								className={styles.serviceGroup}
								key={group.title}>
								<span>{String(groupIndex + 1).padStart(2, "0")}</span>
								<h3>{group.title}</h3>
								<div>
									{group.items.map(([title, text]) => (
										<section key={title}>
											<h4>{title}</h4>
											<p>{text}</p>
										</section>
									))}
								</div>
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.advantagesSection}>
					<motion.div {...fadeUp} className={styles.advantageLead}>
						<SectionLabel number='03' label={content.advantagesLabel} />
						<h2>{content.advantagesTitle}</h2>
					</motion.div>
					<div className={styles.advantageGrid}>
						{content.advantages.map(([number, title, text], index) => (
							<motion.article
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: index * 0.08 }}
								className={styles.advantageCard}
								key={number}>
								<span>{number}</span>
								<h3>{title}</h3>
								<p>{text}</p>
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.ctaSection}>
					<motion.div {...fadeUp}>
						<SectionLabel number='04' label={isEnglish ? "brief · contact" : "бриф · контакт"} />
						<h2>{content.ctaTitle}</h2>
						<p>{content.ctaText}</p>
					</motion.div>
					<motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }}>
						<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
							{content.brief}
							<ArrowUpRight size={18} aria-hidden='true' />
						</Button>
					</motion.div>
				</section>
			</main>

			<Footer />
		</Wrapper>
	);
};

export default Approach;
