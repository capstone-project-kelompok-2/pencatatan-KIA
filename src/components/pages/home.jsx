import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';


const appInfo = [
    {
        title: "Posyandu Sehat",
        content: "Aplikasi Pencatatan KIA Berbasis Website Bagi Kader Posyandu"
    },
];

const aboutInfo = [
    {
        image: "src/assets/img/bayiii_00000.png",
        title: "deskripsi aplikasi",
        content: "deskripsi singkat aplikasi"
    },
];

const features = [
    {
        image: "src/assets/img/preview.svg",
        title: "Preview Data Kesehatan Anak",
        content: "Fitur yang menampilkan hasil dari data kesehatan anak yang telah dimasukkan"
    },
    {
        image: "src/assets/img/catat.png",
        title: "Pencatatan Data Timbang, Ukur, dan Perkembangan Anak",
        content: "Fitur yang digunakan sebagai pencatatan data penimbangan dan pengukuran serta hasil konsultasi tumbuh kembang anak"
    },
    {
        image: "src/assets/img/rekap.svg",
        title: "Pengunduhan Data",
        content: "Fitur yang memberikan hasil perekapan data yang dapat diunduh dalam bentuk pdf maupun excel"
    },
];

const workFlow = [

    {
        image: "src/assets/img/home/flow1.png",
        content: "Masuk ke halaman website, temui tampilan ini dan silahkan login dengan memasukkan 'USERNAME' dan 'PASSWORD'. Jika belum memiliki akun, silahkan pilih link 'DAFTAR'"
    },
    {
        image: "src/assets/img/home/flow2.png",
        content: "Lakukan pendaftaran terlebih dahulu. Setelah selesai mengisi form pendaftaran, pilih tombol daftar"
    },
    {
        image: "src/assets/img/home/flow3.png",
        content: "Setelah login, Anda akan diarahkan menuju halaman dashboard dari website yang akan berisi data informasi Ibu dan Anak. Lihat pada sebelah pojok kanan atas terdapat tombol 'NEW DATA', dan pilih tombol tersebut"
    },
    {
        image: "src/assets/img/home/flow4.png",
        content: "Setelah memilih tombol new data, maka akan diarahkan untuk mengisi data yang tertera pada form. Jika sudah yakin dengan data yang dimasukkan dapat memilih 'CREATE DATA' "
    },
    {
        image: "src/assets/img/home/flow5.png",
        content: "Anda akan diarahkan kembali ke halaman dashboard untuk melihat data informasi yang sudah dibuat. Selanjutnya pilih tombol 'VIEW', maka anda akan diarahkan ke halaman detail untuk melakukan pencatatan data penimbangan dan pengukuran anak"
    },
    {
        image: "src/assets/img/home/flow6.png",
        content: "Setelah masuk kehalaman detail maka akan ada beberapa pilihan diatas, selanjutnya pilih 'CREATE DATA' untuk memasukkan data hasil penimbangan"
    },
    {
        image: "src/assets/img/home/flow7.png",
        content: "Pada halaman detail, data juga dapat di export ke dalam PDF maupun excel"
    },
    {
        image: "src/assets/img/home/flow8.png",
        content: "Pada halaman view juga terdapat bagian yang dapat digunakan untuk mengisi informasi tumbuh kembang anak. Pilih tombol 'KESEHATAN' kemudian Anda bisa mengisi apa saja kondisi yang terjadi pada anak"
    },
];

