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

interface EEGData {
  TP9: number
  AF7: number
  AF8: number
  TP10: number
}

interface EEGVisualizationProps {
  eegData: EEGData | null
}

const EEGVisualization = ({ eegData }: EEGVisualizationProps) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: Array(50).fill(""),
    datasets: [
      {
        label: "TP9",
        data: Array(50).fill(0),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: "AF7",
        data: Array(50).fill(0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "AF8",
        data: Array(50).fill(0),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
      {
        label: "TP10",
        data: Array(50).fill(0),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        tension: 0.4,
      },
    ],
  })

  useEffect(() => {
    if (!eegData) return

    setChartData((prevData) => {
      const newData = { ...prevData }

      // Update each dataset with new values
      newData.datasets = newData.datasets.map((dataset, index) => {
        const channelName = dataset.label as keyof EEGData
        const newValue = eegData[channelName]

        return {
          ...dataset,
          data: [...dataset.data.slice(1), newValue],
        }
      })

      return newData
    })
  }, [eegData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -1000,
        max: 1000,
      },
    },
    animation: {
      duration: 0, // Disable animation for better performance
    },
  }

  return <Line data={chartData} options={options} />
}

export default EEGVisualization
