import ReactDOM from "react-dom/client";
import "./styles.css";
import { Provider } from "react-redux";
import { App } from "./app/app.tsx";
import { store } from "@/store/store.ts";
import reportWebVitals from "./reportWebVitals.ts";

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Provider store={store}>
			<App />
		</Provider>,
	);
}

reportWebVitals();