// MonthlyUsersChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Registra los componentes de Chart.js necesarios
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

// Datos de ejemplo
const data1 = [10, 20, 30, 40, 50, 60, 70]; // Datos para la primera línea
const data2 = [15, 25, 35, 45, 55, 65, 75]; // Datos para la segunda línea
const labels = [1, 2, 3, 4, 5, 6, 7]; // Etiquetas del eje x

// Configuración de la gráfica
const config = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Dataset 1', // Etiqueta para la primera línea
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        radius: 0,
        data: data1.map((value, index) => ({ x: labels[index], y: value }))
      },
      {
        label: 'Dataset 2', // Etiqueta para la segunda línea
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        radius: 0,
        data: data2.map((value, index) => ({ x: labels[index], y: value }))
      }
    ]
  },
  options: {
    animation: false, // Configura la animación como false para desactivarla
    interaction: {
      intersect: false
    },
    plugins: {
      legend: {
        display: false // Oculta la leyenda
      },
      title: {
        display: true,
        text: 'Monthly Users',
        color: '#ffffff' // Color del título
      }
    },
    scales: {
      x: {
        type: 'linear' as const, // Define el tipo como 'linear'
        ticks: {
          color: '#ffffff' // Color de los ticks del eje x
        },
        grid: {
          color: '#ffffff' // Color de las líneas de la cuadrícula del eje x
        }
      },
      y: {
        ticks: {
          color: '#ffffff' // Color de los ticks del eje y
        },
        grid: {
          color: '#ffffff' // Color de las líneas de la cuadrícula del eje y
        }
      }
    }
  }
};

// Componente de la gráfica
const MonthlyUsersChart: React.FC = () => {
  return (
    <div>
      <Line data={config.data} options={config.options} />
    </div>
  );
};

export default MonthlyUsersChart;
