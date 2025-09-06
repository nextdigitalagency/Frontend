import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import HomePage from "../../../Pages/Home/ui/HomePage.tsx";
import Approach from "../../../Pages/Approach/ui/Approach.tsx";
import Projects from "../../../Pages/Projects/ui/ProjectsPage.tsx";
import PrivacyPage from "../../../Pages/Privacy/ui/PrivacyPage.tsx";
import Header from "../../../Widgets/Header/Header.tsx";

import PageTransition from "../../../Shared/ui/PageTransition/PageTransition.tsx";
import InitialLoader from "../../../Shared/ui/InitialLoader/InitialLoader.tsx";

// Анимированные роуты
const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route
					path='/'
					element={
						<PageTransition>
							<Header />
							<HomePage />
						</PageTransition>
					}
				/>
				<Route
					path='/approach'
					element={
						<PageTransition>
							<Header />
							<Approach />
						</PageTransition>
					}
				/>
				<Route
					path='/projects'
					element={
						<PageTransition>
							<Header />
							<Projects />
						</PageTransition>
					}
				/>
				<Route
					path='/privacy'
					element={
						<PageTransition>
							<PrivacyPage />
						</PageTransition>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

// Роутер с первым экраном загрузки
export const AppRouter = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 3000); // 3 секунды
		return () => clearTimeout(timer);
	}, []);

	return <BrowserRouter>{isLoading ? <InitialLoader /> : <AnimatedRoutes />}</BrowserRouter>;
};
