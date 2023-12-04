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
    // delete data.N;
    // delete data.T;
    axios.get(`http://localhost:3000/TKA?NIK=${parentBio.NIK}`)
    .then(res => {
        console.log(res.data.length);
        if(res.data.length === 0){
            const dataTKA = {
                id: uuidv4(),
                NIK: parentBio.NIK,
                namaIbu: parentBio.namaIbu,
                ...data,
                tanggal: data.tanggal.toLocaleDateString(),
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
            show();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
        console.log(status);
        console.log(dataBeratBadan);
        const dataTKA = {
            id: uuidv4(),
            NIK: parentBio.NIK,
            namaIbu: parentBio.namaIbu,
            KBM: KBM,
            ...data,
            tanggal: data.tanggal.toLocaleDateString(),
            statusKenaikan: status,
            parentId: parentBio.id,
        }
        // console.log(dataTKA);
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
    })

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
