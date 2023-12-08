// ModalCreate.js
import { useForm, Controller } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
const ModalCreate = ({ setVisible, show, setStatusKenaikan, visible, statusKenaikan, parentBio }) => {
    const { register, control, handleSubmit, getValues } = useForm();

  const handleCheckboxChange = (type) => {
    setStatusKenaikan((prev) => (prev === type ? '' : type));
  };

  const onSubmit = data => {
    delete data.N;
    delete data.T;

    const tanggalValue = data.tanggal instanceof Date ? data.tanggal : currentDate;

    console.log('Type of tanggalValue:', typeof tanggalValue); // Tambahkan log ini


    const dataTKA = {
        id: uuidv4(),
        NIK: parentBio.NIK,
        namaIbu: parentBio.namaIbu,
        ...data,
        tanggal: data.tanggal.toLocaleDateString(),
        statusKenaikan: statusKenaikan,
        parentId: parentBio.id
    };

    console.log(dataTKA);
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
                        name="N"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox
                                inputId="N"
                                onChange={(e) => {
                                    field.onChange(e.checked);
                                    handleCheckboxChange('N');
                                }}
                                checked={statusKenaikan === 'N'}
                            />
                        )}
                    />
                        <label htmlFor="naik">Naik</label>
                        </div>

                        <div className="p-field-checkbox">
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
                            <label htmlFor="turun">Turun</label>
                        </div>
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
