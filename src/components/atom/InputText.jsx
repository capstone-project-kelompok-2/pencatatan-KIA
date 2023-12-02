const InputText = ({ register, name, defaultValue}) => {
    return (
        <input
        
        defaultValue={defaultValue}
        type="text"
        {...register(name, { required: true })}
        className="w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md"
        />
    );
};

export default InputText;