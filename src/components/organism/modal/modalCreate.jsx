// ModalCreate.js
import { useForm, Controller } from 'react-hook-form';

import { useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ErrorFieldText from '../../atom/errorFieldText';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

const ModalCreate = ({ setVisible, show, visible, parentBio, triggerUpdate }) => {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm();
    
    const [umur, setUmur] = useState(0);
    const [loading, setLoading] = useState(true);
    const [umurInputDisabled, setUmurInputDisabled] = useState(true);
    //ambil data TKA
    useEffect(() => {
        axios.get(`http://localhost:3000/TKA?NIK=${parentBio.NIK}`)
        .then(res => {
            // console.log(res.data);
            const datas = res.data;
            const umur = datas.map(data => data.umur);
            // console.log(umur);
            setUmur(umur[umur.length-1]+1);
            setLoading(false);

        })
    }, [parentBio]);
    // console.log(umur);
    const onSubmit = data => {
        axios.get(`http://localhost:3000/TKA?NIK=${parentBio.NIK}`)
        .then(res => {
            const day = data.tanggal.getDate();
            const month = data.tanggal.getMonth() + 1;
            const year = data.tanggal.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            console.log(res.data.length);
            if(res.data.length === 0){
                const dataTKA = {
                    id: uuidv4(),
                    NIK: parentBio.NIK,
                    namaIbu: parentBio.namaIbu,
                    ...data,
                    tanggal: formattedDate,
                    statusKenaikan: 'N',
                    parentId: parentBio.id
                };
                axios.post(`http://localhost:3000/TKA`, dataTKA )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
                setVisible(false)
                triggerUpdate();
                show();
            }else{

            let KBM = 0;
            switch (res.data.length) {
                case 0:
                    KBM = 0;
                    break;
                case 1:
                    KBM = 800;
                    break;
                case 2 :
                    KBM = 900;
                    break;
                case 3 :
                    KBM = 800;
                    break;
                case 4 :
                    KBM = 600;
                    break;
                case 5 :
                    KBM = 500;
                    break;
                case 6 :
                    KBM = 400;
                    break;
                case 7 :
                    KBM = 300;
                    break;
                case 8 :
                    KBM = 300;
                    break;
                case 9 :
                    KBM = 300;
                    break;
                case 10 :
                    KBM = 300;
                    break;
                default:
                    KBM = 200;
                    break;
            }
            let lastData = res.data[res.data.length-1];
            const selBeratBadan = data.beratBadan - lastData.beratBadan;
            let status = '';
            let dataBeratBadan = selBeratBadan*1000;
            if(dataBeratBadan < KBM){
                status = 'T'
            }else{
                status = 'N';
            }

            // console.log(status);
            // console.log(dataBeratBadan);
            const dataTKA = {
                id: uuidv4(),
                NIK: parentBio.NIK,
                namaIbu: parentBio.namaIbu,

                KBM: KBM,
                ...data,
                tanggal: formattedDate,
                statusKenaikan: status,
                parentId: parentBio.id,
            }
            // console.log(dataTKA);
            axios.post(`http://localhost:3000/TKA`, dataTKA )
            .then(res => {
                // console.log(res);
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setVisible(false)

            triggerUpdate();
            show();
            }
        })

    };

    const handleEnableUmurInput = () => {
        setUmurInputDisabled((prevDisabled) => !prevDisabled);
    };

  return (
    <div className="card flex justify-content-center w-auto">
      <Dialog header="Create Data" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
<form onSubmit={handleSubmit(onSubmit)} style={{ padding: '5%' }}>
    <table>
        <tbody>
            <tr>
                <td>
                    <div className="mx-3">

                    <label htmlFor="tanggal">Tanggal </label>

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

            {!loading && (
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
                        defaultValue={umur}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <>
                            <InputNumber
                                id="umur"
                                className='border-primary dark:border-primary border-2 rounded-lg'
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                                disabled={umurInputDisabled}
                                />
                            {errors.umur && <ErrorFieldText />}
                            </>
                        )}
                    />
                    </div>
                </td>

                <td>
                    <Button
                        label={umurInputDisabled ? "Enable Umur" : "Disable Umur"}
                        onClick={handleEnableUmurInput}
                        className="p-button-text"
                        type='button'
                    />
                </td>
            </tr>
            )}
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
                        rules={{ required: true }}
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <>
                            <InputNumber
                                id="tinggiBadan"
                                value={field.value}

                                className='border-primary dark:border-primary border-2 rounded-lg'
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            {errors.tinggiBadan && <ErrorFieldText />}
                            </>
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
                        rules={{ required: true }}
                        defaultValue={0}
                        render={({ field }) => (
                            <>
                            <InputNumber
                                minFractionDigits={1}
                                id="beratBadan"
                                value={field.value}

                                className='border-primary dark:border-primary border-2 rounded-lg'
                                onValueChange={(e) => field.onChange(e.value)}
                                />
                            {errors.beratBadan && <ErrorFieldText />}
                            </>
                        )}
                    />
                    </div>
                </td>
            </tr>



        </tbody>
    </table>

    <div className="flex justify-end items-center p-5">
        <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button type="submit" label="Yes" icon="pi pi-check" autoFocus style={{ marginLeft: '10px' }} />
    </div>
</form>

      </Dialog>
    </div>
  );
};

export default ModalCreate;
