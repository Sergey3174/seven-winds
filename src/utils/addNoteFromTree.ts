import { Node } from "../store/store.types";

export const addNodeFromTree = (
  nodes: Node[],
  parentId: number | null,
  current: Node
): Node[] => {
  let foundParent = false;
  return nodes
    .map((node) => {
      let newNode = { ...node };

      if (parentId === newNode.id && !foundParent) {
        foundParent = true;
        newNode = {
          ...newNode,
          child: [...(newNode.child ?? []), { ...current }],
        };
      }

      if (newNode.child) {
        newNode = {
          ...newNode,
          child: addNodeFromTree(newNode.child, parentId, current),
        };
      }

      return newNode;
    })
    .filter((node) => node);
};
