export interface ListRowItemProps {
  rowName?: string;
  left?: number;
  salary?: number;
  equipmentCosts?: number;
  overheads?: number;
  estimatedProfit?: number;
  parentId?: number | null;
  id?: number | null;
  setFatherId?: (id: number | null) => void;
  type?: "item" | "add_form";
}
