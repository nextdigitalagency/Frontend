import type { FC } from "react";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import HeroSection from "../Sections/HeroSection/HeroSection";
import Analytics from "../Sections/AnalyticsSection/Analytics";
import Engineering from "../Sections/EngineeringSection/Engineering";
import Footer from "../../../Widgets/Footer/Footer";
import Design from "../Sections/DesignSection/Design";
import Programming from "../Sections/ProgrammingSection/Programming";

const Approach: FC = () => {
	return (
		<Wrapper>
			<HeroSection />
			<Analytics />
			<Engineering />
			<Design />
			<Programming />

			<Footer />
		</Wrapper>
	);
};

export default Approach;
