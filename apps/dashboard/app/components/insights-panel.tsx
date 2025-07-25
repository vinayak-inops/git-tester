"use client"

import { useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { ThumbsUp, ThumbsDown } from "lucide-react"

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend)

interface InsightsPanelProps {
  type: "semi" | "full"
}

export function InsightsPanel({ type }: InsightsPanelProps) {
  const [dateRange, setDateRange] = useState("November 22 - November 29")

  // Sample data for the days of the week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayColors = [
    "rgba(73, 173, 245, 1)", // Sunday - light blue
    "rgba(33, 150, 243, 1)", // Monday - blue
    "rgba(0, 188, 212, 1)", // Tuesday - cyan
    "rgba(0, 150, 136, 1)", // Wednesday - teal
    "rgba(76, 175, 80, 1)", // Thursday - green
    "rgba(174, 213, 129, 1)", // Friday - light green
    "rgba(255, 152, 0, 1)", // Saturday - orange
  ]

  // Generate random data for the chart
  const generateData = () => {
    const values = days.map((_, index) => {
      // Make Friday the best day and Saturday the worst day to match the image
      if (index === 5) return 95 // Friday
      if (index === 6) return 6 // Saturday
      return Math.floor(Math.random() * 80) + 20
    })

    return {
      labels: days,
      datasets: [
        {
          data: values,
          backgroundColor: dayColors,
          borderWidth: 0,
        },
      ],
    }
  }

  const chartData = generateData()

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    circumference: 180,
    rotation: 270,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}`,
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 text-center">{dateRange}</div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-center gap-1">
            <div className="w-4 h-4" style={{ backgroundColor: dayColors[index] }}></div>
            <span className="text-sm">{day}</span>
          </div>
        ))}
      </div>

      <div className="h-[200px] relative">
        <Doughnut data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <ThumbsUp className="text-green-600" />
          </div>
          <div>
            <div className="font-medium">Best Day of the Week</div>
            <div className="text-green-600">Friday</div>
          </div>
          <div className="ml-auto text-2xl font-bold">95</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <ThumbsDown className="text-orange-600" />
          </div>
          <div>
            <div className="font-medium">Worst Day of the Week</div>
            <div className="text-orange-600">Saturday</div>
          </div>
          <div className="ml-auto text-2xl font-bold">6</div>
        </div>
      </div>
    </div>
  )
}
