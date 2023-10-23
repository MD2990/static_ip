import state from "@app/store";
import { substring } from "@lib/helpers";
import { toPDF } from "@utils/dbConnect";
import { snapshot } from "valtio";

export default function printPdf() {
  const snap = snapshot(state);

  // get dynamic rows and remove _id and __v from rows and remove _ from keys
  const rows = snap.searchResults.map((item) => {
    const { _id, __v, ...rest } = item;
    const data = {};
    Object.keys(rest).forEach((key) => {
      data[key.replace("_", " ")] = rest[key];
    });
    return data;
  });


  // get dynamic columns
  const columns = Object.keys(rows[0]).map((key) => {
    return { title: key.toUpperCase(), key: key };
  });

  /*     return toPDF({
      rows,
      columns,
      style: "l",
      title: snap.searchTerm.trim()
        ? `\t\t\t\t\t\t IPs related to:  ${substring(snap.searchTerm, 20)} `
        : "\t\t\t\t\t\t  List of All Static IPs",
      leftTitle: `Total IPs: ${snap.searchResults.length}`,
    }); */

  // return dynamic pdf
  return toPDF({
    rows,
    columns,
    style: "l",
    title:
      snap.searchTerm.trim().length > 0
        ? `\t\t\t\t\t\t  related to:  ${substring(snap.searchTerm, 20)} `
        : `\t\t\t\t\t\t  ${snap.title}`,
    leftTitle: `Total: ${snap.searchResults.length}`,
  });
}
