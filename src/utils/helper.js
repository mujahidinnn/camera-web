export const convertISO = (str) => {
  if (str) {
    if (str?.length == 10) {
      return str;
    }
    const date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
};

export const convertToISO = (date) => {
  if (date) {
    const [day, month, year] = date.split("-").map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.toString();
  }
};

export const convertISODateToIndonesianFormat = (isoDateString) => {
  const inputDate = new Date(isoDateString);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const outputDateString = inputDate.toLocaleDateString("id-ID", options);

  return outputDateString;
};

export const convertToISOString = (dateString) => {
  if (dateString) {
    const inputDate = new Date(dateString);
    return inputDate.toISOString();
  }
};

export function sumPercent(total, done) {
  if (typeof total == "number" && typeof done == "number") {
    const result = (done * 100) / total;
    return result;
  }
}
