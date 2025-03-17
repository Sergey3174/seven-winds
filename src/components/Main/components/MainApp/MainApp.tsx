import "./MainApp.style.scss";
import { useGetRowsQuery } from "../../../../store/rowsApi";
import ListRows from "./components/ListRows/ListRows";
import TableHeader from "./components/TableHeader/TableHeader";
import ListRowItem from "./components/ListRows/components/ListRowItem/ListRowItem";

export default function MainApp() {
	const { data = [] } = useGetRowsQuery();

	return (
		<div className="main-app-container">
			<TableHeader />
			<ListRows rows={data} />
			{!data?.length && <ListRowItem type="add_form" />}
		</div>
	);
}
