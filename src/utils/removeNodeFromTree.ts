import { Node } from "../store/store.types";

export const removeNodeFromTree = (
  nodes: Node[],
  idToRemove: number
): Node[] => {
  return nodes
    .map((node) => {
      let newNode = { ...node };

      if (newNode.child) {
        newNode = {
          ...newNode,
          child: removeNodeFromTree(newNode.child, idToRemove),
        };
      }
      return newNode.id === idToRemove ? null : newNode;
    })
    .filter((node) => node !== null);
};
