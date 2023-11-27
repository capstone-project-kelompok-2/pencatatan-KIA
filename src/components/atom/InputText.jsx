import ErrorFieldText from "./errorFieldText";
const InputText = ({register, name, errors}) => {

    return (
        <input {...register(name, { required : true})}  type="text" className="w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
    )
};

export default InputText;