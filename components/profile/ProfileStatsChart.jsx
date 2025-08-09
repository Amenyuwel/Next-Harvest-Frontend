"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const ProfileStatsChart = () => {
  const farmerStatsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Rice Farmers",
        data: [120, 135, 150, 165, 180, 195, 210, 225, 240, 250, 255, 258],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Corn Farmers", 
        data: [80, 90, 100, 110, 125, 140, 155, 165, 175, 180, 185, 187],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Vegetable Farmers",
        data: [60, 70, 75, 80, 90, 95, 100, 105, 110, 115, 118, 120],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const farmerStatsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6b7280",
          font: { size: 11, weight: "bold" },
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: { size: 11, weight: "bold" },
        },
      },
    },
    elements: {
      point: { hoverBackgroundColor: "#fff" },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <section className="flex h-full w-full flex-col rounded-2xl bg-white p-6 shadow-sm">
      <header className="mb-4 flex-shrink-0">
        <h2 className="text-lg font-bold text-black">Farmer Stats</h2>
      </header>
      <div
        className="min-h-0 w-full flex-1"
        role="img"
        aria-label="Farmer statistics data visualization chart"
      >
        <Line data={farmerStatsData} options={farmerStatsOptions} />
      </div>
    </section>
  );
};

export default ProfileStatsChart;