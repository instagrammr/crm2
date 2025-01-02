<template>
    <ion-card class="attendance-card">
      <ion-card-header>
        <ion-card-title>Attendance Overview</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="4" v-for="stat in attendanceStats" :key="stat.label">
              <div class="stat-container" :class="`stat-${stat.color}`">
                <h2>{{ stat.value }}</h2>
                <p>{{ stat.label }}</p>
                <ion-icon :icon="stat.icon" :color="stat.color"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
        <div class="chart-legend">
          <ion-segment v-model="selectedPeriod" @ionChange="updateChart($event.detail.value)">
            <ion-segment-button value="daily">Daily</ion-segment-button>
            <ion-segment-button value="weekly">Weekly</ion-segment-button>
            <ion-segment-button value="monthly">Monthly</ion-segment-button>
          </ion-segment>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
  import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonSegmentButton } from '@ionic/vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { peopleOutline, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'AttendanceOverview',
    components: {
      IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon, IonSegment, IonSegmentButton
    },
    setup() {
      const chartCanvas = ref(null);
      const chart = ref(null);
      const selectedPeriod = ref('daily');
  
      const attendanceStats = [
        { label: 'Total Employees', value: '20', icon: peopleOutline, color: 'primary' },
        { label: 'Present', value: '19', icon: checkmarkCircleOutline, color: 'success' },
        { label: 'Absent', value: '01', icon: closeCircleOutline, color: 'danger' },
      ];
  
      const chartData = {
        daily: {
          labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'],
          data: [75, 82, 78, 85, 80, 83, 79],
        },
        weekly: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [80, 83, 85, 88],
        },
        monthly: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [78, 80, 82, 79, 85, 87],
        },
      };
  
      const createChart = (labels, data) => {
        const ctx = chartCanvas.value.getContext('2d');
        chart.value = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Attendance',
              data: data,
              borderColor: '#3880ff',
              backgroundColor: 'rgba(56, 128, 255, 0.1)',
              tension: 0.4,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        });
      };
  
      const updateChart = (period) => {
        selectedPeriod.value = period;
        chart.value.data.labels = chartData[period].labels;
        chart.value.data.datasets[0].data = chartData[period].data;
        chart.value.update();
      };
  
      onMounted(() => {
        createChart(chartData.daily.labels, chartData.daily.data);
      });
  
      return {
        chartCanvas,
        attendanceStats,
        selectedPeriod,
        updateChart,
        peopleOutline,
        checkmarkCircleOutline,
        closeCircleOutline,
      };
    },
  });
  </script>
  
  <style scoped>
  .attendance-card {
    margin: 1em;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .stat-container {
    text-align: center;
    position: relative;
    padding: 1em;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  
  .stat-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .stat-primary {
    background-color: rgba(56, 128, 255, 0.1);
  }
  
  .stat-success {
    background-color: rgba(45, 211, 111, 0.1);
  }
  
  .stat-danger {
    background-color: rgba(235, 68, 90, 0.1);
  }
  
  .stat-container h2 {
    font-size: 1.8em;
    margin-bottom: 0.2em;
    font-weight: bold;
  }
  
  .stat-container p {
    margin-top: 0;
    color: var(--ion-color-medium);
    font-size: 0.9em;
  }
  
  .stat-container ion-icon {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 1.5em;
    opacity: 0.7;
  }
  
  .chart-container {
    margin-top: 1.5em;
    height: 250px;
  }
  
  .chart-legend {
    margin-top: 1.5em;
  }
  
  @media (max-width: 768px) {
    .stat-container {
      margin-bottom: 1em;
    }
  
    .chart-container {
      height: 200px;
    }
  }
  </style>