export const cookie = {
	setItem: (cName: string, cValue: string, expDays: number = 30, path: string = '/') => {
		const now = new Date();
		now.setTime(now.getTime() + expDays * 24 * 60 * 60 * 1000);
		document.cookie = `${cName}=${cValue};expires=${now.toUTCString()};path=${path}`;
	},
	getItem: (cName: string) => {
		const name = `${cName}=`;
		const decodedCookies = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookies.split(';');

		for (let i = 0; i < cookieArray.length; i++) {
			const cookie = cookieArray[i].trim();
			if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
		}
		return null;
	},
	removeItem: (cName: string) => {
		cookie.setItem(cName, '', -1);
	}
};
