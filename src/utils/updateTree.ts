import { Node } from "../store/store.types";

export const updateTree = (nodes: Node[], changed: Node[]): Node[] => {
	return nodes.map((node) => {
		let newNode = { ...node };
		const updatedNode = changed.find((item) => item.id === node.id);

		if (updatedNode) {
			newNode = { ...updatedNode, child: node.child ?? [] };
		}

		if (newNode.child) {
			newNode = {
				...newNode,
				child: updateTree(newNode.child, changed),
			};
		}

		return newNode;
	});
};
