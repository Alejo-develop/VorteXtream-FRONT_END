// StreamChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registra los componentes de Chart.js necesarios
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define los datos para la gráfica
const data = {
  labels: ['Ninja', 'Shroud', 'PewDiePie', 'Tfue', 'DrDisrespect', 'Spoonkid', 'Ludwig'],
  datasets: [
    {
      label: 'Followers (in millions)',
      data: [16, 10, 111, 12, 4, 3, 5], // Datos de seguidores para los streamers
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',  // Color para Ninja
        'rgba(54, 162, 235, 0.2)',  // Color para Shroud
        'rgba(255, 206, 86, 0.2)',  // Color para PewDiePie
        'rgba(75, 192, 192, 0.2)',  // Color para Tfue
        'rgba(153, 102, 255, 0.2)', // Color para DrDisrespect
        'rgba(255, 159, 64, 0.2)',  // Color para Spoonkid
        'rgba(255, 99, 132, 0.2)'   // Color para Ludwig
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }
  ]
};

// Define las opciones para la gráfica
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff' // Color del texto del label (blanco)
      }
    },
    title: {
      display: true,
      text: 'Popular Streamers by Followers',
      color: '#ffffff' // Color del texto del título (blanco)
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: '#ffffff' // Color del texto del eje x (blanco)
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#ffffff' // Color del texto del eje y (blanco)
      }
    }
  }
};

// Componente de la gráfica
const StreamChart: React.FC = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StreamChart;
