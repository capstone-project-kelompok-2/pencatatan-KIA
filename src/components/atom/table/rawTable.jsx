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



<form onSubmit={handleSubmit(onEditSubmit)} style={{ padding: '5%' }}>
    <table>
        <tbody>
            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="tanggal">Tanggal</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="mx-[-10px]">
                    <Controller
                        name="tanggal"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Calendar
                                showIcon
                                id="tanggal"
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                dateFormat="dd/mm/yy"
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="umur">Umur</label>
                    </div>
                </td>
                <td className="mx-5">:</td>
                <td>
                    <div className="mx-3 my-1.5">
                    <Controller
                        name="umur"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <InputNumber
                                id="umur"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="tinggiBadan">Tinggi Badan</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="mx-3 my-1.5">
                    <Controller
                        name="tinggiBadan"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <InputNumber
                                id="tinggiBadan"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="beratBadan">Berat Badan</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="mx-3 my-1.5">
                    <Controller
                        name="beratBadan"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <InputNumber
                                minFractionDigits={1}
                                id="beratBadan"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label htmlFor="KBM">KBM</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                   <div className="mx-3 my-1.5">
                   <Controller
                        name="KBM"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <InputNumber
                                id="KBM"
                                value={field.value}
                                onValueChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                   </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className="mx-3">
                    <label>Status</label>
                    </div>
                </td>
                <td>:</td>
                <td>
                    <div className="p-inputgroup gap-5 my-3 px-5">
                        <div className="p-field-checkbox">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue="N"
                                render={({ field }) => (
                                    <Checkbox
                                        inputId="naik"
                                        onChange={(e) => {
                                            field.onChange(e.checked);
                                            handleCheckboxChange('N');
                                        }}
                                        checked={getValues('status') === 'N'}
                                    />
                                )}
                            />
                            <label htmlFor="naik">Naik</label>
                        </div>

                        <div className="p-field-checkbox">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <Checkbox
                                        inputId="turun"
                                        onChange={(e) => {
                                            field.onChange(e.checked);
                                            handleCheckboxChange('T');
                                        }}
                                        checked={getValues('status') === 'T'}
                                    />
                                )}
                            />
                            <label htmlFor="turun">Turun</label>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div className="flex justify-end items-center p-5">
        <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => {
                setVisibleEdit(false);
                setEditData(null);
            }}
            className="p-button-text"
        />
        <Button type="submit" label="Save" icon="pi pi-check" autoFocus style={{ marginLeft: '10px' }} />
    </div>
</form>

const handleDelete = (id) => {
        
    Swal.fire({
        title: "Apakah anda yakin?",
        text: "Semua data tumbuh kembang anak akan terhapus dan tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            axios.get(`http://localhost:3000/guest/${id}`)
                .then((res) => {
                    axios.delete(`http://localhost:3000/guest/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
};