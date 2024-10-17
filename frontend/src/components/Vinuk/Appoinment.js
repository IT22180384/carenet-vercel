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

const AppointmentChart = () => {
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

  const graphStyle = {
    minHeight: "500px",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    backgroundColor: "#ffffff",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div
      className="hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out sm:w-full sm:max-w-3xl mx-auto p-6"
      style={graphStyle}
    >
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Appointments by Hour
      </h2>
      <div className="h-[300px] sm:h-[500px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
export default AppointmentChart;
