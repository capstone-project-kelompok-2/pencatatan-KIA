import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ErrorFieldText from '../../atom/errorFieldText';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import Swal from 'sweetalert2';
import { InputMask } from "primereact/inputmask";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
const ModalRegister  = ({ setVisible, showSuccess, visible, setShowLogin, showErrorUsername }) => {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.get(`http://localhost:3000/users`)
        .then((result) => {
            const user = result.data.find((user) => user.username === data.username);
            if(user){
                showErrorUsername();
                return;
            }else{
                
            }
            const kaderData = {
                id: uuidv4(),
                ...data,
                //tambahkan angka 0 sebelum nomor hp
                noHp: `+62${data.noHp}`,
            }
            console.log(kaderData);
            axios.post(`http://localhost:3000/users`, kaderData)
            .then(res => {
                setVisible(false);
                showSuccess();
            })

        }).catch((err) => {
            console.log(err);
        });


    }

    const handleClose = () => {
        setShowLogin(true);
        setVisible(false);
      };
    
    return (
        <Dialog 
            header="Registrasi Kader" 
            className='gap-5'
            visible={visible} 
            style={{ width: '50vw' }} 
            onHide={handleClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '5%' }} className='gap-2'>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <label htmlFor="namaDepan" className='my-1'>Nama Depan :</label>
                        <Controller
                            name="namaDepan"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                     <InputText
                                        id="namaDepan"
                                        placeholder="Nama Depan"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                    {errors.namaDepan && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="namaBelakang" className='my-1'>Nama Belakang :</label>
                        <Controller
                            name="namaBelakang"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                     <InputText
                                        id="namaBelakang"
                                        placeholder="Nama Belakang"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    {errors.namaBelakang && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                <div className="flex flex-col">
                        <label htmlFor="username" className='my-1'>Username :</label>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                     <InputText
                                        id="username"
                                        placeholder="Username"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    {errors.username && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                
                    </div>
                    <div className="flex flex-col" >
                        <label htmlFor="email" className='my-1'>Email :</label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            type="email"
                            //validasi email menggunakan react-hook-form
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email format',
                                },
                            }}
                            render={({ field }) => (
                                <>
                                     <InputText
                                        id="email"
                                        placeholder="Email"
                                        value={field.value}
                                        aria-invalid={errors.email ? "true" : "false"}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    {errors.email ? <span className='text-red-500 flex justify-center'>{errors.email.message}</span> : errors.email && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className='my-1'>Password :</label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                     <Password
                                        id="password"
                                        className='w-full'
                                        placeholder="Password"
                                        toggleMask
                                        type='password'
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    {errors.password && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="noHp" className='my-1'>No Hp :</label>
                        <Controller
                            name="noHp"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                     <InputNumber
                                        id="noHp"
                                        placeholder="+62-9999999"
                                        allowEmpty
                                        value={field.value}
                                        useGrouping={false}
                                        prefix='+62-'
                                        onValueChange={(e) => field.onChange(e.value)}
                                        />
                                    {errors.noHp && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <Button label="Daftar" className="p-button-success bg-green-500" />
                </div>
            </form>
        </Dialog>
    );
}

export default ModalRegister;