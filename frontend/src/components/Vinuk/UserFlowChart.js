import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { PatientData } from '../Vinuk/Data/PatientData'; // Import the data

Chart.register(...registerables);

// Prepare the data for the chart
const labels = PatientData.map((entry) => entry.day); // X-axis: Days of the week

const data = {
  labels,
  datasets: [
    {
      label: 'Arrivals',
      data: PatientData.map((entry) => entry.arrivals),
      backgroundColor: '#34D399', // Tailwind's green-400 color
      barPercentage: 0.3,
      borderRadius: 5,
      borderSkipped: false,
    },
    {
      label: 'Staying',
      data: PatientData.map((entry) => entry.staying),
      backgroundColor: '#60A5FA', // Tailwind's blue-400 color
      barPercentage: 0.3,
      borderRadius: 5,
      borderSkipped: false,
    },
    {
      label: 'Discharges',
      data: PatientData.map((entry) => entry.discharges),
      backgroundColor: '#F87171', // Tailwind's red-400 color
      barPercentage: 0.3,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y} patients`;
        },
      },
      backgroundColor: '#fff',
      titleColor: '#333',
      bodyColor: '#333',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Days of the Week',
        font: { size: 14, weight: 'bold' },
        color: '#1f2937', // Tailwind's gray-800 color
      },
      ticks: {
        color: '#1f2937',
      },
      grid: {
        display: false,
      },
      stacked: false,
    },
    y: {
      title: {
        display: true,
        text: 'Number of Patients',
        font: { size: 14, weight: 'bold' },
        color: '#1f2937',
      },
      ticks: {
        stepSize: 5,
        color: '#1f2937',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      stacked: false,
    },
  },
  barThickness: 20,
  grouped: true, // Group bars together for each day
};

const PatientFlowWeeklyBarChart = () => {
  return (
    <div
      className="w-full max-w-4xl sm:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
    >
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Patient Flow - Weekly Overview
      </h2>
      <div className="h-[400px] sm:h-[500px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PatientFlowWeeklyBarChart;
