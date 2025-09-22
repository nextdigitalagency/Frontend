import { useEffect, useState } from "react";
import { Wrapper } from "../../Shared/ui/Wrapper/Wrapper";
import logo from "../../Shared/assets/img/logo.png";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../App/store/slices/drawerSlice";
import { NavItem } from "../../Shared/ui/NavItem/NavItem";

interface HeaderProps {
	minimal?: boolean;
}

export default function Header({ minimal }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const dispatch = useDispatch();

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

	const text = "NEXT Digital";

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
						<a className={styles.becomeClient} onClick={() => dispatch(openDrawer())}>
							Заказать проект
						</a>
						<Link to={"/approach"}>Услуги</Link>
						<Link to={"/projects"}>Кейсы</Link>
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
					<div>
						{["О компании", "Услуги", "Кейсы"].map((text, i) => (
							<NavItem
								key={i}
								to={i === 0 ? "/" : i === 1 ? "/approach" : "/projects"}
								onClick={closeMenu}
								index={i}>
								{text}
							</NavItem>
						))}
					</div>
					<div>
						{["Стать клиентом", "Контент-хаб", "Работа в Next", "Контакты"].map((text, i) => (
							<NavItem
								key={i}
								to='/'
								onClick={i === 0 ? () => dispatch(openDrawer()) : closeMenu}
								index={i + 3}>
								{text}
							</NavItem>
						))}
					</div>
				</div>

				<div className={styles.fullscreen_menu_footer}>
					<div className={styles.fullscreen_menu_copyright}>
						<p>© {new Date().getFullYear()} Next. Все права защищены.</p>
						<p className={styles.policy}>Политика конфидециальности</p>
					</div>
					<div className={styles.fullscreen_menu_contacts}>
						<p>+7 917 815-01-10 </p> | <p> info@gmail.com</p>
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
