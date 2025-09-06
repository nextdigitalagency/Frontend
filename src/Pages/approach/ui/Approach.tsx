import type { FC } from "react";
import { Wrapper } from "../../../Shared/ui/Wrapper/Wrapper";
import HeroSection from "../Sections/HeroSection/HeroSection";
import Analytics from "../Sections/AnalyticsSection/Analytics";
import Engineering from "../Sections/EngineeringSection/Engineering";

const Approach: FC = () => {
	return (
		<Wrapper>
			<HeroSection />
			<Analytics />
			<Engineering />
		</Wrapper>
	);
};

export default Approach;
