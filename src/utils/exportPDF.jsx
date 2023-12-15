import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data, columns, filename, label, caption) => {
    const doc = new jsPDF();

    doc.text(`${caption} - ${label}`, 14, 16);

    // Tabel otomatis dari data dan kolom
    doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: data.map((row) => columns.map((col) => row[col.field])),
        startY: 20,
    });

    doc.save(filename);
};
