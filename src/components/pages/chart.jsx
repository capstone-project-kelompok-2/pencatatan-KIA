import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartPage = () => {
    const { id } = useParams();
    const [chartUser, setChartUser] = useState([]);
    const chartRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/TKA?parentId=${id}`);
            setChartUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const renderChart = () => {
            if (chartUser.length === 0) return;

            const labels = chartUser.map(entry => entry.date);
            const weightData = chartUser.map(entry => entry.weight);
            const heightData = chartUser.map(entry => entry.height);

            const ctx = chartRef.current.getContext('2d');

            // Destroy the existing chart if it exists
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Weight',
                            data: weightData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Height',
                            data: heightData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            type: 'linear',
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Value',
                            },
                        },
                    },
                },
            });
        };

        fetchData();
        renderChart();
    }, [id]); // Only re-run the effect if id changes

    return (
        <div className='body h-screen bg-green-300 shadow-lg flex justify-center items-center'>
            <div className="chart-container">
                <canvas ref={chartRef} width={800} height={400}></canvas>
            </div>
        </div>
    );
};

export default ChartPage;
