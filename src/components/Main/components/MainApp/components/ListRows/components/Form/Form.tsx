import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeIsEditing } from "../../../../../../../../store/appSlice";
import { Node } from "../../../../../../../../store/store.types";

interface FormTypes {
  formValue: Node;
  setFormValue: React.Dispatch<React.SetStateAction<Node>>;
}

export default function Form({ formValue, setFormValue }: FormTypes) {
  const dispatch = useDispatch();
  const { rowName, salary, equipmentCosts, overheads, estimatedProfit } =
    formValue;

  useEffect(() => {
    dispatch(changeIsEditing(true));

    return () => {
      dispatch(changeIsEditing(false));
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <input name="rowName" value={rowName} onChange={handleChange} />
      <input name="salary" value={salary} onChange={handleChange} />
      <input
        name="equipmentCosts"
        value={equipmentCosts}
        onChange={handleChange}
      />
      <input name="overheads" value={overheads} onChange={handleChange} />
      <input
        name="estimatedProfit"
        value={estimatedProfit}
        onChange={handleChange}
      />
    </>
  );
}
