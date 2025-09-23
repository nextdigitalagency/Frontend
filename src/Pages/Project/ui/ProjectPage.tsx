import styles from "./ProjectPage.module.scss";

import AboutSection from "../Sections/AboutSection/AboutSection";
import HeroSection from "../Sections/HeroSection/HeroSection";
import TaskSection from "../Sections/TaskSection/TaskSection";
import UXSection from "../Sections/UXSection/UXSection";
import DesignSection from "../Sections/DesignSection/DesignSection";
import FrontendSection from "../Sections/FrontendSection/FrontendSection";
import BackendSection from "../Sections/BackendSection/BackendSection";

const ProjectPage = () => {
	return (
		<div className={styles.projectPage}>
			<HeroSection />
			<AboutSection />
			<TaskSection />
			<UXSection />
			<DesignSection />
			<FrontendSection />
			<BackendSection />
		</div>
	);
};

export default ProjectPage;
