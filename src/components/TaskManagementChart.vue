<template>
    <ion-card class="task-card">
      <ion-card-header>
        <ion-card-title>Task Management Summaries</ion-card-title>
        <ion-card-subtitle>
          <ion-text color="primary" class="task-count">126 Tasks</ion-text>
          <ion-text color="danger" class="task-trend">↓ 4%</ion-text>
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
  import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText } from '@ionic/vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'TaskManagementChart',
    components: {
      IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText
    },
    setup() {
      const chartCanvas = ref(null);
  
      onMounted(() => {
        const ctx = chartCanvas.value.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
              {
                label: 'Register',
                data: [18, 18, 18, 18, 18, 18, 18],
                backgroundColor: '#36A2EB'
              },
              {
                label: 'Followup',
                data: [23, 23, 23, 23, 23, 23, 23],
                backgroundColor: '#4BC0C0'
              },
              {
                label: 'Dropped',
                data: [12, 11, 11, 11, 11, 11, 11],
                backgroundColor: '#FF6384'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { stacked: true },
              y: { stacked: true, beginAtZero: true }
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 12,
                  padding: 15
                }
              },
              title: {
                display: false,
              }
            }
          }
        });
      });
  
      return {
        chartCanvas
      };
    },
  });
  </script>
  
  <style scoped>
  .task-card {
    margin: 1em;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  ion-card-header {
    padding: 16px;
  }
  
  ion-card-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  ion-card-subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  
  .task-count {
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .task-trend {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .chart-container {
    height: 300px;
    padding: 10px;
  }
  
  @media (max-width: 576px) {
    ion-card-title {
      font-size: 1rem;
    }
    
    .task-count {
      font-size: 0.9rem;
    }
    
    .task-trend {
      font-size: 0.8rem;
    }
    
    .chart-container {
      height: 250px;
    }
  }
  </style>