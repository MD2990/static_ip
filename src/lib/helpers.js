import { formatDistanceToNowStrict, formatISO9075 } from "date-fns";

export const getDateTime = () => {
	const date = new Date();
	const day = date.toDateString();
	const time = date.toLocaleTimeString();
	return day + " " + time;
};
// substring a string if the length is greater than N
export const substring = (str, length) => {
	if (str?.trim().length > length) {
		return str.trim().substring(0, length);
	}
	// if the length is less than N return an emoji

	return str?.trim() || "🤷‍♂️";
};
export function convertDate(theDate) {
	theDate = theDate.map((ee) => {
		let CREATED = ee.createdAt;
		let UPDATED = ee.updatedAt;

		CREATED = convert(CREATED);
		UPDATED = convert(UPDATED);

		return { ...ee._doc, createdAt: CREATED, updatedAt: UPDATED };

		function convert(e) {
			e = formatISO9075(new Date(e));
			e = formatDistanceToNowStrict(new Date(e), { addSuffix: true });
			return e;
		}
	});
	return theDate;
}

export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || 0;
}

export function setLocalStorage({ key, obj }) {
	// check if Window is defined
	typeof window !== "undefined"
		? localStorage.setItem(key, JSON.stringify(obj))
		: 0;
}

export function clearLocalStorage() {
	typeof window !== "undefined" ? localStorage.clear() : null;
}
