import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename) => {
    const newData = data.map(({ id, parentId, NIK, ...item }) => item);
    // console.log(newData);

    const ws = XLSX.utils.json_to_sheet(newData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
};