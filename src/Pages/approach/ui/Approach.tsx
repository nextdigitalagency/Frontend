import type { FC } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowUpRight } from "lucide-react";
import { useDispatch } from "react-redux";

import { openDrawer } from "../../../App/store/slices/drawerSlice";
import Button from "../../../Shared/ui/Button/Button";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import Footer from "../../../Widgets/Footer/Footer";
import abstractVideo from "../../../Shared/assets/video/video.mp4";
import { useLanguage } from "../../../Shared/lib/i18n";
import { organizationSchema, seoKeywords, SITE_URL } from "../../../Shared/lib/seo";
import styles from "./Approach.module.scss";

const serviceLanes = [
	{
		number: "01",
		title: "Сайты и web-сервисы",
		lead:
			"Лендинги, корпоративные сайты, каталоги, личные кабинеты и сервисы с админкой, интеграциями и аналитикой.",
		points: ["структура и прототип", "frontend и backend", "cms / admin", "формы, оплаты, crm"],
	},
	{
		number: "02",
		title: "UI/UX и дизайн-системы",
		lead:
			"Интерфейсы для новых продуктов и редизайн существующих экранов, где важны понятные сценарии и визуальная дисциплина.",
		points: ["user flow", "wireframes", "visual concept", "component system"],
	},
	{
		number: "03",
		title: "SEO, аналитика и рост",
		lead:
			"Техническая база для органического трафика, посадочные страницы, события аналитики и понятные точки оптимизации.",
		points: ["semantic core", "technical seo", "events", "conversion paths"],
	},
	{
		number: "04",
		title: "Аудит и модернизация",
		lead:
			"Разбираем текущий сайт или сервис, находим технические, UX и маркетинговые узкие места, затем приводим проект в порядок.",
		points: ["code review", "speed", "ux audit", "roadmap"],
	},
	{
		number: "05",
		title: "Поддержка продукта",
		lead:
			"После релиза остаемся рядом: обновления, новые разделы, интеграции, контроль форм, контента и стабильности.",
		points: ["monitoring", "updates", "iterations", "handoff"],
	},
];

const serviceLanesEn = [
	{
		number: "01",
		title: "Websites and web services",
		lead: "Landing pages, corporate sites, catalogs, accounts and services with admin panels, integrations and analytics.",
		points: ["structure and prototype", "frontend and backend", "cms / admin", "forms, payments, crm"],
	},
	{
		number: "02",
		title: "UI/UX and design systems",
		lead: "Interfaces for new products and redesigns of existing screens where clear scenarios and visual discipline matter.",
		points: ["user flow", "wireframes", "visual concept", "component system"],
	},
	{
		number: "03",
		title: "SEO, analytics and growth",
		lead: "A technical base for organic traffic, landing pages, analytics events and clear optimization points.",
		points: ["semantic core", "technical seo", "events", "conversion paths"],
	},
	{
		number: "04",
		title: "Audit and modernization",
		lead: "We review the current website or service, find technical, UX and marketing bottlenecks, then bring the project into shape.",
		points: ["code review", "speed", "ux audit", "roadmap"],
	},
	{
		number: "05",
		title: "Product support",
		lead: "After release we stay close: updates, new sections, integrations, form checks, content and stability.",
		points: ["monitoring", "updates", "iterations", "handoff"],
	},
];

const stages = [
	{
		number: "01",
		title: "Discovery",
		text: "Быстро собираем контекст: цели, аудитория, текущая система, ограничения, сроки и реальные критерии успеха.",
	},
	{
		number: "02",
		title: "Architecture",
		text: "Формируем структуру страниц, данные, интеграции, роли, админку и план релизов без лишней сложности.",
	},
	{
		number: "03",
		title: "Design",
		text: "Проектируем интерфейс на реальных сценариях: ключевые экраны, состояния, адаптивы и визуальную систему.",
	},
	{
		number: "04",
		title: "Engineering",
		text: "Разрабатываем итерациями, подключаем сервисы, проверяем формы, скорость, метрики и админские сценарии.",
	},
	{
		number: "05",
		title: "Launch",
		text: "Готовим домены, аналитику, SEO-базу, тестируем критические пути и спокойно выводим проект в публичный доступ.",
	},
	{
		number: "06",
		title: "Evolution",
		text: "Смотрим на данные после запуска, улучшаем конверсию, добавляем функции и поддерживаем стабильную работу.",
	},
];

