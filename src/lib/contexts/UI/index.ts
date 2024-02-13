import { getContext } from 'svelte';
import type { UIContextType } from '../../types/UIContext';

export const UI_CONTEXT_KEY = Symbol('uiContextKey');
export const getUIContext = () => getContext<UIContextType>(UI_CONTEXT_KEY);
