import DatePicker from 'react-datepicker'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import InputText from "../atom/InputText"
import ErrorFieldText from "../atom/errorFieldText"
import Select from "../atom/select"
import InputNumber from "../atom/inputNumber"
import Label from "../atom/label"
import TableData from "../atom/table/tableData"
import 'react-datepicker/dist/react-datepicker.css'
const Create = () => {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const {  register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => {
        const dataBayi = {
            // create id with react-uid
            id : uuidv4(),
            bayi : {
                namaBayi : data.namaBayi,
                jenisKelamin : data.jenisKelamin,
                beratBayi : beratBayi,
                tinggiBayi : tinggiBayi,
                tanggalLahir : startDate.toLocaleDateString()
            },
            namaIbu : data.namaIbu,
            pekerjaanIbu : data.pekerjaanIbu,
            NIK : data.NIK,
            namaAyah : data.namaAyah,
            pekerjaanAyah : data.pekerjaanAyah,
            alamat : data.alamat,
            kecamatan : data.kecamatan,
            kota : data.kota
        }
        // create modal window and confirm with sweetalert2

        MySwal.fire({
            title : 'Apakah data yang anda masukan sudah benar?',
            html : showDataModal(dataBayi),
            icon : 'question',
            confirmButtonText : 'Ya',
            showCancelButton : true,
            cancelButtonText : 'Tidak',
            cancelButtonColor : 'red',
            confirmButtonColor : 'green'

        }).then((result) => {
            if(result.isConfirmed){
                axios.post('http://localhost:3000/guest', dataBayi)
                .then((response) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      }).then(() => {
                        navigate('/')
                      })
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        })
        // console.log(dataBayi)
        
    }

    const [beratBayi, setBeratBayi] = useState(0)
    const [tinggiBayi, setTinggiBayi] = useState(0)
    const handleBeratBayi = (e) => {
        if(e.target.value < 0){
            setBeratBayi(1)
        }else{
            setBeratBayi(e.target.value)
        }
    }

    const handleTinggiBayi = (e) => {
        if(e.target.value < 0){
            setTinggiBayi(1)
        }else{
            setTinggiBayi(e.target.value)
        }
    }

    const [startDate, setStartDate] = useState(new Date());
    const handleDate = (date) => {
        // console.log(date.toLocaleDateString())
        setStartDate(date)
    }
    return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-green-300 from-10% to-cyan-700 to-90%">
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-5 justify-center items-center backdrop-blur-sm bg-white/30 w-[95%] h-[90%] rounded-3xl py-4">
            <div className="flex flex-col justify-center items-center">
                <img src="./src/assets/img/pngwing1.png" alt="people icon" className="absolute w-[6%] border border-black rounded-full bg-slate-50 mb-[6.5%] -z-0" />
                <span className=" flex justify-center w-[100px] bg-green-300 text-gray-800 text-xs shadow-md font-medium me-2 px-2.5 py-2 rounded-full z-30">Daftar</span>
            </div>
            <div className=" backdrop-blur bg-white/50 px-4 py-1 text-sm rounded-xl font-semibold">Keterangan Lahir</div>
            <div className="backdrop-blur bg-white/50 w-[80%] rounded-3xl h-auto ">
                <div className="grid grid-cols-2 p-5">
                    <div >
                        <p>Informasi Bayi</p>
                            <div className=" w-full flex items-center justify-start gap-5 my-3">

                            </div>
                            <p className="my-3">telah lahir seorang bayi : </p>
                            
                            <table className="table-auto w-full ml-5">
                                <tbody>
                                <tr className="w-full flex items-center gap-5">
                                <TableData children={<Label forHtml="tanggalLahir" name="Tanggal Lahir" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center border" />
                                    <TableData children={<DatePicker showIcon selected={startDate} onChange={handleDate} className="rounded-lg bg-slate-400 w-[272px] py-2 px-10" />} />
                                </tr>
                                <tr className="w-full flex items-center gap-5 border">
                                    <TableData children={<Label forHtml="namaBayi" name="Nama Bayi" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center border" />
                                    {/* <td className="flex justify-center items-center">:</td> */}
                                    <TableData children={<InputText register={register} name="namaBayi" />} errors={errors.namaBayi && <ErrorFieldText />}  />
                                    {/* <td>
                                        <input type="text" {... register("namaBayi", { required : true})} className=" w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
                                        <InputText register={register} name="namaBayi"  />
                                        {errors.namaBayi && <ErrorFieldText />}
                                    </td> */}
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="jenisKelamin" name="Jenis Kelamin" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<Select register={register} />} />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="beratBayi" name="Berat Bayi" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputNumber value={beratBayi} handle={handleBeratBayi} />} />
                                    <TableData children="kg" />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="tinggiBayi" name="Tinggi Bayi" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputNumber value={tinggiBayi} handle={handleTinggiBayi} />} />
                                    <TableData children="cm" />
                                </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="border-l-2 border-emerald-800 px-7">
                        <p>Data diri orang tua</p>

                            <table className="table-auto w-full ml-5">
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="namaIbu" name="Nama Ibu" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="namaIbu" />} errors={errors.namaIbu && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="pekerjaanIbu" name="Pekerjaan Ibu" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="pekerjaanIbu" />} errors={errors.pekerjaanIbu && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="NIK" name="NIK" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="NIK" />} errors={errors.NIK && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="namaAyah" name="Nama Ayah" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="namaAyah" />} errors={errors.namaAyah && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="pekerjaanAyah" name="Pekerjaan Ayah" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="pekerjaanAyah" />} errors={errors.pekerjaanAyah && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="alamat" name="Alamat" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="alamat" />} errors={errors.alamat && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="kecamatan" name="Kecamatan" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="kecamatan" />} errors={errors.kecamatan && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="kota" name="Kab/Kota" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="kota" />} errors={errors.kota && <ErrorFieldText />}  />
                                </tr>
                            </table>
                    </div>
                </div>
            </div>
            <button type="submit" className=" bg-emerald-400 text-white font-bold p-3 rounded-xl shadow-lg hover:bg-green-700 active:border-2 active:border-sky-400"><i className="fa-regular fa-square-plus ml-1 mr-2 fa-lg"></i>Create Data</button>
        </form>
    </div>
    )
}

const showDataModal = (data) => {
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

export default Create