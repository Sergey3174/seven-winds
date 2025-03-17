import "./ListRows.style.scss";
import ListRowItem from "./components/ListRowItem/ListRowItem";
import { useState } from "react";

export default function ListRows({ rows, left = 0, parentId = null }) {
	const [fatherId, setFatherId] = useState<number | null>(null);

	return (
		<div className="list-container">
			{rows.map(
				({
					rowName,
					child,
					id,
					salary,
					equipmentCosts,
					overheads,
					estimatedProfit,
				}) => (
					<div key={id}>
						<ListRowItem
							left={left}
							rowName={rowName}
							salary={salary}
							equipmentCosts={equipmentCosts}
							overheads={overheads}
							estimatedProfit={estimatedProfit}
							parentId={parentId}
							id={id}
							setFatherId={setFatherId}
						/>
						{parentId && (
							<div
								className="line"
								style={{ left: left - 6 }}
							></div>
						)}

						<ListRows
							rows={child || []}
							left={left + 20}
							parentId={id}
						/>
						{fatherId === id && (
							<ListRowItem
								left={left + 20}
								parentId={id}
								type={"add_form"}
								setFatherId={setFatherId}
							/>
						)}
					</div>
				)
			)}
		</div>
	);
}
