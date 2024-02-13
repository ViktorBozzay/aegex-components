type CreateGrabbersType = {
	grabberWidth: number;
	debug?: boolean;
	onEnter: (event: MouseEvent) => void;
	onLeave: (event: MouseEvent) => void;
	onMousedown: (event: MouseEvent) => void;
};

export type GrabberPropsType = {
	name: string;
	styles: string;
};

const getGrabberProps = (grabberWidth: number): GrabberPropsType[] => {
	const grabberProps: GrabberPropsType[] = [
		{
			name: 'right',
			styles: `
        width: ${grabberWidth}px;
        top: ${Math.floor(grabberWidth * 0.75)}px;
        bottom: ${Math.floor(grabberWidth * 0.75)}px;
        right: ${Math.floor(grabberWidth / -2)}px;
        cursor: e-resize;`
		},
		{
			name: 'left',
			styles: `
        width: ${grabberWidth}px;
        top: ${Math.floor(grabberWidth * 0.75)}px;
        bottom: ${Math.floor(grabberWidth * 0.75)}px;
        left: ${Math.floor(grabberWidth / -2)}px;
        border-radius: ${Math.floor(grabberWidth / 2)}px;
        cursor: w-resize;`
		},
		{
			name: 'top',
			styles: `
        right: 8px;
        left: 8px;
        height: ${grabberWidth}px;
        top: ${Math.floor(grabberWidth / -2)}px;
        border-radius: ${Math.floor(grabberWidth / 2)}px;
        cursor: n-resize;`
		},
		{
			name: 'bottom',
			styles: `
        right: 8px;
        left: 8px;
        height: ${grabberWidth}px;
        bottom: ${Math.floor(grabberWidth / -2)}px;
        border-radius: ${Math.floor(grabberWidth / 2)}px;
        cursor: s-resize;`
		},
		{
			name: 'top-left',
			styles: `
        width: ${Math.floor(grabberWidth * 1.5)}px;
        height: ${Math.floor(grabberWidth * 1.5)}px;
        top: ${Math.floor(grabberWidth / -2)}px;
        left: ${Math.floor(grabberWidth / -2)}px;
        border-radius: 50%;
        cursor: nw-resize;`
		},
		{
			name: 'top-right',
			styles: `
        width: ${Math.floor(grabberWidth * 1.5)}px;
        height: ${Math.floor(grabberWidth * 1.5)}px;
        top: ${Math.floor(grabberWidth / -2)}px;
        right: ${Math.floor(grabberWidth / -2)}px;
        border-radius: 50%;
        cursor: ne-resize;`
		},
		{
			name: 'bottom-left',
			styles: `
        width: ${Math.floor(grabberWidth * 1.5)}px;
        height: ${Math.floor(grabberWidth * 1.5)}px;
        bottom: ${Math.floor(grabberWidth / -2)}px;
        left: ${Math.floor(grabberWidth / -2)}px;
        border-radius: 50%;
        cursor: sw-resize;`
		},
		{
			name: 'bottom-right',
			styles: `
        width: ${Math.floor(grabberWidth * 1.5)}px;
        height: ${Math.floor(grabberWidth * 1.5)}px;
        bottom: ${Math.floor(grabberWidth / -2)}px;
        right: ${Math.floor(grabberWidth / -2)}px;
        border-radius: 50%;
        cursor: se-resize;`
		}
	];
	return grabberProps;
};

export const createGrabbers = (
	node: HTMLElement,
	{ grabberWidth, debug = false, onEnter, onLeave, onMousedown }: CreateGrabbersType
): HTMLElement[] => {
	const grabberProps = getGrabberProps(grabberWidth);

	return grabberProps.map((grabberProp) => {
		const { name, styles } = grabberProp;
		const element = document.createElement('div');

		element.dataset.name = name;
		element.setAttribute(
			'style',
			`${styles} position: absolute; background: ${
				debug ? 'red' : 'transparent'
			}; opacity: 0.1;transition: opacity 0.2s ease`
		);

		element.addEventListener('mouseenter', onEnter);
		element.addEventListener('mouseleave', onLeave);
		element.addEventListener('mousedown', onMousedown);
		node.appendChild(element);
		return element;
	});
};
