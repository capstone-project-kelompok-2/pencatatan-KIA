import { useForm } from "react-hook-form"
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data)
    return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-[#06b6d4] from-10% to-[#D9D9D9] to-90%">
        <div className=" flex justify-center items-center backdrop-blur-sm bg-white/30 w-[90%] h-[90%] rounded-3xl">
            <div className="grid grid-cols-2 w-full text-center h-full">
                <div className="overflow-hidden flex justify-center items-center">
                    <img src="./src/assets/img/bayiii_00000.png" alt="bayi" className="h-full"/> 
                </div>
                <div className="form flex flex-col justify-center items-center mt-7">
                    <div className="logo-img flex justify-center items-end p-[-10px] w-[50%] h-[50%] mt-[-20%]">
                        <img src="./src/assets/img/logo_00000.png" alt="logo" className="h-[80%]   " />
                    </div>
                    <p className="text-[40px] font-bold text-slate-800">Posyandu Sehat</p>
                    <p className="text-[15px] mb-5">Pencatatan Data KIA yang Mudah dan Efisien</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                        <label className="mr-[90%] mb-2" htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" {...register("username", { required : true})} className="rounded-2xl w-[130%] h-[45px] backdrop-blur-sm shadow-slate-500/50 bg-white/30 shadow-xl p-3 mb-5" />
                        {errors.username && <span className="flex justify-center text-red-500 font-semibold mb-3">This field is required</span>}

                        <label className="mr-[90%] mb-2" htmlFor="password">password</label>
                        <input type="text" placeholder="Password" {...register("password", { required: true })} className="rounded-2xl w-[130%] h-[45px] backdrop-blur-sm shadow-slate-500/50 bg-white/30 shadow-lg p-3 mb-5 " />
                        {errors.password && <span className="flex justify-center text-red-500 font-semibold mb-3">This field is required</span>}
                        <button type="submit" className="bg-[#06b6d4] text-white hover:bg-sky-700 active:bg-login-bg active:shadow-lg active:shadow-login-bg/50 w-[50%] h-[40px] rounded-lg font-semibold">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login