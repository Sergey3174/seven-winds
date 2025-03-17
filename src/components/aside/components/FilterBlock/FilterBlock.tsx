import { SquareChevronDown } from "lucide-react";
import "./FilterBlock.style.scss";

export default function FilterBlock() {
	return (
		<div className="filter-container">
			<div className="filter-text">
				<p>Название проекта</p>
				<p className="sub-text">Аббревиатура</p>
			</div>
			<SquareChevronDown size={30} color="white" />
		</div>
	);
}
