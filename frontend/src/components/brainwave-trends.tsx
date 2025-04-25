"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface BandPowers {
  Delta: number
  Theta: number
  Alpha: number
  Beta: number
  Gamma: number
}

interface BrainwaveTrendsProps {
  bandPowers: BandPowers | null
}

const MAX_DATA_POINTS = 60 // 1 minute of data at 1 sample per second

const BrainwaveTrends = ({ bandPowers }: BrainwaveTrendsProps) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: Array(MAX_DATA_POINTS).fill(""),
    datasets: [
      {
        label: "Delta",
        data: Array(MAX_DATA_POINTS).fill(null),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: "Theta",
        data: Array(MAX_DATA_POINTS).fill(null),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        tension: 0.4,
      },
      {
        label: "Alpha",
        data: Array(MAX_DATA_POINTS).fill(null),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
      {
        label: "Beta",
        data: Array(MAX_DATA_POINTS).fill(null),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "Gamma",
        data: Array(MAX_DATA_POINTS).fill(null),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.4,
      },
    ],
  })

  useEffect(() => {
    if (!bandPowers) return

    setChartData((prevData) => {
      const newData = { ...prevData }

      // Update each dataset with new values
      newData.datasets = newData.datasets.map((dataset) => {
        const bandName = dataset.label as keyof BandPowers
        const newValue = bandPowers[bandName]

        return {
          ...dataset,
          data: [...dataset.data.slice(1), newValue],
        }
      })

      return newData
    })
  }, [bandPowers])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Power (dB)",
        },
      },
    },
    animation: {
      duration: 0, // Disable animation for better performance
    },
  }

  return <Line data={chartData} options={options} />
}

export default BrainwaveTrends
