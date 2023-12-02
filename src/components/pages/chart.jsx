import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { Button } from 'primereact/button';

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
                const umur = datas.map(data => data.umur);
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
                    <button className='bg-primary text-white font-semibold p-3 rounded-lg hover:bg-sky-600' onClick={handleToggleChartType}>
                        Switch type
                    </button>
                </div>
                {chartData.labels && (
                    <Chart type={chartType} data={chartData} options={chartOptions} />
                )}
            </div>
        </div>
    );
};

export default ChartPage;
