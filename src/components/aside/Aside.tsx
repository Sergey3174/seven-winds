import "./Aside.style.scss";
import FilterBlock from "./components/FilterBlock/FilterBlock";
import ListAsideItems from "./components/ListAsideItems/ListAsideItems";

export default function Aside() {
	return (
		<aside className="aside">
			<FilterBlock />
			<ListAsideItems />
		</aside>
	);
}
