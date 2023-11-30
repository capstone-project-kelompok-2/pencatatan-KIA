import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';

const GetDataModal = ({ visible, onHide }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);

    const handleExportToPDF = () => {

        const formattedDate = new Date(selectedDate).toLocaleDateString();
        axios.get(`http://localhost:3000/TKA?tanggal=${formattedDate}`)
            .then((res) => {
                setData(res.data);
                const table = res.data
                const sortedTable = table.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));
                const doc = new jsPDF();
                doc.text(`Data TKA - Tanggal : ${formattedDate}`, 14, 16);
                doc.autoTable({
                    head: [['No', 'NIK', 'Nama Ibu', 'Tanggal', 'Berat Badan', 'Tinggi Badan', 'Status Kenaikan']],
                    body: sortedTable.map((item, index) => [index + 1, item.NIK, item.namaIbu, item.tanggal, item.beratBadan, item.tinggiBadan, item.statusKenaikan]),
                    startY: 20,
                });
                doc.save('table.pdf');
            })
            .catch((err) => {
                console.log(err);
            });


        onHide();
    };

    const handleExportToExcel = () => {
        const formattedDate = new Date(sdelectedDate).toLocaleDateString();

        axios.get(`http://localhost:3000/TKA?tanggal=${formattedDate}`)
            .then((res) => {
                setData(res.data);
                const sortedTable = res.data.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));

                const worksheet = XLSX.utils.json_to_sheet(sortedTable);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Data TKA');

                XLSX.writeFile(workbook, `table_${formattedDate}.xlsx`);
            })
            .catch((err) => {
                console.log(err);
            });

        onHide();
    };


    return (
        <Dialog header="Get Data Modal" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="selectedDate">Pilih Tanggal : </label>
                    <Calendar
                        id="selectedDate"
                        value={selectedDate}
                        defaultDate={new Date()}
                        onChange={(e) => setSelectedDate(e.value)}
                        showIcon
                        dateFormat="dd/mm/yy"
                        style={{margin : '5px 5px 5px 5px'}}
                    />
            <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportToPDF} className="p-button-primary" style={{margin : '5px 5px 5px 5px'}} />
            <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportToExcel} className="p-button-success" style={{ margin: '5px' }} />
                </div>
            </div>
            <div className='flex justify-end items-end mt-10'>
                <Button label="Close" icon="pi pi-times" onClick={onHide} className="p-button-text" />  
            </div>

        </Dialog>
    );
};

export default GetDataModal;
