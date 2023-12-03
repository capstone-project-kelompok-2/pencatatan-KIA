import { useForm } from "react-hook-form";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import MotionButton from "../motion/motionButton";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0 });
  }, [controls]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-[#06b6d4] from-10% to-[#D9D9D9] to-90%">
      <div className="flex justify-center items-center backdrop-blur-sm bg-white/30 w-[90%] h-[90%] rounded-3xl">
        <div className="grid grid-cols-2 w-full text-center h-full">
          <motion.div 
          className="overflow-hidden flex justify-center items-center"
            initial={{ x: "-100%" }}
            animate={controls}
            transition={{ duration: 0.8 }}
          >
            <img src="./src/assets/img/bayiii_00000.png" alt="bayi" className="h-full" />
          </motion.div>
          <motion.div
            className="form flex flex-col justify-center items-center mt-7"
            initial={{ x: "100%" }}
            animate={controls}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
            className="logo-img flex justify-center items-end p-[-10px] w-[50%] h-[50%] mt-[-20%]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img src="./src/assets/img/logo_00000.png" alt="logo" className="h-[80%]" />
            </motion.div>
            <p className="text-[40px] font-bold text-slate-800">Posyandu Sehat</p>
            <p className="text-[15px] mb-5">Pencatatan Data KIA yang Mudah dan Efisien</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
              <label className="mr-[90%] mb-2" htmlFor="username">Username</label>
              <motion.input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="rounded-2xl w-[130%] h-[45px] backdrop-blur-sm shadow-slate-500/50 bg-white/30 shadow-xl p-3 mb-5"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileFocus={{ scale: 1.1, transition: { duration: 0.3 } }}
              />
              {errors.username && <span className="flex justify-center text-red-500 font-semibold mb-3">This field is required</span>}

              <label className="mr-[90%] mb-2" htmlFor="password">Password</label>
              <motion.input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="rounded-2xl w-[130%] h-[45px] backdrop-blur-sm shadow-slate-500/50 bg-white/30 shadow-lg p-3 mb-5"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileFocus={{ scale: 1.1, transition: { duration: 0.3 } }}
              />
              {errors.password && <span className="flex justify-center text-red-500 font-semibold mb-3">This field is required</span>}


              <MotionButton />
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
