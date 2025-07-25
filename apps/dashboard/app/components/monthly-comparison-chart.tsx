"use client"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Define the years and their corresponding colors
const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
const colors = [
  "rgba(73, 173, 245, 1)", // 2012 - light blue
  "rgba(33, 150, 243, 1)", // 2013 - blue
  "rgba(0, 188, 212, 1)", // 2014 - cyan
  "rgba(0, 150, 136, 1)", // 2015 - teal
  "rgba(76, 175, 80, 1)", // 2016 - green
  "rgba(174, 213, 129, 1)", // 2017 - light green
  "rgba(205, 220, 57, 1)", // 2018 - lime
  "rgba(255, 193, 7, 1)", // 2019 - amber
  "rgba(255, 152, 0, 1)", // 2020 - orange
]

// Sample data for the chart
const generateRandomData = () => {
  return years.map((year) => ({
    label: year.toString(),
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
    backgroundColor: colors[years.indexOf(year)],
  }))
}

interface MonthlyComparisonChartProps {
  type: "vertical" | "stacked"
}

export function MonthlyComparisonChart({ type }: MonthlyComparisonChartProps) {
  const months = ["January", "February", "March", "April", "May", "June", "July"]
  const datasets = generateRandomData()

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: type === "stacked",
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        stacked: type === "stacked",
        beginAtZero: true,
        max: 100,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
  }

  const data = {
    labels: months,
    datasets,
  }

  return (
    <div className="w-full h-[500px]">
      <Bar options={options} data={data} />
    </div>
  )
}
