const rawTable = ({ data }) => {
     <div className="rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
                            <thead className="text-xs text-gray-700 uppercase backdrop-blur bg-gray-700/50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Umur
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tinggi Badan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Berat Badan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        KBM
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        N/T
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr className="border-b-2 border-gray-800 backdrop-blur-lg bg-green-400/40">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap border-r-2 border-gray-800">
                                        12-01-2021
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        1 Bulan
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        11 cm
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        2 kg
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        200 ml
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        Y
                                    </td>
                                </tr>
                                <tr className="border-b-2 border-gray-800 backdrop-blur-lg bg-green-400/40">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap border-r-2 border-gray-800">
                                        12-01-2021
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        1 Bulan
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        11 cm
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        2 kg
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        200 ml
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        Y
                                    </td>
                                </tr>
                                <tr className="border-b-2 border-gray-800 backdrop-blur-lg bg-green-400/40 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap border-r-2 border-gray-800">
                                        12-01-2021
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        1 Bulan
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        11 cm
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        2 kg
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        200 ml
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        Y
                                    </td>
                                </tr>
                                <tr className="border-b-2 border-gray-800 backdrop-blur-lg bg-green-400/40 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap border-r-2 border-gray-800">
                                        12-01-2021
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        1 Bulan
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        11 cm
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        2 kg
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        200 ml
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        Y
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        </div> 
}


export default rawTable;



const TabelForm = () => {
    return (
        <table className="w-full gap-5" bodyStyle={{backgroundColor:'white'}}>
                        <tr id="tanggal" className="tanggal w-[100%]"  >
                            <td className="mr-10">Tanggal</td>
                            <td>:</td>
                            <td>
                                <div className="mb-5">
                                <Controller
                                    name="umur"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Calendar {...field} inputStyle={{backgroundColor : 'white'}} showIcon />
                                    )}
                                />
                                </div>
                            </td>
                        </tr>
                        <tr className=" w-[100%]">
                            <td className="mr-10">Umur</td>
                            <td>:</td>
                            <td>
                                <div className="mb-5">
                                    <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} minFractionDigits={1} />
                                </div>
                            </td>
                        </tr>
                        <tr className=" w-[100%]">
                            <td className="mr-10">Tinggi Badan</td>
                            <td>:</td>
                            <td>
                                <div className="mb-5">
                                    <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} minFractionDigits={1} />
                                </div>
                            </td>
                        </tr>
                        <tr className=" w-[100%]">
                            <td className="mr-10">Berat Badan</td>
                            <td>:</td>
                            <td>
                            <div className="mb-5">
                                <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} minFractionDigits={1} />
                                </div>
                            </td>
                        </tr>
                        <tr className=" w-[100%]">
                            <td className="mr-10">KBM</td>
                            <td>:</td>
                            <td>
                                <div className="mb-5">
                                    <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={0} max={100} minFractionDigits={1} />
                                </div>
                            </td>
                        </tr>
                    </table>
    )
}


const radioData = () => {
    return (
        <>
        <div className="p-field-radiobutton">
        <label>Naik</label>
        <Controller
        name="kenaikan"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <RadioButton
            inputId="naik"
            onChange={() => field.onChange('naik')}
            checked={field.value === 'naik'}
            />
        )}
        />
    </div>
    <div className="p-field-radiobutton">
        <label>Turun</label>
        <Controller
        name="kenaikan"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <RadioButton
            inputId="turun"
            onChange={() => field.onChange('turun')}
            checked={field.value === 'turun'}
            />
        )}
        />
    </div>
        </>
    )
}