import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2'
const Dashboard = () => {
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);

    const handleDelete = (id) => {
        // console.log(id); 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/guest/${id}`)
                .then((res) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      }).then(() => {
                        window.location.reload();
                      })
                        
                })
            }
          });
    }

    useEffect(() => {
      // Menggunakan async/await untuk membuat kode lebih bersih
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/guest');
          setGuests(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    return(
        <div className='body h-screen bg-gradient-to-b from-green-300 from-10% to-cyan-700 to-90% shadow-lg'>
            <div className="navbar grid grid-cols-2 bg-bg-navbar px-10 shadow-lg shadow-green-900 z-50">
                <div className="navbar__logo  flex justify-start items-center gap-5">
                    <img src="./src/assets/img/logo_00000.png" alt="logo" className="w-[70px]" />
                    <p className="font-bold text-2xl mt-2">Posyandu Sehat</p>
                </div>
                <div className="navbar__menu flex justify-end">
                    <div className="flex justify-center items-center mt-3 mx-3">
                        <button onClick={ () => navigate('/create')} type="button" className="text-gray-900 font-semibold bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><i className="fa-solid fa-user-plus mr-3"></i> New Data</button>
                    </div>
                    {/* search button */}
                    <div className="search-bar">
                        
                    <form action="" className="flex">
                        <div className="mr-0 mt-4 h-[30px] p-5 bg-blue-500 flex justify-center items-center rounded-l-lg">
                        <i className="fa-solid fa-user" style={{color : "#fff"}}></i>
                        </div>
                        <input type="text" className="mt-4 ml-0 h-[30px] rounded-r-lg mx-3 p-5 active:border active:border-blue-700" placeholder="Search Data" />
                        <button className="h-[30px] w-[50px] py-5 mt-4 bg-blue-500 rounded-lg flex justify-center items-center hover:bg-blue-800">
                        <i className="fa-solid fa-magnifying-glass" style={{color: "#fff"}}></i>
                        </button>
                    </form>
                    </div>

                </div>
            </div>

            <div className="row h-auto ">
            {guests.map((guest) => (
            <div key={guest.id} className=" z-0 h-auto  flex flex-col gap-5 justify-center items-center  overflow-visible py-5">      
                <div className='row-data grid grid-cols-2 card justify-start p-10 gap-10 items-center w-[90%] backdrop-blur-sm bg-white/30 h-40 rounded-2xl'>
                    <div className='flex gap-10'>
                        <img src="./src/assets/img/pngwing1.png" alt="" className='w-[15%]'/>
                        <div className='flex flex-col justify-center '>
                            <p className='font-semibold'>Nama Ibu : {guest.namaIbu} </p>
                            <p className='font-semibold'>Nama Anak : {guest.bayi.namaBayi} </p>
                            <p className='font-semibold'>Tanggal Kelahiran : {guest.bayi.tanggalLahir} </p>
                        </div>
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                        <button className='bg-sky-600 w-[20%] h-[40px] rounded-lg text-white hover:bg-blue-800'><i className="fa-regular fa-eye mr-2"></i>View</button>
                        <button onClick={() => handleDelete(guest.id)} className='bg-red-600 w-[20%] h-[40px] rounded-lg text-white hover:bg-red-800'><i className="fa-solid fa-trash mr-2"></i> Delete</button>
                    </div>

                </div>



                </div>
            ))}
            </div> 
        </div>

        
    )
}

export default Dashboard