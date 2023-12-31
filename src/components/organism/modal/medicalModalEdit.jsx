import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import ErrorFieldText from '../../atom/errorFieldText';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';
import axios from 'axios';


const MedicalModalEdit = ({ editData, onClose, visible, parentId, setVisible, show, setEditData, toast, triggerUpdate }) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();

    const onEditSubmit = data => {
        axios.get(`http://localhost:3000/medical?NIK=${parentId.NIK}`)
        .then(res => {
            const day = data.tanggal.getDate();
            const month = data.tanggal.getMonth() + 1;
            const year = data.tanggal.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const medicalEdit = {
                id: data.id,
                NIK: parentId.NIK,
                namaIbu: parentId.namaIbu,
                namaBayi: parentId.bayi.namaBayi,
                tanggal: formattedDate,
                parentId: id,
                penyakit: data.penyakit,
                rujukan: data.rujukan,
                keterangan: data.keterangan
            }
            console.log(medicalEdit);
            try{
                setVisible(false);
                Swal.fire({
                    title: "Perhatian!",
                    text: "apakah anda yakin ingin mengubah data ini?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya, Ubah!",
                    cancelButtonText: "Tidak"
                }).then((result => {
                    if(result.isConfirmed){
                        axios.put(`http://localhost:3000/medical/${data.id}`, medicalEdit)
                        .then((res) => {
                            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Updated', life: 3000 });

                            triggerUpdate();
                        })
                    }else{
                        setVisible(true);
                    }
                }))
            }catch(err){
                console.log(err);
            }
        })

    };

    useEffect(() => {

        
        if(editData){
            const dateString = editData.tanggal;
            const [day, month, year] = dateString.split('/');
            const dateObject = new Date(`${year}-${month}-${day}`);
            // console.log(dateObject);
            setValue('id', editData.id);
            setValue('NIK', editData.NIK);
            setValue('tanggal', dateObject);
            setValue('penyakit', editData.penyakit);
            setValue('rujukan', editData.rujukan);
            setValue('keterangan', editData.keterangan);
        }
    }, [editData, setValue]);


    return (
        <Dialog header="Edit Data" visible={visible} onHide={
            () => {
                setVisible(false);
                setEditData(null);
            }
        } >
            <form onSubmit={handleSubmit(onEditSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="mx-3">
                                    <label htmlFor="tanggal">Tanggal</label>
                                </div>
                            </td>
                            <td>:</td>
                            <td>

                                <div className="mx-[10px]">
                                    <Controller
                                        name="tanggal"
                                        control={control}
                                        defaultValue={new Date()}
                                        render={({ field }) => (
                                            <Calendar
                                                showIcon
                                                id="tanggal"

                                                className='border-primary dark:border-primary border-2 rounded-lg'
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.value)}
                                                dateFormat="dd/mm/yy"
                                            />
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="mx-3">
                                    <label htmlFor="penyakit">Penyakit</label>
                                </div>
                            </td>
                            <td className="mx-5">:</td>
                            <td>
                                <div className="mx-3 my-1.5">
                                    <Controller
                                        name="penyakit"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={''}
                                        render={({ field }) => (
                                            <>
                                            <InputText
                                                id="penyakit"

                                                className='border-primary dark:border-primary border-2 rounded-lg'
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                />
                                                {errors.penyakit && <ErrorFieldText />}
                                            </>
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="mx-3">
                                    <label htmlFor="rujukan">Rujukan</label>
                                </div>
                            </td>
                            <td>:</td>
                            <td>
                                <div className="mx-3 my-1.5">
                                    <Controller
                                        name="rujukan"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={''}
                                        render={({ field }) => (
                                            <>
                                            <InputTextarea
                                                id="rujukan"

                                                className='border-primary dark:border-primary border-2 rounded-lg'
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                />
                                                {errors.rujukan && <ErrorFieldText />}
                                            </>
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="mx-3">
                                    <label htmlFor="keterangan">Keterangan</label>
                                </div>
                            </td>
                            <td>:</td>
                            <td>
                                <div className="mx-3 my-1.5">
                                    <Controller
                                        name="keterangan"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={''}
                                        render={({ field }) => (
                                            <>
                                            <InputTextarea
                                                id="keterangan"

                                                className='border-primary dark:border-primary border-2 rounded-lg'
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                />
                                                {errors.keterangan && <ErrorFieldText />}
                                            </>
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end items-center p-5">
                    <Button label="Cancel" onClick={onClose} className="p-button-text" />
                    <Button type="submit" label="Save" icon="pi pi-check" autoFocus style={{ marginLeft: '10px' }} />
                </div>
            </form>
        </Dialog>
    );
};

export default MedicalModalEdit;