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
      const date = new Date(e);
      const d = date.getDate(e) || "";
      const m = date.getMonth(e) + 1 || "";
      const y = date.getFullYear(e) || "";
      const h = date.getHours(e) || "";
      const min = date.getMinutes(e) || "";
      const s = date.getSeconds(e) || "";

      // hours are 0-based
      const tim = h > 12 ? "PM" : "AM";

      e = `${y}/${m}/${d} _ ${h}:${min}:${s} ${tim}`;
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
