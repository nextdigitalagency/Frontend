import type { FC } from "react";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion, useScroll } from "framer-motion";
import Footer from "../../../Widgets/Footer/Footer";
import HeroSection from "../Sections/HeroSection/HeroSection";
import ProjectsSection from "../Sections/ProjectsSection/ProjectsSection";
import About from "../Sections/AboutSection/About";
import DirectionSection from "../Sections/DirectionSection/DirectionSection";
import AnimatedText from "../../../Widgets/ScrollAnimation/AnimatedText.tsx";

const HomePage: FC = () => {
	const { scrollYProgress } = useScroll();

	return (
		<Wrapper>
			<>
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
			</>
			<Helmet>
				<title>Next: Крупнейшее агентство digital-решений</title>
				<meta
					name='description'
					content='Next: креативное digital-агентство. Разработка сайтов, приложений и онлайн-сервисов для вашего бизнеса.'
				/>
				<meta property='og:title' content='Next: digital-агентство' />
				<meta
					property='og:description'
					content='Next: креативное digital-агентство. Разработка сайтов, приложений и онлайн-сервисов для вашего бизнеса.'
				/>
				<meta property='og:type' content='website' />
			</Helmet>

			<HeroSection />
			<About />
			<ProjectsSection />

			<AnimatedText />

			<DirectionSection />

			<Footer />
		</Wrapper>
	);
};

export default HomePage;
