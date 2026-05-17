import { Fragment, type FC, type ReactNode } from "react";
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

const projectFormats = [
	{
		number: "01",
		title: "Корпоративная платформа",
		description: "Главная витрина компании, услуги, доверие, заявки и понятная структура для роста.",
		tags: ["b2b", "website", "cms"],
	},
	{
		number: "02",
		title: "Личный кабинет",
		description: "Закрытая зона для клиентов, партнеров или команды: роли, данные, документы, уведомления.",
		tags: ["product", "backend", "ui"],
	},
	{
		number: "03",
		title: "Промо-запуск",
		description: "Отдельная digital-кампания для продукта, события, услуги или нового направления бизнеса.",
		tags: ["landing", "motion", "seo"],
	},
	{
		number: "04",
		title: "Редизайн и поддержка",
		description: "Аккуратно обновляем текущий сайт: UX, скорость, визуальная система, формы и аналитика.",
		tags: ["audit", "refactor", "support"],
	},
];

const projectFormatsEn = [
	{
		number: "01",
		title: "Corporate platform",
		description: "The main company website: services, trust, leads and a clear structure for growth.",
		tags: ["b2b", "website", "cms"],
	},
	{
		number: "02",
		title: "Client account",
		description: "A private area for clients, partners or teams: roles, data, documents and notifications.",
		tags: ["product", "backend", "ui"],
	},
	{
		number: "03",
		title: "Promo launch",
		description: "A digital campaign for a product, event, service or a new business direction.",
		tags: ["landing", "motion", "seo"],
	},
	{
		number: "04",
		title: "Redesign and support",
		description: "We update existing websites: UX, speed, visual system, forms and analytics.",
		tags: ["audit", "refactor", "support"],
	},
];

const SectionLabel = ({ number, label }: { number: string; label: string }) => (
	<motion.p
		className={styles.sectionLabel}
		initial={{ opacity: 0, x: -22 }}
		whileInView={{ opacity: 1, x: 0 }}
		viewport={{ once: true, amount: 0.45 }}
		transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
		<span>{number}</span>
		<span>/</span>
		{label}
	</motion.p>
);

const textContainer = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.045,
		},
	},
};

const textItem = {
	hidden: { opacity: 0, y: 26 },
	visible: { opacity: 1, y: 0 },
};

const cardContainer = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const cardItem = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0 },
};

const RevealItem = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => (
	<motion.div
		className={className}
		initial={{ opacity: 0, y: 34 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, amount: 0.22 }}
		transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
		{children}
	</motion.div>
);

