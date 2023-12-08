import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { exportToExcel } from "../utils/exportExcell";
import { exportToPDF } from "../utils/exportPDF";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MedicalModalCreate from '../organism/medicalModalCreate';
import MedicalModalEdit from '../organism/medicalModalEdit';
const MedicalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useRef(null);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: 'data berhasil dibuat' });
    };
    const [data, setData] = useState([]);
    const [parentId, setParentId] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/medical?parentId=${id}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseParent = await axios.get(`http://localhost:3000/guest/${id}`);
                setParentId(responseParent.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    //handle function
    const handleDelete = async (rowData) => {
        // console.log(rowData.NIK);
        
        try {
            
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result => {
                axios.delete(`http://localhost:3000/medical/${rowData.id}?NIK=${rowData.NIK}`)
                toast.current.show({ severity: 'success', 
                    summary: 'Data berhasil dihapus', 
                    detail: 'Data berhasil dihapus',
                    life: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }))
        } catch (error) {
            console.error("Error menghapus data:", error);
        }
    };

    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    

    
    const handleEdit = (rowData) => {
        setEditData(rowData);
        setVisibleEdit(true);
    }; 

    //export function
    const handleExportToPDF = () => {
        const label = parentId.namaIbu;
        const caption = `Data Kesehatan`;
        const filename = 'data_kesehatan.pdf';
        const columns = [
            { field: 'tanggal', header: 'Tanggal' },
            { field: 'penyakit', header: 'Penyakit' },
            { field: 'rujukan', header: 'Rujukan' },
            { field: 'keterangan', header: 'Keterangan' },
        ];
        exportToPDF(data, columns, filename, label, caption);
    };

    const handleExportToExcel = () => {
        const filename = 'data_kesehatan.xlsx';
        exportToExcel(data, filename);
    };


    //render template

    const renderHeader = () => {
        return (
            <div className="flex justify-center">
                <span className="p-input-icon-left">
                    <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportToPDF} style={{marginRight:'20px'}} />
                    <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportToExcel}  style={{marginRight:'20px'}} />
                    <Button label="Create Data" icon="pi pi-plus-circle" onClick={() => setVisible(true)} style={{marginRight:'20px'}} />
                    <i className="fa-solid fa-magnifying-glass flex pl-[85%]"></i>
                    <span className="p-input-icon-right">
                        <i className="pi pi-search pl-2 ml-1"/>
                        <InputText className="border-2 " value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Cari data..." style={{paddingLeft : '35px', borderColor : "#06b6d4"}}/>
                    </span>
                </span> 
            </div>
        );
    }


    const actionTemplate = (rowData) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <motion.button
                whileHover={{ scale: 1.25 }}
                
                 className="w-20 border-2 border-primary text-primary  hover:bg-yellow-400 rounded-lg p-2 hover:text-gray-700 hover:border-0"  onClick={() => handleEdit(rowData)}><i className="fa-solid fa-pen-to-square"></i> Edit</motion.button>
                <motion.button 
                whileHover={{ scale: 1.25 }}
                className="w-24 border-2 text-primary hover:text-white hover:border-0 border-primary hover:bg-red-500 rounded-lg p-2" onClick={() => handleDelete(rowData)}>
                    <i className="fa-solid fa-trash mx-1"></i>
                    Delete</motion.button>
            </div>
        );
    };


    //filter
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tanggal: { value: null, matchMode: FilterMatchMode.CONTAINS },
        penyakit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        rujukan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        keterangan: { value: null, matchMode: FilterMatchMode.IN },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const [visible, setVisible] = useState(false);
    const ModalCreateWrapper = () => (
        <MedicalModalCreate visible={visible} setVisible={setVisible} show={show} parentId={parentId} />
        );
        


    return (
        <div className="body h-screen bg-[#e5e7eb] flex justify-center items-center">
            <Toast ref={toast} />
            <ModalCreateWrapper />
            <MedicalModalEdit visible={visibleEdit} setVisible={setVisibleEdit} show={show} editData={editData} setEditData={setEditData} toast={toast} parentId={parentId} />
            <div className="flex flex-col gap-5 justify-center items-center shadow-2xl backdrop-blur-sm bg-white/30 w-[95%] h-[90%] rounded-3xl px-20">
                <motion.p 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-primary text-white p-2 rounded-xl font-semibold'>CATATAN PENYAKIT DAN MASALAH PERTUMBUHAN-PERKEMBANGAN</motion.p>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <DataTable 
                value={data}  
                header={renderHeader()}
                filters={filters}
                filterDisplay="row"
                className="w-full shadow-lg backdrop:shadow-xl"
                tableStyle={{ minWidth: '50rem', borderRadius: '10px 0 0 0', width: '100%' }}
                paginator
                rows={4}
                emptyMessage={<span className='text-black font-semibold'>Data Kosong</span>}
                >
                    <Column 
                        field="tanggal" 
                        header="Tanggal"
                        style={{ width: '25%' }}
                        headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                        bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                        className="bg-gray-100 font-semibold"
                    ></Column>
                    <Column 
                        field="penyakit" 
                        header="penyakit/Masalah"
                        style={{ width: '25%' }}
                        headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                        bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                        className="bg-gray-100 font-semibold"
                    ></Column>
                    <Column 
                        field="rujukan" 
                        header="Tindakan/Rujukan/Umpan Balik"
                        style={{ width: '25%' }}
                        headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                        bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                        className="bg-gray-100 font-semibold"
                    ></Column>
                    <Column 
                        field="keterangan" 
                        header="Keterangan (Nama Pemeriksa, Tempat, Pelayanan, Paraf)" 
                        style={{ width: '25%' }}
                        headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                        bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                        className="bg-gray-100 font-semibold"
                    ></Column>
                    <Column 
                        field="action" 
                        header="action" 
                        body={actionTemplate} 
                        style={{ width: '25%' }}
                        headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                        bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                        className="bg-gray-100 font-semibold"
                    ></Column>
                </DataTable>
            </motion.div>
                <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.25 }}
                    className="w-[140px] font-semibold border bg-white border-primary rounded-lg p-2 text-primary hover:border-0 hover:text-white hover:bg-red-500"> 
                    <i className="pi pi-backward mx-2"></i>
                    Kembali
                    
                </motion.button>
            </div>
        </div>
    );
}

export default MedicalDetail;