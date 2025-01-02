<template>
    <ion-page>
      <ion-app>
        <ion-split-pane content-id="main-content">
          <SideMenu />
          
          <div class="ion-page" id="main-content">
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Birthday List</ion-title>
                <ion-buttons slot="end">
                  <ion-button>
                    <ion-icon :icon="notificationsOutline"></ion-icon>
                  </ion-button>
                  <ion-button>
                    <ion-icon :icon="searchOutline"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
    
            <ion-content class="ion-padding">
              <!-- <div class="header-row">
                <ion-text color="medium">
                  <h2>» {{ currentDate }}</h2>
                </ion-text>
                <ion-button fill="outline" color="medium">
                  <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                  Select Date
                </ion-button>
                <ion-button fill="solid" color="primary">Mark Attendance</ion-button>
              </div> -->
    
              <ion-grid>
                <!-- <ion-row>
                  <ion-col size="12" size-md="3" v-for="stat in stats" :key="stat.label">
                    <ion-card class="stat-card">
                      <ion-card-content>
                        <ion-icon :icon="stat.icon" class="stat-icon"></ion-icon>
                        <div class="stat-content">
                          <h2>{{ stat.value }}</h2>
                          <ion-text color="medium">
                            <small>{{ stat.label }}</small>
                          </ion-text>
                        </div>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row> -->
    
                <ion-row>
                  <ion-col size="12">
                    <ion-card>
                      <ion-card-content>
                        <ion-list lines="full">
                          <ion-item v-for="user in totaluserList" :key="user.id">
                            <ion-label>
                              <!-- <h2>{{ index + 1 }}</h2> -->
                            </ion-label>
                            <ion-label>
                              <h3>{{ user.username }}</h3>
                            </ion-label>
                            <ion-label>
                              <p>{{ user.date_of_birth }}</p>
                            </ion-label>
                            <!-- <ion-select v-model="student.status" interface="popover">
                              <ion-select-option value="present">Present</ion-select-option>
                              <ion-select-option value="absent">Absent</ion-select-option>
                              <ion-select-option value="late">Late</ion-select-option>
                            </ion-select> -->
                          </ion-item>
                        </ion-list>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-content>
          </div>
        </ion-split-pane>
      </ion-app>
    </ion-page>
    </template>
    
    <script>
    import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
             IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, IonPage,
             IonCardContent, IonList, IonItem, IonLabel, } from '@ionic/vue';
    import { mapActions, mapState } from 'vuex';
    import { defineComponent, ref } from 'vue';
    import { notificationsOutline, searchOutline, calendarOutline } from 'ionicons/icons';
    import SideMenu from '../../components/addleadside.vue';
    
    export default defineComponent({
      name: 'AttendanceComponent',
      components: {
        IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, 
        IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, 
        IonCardContent, IonList, IonItem, IonLabel, SideMenu,
        IonPage
      },
      data() {
      return {
        notificationsOutline,
           searchOutline,
         calendarOutline,
      }
    },
      // setup() {
      //   const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    
      //   const stats = [
      //     { label: 'Total Students', value: '50', icon: peopleOutline },
      //     { label: 'Present', value: '45', icon: checkmarkCircleOutline },
      //     { label: 'Absent', value: '3', icon: closeCircleOutline },
      //     { label: 'Late', value: '2', icon: timeOutline },
      //   ];
    
      //   const students = ref(Array(50).fill().map((_, index) => ({
      //     name: `Student ${index + 1}`,
      //     id: `STU${(index + 1).toString().padStart(3, '0')}`,
      //     status: 'present'
      //   })));
    
      //   return {
      //     currentDate,
      //     notificationsOutline,
      //     searchOutline,
      //     calendarOutline,
      //     stats,
      //     students
      //   };
      // },
      computed: {
      ...mapState('user', ['totaluserList',]),
       },
       methods: {
          ...mapActions('user', ['fetchtotaluserlist',]),
          async fetchleadData() {
            try {
              await this.fetchtotaluserlist();
              // console.log("Leads fetched successfully:", this.totalfollowupListId);
            } catch (error) {
              console.error('Error fetching lead data:', error);
            }
          },
      },
      async mounted() {
        try {
          this.fetchleadData();
        } catch (error) {
          console.error('Error fetching lead list:', error);
        }
      }
    });
    </script>
    
    <style scoped>
    ion-card {
      margin-bottom: 20px;
      border-radius: 10px;
    }
    
    .stat-card {
      background-color: #f4f5f8;
    }
    
    .stat-card ion-card-content {
      display: flex;
      align-items: center;
    }
    
    .stat-icon {
      font-size: 2.5rem;
      margin-right: 15px;
    }
    
    .stat-content h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    ion-item {
      --padding-start: 0;
      --inner-padding-end: 0;
    }
    
    ion-item ion-label:first-child {
      flex: 0 0 40px;
    }
    
    ion-item ion-label:last-of-type {
      flex: 0 0 100px;
      text-align: right;
    }
    
    ion-button[color="dark"] {
      --color: #000;
    }
    
    ion-select {
      max-width: 100px;
    }
    </style>