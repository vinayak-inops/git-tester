"use client"

import { useEffect, useRef } from "react"

// import { useMobile } from "@/hooks/use-mobile"

// We'll use Chart.js for the graph
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

export default function OrderGraph() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()
//   const isMobile = useMobile()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September"]

  // Sample data for the chart
  const newOrdersData = [30, 80, 35, 50, 60, 25, 60, 25, 45]
  const completedOrdersData = [65, 95, 40, 85, 30, 45, 35, 55, 55]

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Male count",
            data: newOrdersData,
            backgroundColor: "rgba(80, 200, 220, 0.5)",
            borderColor: "rgba(80, 200, 220, 1)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "Female count",
            data: completedOrdersData,
            backgroundColor: "rgba(90, 100, 200, 0.5)",
            borderColor: "rgba(90, 100, 200, 1)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: true,
              color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            // ticks: {
            //   display: !isMobile,
            // },
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              display: true,
              color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "start",
            labels: {
              boxWidth: 15,
              usePointStyle: true,
              pointStyle: "rect",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }
  , [theme, "isMobile"])

  return (
    <div className="w-full h-[350px]">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
function useTheme(): { theme: any } {
    return { theme: "light" }; // or "dark"
}

