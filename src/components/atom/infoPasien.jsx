import React from 'react';
import { Dialog } from 'primereact/dialog';
const InfoPasien = ({ parentData, visible, setVisible }) => {
    return (
    <Dialog
      header={<span className="font-bold flex items-center justify-center w-full">Info Lengkap Pasien</span>}
      visible={visible}
      style={{ width: '20vw' }}
      onHide={() => setVisible(false)}
      draggable={false}
      resizable={false}
    >
        
      <div className="m-0 flex flex-col items-center">
        <p>NIK : {parentData ? parentData.NIK : ''}</p>
        <p>Nama Bayi : {parentData.bayi ? parentData.bayi.namaBayi : ''}</p>
        <p>Tanggal Lahir : {parentData.bayi ? parentData.bayi.tanggalLahir : ''}</p>
        <p>Jenis Kelamin : {parentData.bayi ? parentData.bayi.jenisKelamin : ''}</p>
        <p>Nama Ibu : {parentData ? parentData.namaIbu : ''}</p> 
        <p>Nama Ayah : {parentData ? parentData.namaAyah : ''}</p>
        <p>Pekerjaan Ibu : {parentData ? parentData.pekerjaanIbu : ''}</p>
        <p>Pekerjaan Ayah : {parentData ? parentData.pekerjaanAyah : ''}</p>
        <p>Alamat : {parentData ? parentData.alamat : ''}</p>
        <p>kecamatan : {parentData ? parentData.kecamatan : ''}</p>
        <p>kota : {parentData ? parentData.kota : ''}</p>
      </div>
    </Dialog>
    );
};

export default InfoPasien;