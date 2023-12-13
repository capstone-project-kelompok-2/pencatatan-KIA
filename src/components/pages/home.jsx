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
        image: "src/assets/img/pencatatan.jpg",
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
        title: "Alur Penggunaan Aplikasi"
    },
    {
        image: "src/assets/img/register.jpg",
        content: "Lakukan registrasi terlebih dahulu dengan memasukkan NIK, Username, dan Password"
    },
    {
        image: "src/assets/img/login.svg",
        content: "Masukkan Username dan Password yang sudah dibuat saat registrasi "
    },
    {
        image: "src/assets/img/utama.png",
        content: "Anda akan diarahkan menuju halaman utama dari website yang akan berisi data informasi Ibu dan Anak. Lihat pada sebelah pojok kanan atas terdapat tombol new data, dan pilih tombol tersebut"
    },
    {
        image: "src/assets/img/create-data.png",
        content: "Setelah memilih tombol new data, maka akan diarahkan untuk mengisi data yang tertera pada form. Jika sudah yakin dengan data yang dimasukkan dapat memilih submit "
    },
    {
        image: "src/assets/img/view.png",
        content: "Anda akan diarahkan kembali ke halaman utama untuk melihat data informasi yang sudah dibuat tadi. Selanjutnya pilih tombol view pada data yang ingin anda masukkan informasi penimbangannya"
    },
    {
        image: "src/assets/img/create.jpeg",
        content: "Ketika sudah memilih tombol view akan ada beberapa pilihan diatas, dan pilih tombol create data untuk memasukkan data hasil penimbangan"
    },
    {
        image: "src/assets/img/edit.jpeg",
        content: "Jika ingin melakukan perubahan, disamping kanan terdapat pilihan edit untuk melakukan perubahan data"
    },
    {
        image: "src/assets/img/edit.jpeg",
        content: "Selain itu juga terdapat beberapa fitur seperti fitur grafik yang digunakan untuk melihat perkembangan"
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
            <div className="p-col-12 p-md-4 background-white info-container flex-container">
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
                <div className="p-col-12 p-md-4 background-white info-container">
                    <div className="flex-container">
                    <img src={features[0].image} alt={features[0].title} className="card-image-feature"/>
                    <div className="text-center">
                         <hi className="title font-Feature font-right">{features[0].title}</hi>
                         <h2 className="content font-right">{features[0].content}</h2>
                     </div>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background-white info-container">
                    <div className="flex-container">
                    <div className="text-center">
                         <hi className="title font-Feature text-left">{features[1].title}</hi>
                         <h2 className="content text-left">{features[1].content}</h2>
                     </div>
                     <img src={features[1].image} alt={features[1].title} className="card-image-feature"/>
                    </div>
                </div>

                <div className="p-col-12 p-md-4 background-white info-container">
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
            <div className="p-grid">
                {workFlow.map((steps, index) => (
                <div key={index} className="p-col-12 p-md-4 background-white info-container">
                    <div className="flex-container">
                        {steps.image && (
                            <img src={steps.image} alt={steps.content} className="card-image-flow"/>
                        )}
                        <div className="text-center">
                            <p className="content">{steps.content}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        );
    };

    

    

    return (
       <div className="p-grid">
        {renderAppInfo()}
        {renderAboutInfo()}
        {renderFeatures()}
        {renderWorkFlow()}
       </div>

    
    );

    
};

export default HomePage;