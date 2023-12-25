import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChartPage = () => {
    const navigate = useNavigate();
    const types = [
        { name: 'line', code: 'line' },
        { name: 'bar', code: 'bar' },
    ]
    useEffect(() => {
        const user = localStorage.getItem("user")

        if (!user) {
            navigate("/login")
        }
    }, [navigate])
    const { id } = useParams();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chartType, setChartType] = useState('line');
    const [selectedChartType, setSelectedChartType] = useState('line');

    const handleChartTypeChange = (e) => {
        console.log(e.value.name);
        const selectedChartType = e.value.name;
        setChartType(selectedChartType);
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/TKA?parentId=${id}`)
            .then(res => {
                console.log(res.data);
                const datas = res.data;
                const tanggal = datas.map(data => data.tanggal);
                const tinggiBadan = datas.map(data => data.tinggiBadan);
                const beratBadan = datas.map(data => data.beratBadan);


                const data = {
                    labels: tanggal,
                    datasets: [
                        {
                            type: chartType,
                            label: 'Tinggi Badan',
                            data: tinggiBadan,
                            borderColor: 'blue',
                            backgroundColor: chartType === 'bar' ? 'blue' : 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            tension: chartType === 'line' ? 0.1 : 0
                        },
                        {
                            type: chartType,
                            label: 'Berat Badan',
                            data: beratBadan,
                            borderColor: 'red',
                            backgroundColor: chartType === 'bar' ? 'red' : 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            tension: chartType === 'line' ? 0.1 : 0
                        }
                    ]
                };

                const options = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.6,
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'rgba(0,0,0,1)'
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        y: {
                            ticks: {
                                color: 'rgba(0,0,0,1)',
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)',
                            }
                        }
                    }
                };

                setChartData(data);
                setChartOptions(options);
            })
            .catch(err => {
                console.log(err);
            });
    }, [chartType, id]);
    console.log(chartType);

    return (
        <div className='body h-screen w-full bg-white shadow-lg flex justify-center items-center'>
            <div className="chart-container w-[90%]">
                <div>
                    <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className='hover:bg-red-500 hover:text-white hover:border-0 font-semibold p-3 mx-1 rounded-lg border-2 border-primary text-primary' onClick={() => navigate(`/detail/${id}`) }>
                        Kembali
                    </motion.button>

                    <Dropdown
                        value={chartType}
                        onChange={handleChartTypeChange}
                        options={types}
                        optionLabel="name"
                        placeholder="Pilih Tipe Chart"
                        className="w-full md:w-14rem text-primary"
                        style={{
                            backgroundColor: '#06b6d4',
                            color: 'white',
                            borderColor: '#06b6d4',
                            borderWidth: '2px',
                            fontWeight: 'bold',
                        }}
                        pt={{
                            root: () => ({
                                id: 'rootDropdown',
                            }),
                            input: () => ({
                                id: 'inputDropdown',
                                className: '',
                            }),
                            item: () => ({
                                id: 'itemDropdown',
                                className: '',
                                
                            }),
                            list: () => ({
                                id: 'listDropdown',
                                className: '',
                            }),
                            trigger: () => ({
                                id: 'triggerDropdown',
                            }),
                        }}

                        />

                </div>
                {chartData.labels && (
                    <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="chart"

                >
                    <Chart type={chartType} data={chartData} options={chartOptions} />
                </motion.div>
                )}
            </div>
        </div>
    );
};

export default ChartPage;