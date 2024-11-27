import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';
import ChartsHeading from './ChartsHeading';
import { useGetIncomeOverviewQuery } from '../../Redux/Apis/dashboardApi';
import Loading from '../Shared/Loading';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const EventOverView = ({ data: overview, yearlyGrowth, monthlyGrowth, dailyGrowth }) => {
    // chart
    const canvasRef = React.useRef(null);
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Data',
                // data: [January || 0, February || 0, March || 0, April || 0, May || 0, June || 0, July || 0, August || 0, September || 0, October || 0, November || 0, December || 0],
                data: overview ? [...overview] : [],
                borderColor: 'rgba(0, 68, 102, 1)',
                borderWidth: 2,
                fill: true,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(0, 68, 102, 1)');
                    gradient.addColorStop(1, 'rgba(0, 68, 102, 0.25)');

                    return gradient;
                },
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            line: {
                borderWidth: 3,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    // chart end
    //data
    const growthData = [
        {
            name: 'Yearly Growth',
            total: `${yearlyGrowth || 0}`
        },
        {
            name: 'Monthly',
            total: `${monthlyGrowth || 0}`
        },
        {
            name: 'Day',
            total: `${dailyGrowth || 0}`
        },
    ]
    //handler
    return (//showSearch onSearch={(e)=>console.log(e)}
        <div className='w-full h-full bg-[var(--color-white)] card-shadow rounded-md p-4'>
            <div className='between-center mb-6'>
                <ChartsHeading heading={`Event Overview`} growthData={growthData} />
                {/* <Select className='min-w-32' defaultValue={income?.data?.currentYear} placeholder='select year' onChange={(year) => setYear(year)} options={income?.data?.total_years.map((item) => ({ value: item, label: item }))} /> */}
            </div>
            <div className='h-[300px]'>
                <Line ref={canvasRef} data={data} options={options} />
            </div>
        </div>
    );
};


export default EventOverView
