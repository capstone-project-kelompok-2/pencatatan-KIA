import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import axios from 'axios';

const GetDataModal = ({ visible, onHide }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);

    const handleExportToPDF = () => {
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        // console.log(formattedDate);
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
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        axios.get(`http://localhost:3000/TKA?tanggal=${formattedDate}`)
            .then((res) => {
                setData(res.data);
                const newData = data.map(({ id, parentId, NIK, ...item }) => item);

                const sortedTable = newData.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));

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

    const handleExportToPDFPenyakit = () => {
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        axios.get(`http://localhost:3000/medical?tanggal=${formattedDate}`)
            .then((res) => {
                setData(res.data);
                const table = res.data;
                const sortedTable = table.sort((a, b) => a.namaBayi.localeCompare(b.namaBayi));
                const doc = new jsPDF();
                doc.text(`Riwayat Penyakit Anak - Tanggal : ${formattedDate}`, 14, 16);
                doc.autoTable({
                    head: [['No', 'NIK', 'Nama Bayi', 'Nama Ibu', 'Nama Penyakit', 'Penyakit', 'Keterangan']],
                    body: sortedTable.map((item, index) => [index + 1, item.NIK, item.namaBayi, item.namaIbu, item.penyakit, item.rujukan, item.keterangan]),
                    startY: 20,
                });
                doc.save('medical_table.pdf');
            })
            .catch((err) => {
                console.error('Error fetching medical data:', err);
            });
    };

    const handleExportToExcelPenyakit = async () => {
        try {
            const day = selectedDate.getDate();
            const month = selectedDate.getMonth() + 1;
            const year = selectedDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
    
            const response = await axios.get(`http://localhost:3000/medical?tanggal=${formattedDate}`);
            const responseData = response.data;
    
            setData(responseData);
    
            const newData = responseData.map(({ id, parentId, NIK, ...item }) => item);
            const sortedTable = newData.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));
    
            const worksheet = XLSX.utils.json_to_sheet(sortedTable);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Riwayat Penyakit Anak');
            XLSX.writeFile(workbook, `table_${formattedDate}.xlsx`);
        } catch (err) {
            console.error('Error exporting data to Excel:', err);
        }
    };

    const handleExportAllDataToPDFTKA = () => {
        axios.get('http://localhost:3000/TKA')
            .then((res) => {
                setData(res.data);
                const table = res.data;
                const sortedTable = table.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));
                const doc = new jsPDF();
                doc.text('Data TKA', 14, 16);
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
    }

    const handleExportAllDataToExcellTKA = async () => {
        try {
            const response = await axios.get('http://localhost:3000/TKA');
            const responseData = response.data;
            setData(responseData);
    
            const newData = responseData.map(({ id, parentId, NIK, ...item }) => item);
            const sortedTable = newData.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));
    
            const worksheet = XLSX.utils.json_to_sheet(sortedTable);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data TKA');
            XLSX.writeFile(workbook, `table.xlsx`);
        } catch (err) {
            console.error('Error exporting data to Excel:', err);
        }
    };
    
    const handleExportAllDataToPDFPenyakit = () => {
        axios.get('http://localhost:3000/medical')
            .then((res) => {
                setData(res.data);
                const table = res.data;
                const sortedTable = table.sort((a, b) => a.namaBayi.localeCompare(b.namaBayi));
                const doc = new jsPDF();
                doc.text('Riwayat Penyakit Anak', 14, 16);
                doc.autoTable({
                    head: [['No', 'NIK', 'Nama Bayi', 'Nama Ibu', 'Nama Penyakit', 'Penyakit', 'Keterangan']],
                    body: sortedTable.map((item, index) => [index + 1, item.NIK, item.namaBayi, item.namaIbu, item.penyakit, item.rujukan, item.keterangan]),
                    startY: 20,
                });
                doc.save('medical_table.pdf');
            })
            .catch((err) => {
                console.error('Error fetching medical data:', err);
            });
    }

    const handleExportAllDataToExcellPenyakit = async () => {
        try {
            const response = await axios.get('http://localhost:3000/medical');
            const responseData = response.data;
            setData(responseData);
    
            const newData = responseData.map(({ id, parentId, NIK, ...item }) => item);
            const sortedTable = newData.sort((a, b) => a.namaIbu.localeCompare(b.namaIbu));
    
            const worksheet = XLSX.utils.json_to_sheet(sortedTable);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Riwayat Penyakit Anak');
            XLSX.writeFile(workbook, `table.xlsx`);
        } catch (err) {
            console.error('Error exporting data to Excel:', err);
        }
    }


    return (
        <Dialog header="Get Data Modal" visible={visible} style={{ width: '55vw' }} onHide={onHide}
        pt={{
           header : () => ({
                id : 'modal-header',
           }),
           content : () => ({
                id : 'modal-content',
           }),
        }}
        >
            
            <div className="card">
            <Accordion 
             style={{borderColor : '#06b6d4', border : '2px'}}>
                <AccordionTab header="Ambil data Tumbuh Kembang Anak berdasarkan tanggal" className='hover:dark:text-white'
                    pt={{
                        headerAction : () => ({
                            id : 'header-action-accordion',
                        }),
                        content : () => ({
                            id : 'content-accordion',
                        }),
                    }}
                >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="selectedDate">Pilih Tanggal : </label>
                        <Calendar
                            id="selectedDate"
                            value={selectedDate}
                            defaultValue={new Date()}
                            onChange={(e) => setSelectedDate(e.value)}
                            showIcon
                            dateFormat="dd/mm/yy"
                            style={{margin : '5px 5px 5px 5px', borderColor: '#06b6d4'}}
                            inputStyle={{borderColor: '#06b6d4'}}
                            pt={{
                                input: {
                                    root: { className: 'border-2 border-primary dark:bg-white dark:text-primary text-primary font-semibold' },
                                },
                            }}
                        />
                        <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportToPDF} className="p-button-primary" style={{margin : '5px'}} />
                        <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportToExcel} className="p-button-success" style={{ margin: '5px' }} />
                    </div>
                </div>
                </AccordionTab>
                <AccordionTab header="Ambil data riwayat penyakit anak berdasarkan tanggal"
                pt={{
                    headerAction : () => ({
                        id : 'header-action-accordion',
                    }),
                    toggleableContent : () => ({
                        id : 'toggleable-content-accordion',
                    }),
                    content : () => ({
                        id : 'content-accordion',
                    }),
                }}
                >
                <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="selectedDate">Pilih Tanggal : </label>
                    <Calendar
                        id="selectedDate"
                        value={selectedDate}
                        defaultValue={new Date()}
                        onChange={(e) => setSelectedDate(e.value)}
                        showIcon
                        dateFormat="dd/mm/yy"
                        style={{margin : '5px 5px 5px 5px'}}
                        inputStyle={{borderColor: '#06b6d4'}}
                        pt={{
                            input: {
                                root: { className: 'border-2 border-primary dark:bg-white dark:text-primary text-primary font-semibold' },
                            },
                        }}
                    />
                    <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportToPDFPenyakit} className="p-button-primary" style={{margin : '5px'}} />
                    <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportToExcelPenyakit} className="p-button-success" style={{ margin: '5px' }} />
                </div>
                </div>
                </AccordionTab>
                <AccordionTab header="ambil semua data TKA"
                    pt={{
                        headerAction : () => ({
                            id : 'header-action-accordion',
                        }),
                        content : () => ({
                            id : 'content-accordion',
                        }),
                    }}
                >
                    <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportAllDataToPDFTKA} className="p-button-primary" style={{margin : '5px'}} />
                    <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportAllDataToExcellTKA} className="p-button-success" style={{ margin: '5px' }} />
                </AccordionTab>
                <AccordionTab header="ambil semua data riwayat penyakit anak"
                    pt={{
                        headerAction : () => ({
                            id : 'header-action-accordion',
                        }),
                        content : () => ({
                            id : 'content-accordion',
                        }),
                    }}
                >
                    <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportAllDataToPDFPenyakit} className="p-button-primary" style={{margin : '5px'}} />
                    <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportAllDataToExcellPenyakit} className="p-button-success" style={{ margin: '5px' }} />
                </AccordionTab>
            </Accordion>
        </div>
            <div className='flex justify-end items-end mt-10'>
                <Button label="Close" icon="pi pi-times" onClick={onHide} className="p-button-text" />  
            </div>

        </Dialog>
    );
};

export default GetDataModal;
