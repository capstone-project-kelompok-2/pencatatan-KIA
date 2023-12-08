    import { useEffect, useState } from "react"
    import { Link, useNavigate } from "react-router-dom"
    import { Button } from "primereact/button"

    import axios from "axios"
    import Swal from 'sweetalert2'
    import GetDataModal from "../organism/getDataModal"
    import { Paginator } from 'primereact/paginator';
    import { Sidebar } from 'primereact/sidebar';
    import NavbarLogo from "../atom/Navbar/navbarLogo"
    import SearchForm from "../atom/searchForm"
    import { motion, useAnimation } from "framer-motion"
    import { handleCardAnimation } from "../utils/motion"
    const Dashboard = () => {
        const navigate = useNavigate();
        const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("user")));
        useEffect(() => {
            const user = localStorage.getItem("user")
            setUserLogin(JSON.parse(user))
            if (!user) {
                navigate("/login")
            }
        }, [navigate])



        const handleLogout = () => {
            hideSidebar();
            Swal.fire({
                title: "Apakah anda yakin?",
                text: "Anda akan keluar dari aplikasi",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, keluar!",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    window.location.href = '/';
                }
            });
        }


        const [guests, setGuests] = useState([]);   
        const [searchTerm, setSearchTerm] = useState("");
        const [first, setFirst] = useState(0);
        const [rows, setRows] = useState(3);
        const [showGetDataModal, setShowGetDataModal] = useState(false);
        const [isSidebarVisible, setSidebarVisible] = useState(false);

        const showSidebar = () => {
            setSidebarVisible(true);
        };
    
        const hideSidebar = () => {
            setSidebarVisible(false);
        };


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
            <div className='body h-screen bg-[#e5e7eb] shadow-lg overflow-auto'>

                <div className="navbar grid grid-cols-2 bg-primary px-10 shadow-lg shadow-sky-900 z-50 mb-[20px]">
                    <div className="flex p-2f items-center ">
                {/* Sidebar toggle button */}
                    <motion.button 
                        whileHover={{ scale: 1.25 }}
                        onClick={showSidebar} className="font-semibold rounded-lg text-sm px-3 py-2.5 text-center mb-2 flex justify-center items-center mt-4">
                            <i className="fa-solid fa-bars fa-2xl" style={{color : '#fff'}}></i>
                    </motion.button>

                    <NavbarLogo />
                    </div>
                    <div className="navbar__menu flex justify-end">
                        <Button label="New Data" handle={ () => navigate('/create')} className="text-primary border-2 border-blue-600 font-semibold bg-white   hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 hover:scale-125 text-center me-2 mb-2" icon="fa-solid fa-user-plus mr-3" />
                        <Button label="Get Data" className="text-primary border-2 border-blue-600 font-semibold bg-white hover:scale-125  hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="fa-solid fa-download mr-3" handle={toggleGetDataModal} />
                        <SearchForm value={searchTerm} handle={handleSearch} />
                    </div>
                </div>



                {/* Sidebar */}
                <Sidebar visible={isSidebarVisible} onHide={hideSidebar} style={{backgroundColor : 'white'}}>
                    <div className="p-4 flex flex-col">
                        <div className="flex justify-center items-center mb-5 flex-col">
                            link
                            <motion.img 
                            src="./src/assets/img/pngwing1.png" alt="" 
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-[50%] border-2 border-black p-2 rounded-full" />
                            <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-primary my-2 px-10 py-1 rounded-xl">
                                <p className="text-center font-semibold text-xl text-white">{userLogin ? userLogin.username : ''}</p>
                            </motion.div>
                        </div>
                        {/* buat button logout */}
                        <Button label="Logout" handle={handleLogout} className="text-primary border-2 border-primary font-semibold bg-white   hover:bg-red-500 hover:text-white hover:border-white hover:scale-125 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="pi pi-sign-out mr-3" />
                    </div>
                </Sidebar>
                {/* get data modal */}
                <GetDataModal visible={showGetDataModal} onHide={toggleGetDataModal} />

                <div className="row h-auto">
                {currentItems.length > 0 ? (
                    currentItems.map((guest) => (
                        <motion.div 
                        key={guest.id} 
                        variants={handleCardAnimation}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5 }}

                        className="z-0 h-auto flex flex-col gap-5 justify-center items-center overflow-visible py-5">
                            <div className='row-data grid grid-cols-2 card justify-start p-10 gap-10 items-center w-[90%] backdrop-blur-sm bg-[#fff] shadow-lg drop-shadow-lg h-40 rounded-2xl'>
                                <div className='flex gap-10'>
                                    <motion.img src="./src/assets/img/pngwing1.png" alt="" 
                                    initial={{ y: "-100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}  
                                    whileHover={{ scale: 1.25 }}
                                    className='w-[15%] border-2 border-black p-2 rounded-full' />
                                    <motion.div 
                                    initial={{ y: "-100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='flex flex-col justify-center '>
                                        <p className='font-semibold'>Nama Ibu : {guest.namaIbu} </p>
                                        <p className='font-semibold'>Nama Anak : {guest.bayi.namaBayi} </p>
                                        <p className='font-semibold'>Tanggal Kelahiran : {guest.bayi.tanggalLahir} </p>
                                        <p className='font-semibold'>NIK : {guest.NIK} </p>
                                    </motion.div>
                                </div>
                                <div className='flex justify-end items-center gap-5'>
                                    <motion.button onClick={() => handleDetail(guest.id)} 
                                    initial={{ y: "-100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.25 }}
                                        className='bg-white shadow-lg hover:border-0  text-primary border border-primary w-[20%] h-[40px] rounded-lg hover:bg-blue-500 hover:text-white'>
                                        <i 
                                        className="fa-regular fa-eye mr-2 "></i>
                                        View
                                    </motion.button>
                                    <motion.button onClick={() => handleDelete(guest.id)} 
                                        initial={{ y: "-100%" }}
                                        animate={{ y: 0 }}
                                        whileHover={{ scale: 1.25 }}
                                        transition={{ duration: 0.5 }}
                                        className='bg-white hover:border-0 w-[20%] h-[40px] rounded-lg shadow-lg border border-primary text-primary hover:bg-red-500 hover:text-white'>
                                        <i className="fa-solid fa-trash mr-2"></i> 
                                        Delete
                                    </motion.button>
                                    <motion.button onClick={() => handleEdit(guest.id)}
                                    initial={{ y: "-100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.25 }}
                                    className='hover:border-0 bg-white w-[20%] h-[40px] rounded-lg shadow-lg border border-primary text-primary hover:bg-yellow-500 hover:text-white'><i 
                                        className="fa-solid fa-user-pen mr-2"></i> Edit</motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="h-full my-[18%] flex justify-center items-center">
                        <p className=" font-bold text-xl text-black">Data Kosong</p>
                    </div>
                )}

            </div> 


        
            <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredGuests.length}
                onPageChange={onPageChange}
                style={{boxShadow : '2px 2px 2px 2px #000'}}
                className="w-[90%] mx-auto"
            />
            </div>
            
            

        )
    }

    export default Dashboard