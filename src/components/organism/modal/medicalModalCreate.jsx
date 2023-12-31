import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import ErrorFieldText from '../../atom/errorFieldText';



const MedicalModalCreate = ({ setVisible, show, visible, parentId, triggerUpdate }) => {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.get(`http://localhost:3000/medical?parentId=${parentId.id}`)
        .then(res => {
            console.log(res.data);
            const day = data.tanggal.getDate();
            const month = data.tanggal.getMonth() + 1;
            const year = data.tanggal.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const medicalData = {
                id: uuidv4(),
                ...data,
                tanggal: formattedDate,
                NIK : parentId.NIK,
                parentId: parentId.id,
                namaIbu : parentId.namaIbu,
                namaBayi : parentId.bayi.namaBayi

            }

            console.log(medicalData);
            axios.post(`http://localhost:3000/medical`, medicalData)
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
        })
    }
    return (
        <div className="card flex justify-content-center w-auto">
        <Dialog header="Create Data" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
<form onSubmit={handleSubmit(onSubmit)} style={{ padding: '5%' }}>
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
                                dateFormat="mm/dd/yy"
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="penyakit">penyakit</label>
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
                        defaultValue={''}
                        rules={{ required: true }}
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
        <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button type="submit" label="Yes" icon="pi pi-check" autoFocus style={{ marginLeft: '10px' }} />
    </div>
</form>

        </Dialog>
    </div>
    )
}


export default MedicalModalCreate