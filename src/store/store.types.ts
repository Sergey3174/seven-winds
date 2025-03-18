export interface Node {
  id?: number;
  rowName: string;
  total?: number;
  salary: number;
  mimExploitation?: number;
  machineOperatorSalary?: number;
  materials?: number;
  mainCosts?: number;
  supportCosts?: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child?: Node[];
}

export interface AddRowResponse {
  changed: Node[];
  current: Node;
}

export interface EditRowResponse {
  changed: Node[];
  current: Node;
}

export interface DeleteRowResponse {
  changed: Node[];
}

export interface AddRowRequest extends Partial<Node> {
  parentId: number | null;
}
