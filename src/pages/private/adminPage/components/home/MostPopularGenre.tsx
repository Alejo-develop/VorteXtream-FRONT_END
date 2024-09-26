// GenreChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface ChartOptions {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'top';
      labels: {
        color: string;
      };
    };
    title: {
      display: boolean;
      text: string;
      color: string;
    };
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => string;
      };
    };
  };
  scales: {
    x: {
      beginAtZero: boolean;
      ticks: {
        color: string;
      };
    };
    y: {
      beginAtZero: boolean;
      ticks: {
        color: string;
      };
    };
  };
}


const data: ChartData = {
  labels: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi'],
  datasets: [
    {
      label: 'Views',
      data: [120, 150, 180, 130, 90, 110, 140],
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
      borderWidth: 1,
    },
  ],
};


const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#ffffff' 
      }
    },
    title: {
      display: true,
      text: 'Genre Popularity',
      color: '#ffffff' 
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `Views: ${tooltipItem.raw}`;
        }
      }
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


const GenreChart: React.FC = () => {
  return <Bar data={data} options={options} />;
};

export default GenreChart;
