import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Wrapper } from "../../Shared/ui/Wrapper/Wrapper";
import logo from "../../Shared/assets/img/logo.png";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import { useLanguage } from "../../Shared/lib/i18n";

interface HeaderProps {
	minimal?: boolean;
	inverseOnTop?: boolean;
}

export default function Header({ minimal, inverseOnTop = false }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const lockedScrollY = useRef(0);
	const dispatch = useDispatch();
	const location = useLocation();
	const { language, toggleLanguage, isEnglish } = useLanguage();
	const isHomePage = location.pathname === "/";
	const shouldUseTransparentHeader = isHomePage || inverseOnTop;
	const handleOpenDrawer = () => {
		dispatch(openDrawer());
		closeMenu();
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		lockedScrollY.current = window.scrollY;
		const body = document.body;
		const html = document.documentElement;
		const previousBodyStyles = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			overflow: body.style.overflow,
		};
		const previousHtmlOverflow = html.style.overflow;

		body.style.position = "fixed";
		body.style.top = `-${lockedScrollY.current}px`;
		body.style.left = "0";
		body.style.right = "0";
		body.style.width = "100%";
		body.style.overflow = "hidden";
		html.style.overflow = "hidden";

		return () => {
			body.style.position = previousBodyStyles.position;
			body.style.top = previousBodyStyles.top;
			body.style.left = previousBodyStyles.left;
			body.style.right = previousBodyStyles.right;
			body.style.width = previousBodyStyles.width;
			body.style.overflow = previousBodyStyles.overflow;
			html.style.overflow = previousHtmlOverflow;
			window.scrollTo(0, lockedScrollY.current);
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeMenu();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const text = "Aerix";
	const mainLinks = isEnglish
		? [
				["Home", "/"],
				["Services", "/approach"],
				["Projects", "/projects"],
				["Contacts", "/contacts"],
			]
		: [
				["Главная", "/"],
				["Услуги", "/approach"],
				["Проекты", "/projects"],
				["Контакты", "/contacts"],
			];
	const sideLinks = [
		["Telegram", "/contacts"],
		["Instagram", "/contacts"],
		[isEnglish ? "Privacy policy" : "Политика конфиденциальности", "/privacy"],
	];

	const menuVariants: Variants = {
		hidden: {
			clipPath: "inset(0 0 100% 0)",
			opacity: 0,
		},
		visible: {
			clipPath: "inset(0 0 0% 0)",
			opacity: 1,
			transition: {
				duration: 0.7,
				ease: "easeOut",
				staggerChildren: 0.08,
				delayChildren: 0.12,
			},
		},
		exit: {
			clipPath: "inset(0 0 100% 0)",
			opacity: 0,
			transition: {
				duration: 0.45,
				ease: "easeInOut",
			},
		},
	};
	const listVariants: Variants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.18,
			},
		},
	};
	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 34 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.55, ease: "easeOut" },
		},
	};

	return (
		<Wrapper>
			<header
				className={`${styles.header} ${
					isOpen ? styles.menuOpen : isScrolled || !shouldUseTransparentHeader ? styles.scrolled : styles.transparent
				} ${minimal ? styles.minimal : ""}`}>
				{/* Логотип или текст */}
				<div className={styles.logoWrapper}>
					{!isOpen ? (
						<Link to={"/"} onClick={closeMenu}>
							<img src={logo} alt='Logo' className={styles.logo} />
						</Link>
					) : (
						<div className={styles.logoText}>
							{text.split("").map((letter, index) => (
								<span
									key={index}
									style={{ animationDelay: `${index * 0.2}s` }}
									className={styles.letter}>
									{letter}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Навигация — показываем только если minimal не активен */}
				{!minimal && (
					<nav className={`${styles.nav} ${isOpen ? styles.hidden : ""}`}>
						<a className={styles.becomeClient} onClick={handleOpenDrawer}>
							{isEnglish ? "Start a project" : "Заказать проект"}
						</a>
						<Link to={"/approach"}>{isEnglish ? "Services" : "Услуги"}</Link>
					</nav>
				)}

				{/* Бургер */}
				<button
					className={`${styles.burger} ${isOpen ? styles.active : ""} ${
						!minimal ? styles.burgerBlue : ""
					}`}
					onClick={() => setIsOpen(!isOpen)}
					aria-label='Toggle menu'>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</header>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles.menuPanel}
						variants={menuVariants}
						initial='hidden'
						animate='visible'
						exit='exit'>
						<div className={styles.menuGhost}>AERIX</div>
						<div className={styles.menuInner}>
							<motion.div className={styles.menuTopline} variants={itemVariants}>
								<span>{isEnglish ? "Navigation" : "Навигация"}</span>
								<button className={styles.mobileLanguageToggle} onClick={toggleLanguage} type='button'>
									{language.toUpperCase()}
								</button>
							</motion.div>

							<motion.nav className={styles.menuPrimary} variants={listVariants}>
								{mainLinks.map(([label, to], index) => (
									<motion.div className={styles.menuLinkWrap} variants={itemVariants} key={label}>
										<span>{String(index + 1).padStart(2, "0")}</span>
										<Link to={to} onClick={closeMenu}>
											{label}
										</Link>
									</motion.div>
								))}
								<motion.button
									className={styles.menuProjectButton}
									onClick={handleOpenDrawer}
									type='button'
									variants={itemVariants}>
									{isEnglish ? "Start a project" : "Начать проект"}
								</motion.button>
							</motion.nav>

							<motion.aside className={styles.menuAside} variants={itemVariants}>
								<p className={styles.menuAsideTitle}>
									{isEnglish
										? "Digital production for websites, services and interfaces."
										: "Digital-продакшн для сайтов, сервисов и интерфейсов."}
								</p>
								<div className={styles.menuContacts}>
									<a href='mailto:hello@aerix.digital'>hello@aerix.digital</a>
									<a href='tel:+79178150110'>+7 917 815-01-10</a>
								</div>
								<div className={styles.menuSideLinks}>
									{sideLinks.map(([label, to]) => (
										<Link key={label} to={to} onClick={closeMenu}>
											{label}
										</Link>
									))}
								</div>
							</motion.aside>

							<motion.div className={styles.menuFooter} variants={itemVariants}>
								<span>© {new Date().getFullYear()} Aerix</span>
								<span>web · ui/ux · seo · analytics · support</span>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Wrapper>
	);
}
