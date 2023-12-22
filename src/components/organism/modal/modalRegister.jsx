import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ErrorFieldText from '../../atom/errorFieldText';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
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
            className='gap-5 my-10'
            visible={visible} 
            style={{ width: '50vw' }} 
            onHide={handleClose}
            pt={{
                header : () => ({
                    id : 'modal-header',
               }),
               content : () => ({
                    id : 'modal-content',
               }),
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '5%' }} className='gap-2 '>
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
                                        style={{borderColor: '#06b6d4'}}
                                        id="namaDepan"
                                        placeholder="Nama Depan"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        pt={{
                                            root: { id : 'inputText-prime' }
                                        }}
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
                                        style={{borderColor: '#06b6d4'}}
                                        placeholder="Nama Belakang"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        pt={{
                                            root: { id : 'inputText-prime' }
                                        }}
                                        />
                                    {errors.namaBelakang && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <div className='grid grid-cols-2 gap-3'>
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
                                        style={{borderColor: '#06b6d4'}}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        pt={{
                                            root: { id : 'inputText-prime' }
                                        }}
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
                                        style={{borderColor: '#06b6d4'}}
                                        value={field.value}
                                        aria-invalid={errors.email ? "true" : "false"}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        pt={{
                                            root: { id : 'inputText-prime' }
                                        }}
                                        />
                                    {errors.email ? <span className='text-red-500 flex justify-center'>{errors.email.message}</span> : errors.email && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
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
                                        className='w-full border'
                                        placeholder="Password"
                                        inputStyle={{borderColor: '#06b6d4'}}
                                        toggleMask
                                        type='password'
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        pt = {{
                                            root: { id : 'inputPassword', className: 'w-full bg-white dark:bg-white' },
                                            input: { id : 'inputPassword', className: 'w-full bg-white dark:bg-white' },
                                        }}
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
                                        inputStyle={{borderColor: '#06b6d4', backgroundColor: '#fff'}}
                                        style={{borderColor: '#06b6d4', backgroundColor: '#fff'}}
                                        allowEmpty
                                        value={field.value}
                                        useGrouping={false}
                                        prefix='+62-'
                                        onValueChange={(e) => field.onChange(e.value)}
                                        pt = {{
                                            root: { id : 'input-number', className: 'w-full bg-white dark:bg-white' },
                                            input: { id : 'input-number', className: 'w-full bg-white dark:bg-white' },
                                        }}
                                        />
                                    {errors.noHp && <ErrorFieldText />}
                                </>
                            )
                        }
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <Button label="Daftar" className="p-button-success bg-primary text-white dark:bg-primary dark:text-white" />
                </div>
            </form>
        </Dialog>
    );
}

export default ModalRegister;