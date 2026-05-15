import type { FC } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useDispatch } from "react-redux";

import { openDrawer } from "../../../App/store/slices/drawerSlice";
import Button from "../../../Shared/ui/Button/Button";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import Footer from "../../../Widgets/Footer/Footer";
import abstractVideo from "../../../Shared/assets/video/abstract.mp4";
import { useLanguage } from "../../../Shared/lib/i18n";
import { homeServicesSchema, organizationSchema, seoKeywords, SITE_URL, siteDescription, siteDescriptionEn, siteTitle, siteTitleEn, websiteSchema } from "../../../Shared/lib/seo";
import styles from "./HomePage.module.scss";

const services = [
	{
		number: "01",
		title: "Web-разработка",
		description:
			"Корпоративные сайты, личные кабинеты, витрины и web-сервисы с понятной архитектурой и быстрым запуском.",
		tags: ["frontend", "backend", "cms", "integrations"],
	},
	{
		number: "02",
		title: "Продуктовый дизайн",
		description:
			"Проектируем интерфейсы, сценарии и дизайн-системы так, чтобы команда могла развивать продукт без хаоса.",
		tags: ["ux", "ui", "prototypes", "systems"],
	},
	{
		number: "03",
		title: "Маркетинг и SEO",
		description:
			"Собираем аналитику, посадочные страницы и контентную структуру вокруг реальных заявок, продаж и метрик.",
		tags: ["analytics", "seo", "content", "growth"],
	},
	{
		number: "04",
		title: "Поддержка и развитие",
		description:
			"Берем существующие проекты, находим слабые места, ускоряем, дорабатываем и поддерживаем после релиза.",
		tags: ["audit", "support", "refactor", "release"],
	},
];

const servicesEn = [
	{
		number: "01",
		title: "Web development",
		description: "Corporate websites, accounts, storefronts and web services with clear architecture and fast launch.",
		tags: ["frontend", "backend", "cms", "integrations"],
	},
	{
		number: "02",
		title: "Product design",
		description: "We design interfaces, scenarios and design systems that teams can develop without chaos.",
		tags: ["ux", "ui", "prototypes", "systems"],
	},
	{
		number: "03",
		title: "Marketing and SEO",
		description: "We build analytics, landing pages and content structure around real leads, sales and metrics.",
		tags: ["analytics", "seo", "content", "growth"],
	},
	{
		number: "04",
		title: "Support and growth",
		description: "We take existing projects, find weak points, speed them up, improve and support them after release.",
		tags: ["audit", "support", "refactor", "release"],
	},
];

const workflow = [
	["01", "Разбор задачи", "Фиксируем бизнес-цель, ограничения, аудиторию и то, что должно измениться после запуска."],
	["02", "Сценарии и структура", "Собираем карту страниц, пользовательские пути, контентные блоки и техническую схему."],
	["03", "Дизайн и прототип", "Прорабатываем визуальную систему и ключевые состояния интерфейса до разработки."],
	["04", "Разработка", "Собираем frontend, backend, интеграции, админку и аналитику короткими проверяемыми итерациями."],
	["05", "Запуск", "Тестируем, оптимизируем скорость, проверяем формы, домены, метрики и готовим проект к трафику."],
	["06", "Рост", "После релиза смотрим на данные, улучшаем конверсию и добавляем новые функции без пересборки с нуля."],
];

const workflowEn = [
	["01", "Discovery", "We define the business goal, limits, audience and what should change after launch."],
	["02", "Scenarios and structure", "We map pages, user journeys, content blocks and the technical outline."],
	["03", "Design and prototype", "We shape the visual system and key interface states before development."],
	["04", "Development", "We build frontend, backend, integrations, admin tools and analytics in short iterations."],
	["05", "Launch", "We test, optimize speed, check forms, domains and metrics, then prepare the project for traffic."],
	["06", "Growth", "After release we read the data, improve conversion and add new features without rebuilding from scratch."],
];

const reasons = [
	"Одна команда закрывает стратегию, дизайн, разработку и поддержку.",
	"Показываем рабочие версии по ходу проекта, а не только финальный макет.",
	"Сохраняем понятную архитектуру, чтобы продукт можно было развивать дальше.",
	"Работаем с текущими проектами так же уверенно, как с запуском с нуля.",
];

const reasonsEn = [
	"One team covers strategy, design, development and support.",
	"We show working versions throughout the project, not only the final mockup.",
	"We keep the architecture clear so the product can grow further.",
	"We work with existing projects as confidently as with launches from scratch.",
];

const faq = [
	{
		question: "Вы делаете только сайты или полноценные сервисы тоже?",
		answer:
			"Делаем и сайты, и web-сервисы: от лендингов и корпоративных платформ до личных кабинетов, интеграций и внутренних инструментов.",
	},
	{
		question: "Можно прийти с уже существующим проектом?",
		answer:
			"Да. Начинаем с аудита, разбираем слабые места, затем предлагаем план доработки, редизайна или аккуратной технической модернизации.",
	},
	{
		question: "Как быстро можно запустить первую версию?",
		answer:
			"Зависит от объема. Простую промо-страницу можно собрать быстро, а сервисы удобнее запускать этапами: сначала ядро, затем развитие по данным.",
	},
	{
		question: "Что происходит после релиза?",
		answer:
			"Можем передать проект вашей команде или остаться на поддержке: обновления, аналитика, новые разделы, технические улучшения.",
	},
];

