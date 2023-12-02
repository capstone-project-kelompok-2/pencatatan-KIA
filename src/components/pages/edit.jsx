import DatePicker from 'react-datepicker'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import InputText from "../atom/InputText"
import ErrorFieldText from "../atom/errorFieldText"
import Select from "../atom/select"
import InputDisabled from '../atom/inputDisabled'
import Label from "../atom/label"
import TableData from "../atom/table/tableData"
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom'
const Edit = () => {
    const [dataEdit, setDataEdit] = useState({})
    const [dataEditBayi, setDataEditBayi] = useState({})
    const [NIK, setNIK] = useState(dataEdit ? dataEdit.NIK : 0);
    useEffect(() => {
        axios.get('http://localhost:3000/guest/'+id)
        .then((response) => {
            const data = response.data
            setDataEdit(data)
            setDataEditBayi(data.bayi)
            setNIK(data.NIK)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    // console.log(dataEdit);
    const { id } = useParams()
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const {  register, handleSubmit, formState: { errors } } = useForm()
    

    const onSubmit = data => {
        // console.log(data);
        const updateData = {
            id : uuidv4(),
            bayi : {
                tanggalLahir : startDate.toLocaleDateString(),
                namaBayi : data.namaBayi,
                jenisKelamin : data.jenisKelamin,
            },
            namaIbu : data.namaIbu,
            pekerjaanIbu : data.pekerjaanIbu,
            NIK : parseInt(NIK),
            namaAyah : data.namaAyah,
            pekerjaanAyah : data.pekerjaanAyah,
            alamat : data.alamat,
            kecamatan : data.kecamatan,
            kota : data.kota
        }

        // console.log(updateData);

        axios.get('http://localhost:3000/guest')

        .then((response) => {
            const dataGuest = response.data
            //ambil semua dataGuest selain data yang akan diupdate
            const dataGuestFilter = dataGuest.filter((data) => data.id !== id)
            // console.log(dataGuestFilter);

            const cekNIK = dataGuestFilter.filter((data) => data.NIK === updateData.NIK);
            console.log(cekNIK);
            if(cekNIK.length > 0){
                MySwal.fire({
                    title : 'NIK sudah ada yang menggunakan, silahkan masukan NIK yang lain',
                    icon : 'error',
                    confirmButtonText : 'Ok',
                    confirmButtonColor : 'red'
                })
                return
            }else{
            MySwal.fire({
            title : 'Apakah data yang anda masukan sudah benar?',
            html : showDataModal(updateData),
            icon : 'question',
            confirmButtonText : 'Ya',
            showCancelButton : true,
            cancelButtonText : 'Tidak',
            cancelButtonColor : 'red',
            confirmButtonColor : 'green'

        }).then((result) => {
            if(result.isConfirmed){
                axios.put('http://localhost:3000/guest/'+id, updateData)
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
                            //post data ke TKA
                        axios.post('http://localhost:3000/TKA', dataTKA)
                        .then((response) => {
                            console.log(response)
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                })
                .catch((error) => {
                    console.log(error)
                })
            }
        })
        console.log(updateData)
            }
        })

        
    }
    
    const [namaBayiText, setNamaBayiText] = useState(dataEditBayi)

    const handleNamaBayiText = (e) => {
        setNamaBayiText(e.target.value)
    }
    const handleNIK = (e) => {
        if(e.target.value < 0){
            setNIK(1)
        } else {
            setNIK(e.target.value)
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
                <img src="../src/assets/img/pngwing1.png" alt="people icon" className="absolute w-[6%] border border-black rounded-full bg-slate-50 mb-[6.5%] -z-0" />
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
                                    <TableData children={<InputText register={register} name="namaBayi" defaultValue={dataEditBayi ? dataEditBayi.namaBayi : ''} />} errors={errors.namaBayi && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="jenisKelamin" name="Jenis Kelamin" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<Select register={register} />} />
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
                                    <TableData children={<InputText register={register} name="namaIbu" defaultValue={dataEdit.namaIbu} />} errors={errors.namaIbu && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="pekerjaanIbu" name="Pekerjaan Ibu"  />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="pekerjaanIbu" defaultValue={dataEdit.pekerjaanIbu} />} errors={errors.pekerjaanIbu && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="NIK" name="NIK" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputDisabled type="number" handle={handleNIK} value={NIK} />} />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="namaAyah" name="Nama Ayah" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="namaAyah" defaultValue={dataEdit.namaAyah}  />} errors={errors.namaAyah && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="pekerjaanAyah" name="Pekerjaan Ayah" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="pekerjaanAyah" defaultValue={dataEdit.pekerjaanAyah} />} errors={errors.pekerjaanAyah && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="alamat" name="Alamat" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="alamat" defaultValue={dataEdit.alamat} />} errors={errors.alamat && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="kecamatan" name="Kecamatan" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="kecamatan" defaultValue={dataEdit.kecamatan} />} errors={errors.kecamatan && <ErrorFieldText />}  />
                                </tr>
                                <tr className="w-full flex items-center gap-5">
                                    <TableData children={<Label forHtml="kota" name="Kab/Kota" />} className=" w-[20%] flex justify-start items-center pt-2" />
                                    <TableData children=":" className="flex justify-center items-center" />
                                    <TableData children={<InputText register={register} name="kota" defaultValue={dataEdit.kota} />} errors={errors.kota && <ErrorFieldText />}  />
                                </tr>
                            </table>
                    </div>
                </div>
            </div>
            <button type="submit" className=" bg-emerald-400 text-white font-bold p-3 rounded-xl shadow-lg hover:bg-green-700 active:border-2 active:border-sky-400"><i className="fa-regular fa-square-plus ml-1 mr-2 fa-lg"></i>Edit Data</button>
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

export default Edit