const stagesEn = [
	{ number: "01", title: "Discovery", text: "We quickly gather context: goals, audience, current system, limits, timeline and real success criteria." },
	{ number: "02", title: "Architecture", text: "We shape page structure, data, integrations, roles, admin tools and a release plan without extra complexity." },
	{ number: "03", title: "Design", text: "We design interfaces around real scenarios: key screens, states, responsive layouts and the visual system." },
	{ number: "04", title: "Engineering", text: "We develop in iterations, connect services, check forms, speed, metrics and admin scenarios." },
	{ number: "05", title: "Launch", text: "We prepare domains, analytics and the SEO base, test critical paths and release the project calmly." },
	{ number: "06", title: "Evolution", text: "We read the data after launch, improve conversion, add features and keep the product stable." },
];

const formats = [
	{
		title: "Запуск с нуля",
		text: "Когда нужно собрать продукт, сайт или сервис от идеи до релиза.",
	},
	{
		title: "Редизайн и пересборка",
		text: "Когда текущая версия устарела, плохо конвертирует или мешает развитию.",
	},
	{
		title: "Техническая поддержка",
		text: "Когда проект уже работает, но ему нужны регулярные доработки и контроль.",
	},
];

const formatsEn = [
	{ title: "Launch from scratch", text: "When you need to build a product, website or service from idea to release." },
	{ title: "Redesign and rebuild", text: "When the current version is outdated, converts poorly or blocks growth." },
	{ title: "Technical support", text: "When the project already works but needs regular improvements and control." },
];

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
	const pageTitle = isEnglish
		? "Website Development Services | Design, SEO and Support | Aerix"
		: "Услуги создания сайтов | Разработка, дизайн и SEO | Aerix";
	const pageDescription = isEnglish
		? "Aerix services: custom website development, online stores, landing pages, corporate websites, UI/UX design, SEO optimization, analytics and support."
		: "Услуги Aerix: создание сайтов под ключ, разработка интернет-магазинов, лендингов, корпоративных сайтов, UI/UX дизайн, SEO оптимизация, аналитика и поддержка.";
	const currentServiceLanes = isEnglish ? serviceLanesEn : serviceLanes;
	const currentStages = isEnglish ? stagesEn : stages;
	const currentFormats = isEnglish ? formatsEn : formats;

	return (
		<Wrapper>
			<Helmet>
				<html lang={language} />
				<title>{pageTitle}</title>
				<meta
					name='description'
					content={pageDescription}
				/>
				<meta name='keywords' content={seoKeywords} />
				<meta name='robots' content='index, follow, max-image-preview:large' />
				<link rel='canonical' href={`${SITE_URL}/approach`} />
				<meta property='og:locale' content='ru_RU' />
				<meta property='og:site_name' content='Aerix' />
				<meta property='og:title' content={pageTitle} />
				<meta
					property='og:description'
					content={pageDescription}
				/>
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
					<div className={styles.heroGhost}>SERVICES</div>
					<SectionLabel number='000' label='services · aerix' />
					<div className={styles.heroGrid}>
						<div>
							<h1>
								{isEnglish ? (
									<>
										<span>Services </span>
										<span>built </span>
										<span>around </span>
										<span>results.</span>
									</>
								) : (
									<>
										<span>Услуги, </span>
										<span>собранные </span>
										<span>вокруг </span>
										<span>результата.</span>
									</>
								)}
							</h1>
							<p>
								{isEnglish ? (
									<>
										<span>Each task gets a clear route. </span>
										<span>What we do, why we do it and when we launch. </span>
										<span>Design, development and analytics work as one system.</span>
									</>
								) : (
									<>
										<span>Под каждую задачу собирается понятный маршрут. </span>
										<span>Что делаем, зачем и когда запускаем. </span>
										<span>Дизайн, разработка и аналитика работают как одна система.</span>
									</>
								)}
							</p>
							<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
								{isEnglish ? "Discuss the task" : "Обсудить задачу"}
								<ArrowUpRight size={18} aria-hidden='true' />
							</Button>
						</div>
						<div className={styles.heroPanel}>
							<video src={abstractVideo} autoPlay loop muted playsInline />
							<div>
								<span>[ service stack ]</span>
								<p>web · product design · seo · analytics · support</p>
							</div>
						</div>
					</div>
				</section>

				<div className={styles.marquee} aria-hidden='true'>
					<div>
						Web · Design · Analytics · SEO · Support · Web · Design · Analytics · SEO · Support ·
					</div>
				</div>

				<section className={styles.lanesSection}>
					<SectionLabel number='01' label='directions · what we build' />
					<div className={styles.sectionIntro}>
						<h2>{isEnglish ? "Five directions that can be combined." : "Пять направлений, которые можно комбинировать."}</h2>
						<p>
							{isEnglish
								? "A project can start with one block, but value usually appears at the intersection: interface, code, content, analytics and support work as one system."
								: "Проект может начаться с одного блока, но обычно ценность появляется на стыке: интерфейс, код, контент, аналитика и поддержка работают как одна система."}
						</p>
					</div>

					<div className={styles.laneList}>
						{currentServiceLanes.map((lane) => (
							<article className={styles.lane} key={lane.number}>
								<span className={styles.laneNumber}>{lane.number}</span>
								<h3>{lane.title}</h3>
								<p>{lane.lead}</p>
								<ul>
									{lane.points.map((point) => (
										<li key={point}>{point}</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</section>

				<section className={styles.processSection}>
					<SectionLabel number='02' label='workflow · from brief to growth' />
					<div className={styles.sectionIntro}>
						<h2>{isEnglish ? "We work in stages, while keeping the whole picture." : "Работаем этапами, но держим общую картину."}</h2>
						<p>
							{isEnglish
								? "This keeps the project from splitting into pretty mockups, separate development and forgotten metrics. Every decision is tied to launch and future support."
								: "Так проект не распадается на красивые макеты, отдельную разработку и забытые метрики. Каждое решение связано с запуском и дальнейшей поддержкой."}
						</p>
					</div>
					<div className={styles.stageGrid}>
						{currentStages.map((stage) => (
							<article className={styles.stageCard} key={stage.number}>
								<span>{stage.number}</span>
								<h3>{stage.title}</h3>
								<p>{stage.text}</p>
							</article>
						))}
					</div>
				</section>

				<section className={styles.formatsSection}>
					<SectionLabel number='03' label='formats · how to start' />
					<div className={styles.formatLayout}>
						<h2>{isEnglish ? "You can start from scratch, with a problem or with a live product." : "Можно зайти с нуля, с проблемой или с готовым продуктом."}</h2>
						<div className={styles.formatList}>
							{currentFormats.map((format, index) => (
								<article className={styles.formatItem} key={format.title}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<h3>{format.title}</h3>
									<p>{format.text}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className={styles.contactSection}>
					<div>
						<SectionLabel number='04' label='contact · project brief' />
						<h2>{isEnglish ? "Tell us what result you need." : "Расскажите, какой результат нужен."}</h2>
						<p>
							{isEnglish
								? "We will review the task, suggest the first route and explain which work format fits best."
								: "Мы разберем задачу, предложим первый маршрут и скажем, какой формат работы подойдет лучше."}
						</p>
					</div>
					<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
						{isEnglish ? "Start a project" : "Начать проект"}
						<ArrowUpRight size={18} aria-hidden='true' />
					</Button>
				</section>
			</main>

			<Footer />
		</Wrapper>
	);
};

export default Approach;
