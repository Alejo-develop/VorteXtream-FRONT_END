
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


const data = {
  labels: ['Ninja', 'Shroud', 'PewDiePie', 'Tfue', 'DrDisrespect', 'Spoonkid', 'Ludwig'],
  datasets: [
    {
      label: 'Followers (in millions)',
      data: [16, 10, 111, 12, 4, 3, 5], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',  
        'rgba(54, 162, 235, 0.2)',  
        'rgba(255, 206, 86, 0.2)',  
        'rgba(75, 192, 192, 0.2)',  
        'rgba(153, 102, 255, 0.2)', 
        'rgba(255, 159, 64, 0.2)',  
        'rgba(255, 99, 132, 0.2)'   
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


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff' 
      }
    },
    title: {
      display: true,
      text: 'Popular Streamers by Followers',
      color: '#ffffff'
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: '#ffffff' 
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#ffffff' 
      }
    }
  }
};


const StreamChart: React.FC = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StreamChart;
