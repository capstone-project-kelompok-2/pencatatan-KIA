// import Navbar from "../molecules/navbar"
const Detail = () => {
    return(
        <div className='body h-screen bg-gradient-to-b from-green-300 from-10% to-cyan-700 to-90% shadow-lg flex justify-center items-center'>
            <div className=" flex flex-col gap-5 justify-center items-center backdrop-blur-sm bg-white/30 w-[95%] h-[90%] rounded-3xl">
                <div className="grid grid-cols-2  w-full px-10">
                    <div className=" w-full flex items-center flex-col">
                        <img src="../src/assets/img/pngwing1.png" alt="hehe" className='bg-white border border-b-2lack rounded-full'/>
                        <div className="w-full items-center flex-col flex">
                            <div className="w-[20%] flex justify-center items-center pt-2">
                                <label htmlFor="namaIbu" className="block mr-3 mb-2 text-sm font-medium text-gray-900">Nama Ibu</label>
                            </div>
                            <div>
                                <div className="w-[272px] h-[30px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
                            </div>
                            <div className="w-[20%] flex justify-center items-center pt-2">
                                <label htmlFor="namaIbu" className="block mr-3 mb-2 text-sm font-medium text-gray-900">Nama Anak</label>
                            </div>
                            <div>
                                <div className="w-[272px] h-[30px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
                            </div>
                            <div className="w-[20%] flex justify-center items-center pt-2">
                                <label htmlFor="namaIbu" className="block mr-3 mb-2 text-sm font-medium text-gray-900">Tanggal Kelahiran</label>
                            </div>
                            <div>
                                <div className="w-[272px] h-[30px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
                            </div>
                        </div>
                        </div>
                        <div className="relative overflow-x-auto  items-center rounded-lg">
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
                                        Berat Badab
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
                </div>
            </div>
        </div>

        
    )
}

export default Detail