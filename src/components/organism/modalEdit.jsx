import { useForm, Controller, set  } from "react-hook-form"
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import axios from "axios";
import Swal from "sweetalert2";

const ModalEdit = ({visibleEdit, setVisibleEdit, editData, setEditData, toast}) => {
    const { control, handleSubmit, setValue, getValues, } = useForm();
    const onEditSubmit = (data) => {
        // console.log(data);
        const date = new Date(data.tanggal);
        const tanggal = date.getDate();
        const bulan = date.getMonth() + 1;
        const tahun = date.getFullYear();
        data.tanggal = `${tanggal}/${bulan}/${tahun}`;

        const newData = {
            id: data.id,
            NIK: data.NIK,
            namaIbu: data.namaIbu,
            tanggal: data.tanggal,
            umur: data.umur,
            tinggiBadan: data.tinggiBadan,
            beratBadan: data.beratBadan,
            KBM: data.KBM,
            statusKenaikan: data.status
        };

        try{
            setVisibleEdit(false);
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
                    axios.put(`http://localhost:3000/TKA/${data.id}`, newData)
                    .then((res) => {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Data Updated', life: 3000 });
                        window.location.reload();
                    })
                }else{
                    setVisibleEdit(true);
                }
            }))

        }catch(error){
            console.log(error);
        }
        // console.log(newData);
    };

    

    useEffect(() => {
        if (editData) {
            // console.log('Edit Data:', editData);
            setValue('id', editData.id);
            setValue('userId', editData.userId);
            setValue('namaIbu', editData.namaIbu);
            setValue('NIK', editData.NIK);
            setValue('tanggal', editData.tanggal);
            setValue('umur', editData.umur);
            setValue('tinggiBadan', editData.tinggiBadan);
            setValue('beratBadan', editData.beratBadan);
            setValue('KBM', editData.KBM);
            setValue('status', editData.statusKenaikan);
        }
    }, [editData, setValue]);
    // console.log(editData);
    const handleCheckboxChange = (type) => {
        setValue('status', type);
    };

    return (
        <Dialog
        header="Edit Data"
        visible={visibleEdit}
        style={{ width: '35vw' }}
        onHide={() => {
            setVisibleEdit(false);
            setEditData(null);
        }}
    >
<form onSubmit={handleSubmit(onEditSubmit)} style={{ padding: '5%' }}>
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
                    <div className="mx-[-10px]">
                    <Controller
                        name="tanggal"
                        control={control}
                        defaultValue={new Date()}
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
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="umur">Umur</label>
                    </div>
                </td>
                <td className="mx-5">:</td>
                <td>
                    <div className="mx-3 my-1.5">
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
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="tinggiBadan">Tinggi Badan</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="mx-3 my-1.5">
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
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="beratBadan">Berat Badan</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="mx-3 my-1.5">
                    <Controller
                        name="beratBadan"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <InputNumber
                                minFractionDigits={1}
                                id="beratBadan"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="KBM">KBM</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                   <div className="mx-3 my-1.5">
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
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label>Status</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="p-inputgroup gap-5 my-3 px-5">
                        <div className="p-field-checkbox">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue="N"
                                render={({ field }) => (
                                    <Checkbox
                                        inputId="naik"
                                        onChange={(e) => {
                                            field.onChange(e.checked);
                                            handleCheckboxChange('N');
                                        }}
                                        checked={getValues('status') === 'N'}
                                    />
                                )}
                            />
                            <label htmlFor="naik">Naik</label>
                        </div>

                        <div className="p-field-checkbox">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <Checkbox
                                        inputId="turun"
                                        onChange={(e) => {
                                            field.onChange(e.checked);
                                            handleCheckboxChange('T');
                                        }}
                                        checked={getValues('status') === 'T'}
                                    />
                                )}
                            />
                            <label htmlFor="turun">Turun</label>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div className="flex justify-end items-center p-5">
        <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => {
                setVisibleEdit(false);
                setEditData(null);
            }}
            className="p-button-text"
        />
        <Button type="submit" label="Save" icon="pi pi-check" autoFocus style={{ marginLeft: '10px' }} />
    </div>
</form>


    </Dialog>
    );
};

export default ModalEdit;