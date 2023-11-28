const Select = ({register}) =>{
    return(
        <select {...register("jenisKelamin")} id="jenisKelamin" className="bg-gray-50 w-[272px] h-[38px] border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-md">   
            <option defaultValue>Laki-Laki</option>
            <option>Perempuan</option>
        </select>
    )
}
export default Select;