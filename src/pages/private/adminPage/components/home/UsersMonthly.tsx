import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement, // Asegúrate de importar el PointElement
  ChartOptions,
  AnimationOptions
} from 'chart.js';

// Registra los componentes de Chart.js necesarios, incluyendo PointElement
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const data1 = [10, 20, 30, 40, 50, 60, 70];
const data2 = [15, 25, 35, 45, 55, 65, 75];
const labels = [1, 2, 3, 4, 5, 6, 7];

const config = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Dataset 1',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        radius: 0,
        data: data1.map((value, index) => ({ x: labels[index], y: value }))
      },
      {
        label: 'Dataset 2',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        radius: 0,
        data: data2.map((value, index) => ({ x: labels[index], y: value }))
      }
    ]
  },
  options: {
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    } as unknown as AnimationOptions<'line'>,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Monthly Users',
        color: '#ffffff'
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff'
        }
      },
      y: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff'
        }
      }
    }
  } as ChartOptions<'line'>
};

const MonthlyUsersChart: React.FC = () => {
  return (
    <div>
      <Line data={config.data} options={config.options} />
    </div>
  );
};

export default MonthlyUsersChart;