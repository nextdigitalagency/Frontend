import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../src/App/styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./App/store/index.ts";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { LanguageProvider } from "./Shared/lib/i18n.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<HelmetProvider>
				<LanguageProvider>
					<App />
				</LanguageProvider>
			</HelmetProvider>
		</Provider>
	</StrictMode>
);
