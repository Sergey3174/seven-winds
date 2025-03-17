import MainApp from "./components/MainApp/MainApp";
import "./Main.style.scss";

export default function Main() {
	return (
		<main className="main">
			<div className="main-header">
				<div className="main-header-item">
					<span>Строительно-монтажные работы</span>
				</div>
			</div>
			<MainApp />
		</main>
	);
}
