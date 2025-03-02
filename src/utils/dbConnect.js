/* eslint-disable no-unused-vars */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getDateTime } from "../lib/helpers";

export const toPDF = ({
	rows,
	columns,
	title,
	style = "p",
	coordinates = 300,
	leftTitle,
}) => {
	var doc = new jsPDF(style, "pt"); // l or p

	//console.log(doc.getFontList());

	// This is for adding arbic font support
	/* 	doc.addFileToVFS('Amiri.ttf', font);
	doc.addFont('Amiri.ttf', 'Amiri', 'normal');
	doc.setFont('Amiri'); */

	/*doc.autoTable(columns, ss, {
		/* 	styles: {
			cellPadding: 5,
			fontSize: 12,
			font: 'times', // helvetica, times, courier
			lineColor: 200,
			lineWidth: 0.1,
			fontStyle: 'normal', // normal, bold, italic, bolditalic
			overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
			fillColor: 255,
			textColor: 20,
			halign: 'center', // left, center, right
			valign: 'middle', // top, middle, bottom
			fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
			minCellHeight: 20,
			cellWidth: 'auto', // 'auto', 'wrap' or a number },
		}, */
	/* 	columnStyles: {
			id: { fillColor: 255 },
		},
		margin: { top: 60 }, 
		didDrawPage: function (data) {
			doc.text('Employees Salary Details', 40, 30);
		},
		didParseCell: function (table) {
			if (table.section === 'head') {
				table.cell.styles.textColor = '#000000';
				table.cell.styles.fillColor = '#B2B2FF';
			}
		},
	});*/

	const totalPagesExp = "{total_pages_count_string}";

	doc.autoTable({
		columns: columns,
		body: rows,
		headStyles: {
			halign: "center",
			fillColor: "#c3e5eb",
			textColor: "#333333",
			fontStyle: "Arial",
			//font: 'Amiri', choose this for arabic support
			font: "times",
		},

		styles: {
			fillStyle: "F", // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
			minCellHeight: 20,
			cellWidth: "auto", // 'auto', 'wrap' or a number },
			valign: "middle", // top, middle, bottom
			overflow: "linebreak", // visible, hidden, ellipsize or linebreak
			cellPadding: 4,
			fontSize: 12,
			font: "times", // helvetica, times, courier (Amiri)  ##for arabic
			lineColor: 200,
			lineWidth: 0.1,
			halign: "center",
			fontStyle: "normal", // normal, bold, italic, bolditalic
		},
		didDrawPage: (data) => {
			if (doc.internal.getNumberOfPages() === 1) {
				doc.setFont("times");
				doc.setFontSize(12);
				doc.text(title, coordinates, 30, "center");
				leftTitle &&
					doc.text(leftTitle, 50, 30, "left", doc.setFontSize(7), {});
				/*  moreDetails && doc.text(moreDetails, 50, 30, "left"); */
				doc.text(getDateTime(), 780, 30, "right", doc.setFontSize(8));
			}

			let footerStr = "Page " + doc.internal.getNumberOfPages();
			if (typeof doc.putTotalPages === "function") {
				footerStr = footerStr + " of " + totalPagesExp;
			}
			doc.setFontSize(8);

			doc.text(
				footerStr,
				data.settings.margin.left,
				doc.internal.pageSize.height - 10
			);
		},
	});
	if (typeof doc.putTotalPages === "function") {
		doc.putTotalPages(totalPagesExp);
	}

	doc.save("table.pdf");
};
