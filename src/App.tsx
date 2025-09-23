import { useSelector } from "react-redux";
import { AppRouter } from "./App/providers/router/index.tsx";
import "./App/styles/index.scss";
import { Drawer } from "./Shared/ui/Drawer/Drawer.tsx";
import type { RootState } from "./App/store/index.ts";
import { useDispatch } from "react-redux";
import { closeDrawer } from "./App/store/slices/drawerSlice.ts";
import { LenisProvider } from "./Widgets/SmoothScrollProvider/LenisProvider.tsx";

const App = () => {
	const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
	const dispatch = useDispatch();

	return (
		<div>
			<LenisProvider>
				<AppRouter />
				<Drawer isOpen={isOpen} onClose={() => dispatch(closeDrawer())} />
			</LenisProvider>
		</div>
	);
};

export default App;
