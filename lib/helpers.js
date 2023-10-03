export const getDateTime = () => {
  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();
  return day + " " + time;
};
// substring a string if the length is greater than N
export const substring = (str, length) => {
  if (str.trim().length > length) {
    return str.trim().substring(0, length) + "...";
  }
  return str.trim();
};
