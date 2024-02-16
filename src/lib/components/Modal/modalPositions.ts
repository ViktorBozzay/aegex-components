import type { ModalPositions } from './ModalProps.js';

export const modalPositions: ModalPositions = {
	center: 'top: 50%; left: 50%; transform: translate(-25%, -50%);',
	['top-left']: 'top: 2rem; left: 2rem;',
	['top-center']: 'top: 2rem; left: 50%; transform: translate(-50%, 0%);',
	['top-right']: 'top: 2rem; right: 2rem;',
	['bottom-left']: 'bottom: 2rem; left: 2rem;',
	['bottom-center']: 'bottom: 2rem; left: 50%; transform: translate(-50%, 0%);',
	['bottom-right']: 'bottom: 2rem; right: 2rem; transform: translate(0%, -50%);'
};
