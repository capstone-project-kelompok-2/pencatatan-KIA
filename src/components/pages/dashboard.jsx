    import { useEffect, useState } from "react"
    import { useNavigate } from "react-router-dom"
    import axios from "axios"
    import Swal from 'sweetalert2'
    import GetDataModal from "../organism/getDataModal"
    import { Paginator } from 'primereact/paginator';
    import Navbar from "../molecules/navbar"
    import Button from "../atom/button"
    import NavbarLogo from "../atom/Navbar/navbarLogo"
    import SearchForm from "../atom/searchForm"
    const Dashboard = () => {
        const navigate = useNavigate();
        const [guests, setGuests] = useState([]);   
        const [searchTerm, setSearchTerm] = useState("");
        const [first, setFirst] = useState(0);
        const [rows, setRows] = useState(3);
        const [showGetDataModal, setShowGetDataModal] = useState(false);
        const toggleGetDataModal = () => {
            setShowGetDataModal(!showGetDataModal);
        };

        const onPageChange = (event) => {
            setFirst(event.first);
            setRows(event.rows);
        };
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
        
        
        
        const handleEdit = (id) => {
            console.log(id);
            navigate(`/edit/${id}`)
        }

        const handleDetail = (id) => {
            navigate(`/detail/${id}`)
        }

        const handleSearch = (event) => {
            setSearchTerm(event.target.value);
        };

        useEffect(() => {
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

        const filteredGuests = guests.filter((guest) => {
            return (
                guest.namaIbu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                guest.bayi.namaBayi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                guest.bayi.tanggalLahir.toLowerCase().includes(searchTerm.toLowerCase()) || 
                String(guest.NIK).includes(searchTerm)
            );
        });

        const currentItems = filteredGuests.slice(first, first + rows);
        
        return(
            <div className='body h-screen bg-[#e5e7eb] shadow-lg'>
                <div className="navbar grid grid-cols-2 bg-primary px-10 shadow-lg shadow-sky-900 z-50 mb-[20px]">
                    <NavbarLogo />
                    <div className="navbar__menu flex justify-end">
                        <Button label="New Data" handle={ () => navigate('/create')} className="text-primary border-2 border-blue-600 font-semibold bg-white   hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="fa-solid fa-user-plus mr-3" />
                        <Button label="Get Data" className="text-primary border-2 border-blue-600 font-semibold bg-white   hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="fa-solid fa-download mr-3" handle={toggleGetDataModal} />
                        <SearchForm value={searchTerm} handle={handleSearch} />
                    </div>
                </div>
                {/* <Navbar value={searchTerm} handleSearch={handleSearch} handle={ () => navigate('/create')} toggleGetDataModal={toggleGetDataModal} /> */}

                <GetDataModal visible={showGetDataModal} onHide={toggleGetDataModal} />

                <div className="row h-auto">
                {currentItems.length > 0 ? (
                    currentItems.map((guest) => (
                        <div key={guest.id} className="z-0 h-auto flex flex-col gap-5 justify-center items-center overflow-visible py-5">
                            <div className='row-data grid grid-cols-2 card justify-start p-10 gap-10 items-center w-[90%] backdrop-blur-sm bg-[#fff] shadow-lg drop-shadow-lg h-40 rounded-2xl'>
                                <div className='flex gap-10'>
                                    <img src="./src/assets/img/pngwing1.png" alt="" className='w-[15%]' />
                                    <div className='flex flex-col justify-center '>
                                        <p className='font-semibold'>Nama Ibu : {guest.namaIbu} </p>
                                        <p className='font-semibold'>Nama Anak : {guest.bayi.namaBayi} </p>
                                        <p className='font-semibold'>Tanggal Kelahiran : {guest.bayi.tanggalLahir} </p>
                                        <p className='font-semibold'>NIK : {guest.NIK} </p>
                                    </div>
                                </div>
                                <div className='flex justify-end items-center gap-5'>
                                    <button onClick={() => handleDetail(guest.id)} 
                                        className='bg-white shadow-lg text-primary border border-primary w-[20%] h-[40px] rounded-lg hover:bg-blue-600 hover:text-white'><i style={{color : '#06b6d4'}}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#06b6d4';
                                        }}
                                        className="fa-regular fa-eye mr-2 "></i>
                                        View
                                    </button>
                                    <button onClick={() => handleDelete(guest.id)} 
                                    className='bg-white w-[20%] h-[40px] rounded-lg shadow-lg border border-primary text-primary hover:bg-red-600 hover:text-white'><i style={{color : '#06b6d4'}} 
                                    onMouseEnter={(e) => {
                                            e.target.style.color = '#fff';
                                        }} 
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#06b6d4';
                                        }}
                                    className="fa-solid fa-trash mr-2"></i> Delete</button>
                                    <button onClick={() => handleEdit(guest.id)}  
                                    className='bg-white w-[20%] h-[40px] rounded-lg shadow-lg border border-primary text-primary hover:bg-yellow-600 hover:text-white'><i style={{color : '#06b6d4'}} onMouseEnter={(e) => {
                                            e.target.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#06b6d4';
                                        }}
                                        className="fa-solid fa-user-pen mr-2"></i> Edit</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full my-[18%] flex justify-center items-center">
                        <p className=" font-bold text-xl text-neutral-200">Data Kosong</p>
                    </div>
                )}
                <div className="card ">
                    <Paginator first={first} rows={rows} totalRecords={filteredGuests.length} onPageChange={onPageChange} style={{ borderRadius: '0' }} className="text-slate-900" />
                </div>
            </div> 

            </div>

            
        )
    }

    export default Dashboard