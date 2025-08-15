import { useEffect, useState } from "react";
import { Wrapper } from "../../Shared/ui/Wrapper";
import logo from "../../Shared/assets/img/logo.png";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const text = "NEXT Digital";

	return (
		<Wrapper>
			<header
				className={`${styles.header}  ${
					isOpen ? styles.menuOpen : isScrolled ? styles.scrolled : styles.transparent
				}`}>
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

				{/* Левая часть */}
				<div className={`${styles.left} ${isOpen ? styles.hidden : ""}`}>
					<a href='tel:+74959810185' className={styles.phone}>
						+7 917 815-01-10
					</a>
					<a href='#' className={styles.becomeClient}>
						+ Стать клиентом
					</a>
				</div>

				{/* Навигация */}
				<nav className={`${styles.nav} ${isOpen ? styles.hidden : ""}`}>
					<Link to={"/approach"}>Услуги</Link>
					<Link to={"/projects"}>Кейсы</Link>
					<Link to={"/"}>Контент-хаб</Link>
				</nav>

				{/* Бургер */}
				<button
					className={`${styles.burger} ${isOpen ? styles.active : ""}`}
					onClick={() => setIsOpen(!isOpen)}
					aria-label='Toggle menu'>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</header>

			{/* Мобильное меню */}
			<div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
				<div className={styles.fullscreen_menu}>
					<div>
						<p className={styles.navItem}>
							<Link to={"/"} onClick={closeMenu}>
								О компании
							</Link>
						</p>
						<p className={styles.navItem}>
							<Link to={"/approach"} onClick={closeMenu}>
								Услуги
							</Link>
						</p>
						<p className={styles.navItem}>
							<Link to={"/projects"} onClick={closeMenu}>
								Кейсы
							</Link>
						</p>
					</div>
					<div>
						<p className={styles.navItem}>
							<Link to={"/"} onClick={closeMenu}>
								Стать клиентом
							</Link>
						</p>
						<p className={styles.navItem}>
							<Link to={"/"} onClick={closeMenu}>
								Контент-хаб
							</Link>
						</p>
						<p className={styles.navItem}>
							<Link to={"/"} onClick={closeMenu}>
								Работа в Next
							</Link>
						</p>
						<p className={styles.navItem}>
							<Link to={"/"} onClick={closeMenu}>
								Контакты
							</Link>
						</p>
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
