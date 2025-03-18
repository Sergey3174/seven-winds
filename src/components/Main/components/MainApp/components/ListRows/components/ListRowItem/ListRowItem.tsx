import { File, Trash2 } from "lucide-react";
import "./ListRowItem.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { onHoverChange } from "../../../../../../../../store/appSlice";
import { useState, KeyboardEvent } from "react";
import {
  useAddRowMutation,
  useDeleteRowMutation,
  useEditRowMutation,
} from "../../../../../../../../store/rowsApi";
import Form from "../Form/Form";
import { AddRowRequest } from "../../../../../../../../store/store.types";
import { ListRowItemProps } from "./LustRowItem.types";
import { RootState } from "../../../../../../../../store/store";

export default function ListRowItem({
  rowName = "",
  left,
  salary = 0,
  equipmentCosts = 0,
  overheads = 0,
  estimatedProfit = 0,
  parentId = null,
  id = null,
  setFatherId = () => {},
  type = "item",
}: ListRowItemProps) {
  const [typeItem, setTypeItem] = useState(type);

  const isEditing = useSelector((state: RootState) => state.app.isEditing);
  const onHover = useSelector((state: RootState) => state.app.onHover);

  const [formValue, setFormValue] = useState({
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  });

  const dispatch = useDispatch();

  const handleClickAddRow = () => {
    setFatherId(id);
  };

  const [addRow] = useAddRowMutation();
  const [deleteRow] = useDeleteRowMutation();
  const [editRow] = useEditRowMutation();

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newRow: AddRowRequest = {
        equipmentCosts: formValue.equipmentCosts,
        estimatedProfit: formValue.estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: formValue.overheads,
        parentId: parentId,
        rowName: formValue.rowName,
        salary: formValue.salary,
        supportCosts: 0,
      };

      if (!id) {
        await addRow(newRow).unwrap();
        setFatherId(null);
      } else {
        console.log(id, newRow);
        editRow({ id, newRow });
      }
      setTypeItem("item");
    }
  };

  const handleClickDeleteRow = async () => {
    if (!id) return;
    await deleteRow(id);
  };

  const handleClickEditRow = () => {
    setTypeItem("add_form");
  };

  return (
    <div
      className="item-container"
      onKeyDown={handleKeyDown}
      onDoubleClick={handleClickEditRow}
    >
      <div className="buttons-wrapper">
        <div
          onMouseEnter={() => dispatch(onHoverChange(true))}
          onMouseLeave={() => dispatch(onHoverChange(false))}
          className={`buttons-container ${isEditing ? "disabled" : ""} ${
            onHover ? "hover" : ""
          }`}
          style={{ left }}
        >
          {parentId && <div className="tree"></div>}
          {parentId && typeItem === "add_form" && (
            <div className="tree-up"></div>
          )}

          <File
            size={16}
            color="#2c5da3"
            onClick={isEditing ? undefined : handleClickAddRow}
          />
          <Trash2
            size={16}
            color="#a7141b"
            className="trash-icon"
            onClick={handleClickDeleteRow}
          />
        </div>
      </div>
      {typeItem === "add_form" && (
        <Form formValue={formValue} setFormValue={setFormValue} />
      )}
      {typeItem === "item" && (
        <>
          <div className="item">{rowName}</div>
          <div className="item">{salary}</div>
          <div className="item">{equipmentCosts}</div>
          <div className="item">{overheads}</div>
          <div className="item">{estimatedProfit}</div>
        </>
      )}
    </div>
  );
}
