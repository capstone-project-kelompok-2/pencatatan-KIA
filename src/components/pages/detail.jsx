import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Swal from "sweetalert2";
import DetailLabel from "../molecules/detailLabel";
import ModalCreate from "../organism/modalCreate";
import ModalEdit from "../organism/modalEdit";
import './style.css'
import axios from "axios"

const Detail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const toast = useRef(null);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: 'data berhasil dibuat' });
    };
    const [statusKenaikan, setStatusKenaikan] = useState('N');
    const [guestId, setGuestId] = useState([])
    const [parentBio, setParentBio] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseParent = await axios.get(`http://localhost:3000/guest/${id}`);
                setParentBio(responseParent.data);
                // const response = await axios.get(`http://localhost:3000/TKA?userId=${id}`);
                // setGuestId(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/TKA?namaIbu=${parentBio.namaIbu}`);
                setGuestId(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[parentBio.namaIbu]);
    // console.log([guestId]);
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
        console.log(rowData.id);
        
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
                axios.delete(`http://localhost:3000/TKA/${rowData.id}?userId=${rowData.userId}`)
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

    //Template

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <span className="p-input-icon-left">
                    <Button label="Create Data" icon="pi pi-plus-circle" onClick={() => setVisible(true)} style={{marginLeft:'20px', marginRight:'20px'}} />
                    <i className="fa-solid fa-magnifying-glass flex pl-[85%]"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <button className="bg-yellow-400 rounded-lg p-2 text-gray-700"  onClick={() => handleEdit(rowData)}>Edit</button>
                <button className="bg-red-500 rounded-lg p-2" onClick={() => handleDelete(rowData)}>Delete</button>
            </div>
        );
    };

  

    const [visible, setVisible] = useState(false);
    const ModalCreateWrapper = () => (
        <ModalCreate visible={visible} setVisible={setVisible} show={show} setStatusKenaikan={setStatusKenaikan} statusKenaikan={statusKenaikan} parentBio={parentBio} />
      );



    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    
    const actionTemplateEdit = (rowData) => {
        return (
            <div className="flex justify-center items-center gap-3">
                <button
                    className="bg-yellow-400 rounded-lg p-2 text-gray-700"
                    onClick={() => handleEdit(rowData)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 rounded-lg p-2"
                    onClick={() => handleDelete(rowData)}
                >
                    Delete
                </button>
            </div>
        );
    };
    
    const handleEdit = (rowData) => {
        setEditData(rowData);
        setVisibleEdit(true);
    };    

    return(
        
        <div className='body h-screen bg-gradient-to-b from-green-300 from-10% to-cyan-700 to-90% shadow-lg flex justify-center items-center'>
            <Toast ref={toast} />
            <ModalCreateWrapper />
            <ModalEdit
                visibleEdit={visibleEdit}
                setVisibleEdit={setVisibleEdit}
                editData={editData}
                setEditData={setEditData}
                toast={toast}
            />
            <div className=" flex flex-col gap-5 justify-center items-start  backdrop-blur-sm bg-white/30 w-[95%] h-[90%] rounded-3xl px-20">
                <div className="info flex gap-20 justify-end items-center w-auto">
                    <div className="flex items-center flex-col w-[20%] pl-10 mr-40">
                        <img src="../src/assets/img/pngwing1.png" alt="hehe" className='bg-white border border-b-2lack rounded-full'/>
                        <div className="w-full items-center flex-col flex">
                            <DetailLabel name="Nama Ibu" label="namaIbu" parentBio={parentBio} />
                            <DetailLabel name="Nama Bayi" label="namaBayi" parentBio={parentBio.bayi} />
                            <DetailLabel name="Tanggal Lahir" label="tanggalLahir" parentBio={parentBio.bayi} />
                        </div>
                    </div>

                    <div className="card rounded-3x ">
                        <DataTable
                            header={renderHeader}
                            value={guestId  }
                            paginator
                            rows={4}
                            tableStyle={{ minWidth: '50rem', borderRadius: '10px 0 0 0', width: '100%' }}
                            filters={filters}
                            filterDisplay="row"
                            globalFilterFields={['tanggal', 'umur', 'tinggiBadan', 'beratBadan', 'KBM', 'statusstatusKenaikan']}
                            emptyMessage="Data Kosong"
                            className=" bg-neutral-600 font-semibold shadow-lg rounded-3xl"
                        >
                            <Column field="tanggal" header="Tanggal" 
                                style={{ width: '25%' }}
                                headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                className="bg-gray-100 font-semibold"
                            ></Column>
                            <Column field="umur" header="umur" 
                                style={{ width: '25%' }} 
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.umur} bulan</span>} 
                                className="bg-gray-100 font-semibold"
                             ></Column>
                            <Column field="tinggiBadan" header="Tinggi Badan" 
                                className="bg-gray-100 font-semibold"
                                style={{ width: '25%' }} 
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.tinggiBadan} cm</span>} />
                                
                            <Column field="beratBadan" header="Berat Badan" 
                                style={{ width: '25%' }} 
                                className="bg-gray-100 font-semibold"
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                body={(rowData) => <span>{rowData.beratBadan} kg</span>}>
                            </Column>
                            <Column field="KBM" header="KBM" 
                                className="bg-gray-100 font-semibold"
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                style={{ width: '25%' }}>
                            </Column>
                            <Column field="statusKenaikan" header="N/T" 
                                className="bg-gray-100 font-semibold "
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
                                bodyStyle={{ textAlign: 'center', border : 'none', borderColor : '#000', color : 'black' }}
                                style={{ width: '25%' }}>
                            </Column>
                            <Column field="action" header="Action"
                                style={{ width: '25%' }}
                                headerStyle={{ backgroundColor: 'gray', color: 'white' }}
                                bodyStyle={{ textAlign: 'center', border: 'none', borderColor: '#000' }}
                                body={actionTemplate}
                                className="bg-gray-100 font-semibold"
                            />
                            </DataTable>
                    </div>           
                </div>
            </div>
        </div>

        
    )
}

export default Detail