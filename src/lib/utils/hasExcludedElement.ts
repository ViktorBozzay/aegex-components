export const hasExcludedElement = (event: MouseEvent, exclude?: string[]) => {
	if (!exclude || !event.target) return false;
	if (exclude.length === 0) return false;

	return exclude.some((ex) => {
		return (
			(event.target as HTMLElement).classList.contains(ex) ||
			(event.target as HTMLElement).id === ex
		);
	});
};
