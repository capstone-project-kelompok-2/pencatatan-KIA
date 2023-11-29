import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { v4 as uuidv4 } from 'uuid';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
// import { SweetAlert2 } from "sweetalert2-react-content";
import { useForm, Controller, set  } from "react-hook-form"
import DetailLabel from "../molecul/detailLabel";
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
    const handleCheckboxChange = (type) => {
        setStatusKenaikan((prev) => (prev === type ? '' : type));
      };
    const {  register, control, trigger, setValue, getValues, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => {
        delete data.N;
        delete data.T;

        const formattedDate = new Date(getValues('tanggal')).toLocaleDateString();
        data.tanggal = formattedDate;
        // const formattedDate = new Date(getValues('tanggal')).toLocaleDateString();
        const dataTKA    = {
            id : uuidv4(),
            namaIbu : parentBio.namaIbu,
            tanggal: formattedDate,
            ...data,
            statusKenaikan: statusKenaikan,        
        }
        console.log(dataTKA );
        axios.post(`http://localhost:3000/TKA`, dataTKA )
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        setVisible(false)
        show();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // console.log(id);

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
                <button className="bg-yellow-400 rounded-lg p-2 text-gray-700" onClick={() => handleEdit(rowData)}>Edit</button>
                <button className="bg-red-500 rounded-lg p-2" onClick={() => handleDelete(rowData)}>Delete</button>
            </div>
        );
    };


    const handleDelete = async (rowData) => {
        console.log(rowData.id);
    
        try {
            // Delete the specific data
            await axios.delete(`http://localhost:3000/TKA/${rowData.id}?userId=${rowData.userId}`);
    
            console.log("Data berhasil dihapus.");
    
            window.location.reload();

        } catch (error) {
            console.error("Error menghapus data:", error);
        }
    };

    const header = renderHeader();
    const action = actionTemplate();


    //modalCreate
    const [visible, setVisible] = useState(false);
    

    const ModalCreate = () => {

        return (
            <div className="card flex justify-content-center w-auto">
            <Dialog header="Create Data" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={handleSubmit(onSubmit)} action="" style={{padding : "5%"}}>
                    <div className="tanggal">
                        <label htmlFor="tanggal">tanggal</label>
                        <Controller
                        name="tanggal"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Calendar
                            showIcon
                            id="tanggal"
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            dateFormat="dd/mm/yy"
                            />
                        )}
                        />
                    </div>

                    <div className="umur">
                        <label htmlFor="umur">umur</label>
                        <Controller
                            name="umur"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <InputNumber
                                id="umur"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="tinggiBadan">
                        <label htmlFor="tinggiBadan">tinggi Badan</label>
                        <Controller
                            name="tinggiBadan"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <InputNumber
                                id="tinggiBadan"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="beratBadan">
                        <label htmlFor="beratBadan">Berat Badan</label>
                        <Controller
                            name="beratBadan"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <InputNumber minFractionDigits={1}
                                id="beratBadan"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>
                    
                    <div className="KBM">
                        <label htmlFor="KBM">KBM</label>
                        <Controller
                            name="KBM"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <InputNumber
                                id="KBM"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="N">
                        <label>Naik</label>
                        <Controller
                        name="N"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox
                            // defaultValue={true}
                            inputId="N"
                            onChange={(e) => {
                                field.onChange(e.checked);
                                handleCheckboxChange('N');
                            }}
                            checked={statusKenaikan === 'N'}
                            // {...field}
                            />
                        )}
                        />
                    </div>
                    <div className="T">
                        <label>Turun</label>
                        <Controller
                        name="T"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox
                            inputId="T"
                            onChange={(e) => {
                                field.onChange(e.checked);
                                handleCheckboxChange('T');
                            }}
                            checked={statusKenaikan === 'T'}
                            />
                        )}
                        />
                    </div>
                    

                    <div className="flex justify-end items-center p-5">
                        
                        <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                        <Button  type="submit" label="Yes" icon="pi pi-check" autoFocus style={{marginLeft : '10px'}} />
                    </div>

                </form>
            </Dialog>
        </div>
        )
    }


    return(
        
        <div className='body h-screen bg-gradient-to-b from-green-300 from-10% to-cyan-700 to-90% shadow-lg flex justify-center items-center'>
            <Toast ref={toast} />
            <ModalCreate />
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
                            header={header}
                            value={guestId  }
                            paginator
                            rows={4}
                            tableStyle={{ minWidth: '50rem', borderRadius: '10px 0 0 0', width: '100%' }}
                            filters={filters}
                            filterDisplay="row"
                            globalFilterFields={['tanggal', 'umur', 'tinggiBadan', 'beratBadan', 'KBM', 'statusstatusKenaikan']}
                            emptyMessage="No customers found."
                            className="bg-transparent shadow-lg rounded-3xl"
                        >
                            <Column field="tanggal" header="Tanggal" 
                                style={{ width: '25%' }}
                                headerStyle={{ backgroundColor: 'gray', color: 'white'  }}
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