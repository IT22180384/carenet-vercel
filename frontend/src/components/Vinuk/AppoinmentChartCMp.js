import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentChartCmp = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://carenet-vercel.vercel.app/appointmentRoute/appointments"
        );
        const appointments = await response.json();
        const hourlyCounts = processAppointmentsByHour(appointments);

        const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const data = labels.map((hour) => hourlyCounts[hour] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Appointments",
              data: data,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: "#fff",
              pointRadius: 5,
              pointHoverRadius: 7,
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const processAppointmentsByHour = (appointments) => {
    const counts = {};
    appointments.forEach((appointment) => {
      const [hour] = appointment.time.split(":");
      const parsedHour = parseInt(hour, 10);
      counts[`${parsedHour}:00`] = (counts[`${parsedHour}:00`] || 0) + 1;
    });
    return counts;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
          font: { size: 16, weight: "bold" },
          color: "#1f2937",
        },
        grid: { display: false },
        ticks: { color: "#1f2937" },
      },
      y: {
        title: {
          display: true,
          text: "Number of Appointments",
          font: { size: 16, weight: "bold" },
          color: "#1f2937",
        },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        ticks: { stepSize: 1, color: "#1f2937" },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { font: { size: 14 }, color: "#1f2937" },
      },
      tooltip: {
        backgroundColor: "#3b82f6",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="h-[300px] sm:h-[500px] mx-auto my-16 p-6">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Appointments by Hour
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AppointmentChartCmp;
