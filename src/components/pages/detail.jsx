import { useEffect, useState, useRef, useReducer } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import InfoPasien from "../atom/infoPasien";
import { Toast } from 'primereact/toast';
import { exportToExcel } from "../../utils/exportExcell";
import { exportToPDF } from "../../utils/exportPDF";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
import DetailLabel from "../molecules/detailLabel";
import ModalCreate from "../organism/modal/modalCreate";
import ModalEdit from "../organism/modal/modalEdit";
import axios from "axios"
import useTKAStore from "../store/useTKAStore";
import useParentStore from "../store/useParentStore";
    const Detail = () => {
          
    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (!user) {
            navigate("/login")
        }
    }, [navigate])

    const [updateFlag, setUpdateFlag] = useState(false);
    const triggerUpdate = () => {
        setUpdateFlag((prev) => !prev);
    };


    const { id } = useParams()
    const toast = useRef(null);
    const [infoVisible, setInfoVisible] = useState(false);
    const setParentStore = useParentStore((state) => state.setParentBio);
    const parentData = useParentStore((state) => state.parentBio);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const showInfo = () => {
        setParentStore(parentBio);
        setInfoVisible(true);
    }

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: 'data berhasil dibuat' });
    };

    const setTKAData = useTKAStore((state) => state.setTKAData);
    const TKAData = useTKAStore((state) => state.TKAData);

    const [statusKenaikan, setStatusKenaikan] = useState('N');
    const [guestId, setGuestId] = useState([])
    const [parentBio, setParentBio] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseParent = await axios.get(`http://localhost:3000/guest/${id}`);
                setParentBio(responseParent.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, setParentBio, updateFlag, visibleEdit]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/TKA?NIK=${parentBio.NIK}`);
                setGuestId(response.data);
                console.log('Fetched data:', response.data);
                setTKAData(response.data);
                console.log('Updated state:', response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, parentBio.NIK, setTKAData, updateFlag, visibleEdit]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tanggal: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ummur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tinggiBadan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        beratBadan: { value: null, matchMode: FilterMatchMode.IN },
        KBM: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const handleDelete = async (rowData) => {
        // console.log(rowData.id);
        
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
                axios.delete(`http://localhost:3000/TKA/${rowData.id}?NIK=${rowData.NIK}`)
                triggerUpdate();
                toast.current.show({ severity: 'success', 
                    summary: 'Data berhasil dihapus', 
                    detail: 'Data berhasil dihapus',
                    life: 3000,
                });

            }))
        } catch (error) {
            console.error("Error menghapus data:", error);
        }
    };

    const handleExportToExcel = () => {
        const filename = 'data_tka.xlsx';
        exportToExcel(guestId, filename);
    };

    

    const handleExportToPDF = () => {
        const label = parentBio.namaIbu;
        const caption = `Data TKA`;
        const filename = 'data_tka.pdf';
        const columns = [
            { field: 'tanggal', header: 'Tanggal' },
            { field: 'umur', header: 'Umur' },
            { field: 'tinggiBadan', header: 'Tinggi Badan' },
            { field: 'beratBadan', header: 'Berat Badan' },
            { field: 'KBM', header: 'KBM' },
            { field: 'statusKenaikan', header: 'N/T' },
        ];
        exportToPDF(guestId, columns, filename, label, caption);
    };

    //Template
    
    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <span className="p-input-icon-left">
                    <Button label="Export to PDF" icon="pi pi-file-pdf" onClick={handleExportToPDF} style={{marginRight:'20px'}} />
                    <Button label="Export to Excel" icon="pi pi-file-excel" onClick={handleExportToExcel} style={{marginRight:'20px'}} />
                    <Button label="Create Data" icon="pi pi-plus-circle" onClick={() => setVisible(true)} style={{marginRight:'20px'}} />
                    <i className="fa-solid fa-magnifying-glass flex pl-[85%]"></i>
                    <span className="p-input-icon-right">
                        <i className="pi pi-search pl-2 ml-1"/>
                        <InputText className="border-2 " value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Cari data..." style={{paddingLeft : '35px', borderColor : "#06b6d4"}}/>
                    </span>
                </span> 
            </div>
        );
    };

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

    const renderNoColumn = (rowData, rowIndex) => {
        return (
            <span>{rowIndex + 1}</span>
        );
    };


    //Modal
  

    const [visible, setVisible] = useState(false);
    const ModalCreateWrapper = () => (
        <ModalCreate visible={visible} setVisible={setVisible} show={show} triggerUpdate={triggerUpdate} setStatusKenaikan={setStatusKenaikan} statusKenaikan={statusKenaikan} parentBio={parentBio} />
      );

    const handleEdit = (rowData) => {
        // console.log(rowData);   
        setEditData(rowData);
        setVisibleEdit(true);
    };    


    return(
        
        <div className='body h-screen bg-[#e5e7eb] flex justify-center items-center'>
            <Toast ref={toast} />
            <InfoPasien parentData={parentBio} visible={infoVisible} setVisible={setInfoVisible} />  
            <ModalCreateWrapper />
            <ModalEdit
                visibleEdit={visibleEdit}
                setVisibleEdit={setVisibleEdit}
                editData={editData}
                setEditData={setEditData}
                toast={toast}
                triggerUpdate={triggerUpdate}
                parentBio={parentBio}
            />
            <motion.div 

                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}

            className=" flex flex-col gap-5 justify-center items-start shadow-2xl backdrop-blur-sm bg-white/30 w-[95%] h-[90%] rounded-3xl px-20">
                <div 

                className="info flex gap-20 justify-end items-center w-auto">
                    <div className="flex items-center flex-col w-[20%] pl-10 mr-40 ">
                        <motion.img 
                        src="../src/assets/img/pngwing1.png" alt="hehe" 
                        onClick={() => showInfo()}
                        whileHover={{ scale: 1.25 }}
                        className='bg-white border border-primary rounded-full shadow-lg drop-shadow-lg'/>
                        <div className="w-full items-center flex-col flex">
                            <DetailLabel name="Nama Ibu" label="namaIbu" parentBio={parentBio} />
                            <DetailLabel name="Nama Bayi" label="namaBayi" parentBio={parentBio.bayi} />
                            <DetailLabel name="Tanggal Lahir" label="tanggalLahir" parentBio={parentBio.bayi} />
                            <div className="flex gap-2">
                                <motion.button
                                whileHover={{ scale: 1.25 }}
                                onClick={() => navigate(`/chart/${id}`)} 
                                className="font-semibold border w-[140px] bg-white border-primary rounded-lg p-2 my-4 text-primary hover:border-0 hover:text-white hover:bg-primary">
                                <i className="pi pi-chart-line mx-2"></i>
                                Lihat Grafik</motion.button>
                                <motion.button
                                whileHover={{ scale: 1.25 }}
                                onClick={() => navigate(`/medicalDetail/${id}`)} 
                                className="font-semibold border w-[140px] bg-white border-primary rounded-lg p-2 my-4 text-primary hover:border-0 hover:text-white hover:bg-green-500">
                                <i className="fa-solid fa-notes-medical mx-2"></i>
                                Kesehatan</motion.button>
                            </div>
                            <motion.button
                            whileHover={{ scale: 1.25 }}
                            onClick={() => navigate(`/`)} 
                            className="w-[140px] font-semibold border bg-white border-primary rounded-lg p-2 text-primary hover:border-0 hover:text-white hover:bg-red-500">
                            <i className="pi pi-backward mx-2"></i>
                            Kembali</motion.button>
                        </div>
                    </div>

                    <div 
                    className="card rounded-3x ">
                        <DataTable
                            header={renderHeader}
                            value={guestId}
                            paginator
                            rows={4}
                            tableStyle={{ minWidth: '50rem', borderRadius: '10px 0 0 0', width: '100%' }}
                            filters={filters}
                            filterDisplay="row"
                            globalFilterFields={['tanggal', 'umur', 'tinggiBadan', 'beratBadan', 'KBM', 'statusstatusKenaikan']}
                            emptyMessage={<span className='text-black font-semibold'>Data Kosong</span>}
                           >
                            <Column
                                field="no"
                                header="No"
                                style={{ width: '5%' }}
                                headerStyle={{  textAlign: 'center', border: 'none' }}
                                bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000', color: 'black' }}
                                className="bg-gray-100 font-semibold "
                                body={(rowData, { rowIndex }) => renderNoColumn(rowData, rowIndex)}
                            ></Column>
                            <Column field="tanggal" header="Tanggal" 
                                style={{ width: '25%' }}
                                headerStyle={{  textAlign: 'center', border: 'none' }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                className="bg-gray-100 font-semibold "
                            ></Column>
                            <Column field="umur" header="Umur" 
                                style={{ width: '25%' }} 
                                headerStyle={{   border: 'none'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.umur} bulan</span>} 
                                className="bg-gray-100 font-semibold"
                             ></Column>
                            <Column field="tinggiBadan" header="Tinggi Badan" 
                                className="bg-gray-100 font-semibold"
                                style={{ width: '25%' }} 
                                headerStyle={{   border: 'none'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.tinggiBadan} cm</span>} />
                                
                            <Column field="beratBadan" header="Berat Badan" 
                                style={{ width: '25%' }} 
                                className="bg-gray-100 font-semibold"
                                headerStyle={{   border: 'none'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.beratBadan} kg</span>}>
                            </Column>
                            <Column field="KBM" header="Kenaikan BB minimal" 
                                className="bg-gray-100 font-semibold"
                                headerStyle={{  textAlign: 'center',  border: 'none'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                style={{ width: '25%' }}
                                body={(rowData) => <span>{rowData.KBM} gr</span>}>    
                            </Column>
                            <Column field="statusKenaikan" header="N/T" 
                                className="bg-gray-100 font-semibold "
                                headerStyle={{   border: 'none'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                style={{ width: '25%' }}>
                            </Column>
                            <Column field="action" header="Action"
                                style={{ width: '25%' }}
                                headerStyle={{   border: 'none' }}
                                bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000' }}
                                body={actionTemplate}
                                className="bg-gray-100 font-semibold"
                            />
                            </DataTable>
                    </div>           
                </div>
            </motion.div>
        </div>

        
    )
}

export default Detail