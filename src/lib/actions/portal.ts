export const portal = (node: HTMLElement, targetId?: string) => {
	let targetElem = document.body;

	if (targetId) {
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElem = targetElement;
    }
    // else {
		// 	console.error(`Target element with id '${targetId}' not found.`);
		// }
	}

	targetElem.appendChild(node);

	return {
		destroy() {
			node.remove();
		}
	};
};
