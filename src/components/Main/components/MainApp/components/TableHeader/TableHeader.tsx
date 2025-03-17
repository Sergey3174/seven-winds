import "./TableHeader.style.scss";

export default function TableHeader() {
	return (
		<div className="table-header">
			<div className="table-header-item">Уровень</div>
			<div className="table-header-item">Наименование работ</div>
			<div className="table-header-item">Основная з/п</div>
			<div className="table-header-item">Оборудование</div>
			<div className="table-header-item">Накладные расходы</div>
			<div className="table-header-item">Сметная прибыль</div>
		</div>
	);
}
