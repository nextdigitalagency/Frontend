import { useEffect, useState } from "react";
import { Wrapper } from "../../Shared/ui/Wrapper/Wrapper";
import logo from "../../Shared/assets/img/logo.png";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import { NavItem } from "../../Shared/ui/NavItem/NavItem";
import { useLanguage } from "../../Shared/lib/i18n";

interface HeaderProps {
	minimal?: boolean;
}

export default function Header({ minimal }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const dispatch = useDispatch();
	const { language, toggleLanguage, isEnglish } = useLanguage();
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
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const text = "Aerix";

	return (
		<Wrapper>
			<header
				className={`${styles.header} ${
					isOpen ? styles.menuOpen : isScrolled ? styles.scrolled : styles.transparent
				} ${minimal ? styles.minimal : ""}`}>
				{/* Логотип или текст */}
				<div className={styles.logoWrapper}>
					{!isOpen ? (
						<Link to={"/"}>
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

			{/* Мобильное меню — всегда доступно */}
			<div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
				<div className={styles.fullscreen_menu}>
					<button className={styles.mobileLanguageToggle} onClick={toggleLanguage} type='button'>
						{language.toUpperCase()}
					</button>
					<div>
						{(isEnglish ? ["About", "Services"] : ["О компании", "Услуги"]).map((text, i) => (
							<NavItem
								key={i}
								to={i === 0 ? "/" : "/approach"}
								onClick={closeMenu}
								index={i}>
								{text}
							</NavItem>
						))}
					</div>
					<div>
						{(isEnglish
							? ["Become a client", "Content hub", "Careers at Aerix", "Contacts"]
							: ["Стать клиентом", "Контент-хаб", "Работа в Aerix", "Контакты"]
						).map((text, i) => (
							<NavItem
								key={i}
								to='/'
								onClick={i === 0 ? handleOpenDrawer : closeMenu}
								index={i + 3}>
								{text}
							</NavItem>
						))}
					</div>
				</div>

				<div className={styles.fullscreen_menu_footer}>
					<div className={styles.fullscreen_menu_copyright}>
						<p>
							© {new Date().getFullYear()} Aerix.{" "}
							{isEnglish ? "All rights reserved." : "Все права защищены."}
						</p>
						<p className={styles.policy}>{isEnglish ? "Privacy policy" : "Политика конфидециальности"}</p>
					</div>
					<div className={styles.fullscreen_menu_contacts}>
						<p>+7 917 815-01-10 </p> | <p> hello@aerix.digital</p>
					</div>
					<div className={styles.fullscreen_menu_social}>
						<p>Telegram</p>
						<p>Instagram</p>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
