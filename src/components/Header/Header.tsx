import { Logs, Undo } from "lucide-react";
import "./Header.style.scss";

export default function Header() {
	return (
		<header className="header">
			<div className="header-icon-block">
				<Logs size={30} />
				<Undo size={30} />
			</div>
			<div className="header-menu-block">
				<div className="header-item-active header-item">
					<span>Просмотр</span>
				</div>
				<div className="header-item">
					<span>Упраление</span>
				</div>
			</div>
		</header>
	);
}
