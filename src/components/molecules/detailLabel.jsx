import { Skeleton } from 'primereact/skeleton';
const DetailLabel = ({ name, label, parentBio }) => {
    const value = parentBio ? parentBio.label : 'Tanggal lahir tidak tersedia'
    const user = localStorage.getItem("user");
    if (!user) {
        navigate("/login")
    }
    return(
        <>
            {parentBio ? <div className="w-full flex justify-center items-center pt-2">
                <label htmlFor={label} className="block mr-3 mb-2 text-sm font-medium text-gray-900">{name}</label>
            </div> : <Skeleton width="100%" height="30px" className="mb-2" /> }
            
            <div>
                {parentBio ? 
                 <div className="w-[272px] h-[30px] mix-blend-soft-light bg-white px-4 py-2 rounded-[25px] shadow-lg drop-shadow-lg flex justify-center items-center font-semibold">
                 {parentBio ? parentBio[label] : 'Tanggal lahir tidak tersedia'}     
             </div>
                : <Skeleton width="272px" height="30px" className="mb-2" />}
               
            </div>
        </>
    )
}

export default DetailLabel