const HomePage = () => {
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user")
            setUserLogin(JSON.parse(user))
            if (!user) {
                navigate("/login")
            }
    }, [navigate]);

    const renderAppInfo = () => {
        const navigate = useNavigate();
        return appInfo.map((infoItem, index) => (
            <div key={index} className="p-col-12 p-md-4 background-home info-container">
                <div className="flex-container">
                    <motion.img
                    initial = {{x : "-100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                     src="src/assets/img/logo.png" alt={infoItem.title} className="card-image"/>
                    <div className="text-right font-App flex justify-center items-center flex-col text-white">
                        <motion.h1
                        initial = {{x : "100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}
                         className="title">{infoItem.title}</motion.h1>
                        <motion.h2
                        initial = {{x : "100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}
                         className="content">{infoItem.content}</motion.h2>
                        <motion.button
                        initial = {{x : "-100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} 
                        onClick={() => navigate(`/`)}
                        className="b-to-dashboard bg-white text-primary my-3 p-3 rounded-lg font-semibold border-primary border-2 hover:bg-primary hover:text-white">pergi ke Dashboard <i className="fa-solid fa-gauge mx-2"></i></motion.button>
                    </div>
                </div>   
            </div>
        ));
    };

    const renderAboutInfo =() => {
        return (
            <div className="p-col-12 p-md-4 background info-container flex-container animate-fadeIn">
                <div className="flex-container"> 
                    <div className="flex-content">
                        <motion.h1
                        // saat scroll ke bawah animasi dari kiri ke kanan
                        initial = {{x : "-100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}

                         className="content text-justify">
                            <p>
                            Aplikasi berbasis website yang membantu para kader untuk meningkatkan 
                            akurasi pencatatan dan rekapitulasi data timbang dan perkembangan anak.
                            
                            </p>
                            <br />
                            <p>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tujuan dari aplikasi Posyandu Sehat adalah mempermudah akses dan penggunaan sistem pencatatan bagi kader Posyandu, 
                            sehingga kegiatan menimbang saat Posyandu bisa lebih efektif. 
                            Kemudian, data yang tercatat dapat disimpan dalam format file Excel yang dapat diunduh dan dicetak, 
                            terutama saat digunakan sebagai pelaporan 
                            dan mengurangi biaya pendataan manual dengan kertas serta meningkatkan efisiensi dalam memberikan pelayanan kesehatan.
                            </p>
                        </motion.h1>
                    </div>
                    <motion.img
                    initial = {{x : "100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                     src="src/assets/img/bayiii_00000.png" alt="About" className="card-image-about"/>  
                </div>
            </div>
        );
    };

    const renderFeatures = () => {
        return (
            <div className="p-grid">
                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <motion.img
                    initial = {{x : "-100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}

                     src={features[0].image} alt={features[0].title} className="card-image-feature"/>
                    <motion.div
                    initial = {{x : "100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    className="text-center">
                         <h1 className="title font-Feature font-right">{features[0].title}</h1>
                         <h2 className="content font-right">{features[0].content}</h2>
                     </motion.div>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <div className="text-center">
                         <motion.h1
                            initial = {{x : "-100%"}}
                            animate = {{x : 0}}
                            transition = {{duration : 0.8}}
                         className="title font-Feature text-left">{features[1].title}</motion.h1>
                         <motion.h2
                            initial = {{x : "-100%"}}
                            animate = {{x : 0}}
                            transition = {{duration : 0.8}}
                          className="content text-left">{features[1].content}</motion.h2>
                     </div>
                     <motion.img
                        initial = {{x : "100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     src={features[1].image} alt={features[1].title} className="card-image-feature"/>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <motion.img 
                    initial = {{x : "-100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    src={features[2].image} alt={features[2].title} className="card-image-feature"/>

                    <motion.div 
                    initial = {{x : "100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    className="text-center">
                         <hi className="title font-Feature">{features[2].title}</hi>
                         <h2 className="content">{features[2].content}</h2>
                     </motion.div>
                    </div>
                </div>

            </div>
        );
    };

    
    const [flow, setFlow] = useState([]);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleFullScreen = (image) => {
        setSelectedImage(image);
        setShowFullScreen(!showFullScreen);
    };

    useEffect(() => {
        setFlow(workFlow);
        console.log(flow);
    }, [flow]);

    const workFlowTemplate = (flow) => {
        return (
            <div className="w-full">
                <div className="background info-container w-full">
                    <div className="flex-container flex-col bg-white p-3 w-full h-[450px] rounded-xl shadow-lg border-2 border-[#e5e7eb] backdrop:blur-lg">
                    <motion.img 
                    initial = {{x : "-100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFullScreen(flow.image)}
                    src={flow.image} alt={flow.title} style={{width : '100%'}} className="card-image-feature h-[300px]"/>

                    <motion.div 
                    initial = {{x : "100%"}}
                    animate = {{x : 0}}
                    transition = {{duration : 0.8}}
                    className="text-center my-5">
                         <hi className="title font-Feature">{flow.title}</hi>
                         <h2 className="content text-center mx-3">{flow.content}</h2>
                         
                     </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    const renderWorkFlow = () => {
        return (
            <div className="p-col-12 p-md-12 background info-container">
                <div className="flex-container flex-col">
                    <div className="text-center">
                        <motion.h1
                        initial = {{x : "-100%"}}
                        animate = {{x : 0}}
                        transition = {{duration : 0.8}}
                        className="title font-Feature text-left">Alur Penggunaan</motion.h1>
                    </div>
                    <Carousel value={workFlow} itemTemplate={workFlowTemplate} numVisible={3} numScroll={3} className="custom-carousel" />
                </div>
            </div>
        );
    };

    

    return (
       <div className="p-grid">
        {renderAppInfo()}
        {renderAboutInfo()}
        {renderFeatures()}
        {renderWorkFlow()}
        {showFullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fullscreen-overlay"
          onClick={() => setShowFullScreen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="modal-content"
          >
            <img
              src={selectedImage}
              alt="Fullscreen"
              className="fullscreen-image"
            />
          </motion.div>
        </motion.div>
      )}
       </div>

    
    );

    
};

export default HomePage;