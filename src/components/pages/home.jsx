import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { info } from "autoprefixer";
import { steps } from "framer-motion";

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
    // {
    //     title: "Alur Penggunaan Aplikasi"
    // },
    {
        image: "src/assets/img/home/login.png",
        content: "Masuk ke halaman website, temui tampilan ini dan silahkan login dengan memasukkan 'USERNAME' dan 'PASSWORD'. Jika belum memiliki akun, silahkan pilih link 'DAFTAR'"
    },
    {
        image: "src/assets/img/home/daftar.png",
        content: "Lakukan pendaftaran terlebih dahulu. Setelah selesai mengisi form pendaftaran, pilih tombol daftar"
    },
    {
        image: "src/assets/img/home/view-main.png",
        content: "Setelah login, Anda akan diarahkan menuju halaman utama dari website yang akan berisi data informasi Ibu dan Anak. Lihat pada sebelah pojok kanan atas terdapat tombol 'NEW DATA', dan pilih tombol tersebut"
    },
    {
        image: "src/assets/img/home/create-main.png",
        content: "Setelah memilih tombol new data, maka akan diarahkan untuk mengisi data yang tertera pada form. Jika sudah yakin dengan data yang dimasukkan dapat memilih 'CREATE DATA' "
    },
    {
        image: "src/assets/img/home/view-1.png",
        content: "Anda akan diarahkan kembali ke halaman utama untuk melihat data informasi yang sudah dibuat. Selanjutnya pilih tombol 'VIEW' pada data yang ingin anda masukkan informasi penimbangannya"
    },
    {
        image: "src/assets/img/home/create-view.png",
        content: "Ketika sudah memilih tombol view akan ada beberapa pilihan diatas, selanjutnya pilih 'CREATE DATA' untuk memasukkan data hasil penimbangan"
    },
    {
        image: "src/assets/img/home/export.png",
        content: "Pada halaman view, data juga dapat di export ke dalam PDF maupun excel"
    },
    {
        image: "src/assets/img/home/tumbuh.png",
        content: "Pada halaman view juga terdapat bagian yang dapat digunakan untuk mengisi informasi tumbuh kembang anak. Pilih tombol 'KESEHATAN' kemudian Anda bisa mengisi apa saja kondisi yang terjadi pada anak"
    },
];




const HomePage = () => {
    const renderAppInfo = () => {
        return appInfo.map((infoItem, index) => (
            <div key={index} className="p-col-12 p-md-4 background-home info-container animate-fadeIn">
                <div className="flex-container">
                    <img src="src/assets/img/logo.png" alt={infoItem.title} className="card-image"/>
                    <div className="text-right font-App">
                        <h1 className="title">{infoItem.title}</h1>
                        <h2 className="content">{infoItem.content}</h2>
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
                        <h1 className="content text-justify">
                            Aplikasi berbasis website yang membantu para kader untuk meningkatkan 
                            akurasi pencatatan dan rekapitulasi data timbang dan perkembangan anak.
                            <br/>
                            <br/>
                            Tujuan dari aplikasi Posyandu Sehat adalah mempermudah akses dan penggunaan sistem pencatatan bagi kader Posyandu, 
                            sehingga kegiatan menimbang saat Posyandu bisa lebih efektif. 
                            Kemudian, data yang tercatat dapat disimpan dalam format file Excel yang dapat diunduh dan dicetak, 
                            terutama saat digunakan sebagai pelaporan 
                            dan mengurangi biaya pendataan manual dengan kertas serta meningkatkan efisiensi dalam memberikan pelayanan kesehatan.
                        </h1>
                    </div>
                    <img src="src/assets/img/bayiii_00000.png" alt="About" className="card-image-about"/>  
                </div>
            </div>
        );
    };

    const renderFeatures = () => {
        return (
            <div className="p-grid">
                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <img src={features[0].image} alt={features[0].title} className="card-image-feature"/>
                    <div className="text-center">
                         <hi className="title font-Feature font-right">{features[0].title}</hi>
                         <h2 className="content font-right">{features[0].content}</h2>
                     </div>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <div className="text-center">
                         <hi className="title font-Feature text-left">{features[1].title}</hi>
                         <h2 className="content text-left">{features[1].content}</h2>
                     </div>
                     <img src={features[1].image} alt={features[1].title} className="card-image-feature"/>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background info-container">
                    <div className="flex-container">
                    <img src={features[2].image} alt={features[2].title} className="card-image-feature"/>
                    <div className="text-center">
                         <hi className="title font-Feature">{features[2].title}</hi>
                         <h2 className="content">{features[2].content}</h2>
                     </div>
                    </div>
                </div>

            </div>
        );
    };

    const renderWorkFlow = () => {
        return (
            <div className="p-grid background">
                <div className="p-col-12 text-center title font-Feature background">
                    <h2>Alur Penggunaan</h2>
                </div>
                <div className="p-grid p-justify-center">
                    {workFlow.map((step, index) => (
                        <div key={index} className="p-col-12 p-md-6 background info-container">
                            <div className="flex-container">
                                {step.image && (
                                    <img src={step.image} alt={step.content} className="card-image-flow"/>
                                )}
                                <div className="text-center">
                                    <p className="content content-flow">{step.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    };

    const renderFooter = () => {
        return (
            <footer className="footer background-home">
                <div className="footer-content text-center">
                    <p>© {new Date().getFullYear()} Posyandu Sehat. All Rights Reserved.</p>
                </div>
            </footer>
        );  
    };
    

    

    

    return (
       <div className="p-grid">
        {renderAppInfo()}
        {renderAboutInfo()}
        {renderFeatures()}
        {renderWorkFlow()}
        {renderFooter()}
       </div>

    
    );

    
};

export default HomePage;