import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data, columns, filename, parentBio) => {
    const doc = new jsPDF();

    doc.text(`Data TKA - ${parentBio.namaIbu}`, 14, 16);

    // Tabel otomatis dari data dan kolom
    doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: data.map((row) => columns.map((col) => row[col.field])),
        startY: 20,
    });

    doc.save(filename);
};
