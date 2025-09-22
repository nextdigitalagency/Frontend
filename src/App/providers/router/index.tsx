import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import HomePage from "../../../Pages/Home/ui/HomePage.tsx";
import Approach from "../../../Pages/Approach/ui/Approach.tsx";
import PrivacyPage from "../../../Pages/Privacy/ui/PrivacyPage.tsx";
import Header from "../../../Widgets/Header/Header.tsx";
import Projects from "../../../Pages/Projects/ProjectsPage.js";

import PageTransition from "../../../Shared/ui/PageTransition/PageTransition.tsx";
import InitialLoader from "../../../Shared/ui/InitialLoader/InitialLoader.tsx";
import ProjectPage from "../../../Pages/Project/ui/ProjectPage.tsx";

// Определяем dev режим
const isDev = import.meta.env.MODE === "development";

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
							<Header minimal />
							<Projects />
						</PageTransition>
					}
				/>
				<Route
					path='/projects/:slug'
					element={
						<PageTransition>
							<Header />
							<ProjectPage />
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

// Роутер с первым экраном загрузки (только не в dev)
export const AppRouter = () => {
	const [isLoading, setIsLoading] = useState(!isDev); // в dev — сразу false

	useEffect(() => {
		if (!isDev) {
			const timer = setTimeout(() => setIsLoading(false), 3000);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<BrowserRouter>
			{isLoading ? <InitialLoader onFinish={() => setIsLoading(false)} /> : <AnimatedRoutes />}
		</BrowserRouter>
	);
};
