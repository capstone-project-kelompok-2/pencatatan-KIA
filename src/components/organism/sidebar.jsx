import { motion } from "framer-motion";
import { Sidebar } from "primereact/sidebar";
import Button from "../atom/button"
import { useNavigate } from "react-router-dom";
const SidebarCoomponent = ({ isSidebarVisible, hideSidebar, userLogin, handleLogout, showInfo }) => {
    const navigate = useNavigate();
    return(
        <Sidebar visible={isSidebarVisible} onHide={hideSidebar} style={{backgroundColor : 'white'}}>
            <div className="p-4 flex flex-col justify-center items-center">
                <motion.button
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate('/home')}

                className="bg-primary mb-[100px] flex justify-center items-center w-36 h-10 rounded-lg text-white"
                >

                    <p className="font-semibold">Home <i className="fa-solid fa-house px-1"></i></p>
                </motion.button>
                <div className="flex justify-center items-center mb-5 flex-col">
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
                        <button onClick={() => showInfo('top')} className="text-center font-semibold text-xl text-white">{userLogin ? userLogin.username : ''}</button>    
                    </motion.div>
                </div>
                <Button label="Logout" handle={handleLogout} className="text-primary border-2 border-primary font-semibold bg-white   hover:bg-red-500 hover:text-white hover:border-white hover:scale-125 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="pi pi-sign-out mr-3" />
            </div>
        </Sidebar>
    )
}

export default SidebarCoomponent