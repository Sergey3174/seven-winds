import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID } from "../constants/ID";
import { onHoverChange } from "./appSlice";
import { updateTree } from "../utils/updateTree";
import { addNodeFromTree } from "../utils/addNoteFromTree";
import { removeNodeFromTree } from "../utils/removeNodeFromTree";

interface Node {
	id: number;
	rowName: string;
	total: number;
	salary: number;
	mimExploitation: number;
	machineOperatorSalary: number;
	materials: number;
	mainCosts: number;
	supportCosts: number;
	equipmentCosts: number;
	overheads: number;
	estimatedProfit: number;
	child?: Node[];
}

export const rowsApi = createApi({
	reducerPath: "rowsApi",
	tagTypes: ["Rows"],
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_URL }),
	endpoints: (build) => ({
		getRows: build.query<Node[], void>({
			query: () => `/v1/outlay-rows/entity/${ID}/row/list`,
		}),

		addRow: build.mutation<
			{ changed: Node[]; current: Node },
			Partial<Node>
		>({
			query: (body) => ({
				url: `/v1/outlay-rows/entity/${ID}/row/create`,
				method: "POST",
				body,
			}),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { changed, current } = data;

					dispatch(
						rowsApi.util.updateQueryData(
							"getRows",
							undefined,
							(draft) => {
								if (!draft.length) {
									return [current];
								}
								return updateTree(draft, changed);
							}
						)
					);

					dispatch(
						rowsApi.util.updateQueryData(
							"getRows",
							undefined,
							(draft) => {
								return addNodeFromTree(
									draft,
									body.parentId,
									current
								); // Добавляем новый узел
							}
						)
					);
				} catch (error) {
					console.error("Ошибка обновления узлов:", error);
				}
			},
		}),

		editRow: build.mutation<
			{ changed: Node[]; current: Node },
			Partial<Node>
		>({
			query: ({ id, newRow }) => ({
				url: `/v1/outlay-rows/entity/${ID}/row/${id}/update`,
				method: "POST",
				body: newRow,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { changed, current } = data;

					const newChanged = [...changed, current];

					dispatch(
						rowsApi.util.updateQueryData(
							"getRows",
							undefined,
							(draft) => {
								return updateTree(draft, newChanged);
							}
						)
					);
				} catch (error) {
					console.error("Ошибка обновления узлов:", error);
				}
			},
		}),

		deleteRow: build.mutation({
			query: (id) => ({
				url: `/v1/outlay-rows/entity/${ID}/row/${id}/delete`,
				method: "DELETE",
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { changed } = data;

					// Отладка: показываем изменённые данные
					console.log("Измененные данные после удаления:", changed);
					console.log("Удаляем узел с id:", id);

					// Обновление дерева и удаление узла
					dispatch(
						rowsApi.util.updateQueryData(
							"getRows",
							undefined,
							(draft) => {
								return removeNodeFromTree(draft, id); // Удаляем узел с данным id
							}
						)
					);

					// Применяем изменения, полученные от сервера
					dispatch(
						rowsApi.util.updateQueryData(
							"getRows",
							undefined,
							(draft) => {
								return updateTree(draft, changed); // Обновляем дерево с изменениями
							}
						)
					);

					if (!changed.length) {
						dispatch(onHoverChange(false));
					}
				} catch (error) {
					console.error("Ошибка удаления узла:", error);
				}
			},
		}),
	}),
});

export const {
	useGetRowsQuery,
	useAddRowMutation,
	useDeleteRowMutation,
	useEditRowMutation,
} = rowsApi;
