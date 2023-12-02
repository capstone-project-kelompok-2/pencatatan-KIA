const DetailLabel = ({ name, label, parentBio }) => {
    const value = parentBio ? parentBio.label : 'Tanggal lahir tidak tersedia'

    return(
        <>
            <div className="w-full flex justify-center items-center pt-2">
                <label htmlFor={label} className="block mr-3 mb-2 text-sm font-medium text-gray-900">{name}</label>
            </div>
            <div>
                <div className="w-[272px] h-[30px] mix-blend-soft-light bg-white px-4 py-2 rounded-[25px] shadow-lg drop-shadow-lg flex justify-center items-center font-semibold">
                    {parentBio ? parentBio[label] : 'Tanggal lahir tidak tersedia'}     
                </div>
            </div>
        </>
    )
}

export default DetailLabel