import "./App.scss";
import Header from "./components/Header/Header";
import Aside from "./components/aside/Aside";
import Main from "./components/Main/Main";

function App() {
	return (
		<div className="app-container">
			<Header />
			<div className="main-container">
				<Aside />
				<Main />
			</div>
		</div>
	);
}

export default App;
