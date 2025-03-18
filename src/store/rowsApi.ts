import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ID } from "../constants/ID";
import { onHoverChange } from "./appSlice";
import { updateTree } from "../utils/updateTree";
import { addNodeFromTree } from "../utils/addNoteFromTree";
import { removeNodeFromTree } from "../utils/removeNodeFromTree";
import {
  Node,
  AddRowResponse,
  EditRowResponse,
  DeleteRowResponse,
  AddRowRequest,
} from "./store.types";

export const rowsApi = createApi({
  reducerPath: "rowsApi",
  tagTypes: ["Rows"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PROXY }),

  endpoints: (build) => ({
    getRows: build.query<Node[], void>({
      query: () => `/v1/outlay-rows/entity/${ID}/row/list`,
    }),

    addRow: build.mutation<AddRowResponse, AddRowRequest>({
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
              (draft: Node[]) => {
                if (!draft.length) return [current];
                return updateTree(draft, changed);
              }
            )
          );

          dispatch(
            rowsApi.util.updateQueryData(
              "getRows",
              undefined,
              (draft: Node[]) => {
                return addNodeFromTree(draft, body.parentId, current);
              }
            )
          );
        } catch (error) {
          console.error("Ошибка обновления узлов:", error);
        }
      },
    }),

    editRow: build.mutation<
      EditRowResponse,
      { id: number; newRow: Partial<Node> }
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

          dispatch(
            rowsApi.util.updateQueryData(
              "getRows",
              undefined,
              (draft: Node[]) => {
                return updateTree(draft, [...changed, current]);
              }
            )
          );
        } catch (error) {
          console.error("Ошибка обновления узлов:", error);
        }
      },
    }),

    deleteRow: build.mutation<DeleteRowResponse, number>({
      query: (id) => ({
        url: `/v1/outlay-rows/entity/${ID}/row/${id}/delete`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { changed } = data;

          dispatch(
            rowsApi.util.updateQueryData(
              "getRows",
              undefined,
              (draft: Node[]) => {
                return removeNodeFromTree(draft, id);
              }
            )
          );

          dispatch(
            rowsApi.util.updateQueryData(
              "getRows",
              undefined,
              (draft: Node[]) => {
                return updateTree(draft, changed);
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