const AnimatedHeading = ({ text }: { text: string }) => (
	<motion.h2
		variants={textContainer}
		initial='hidden'
		whileInView='visible'
		viewport={{ once: true, amount: 0.38 }}>
		{text.split(" ").map((word, index) => (
			<Fragment key={`${word}-${index}`}>
				<motion.span className={styles.wordReveal} variants={textItem}>
					{word}
				</motion.span>{" "}
			</Fragment>
		))}
	</motion.h2>
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
	const currentProjectFormats = isEnglish ? projectFormatsEn : projectFormats;
	const heroTags = isEnglish
		? ["web development", "design", "integrations", "seo", "analytics", "support"]
		: ["web-разработка", "дизайн", "интеграции", "seo", "аналитика", "поддержка"];
	const heroTitleParts = isEnglish
		? ["Digital", "production", "for companies", "that need", "a stronger", "web presence."]
		: ["Digital-", "продакшн", "для компаний,", "которым нужен", "сильный", "web."];
	const heroLeadLines = isEnglish
		? ["We plan, design and build websites, services", "and online tools.", "We take a product from the first idea", "to a stable launch and growth."]
		: ["Проектируем и дизайним.", "Разрабатываем сайты, сервисы", "и онлайн-инструменты.", "Ведем продукт от идеи", "до стабильной работы."];

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
					<motion.div
						className={styles.heroTopline}
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, delay: 0.1 }}>
						<span className={styles.logoDot}>A</span>
						<span>{isEnglish ? "Aerix / digital production" : "Aerix / digital-продакшн"}</span>
					</motion.div>

					<div className={styles.heroGrid}>
						<div className={styles.heroCopy}>
							<motion.p className={styles.kicker} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18 }}>
								001 / strategy · design · code · growth
							</motion.p>
							<motion.h1 variants={textContainer} initial='hidden' animate='visible'>
								{heroTitleParts.map((part, index) => (
									<motion.span variants={textItem} key={`${part}-${index}`}>
										{part}{" "}
									</motion.span>
								))}
							</motion.h1>
							<motion.p className={styles.lead} variants={textContainer} initial='hidden' animate='visible'>
								{heroLeadLines.map((line, index) => (
									<motion.span variants={textItem} key={`${line}-${index}`}>
										{line}{" "}
									</motion.span>
								))}
							</motion.p>
							<motion.div className={styles.heroActions} variants={cardContainer} initial='hidden' animate='visible'>
								<motion.div variants={cardItem}>
									<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
										{isEnglish ? "Start a project" : "Начать проект"}
										<ArrowUpRight size={18} aria-hidden='true' />
									</Button>
								</motion.div>
								<motion.a className={styles.secondaryLink} href='/approach' variants={cardItem}>
									{isEnglish ? "Services" : "Услуги"}
									<ArrowUpRight size={16} aria-hidden='true' />
								</motion.a>
							</motion.div>
						</div>

						<motion.div className={styles.heroAside} variants={cardContainer} initial='hidden' animate='visible'>
							<motion.div className={styles.statLine} variants={cardItem}>
								<span>{isEnglish ? "[ 8+ years ]" : "[ 8+ лет ]"}</span>
								<p>
									{isEnglish
										? "Experience in digital development and launching business projects."
										: "Опыт в digital-разработке и запуске проектов для бизнеса."}
								</p>
							</motion.div>
							<motion.div className={styles.statLine} variants={cardItem}>
								<span>{isEnglish ? "[ one team ]" : "[ одна команда ]"}</span>
								<p>
									{isEnglish
										? "Strategy, design, frontend, backend, analytics and support."
										: "Стратегия, дизайн, frontend, backend, аналитика и поддержка."}
								</p>
							</motion.div>
							<motion.div className={styles.signalPanel} variants={cardItem}>
								<video src={abstractVideo} autoPlay loop muted playsInline />
								<div>
									<span>live stack</span>
									<p>web · ui/ux · seo · analytics · support</p>
								</div>
							</motion.div>
						</motion.div>
					</div>

					<motion.div className={styles.heroTags} variants={cardContainer} initial='hidden' animate='visible'>
						{heroTags.map((tag, index) => (
							<motion.span variants={cardItem} key={tag} transition={{ delay: index * 0.04 }}>
								{tag}
							</motion.span>
						))}
					</motion.div>
				</section>

				<div className={styles.marquee} aria-hidden='true'>
					<div>
						Aerix digital production · Strategy · UX/UI · Frontend · Backend · Analytics · Support ·
						Aerix digital production · Strategy · UX/UI · Frontend · Backend · Analytics · Support ·
					</div>
				</div>

				<section className={styles.projectFormatsSection} id='launch-lab'>
					<SectionLabel number='01' label={isEnglish ? "launch lab · project formats" : "launch lab · форматы запусков"} />
					<div className={styles.formatsIntro}>
						<AnimatedHeading text={isEnglish
							? "A launch lab for the web products your business can start with."
							: "Лаборатория запусков для web-продуктов, с которых можно начать."}
						/>
						<RevealItem>
							<p>
								{isEnglish
									? "Choose the closest format: we quickly turn it into a first release, then grow it with data, design and engineering."
									: "Выберите ближайший формат: мы быстро превращаем его в первую версию, а затем развиваем через данные, дизайн и разработку."}
							</p>
						</RevealItem>
					</div>

					<div className={styles.formatGrid}>
						{currentProjectFormats.map((format, index) => (
							<motion.article
								className={styles.formatCard}
								key={format.number}
								variants={cardContainer}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.25 }}
								transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
								<div className={styles.formatMedia}>
									<motion.span variants={cardItem}>{format.number}</motion.span>
									<motion.strong variants={cardItem}>{format.title}</motion.strong>
								</div>
								<div className={styles.formatBody}>
									<motion.p variants={cardItem}>{format.description}</motion.p>
									<motion.div variants={cardContainer}>
										{format.tags.map((tag) => (
											<motion.span variants={cardItem} key={tag}>{tag}</motion.span>
										))}
									</motion.div>
								</div>
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.servicesSection}>
					<SectionLabel number='02' label='directions · what we do' />
					<div className={styles.sectionIntro}>
						<AnimatedHeading text={isEnglish ? "Four directions, one team behind them." : "Четыре направления, одна команда за ними."} />
						<RevealItem>
							<p>
								{isEnglish
									? "You can come with a new idea, an outdated website or a product that already works. We assemble the right team around the task and bring it to launch."
									: "Можно прийти с новой идеей, устаревшим сайтом или продуктом, который уже работает. Мы собираем вокруг задачи нужный состав и доводим ее до запуска."}
							</p>
						</RevealItem>
					</div>

					<div className={styles.serviceRows}>
						{currentServices.map((service, index) => (
							<motion.article
								className={styles.serviceRow}
								key={service.number}
								variants={cardContainer}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.35 }}
								transition={{ duration: 0.55, delay: index * 0.06 }}>
								<motion.span className={styles.rowNumber} variants={cardItem}>{service.number}</motion.span>
								<motion.h3 variants={cardItem}>{service.title}</motion.h3>
								<motion.p variants={cardItem}>{service.description}</motion.p>
								<motion.div className={styles.rowTags} variants={cardContainer}>
									{service.tags.map((tag) => (
										<motion.span variants={cardItem} key={tag}>{tag}</motion.span>
									))}
								</motion.div>
								<ArrowUpRight className={styles.rowIcon} size={22} aria-hidden='true' />
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.workflowSection}>
					<SectionLabel number='03' label='workflow · how we work' />
					<div className={styles.sectionIntro}>
						<AnimatedHeading text={isEnglish ? "A process without a black box." : "Процесс без черного ящика."} />
						<RevealItem>
							<p>
								{isEnglish
									? "Each stage leaves a clear artifact: structure, prototype, working version, tests, metrics or a growth plan."
									: "Каждый этап оставляет понятный артефакт: структуру, прототип, рабочую версию, тесты, метрики или план развития."}
							</p>
						</RevealItem>
					</div>

					<div className={styles.workflowGrid}>
						{currentWorkflow.map(([number, title, description], index) => (
							<motion.article
								className={styles.workflowCard}
								key={number}
								variants={cardContainer}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.28 }}
								transition={{ delay: index * 0.04 }}>
								<motion.span variants={cardItem}>{number}</motion.span>
								<motion.h3 variants={cardItem}>{title}</motion.h3>
								<motion.p variants={cardItem}>{description}</motion.p>
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.reasonsSection}>
					<SectionLabel number='04' label='why aerix · the practical part' />
					<div className={styles.reasonLayout}>
						<AnimatedHeading text={isEnglish ? "Calm engineering work instead of a showcase for show." : "Спокойная инженерная работа вместо витрины ради витрины."} />
						<div className={styles.reasonList}>
							{currentReasons.map((reason, index) => (
								<motion.div
									className={styles.reasonItem}
									key={reason}
									initial={{ opacity: 0, x: 28 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.48 }}
									transition={{ duration: 0.55, delay: index * 0.07 }}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<p>{reason}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				<section className={styles.faqSection}>
					<SectionLabel number='05' label='faq · before the brief' />
					<div className={styles.sectionIntro}>
						<AnimatedHeading text={isEnglish ? "Answers before the first call." : "Ответы до первого созвона."} />
					</div>
					<div className={styles.faqList}>
						{currentFaq.map((item, index) => (
							<motion.article
								className={styles.faqItem}
								key={item.question}
								variants={cardContainer}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true, amount: 0.34 }}
								transition={{ delay: index * 0.05 }}>
								<motion.h3 variants={cardItem}>{item.question}</motion.h3>
								<motion.p variants={cardItem}>{item.answer}</motion.p>
							</motion.article>
						))}
					</div>
				</section>

				<section className={styles.contactSection} id='contact'>
					<div>
						<SectionLabel number='06' label='contact · start' />
						<AnimatedHeading text={isEnglish ? "Tell us what needs to be launched or rebuilt." : "Расскажите, что нужно запустить или переделать."} />
						<RevealItem>
							<p>
								{isEnglish
									? "A short description is enough: the task, timeline, what already exists and where the project is stuck."
									: "Короткого описания достаточно: задача, сроки, что уже есть и где сейчас застревает проект."}
							</p>
						</RevealItem>
					</div>
					<RevealItem delay={0.12}>
						<Button className={styles.primaryButton} onClick={() => dispatch(openDrawer())}>
							{isEnglish ? "Discuss the project" : "Обсудить проект"}
							<ArrowUpRight size={18} aria-hidden='true' />
						</Button>
					</RevealItem>
				</section>
			</main>
			<Footer />
		</Wrapper>
	);
};

export default HomePage;
