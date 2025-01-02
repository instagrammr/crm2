<template>
    <ion-app>
      <ion-split-pane content-id="main-content">

        
        <div class="ion-page" id="main-content">
        <h4>hello</h4>
        </div>
      </ion-split-pane>
    </ion-app>
  </template>
  
  <script>
  import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
           IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
           IonCardTitle, IonCardSubtitle, IonCardContent, IonText } from '@ionic/vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { notificationsOutline, searchOutline } from 'ionicons/icons';
 
  
  export default defineComponent({
    name: 'DashboardComponent',
    components: {
      IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
      IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
      IonCardTitle, IonCardSubtitle, IonCardContent, IonText, 
    },
    setup() {
      const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
      const taskChartCanvas = ref(null);
      const attendanceChartCanvas = ref(null);
  
      const stats = [
        { label: 'Total Staff', value: '0000' },
        { label: 'Total Students', value: '0000' },
        { label: 'Active Students', value: '0000' },
        { label: 'Inactive Students', value: '0000' },
      ];
  
      const leads = [
        { type: 'TOTAL LEADS', count: '00' },
        { type: 'FOLLOWUP LEADS', count: '00' },
        { type: 'REGISTER LEADS', count: '00' },
        { type: 'CLOSED LEADS', count: '00' },
      ];
  
      onMounted(() => {
        // Task Management Chart
        const taskCtx = taskChartCanvas.value.getContext('2d');
        new Chart(taskCtx, {
          type: 'bar',
          data: {
            labels: ['Sun, 1 Dec', 'Sun, 2 Dec', 'Sun, 3 Dec', 'Sun, 4 Dec', 'Sun, 5 Dec', 'Sun, 6 Dec', 'Sun, 7 Dec'],
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
                label: 'Droped',
                data: [12, 11, 11, 11, 11, 11, 11],
                backgroundColor: '#FF6384'
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: { stacked: true },
              y: { stacked: true, beginAtZero: true }
            }
          }
        });
  
        // Attendance Chart
        const attendanceCtx = attendanceChartCanvas.value.getContext('2d');
        new Chart(attendanceCtx, {
          type: 'line',
          data: {
            labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug'],
            datasets: [{
              label: 'Attendance',
              data: [75, 82, 78, 85, 80, 83, 79, 86, 84, 91],
              borderColor: '#36A2EB',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      });
  
      return {
        currentDate,
        notificationsOutline,
        searchOutline,
        stats,
        leads,
        taskChartCanvas,
        attendanceChartCanvas
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  ion-card {
    margin-bottom: 20px;
  }
  
  ion-card-content {
    padding: 20px;
  }
  
  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
  }
  
  canvas {
    width: 100% !important;
    height: 300px !important;
  }
  </style>