const faqEn = [
	{
		question: "Do you build only websites or full services too?",
		answer:
			"We build both websites and web services: from landing pages and corporate platforms to accounts, integrations and internal tools.",
	},
	{
		question: "Can we come with an existing project?",
		answer:
			"Yes. We start with an audit, find weak points and then suggest a plan for improvements, redesign or careful technical modernization.",
	},
	{
		question: "How quickly can the first version be launched?",
		answer:
			"It depends on scope. A simple promo page can be launched quickly, while services are better released in stages: core first, then data-driven growth.",
	},
	{
		question: "What happens after release?",
		answer:
			"We can hand the project over to your team or stay for support: updates, analytics, new sections and technical improvements.",
	},
];

const SectionLabel = ({ number, label }: { number: string; label: string }) => (
	<p className={styles.sectionLabel}>
		<span>{number}</span>
		<span>/</span>
		{label}
	</p>
);

const HomePage: FC = () => {
	const { scrollYProgress } = useScroll();
	const dispatch = useDispatch();
	const { isEnglish, language } = useLanguage();
	const currentTitle = isEnglish ? siteTitleEn : siteTitle;
	const currentDescription = isEnglish ? siteDescriptionEn : siteDescription;
	const currentServices = isEnglish ? servicesEn : services;
	const currentWorkflow = isEnglish ? workflowEn : workflow;
	const currentReasons = isEnglish ? reasonsEn : reasons;
	const currentFaq = isEnglish ? faqEn : faq;
	const heroTags = isEnglish
		? ["web development", "design", "integrations", "seo", "analytics", "support"]
		: ["web-разработка", "дизайн", "интеграции", "seo", "аналитика", "поддержка"];

	return (
		<Wrapper>
			<motion.div
				id='scroll-indicator'
				style={{
					scaleX: scrollYProgress,
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					height: 2,
					originX: 0,
					zIndex: 9999,
					backgroundColor: "#29B6F6",
				}}
			/>
			<Helmet>
				<html lang={language} />
				<title>{currentTitle}</title>
				<meta
					name='description'
					content={currentDescription}
				/>
				<meta name='keywords' content={seoKeywords} />
				<meta name='robots' content='index, follow, max-image-preview:large' />
				<link rel='canonical' href={`${SITE_URL}/`} />
				<meta property='og:locale' content='ru_RU' />
				<meta property='og:site_name' content='Aerix' />
				<meta property='og:title' content={currentTitle} />
				<meta
					property='og:description'
					content={currentDescription}
				/>
				<meta property='og:url' content={`${SITE_URL}/`} />
				<meta property='og:type' content='website' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={currentTitle} />
				<meta name='twitter:description' content={currentDescription} />
				<script type='application/ld+json'>{JSON.stringify(organizationSchema)}</script>
				<script type='application/ld+json'>{JSON.stringify(websiteSchema)}</script>
				<script type='application/ld+json'>{JSON.stringify(homeServicesSchema)}</script>
			</Helmet>

			<main className={styles.page}>
				<section className={styles.hero}>
					<div className={styles.heroGhost}>AERIX</div>
					<div className={styles.heroTopline}>
						<span className={styles.logoDot}>A</span>
						<span>Aerix / studio</span>
					</div>

					<div className={styles.heroGrid}>
						<div className={styles.heroCopy}>
							<p className={styles.kicker}>000 / web · design · growth</p>
							<h1>
								{isEnglish ? (
									<>
										<span>We launch </span>
										<span>digital </span>
										<span>products </span>
										<span>that move </span>
										<span>business </span>
										<span>forward.</span>
									</>
								) : (
									<>
										<span>Запускаем </span>
										<span>digital </span>
										<span>продукты, </span>
										<span>которые </span>
										<span>двигают </span>
										<span>бизнес.</span>
									</>
								)}
							</h1>
							<p className={styles.lead}>
								{isEnglish ? (
									<>
										<span>We plan, design and build websites, services </span>
										<span>and online tools. </span>
										<span>We take a product from the first idea </span>
										<span>to a stable launch and growth.</span>
									</>
								) : (
									<>
										<span>Проектируем и дизайним. </span>
										<span>Разрабатываем сайты, сервисы </span>
										<span>и онлайн-инструменты. </span>
										<span>Ведем продукт от идеи </span>
										<span>до стабильной работы.</span>
									</>
								)}
							</p>
							<div className={styles.heroActions}>
								<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
									{isEnglish ? "Start a project" : "Начать проект"}
									<ArrowUpRight size={18} aria-hidden='true' />
								</Button>
								<a className={styles.secondaryLink} href='/approach'>
									{isEnglish ? "Services" : "Услуги"}
									<ArrowUpRight size={16} aria-hidden='true' />
								</a>
							</div>
						</div>

						<div className={styles.heroAside}>
							<div className={styles.statLine}>
								<span>{isEnglish ? "[ 8+ years ]" : "[ 8+ лет ]"}</span>
								<p>
									{isEnglish
										? "Experience in digital development and launching business projects."
										: "Опыт в digital-разработке и запуске проектов для бизнеса."}
								</p>
							</div>
							<div className={styles.statLine}>
								<span>{isEnglish ? "[ one team ]" : "[ одна команда ]"}</span>
								<p>
									{isEnglish
										? "Strategy, design, frontend, backend, analytics and support."
										: "Стратегия, дизайн, frontend, backend, аналитика и поддержка."}
								</p>
							</div>
							<div className={styles.signalPanel}>
								<video src={abstractVideo} autoPlay loop muted playsInline />
								<div>
									<span>live stack</span>
									<p>web · ui/ux · seo · analytics · support</p>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.heroTags}>
						{heroTags.map((tag) => (
							<span key={tag}>{tag}</span>
						))}
					</div>
				</section>

				<div className={styles.marquee} aria-hidden='true'>
					<div>
						Web development · UI/UX · SEO · Analytics · Support · Web development · UI/UX · SEO ·
						Analytics · Support ·
					</div>
				</div>

				<section className={styles.servicesSection}>
					<SectionLabel number='01' label='services · what we do' />
					<div className={styles.sectionIntro}>
						<h2>{isEnglish ? "Four directions, one team behind them." : "Четыре направления, одна команда за ними."}</h2>
						<p>
							{isEnglish
								? "You can come with a new idea, an outdated website or a product that already works. We assemble the right team around the task and bring it to launch."
								: "Можно прийти с новой идеей, устаревшим сайтом или продуктом, который уже работает. Мы собираем вокруг задачи нужный состав и доводим ее до запуска."}
						</p>
					</div>

					<div className={styles.serviceRows}>
						{currentServices.map((service) => (
							<article className={styles.serviceRow} key={service.number}>
								<span className={styles.rowNumber}>{service.number}</span>
								<h3>{service.title}</h3>
								<p>{service.description}</p>
								<div className={styles.rowTags}>
									{service.tags.map((tag) => (
										<span key={tag}>{tag}</span>
									))}
								</div>
								<ArrowUpRight className={styles.rowIcon} size={22} aria-hidden='true' />
							</article>
						))}
					</div>
				</section>

				<section className={styles.workflowSection}>
					<SectionLabel number='02' label='workflow · how we work' />
					<div className={styles.sectionIntro}>
						<h2>{isEnglish ? "A process without a black box." : "Процесс без черного ящика."}</h2>
						<p>
							{isEnglish
								? "Each stage leaves a clear artifact: structure, prototype, working version, tests, metrics or a growth plan."
								: "Каждый этап оставляет понятный артефакт: структуру, прототип, рабочую версию, тесты, метрики или план развития."}
						</p>
					</div>

					<div className={styles.workflowGrid}>
						{currentWorkflow.map(([number, title, description]) => (
							<article className={styles.workflowCard} key={number}>
								<span>{number}</span>
								<h3>{title}</h3>
								<p>{description}</p>
							</article>
						))}
					</div>
				</section>

				<section className={styles.reasonsSection}>
					<SectionLabel number='03' label='why aerix · the practical part' />
					<div className={styles.reasonLayout}>
						<h2>{isEnglish ? "Calm engineering work instead of a showcase for show." : "Спокойная инженерная работа вместо витрины ради витрины."}</h2>
						<div className={styles.reasonList}>
							{currentReasons.map((reason, index) => (
								<div className={styles.reasonItem} key={reason}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<p>{reason}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className={styles.faqSection}>
					<SectionLabel number='04' label='faq · before the brief' />
					<div className={styles.sectionIntro}>
						<h2>{isEnglish ? "Answers before the first call." : "Ответы до первого созвона."}</h2>
					</div>
					<div className={styles.faqList}>
						{currentFaq.map((item) => (
							<article className={styles.faqItem} key={item.question}>
								<h3>{item.question}</h3>
								<p>{item.answer}</p>
							</article>
						))}
					</div>
				</section>

				<section className={styles.contactSection}>
					<div>
						<SectionLabel number='05' label='contact · start' />
						<h2>{isEnglish ? "Tell us what needs to be launched or rebuilt." : "Расскажите, что нужно запустить или переделать."}</h2>
						<p>
							{isEnglish
								? "A short description is enough: the task, timeline, what already exists and where the project is stuck."
								: "Короткого описания достаточно: задача, сроки, что уже есть и где сейчас застревает проект."}
						</p>
					</div>
					<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
						{isEnglish ? "Discuss the project" : "Обсудить проект"}
						<ArrowUpRight size={18} aria-hidden='true' />
					</Button>
				</section>
			</main>
			<Footer />
		</Wrapper>
	);
};

export default HomePage;
