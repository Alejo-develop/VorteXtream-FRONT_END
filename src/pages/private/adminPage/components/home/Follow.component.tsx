// DoughnutChartSuscriptions.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registra los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Datos ficticios de suscripciones
const data = {
  labels: ['Active Subscriptions', 'Inactive Subscriptions'],
  datasets: [{
    label: 'Subscriptions',
    data: [65, 35], // Datos provisionales de suscripciones
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)', // Rosado para suscripciones activas
      'rgba(0, 0, 0, 0.2)'      // Negro claro para inactivas
    ],
    borderColor: [
      
    
    ],
    borderWidth: 1
  }]
};

// Opciones de la gráfica
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white', // Color blanco para el texto de la leyenda
      },
    },
    title: {
      display: true,
      text: 'Suscriptions Status',
      color: 'white', // Título en blanco
    }
  }
};

// Componente de la gráfica
const DoughnutChartSuscriptions: React.FC = () => {
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChartSuscriptions;
