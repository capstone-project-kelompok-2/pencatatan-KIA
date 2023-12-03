import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'primereact/chart';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import MotionButton from '../motion/motionButton';

const ChartPage = () => {
    const { id } = useParams();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chartType, setChartType] = useState('line');

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

    const handleToggleChartType = () => {
        setChartType((prevType) => (prevType === 'line' ? 'bar' : 'line'));
    };

    return (
        <div className='body h-screen w-full bg-white shadow-lg flex justify-center items-center'>
            <div className="chart-container w-[90%]">
                <div>
                    <motion.button 
                    whileHover={{ scale: 1.25 }}
                    className='bg-primary text-white font-semibold p-3 rounded-lg hover:bg-sky-600' onClick={handleToggleChartType}>
                        Switch type
                    </motion.button>
                </div>
                {chartData.labels && (
                    <motion.div
                    //animasi dari kiri ke kanan
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