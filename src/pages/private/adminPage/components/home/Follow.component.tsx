// DoughnutChartSuscriptions.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);


const data = {
  labels: ['Active Subscriptions', 'Inactive Subscriptions'],
  datasets: [{
    label: 'Subscriptions',
    data: [65, 35], 
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)', 
      'rgba(0, 0, 0, 0.2)'      
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',   
      'rgba(0, 0, 0, 1)'        
    ],
    borderWidth: 1
  }]
};


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white', 
      },
    },
    title: {
      display: true,
      text: 'Suscriptions Status',
      color: 'white', 
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
