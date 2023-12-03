import { motion } from "framer-motion";
const InputText = ({ register, name, defaultValue}) => {
    return (
        <motion.input
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileFocus={{ scale: 1.1, transition: { duration: 0.3 }}}
    
        defaultValue={defaultValue}
        type="text"
        {...register(name, { required: true })}
        className="border border-primary  w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md"
        />
    );
};

export default InputText;