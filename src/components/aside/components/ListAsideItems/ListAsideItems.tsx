import { TablePropertiesIcon } from "lucide-react";
import "./ListAsideItems.style.scss";

const ITEMS: string[] = [
	"По проекту",
	"Объекты",
	"РД",
	"МТО",
	"СМР",
	"График",
	"Мим",
	"Рабочие",
	"Капвложения",
	"Бюджет",
	"Финансирование",
	"Панорамы",
	"Камеры",
	"Поручения",
	"Контрагенты",
];

const activeIndex = 4;

export default function ListAsideItems() {
	return (
		<div className="list-items-container">
			{ITEMS.map((name, id) => (
				<div
					className={`aside-item ${
						activeIndex === id ? "active" : ""
					}`}
					key={id}
					aria-selected={activeIndex === id}
				>
					<TablePropertiesIcon />
					{name}
				</div>
			))}
		</div>
	);
}
