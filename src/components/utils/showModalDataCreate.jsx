
export const showDataModalCreate = (data) => {
    return(
        <div className="flex justify-center items-center flex-col p-5 border-2 border-black rounded-lg font-semibold">
            <span>Nama Bayi : {data.bayi.namaBayi}</span>
            <span>Tanggal Lahir : {data.bayi.tanggalLahir}</span>
            <span>Jenis Kelamin : {data.bayi.jenisKelamin}</span>
            <span>Berat Bayi : {data.bayi.beratBayi} kg</span>
            <span>Tinggi Bayi : {data.bayi.tinggiBayi} cm</span>
            <span>Nama Ibu : {data.namaIbu}</span>
            <span>Pekerjaan Ibu : {data.pekerjaanIbu}</span>
            <span>NIK : {data.NIK}</span>
            <span>Nama Ayah : {data.namaAyah}</span>
            <span>Pekerjaan Ayah : {data.pekerjaanAyah}</span>  
            <span>Alamat : {data.alamat}</span>
            <span>Kecamatan : {data.kecamatan}</span>
            <span>Kota : {data.kota}</span>
        </div>
    )
}
