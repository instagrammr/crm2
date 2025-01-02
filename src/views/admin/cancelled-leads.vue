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
              <ion-title>Cancelled</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search here"
                  class="custom-searchbar"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <!-- Stats Cards -->
          <ion-grid class="stats-grid">
              <ion-row>
                <ion-col size="6" size-md="4">
                  <div class="stats-card primary-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="peopleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Total Leads</h4>
                      <span class="stats-value">{{ totalLeadCount }}</span>
                      
                    </div>
                  </div>
                </ion-col>
                
             
  
                <ion-col size="6" size-md="4">
                  <div class="stats-card danger-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="closeCircleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Cancelled</h4>
                      <span class="stats-value">{{ totalcancelledCount }}</span>
                    
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="4">
                  <div class="stats-card warning-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="refreshCircleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Follow Up</h4>
                      <span class="stats-value">{{ totalfollowupCount }}</span>
                     
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
  
            <!-- Student Info Card -->
            <div v-if="totalcancelledListId && totalcancelledListId.rows">
              <ion-card class="student-info-card" v-for="lead in totalcancelledListId.rows" :key="lead.id">
                <ion-card-content>
                  <div class="student-header">
                    <div class="student-avatar">
                      <ion-avatar>
                  <img src="https://cdn-icons-png.flaticon.com/512/67/67902.png" alt="Student" /> 
                      </ion-avatar>
                      <div class="online-indicator"></div>
                    </div>
                        <div class="student-details">
                          <h3>{{ lead.student_name }} <span class="status-badge">Connected to you</span></h3>
                            <div class="info-row">
                              <ion-icon :icon="personOutline"></ion-icon>
                              <span>{{ lead.mobile }}</span>
                              <ion-icon :icon="timeOutline"></ion-icon>
                              <span>Create Date: {{ new Date(lead.date).toISOString().split('T')[0] }} </span>
                              <ion-icon :icon="locationOutline"></ion-icon>
                              <span>Country: {{ lead.country }}</span>
                            </div>
                        </div>
                    <div class="action-buttons">
                      <ion-button fill="clear">
                        <ion-icon slot="icon-only" :icon="ellipsisHorizontal"></ion-icon>
                      </ion-button>
                      <ion-button fill="clear">
                        <ion-icon slot="icon-only" :icon="star"></ion-icon>
                      </ion-button>
                    </div>
                  </div>
              </ion-card-content>
            </ion-card>
            </div>
  
   
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { mapActions, mapState } from 'vuex';
  import { 
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonAvatar, IonCard, IonCardContent, IonPage
  } from '@ionic/vue';
  import { 
    peopleOutline, personOutline, desktopOutline, 
    laptopOutline, timeOutline, locationOutline,
    ellipsisHorizontal, star, create, trash,
    refreshCircleOutline, closeCircleOutline
  } from 'ionicons/icons';
  import SideMenu from '../../components/SideMenu.vue';
  
  export default defineComponent({
    name: 'FollowupDetails',
    components: {
      IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
      IonButtons, IonMenuButton, IonButton, IonIcon, 
      IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
      IonAvatar, IonCard, IonCardContent, SideMenu, IonPage
    },
    setup() {
      const followups = ref([
        {
          scheduleDate: '17/03/2024 09:00 AM',
          followDate: '17/03/2024 09:00 AM',
          status: 'Done'
        },
        {
          scheduleDate: '17/03/2024 09:00 AM',
          followDate: '17/03/2024 09:00 AM',
          status: 'Done'
        }
      ]);
  
      return {
        peopleOutline,
        personOutline,
        desktopOutline,
        laptopOutline,
        timeOutline,
        locationOutline,
        ellipsisHorizontal,
        refreshCircleOutline,
        closeCircleOutline,
        star,
        create,
        trash,
        followups
      };
    },
    computed: {
    ...mapState('addLead', ['totalcancelledListId', 'totalfollowupCount', 'totalLeadCount', 'totalcancelledCount']),
     },
     methods: {
        ...mapActions('addLead', ['fetchtotalcancelledlistId', 'fetchtotalcancelledCount', 'fetchtotalleadCount', 'fetchtotalfollowupCount']),
        async fetchleadData() {
          const userId = this.$route.params.id;
          try {
            await this.fetchtotalcancelledlistId(userId);
            await this.fetchtotalcancelledCount(userId);
            await this.fetchtotalleadCount(userId);
            await this.fetchtotalfollowupCount(userId);
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
  .custom-searchbar {
    max-width: 300px;
    padding: 0 10px;
  }
  
  .stats-grid {
    padding: 16px;
    background-color: white;
  }
  
  .stats-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .stats-icon.dark {
    background: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
  
  .stats-icon.dark ion-icon {
    font-size: 20px;
    color: #fff;
  }
  
  .student-info-card {
    margin: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .student-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  
  .student-avatar {
    position: relative;
  }
  
  .online-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: #4ade80;
    border: 2px solid white;
    border-radius: 50%;
  }
  
  .student-details h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .status-badge {
    background: #4ade80;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
  
  .info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    color: #666;
  }
  
  .info-row ion-icon {
    font-size: 16px;
  }
  
  .timeline-container {
    padding: 16px;
  }
  
  .timeline {
    position: relative;
    padding: 16px 0;
  }
  
  .timeline-item {
    display: flex;
    margin-bottom: 24px;
  }
  
  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
  }
  
  .marker-dot {
    width: 24px;
    height: 24px;
    background: #000;
    border-radius: 50%;
  }
  
  .marker-line {
    width: 2px;
    flex-grow: 1;
    background: #eee;
    margin-top: 8px;
  }
  
  .timeline-content {
    flex-grow: 1;
  }
  
  .timeline-content ion-card {
    margin: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .followup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .small-avatar {
    width: 24px;
    height: 24px;
  }
  
  .followup-details {
    margin: 16px 0;
  }
  
  .followup-details p {
    margin: 8px 0;
  }
  
  .details-btn {
    --background: #4ade80;
    --color: white;
  }
  
  @media (max-width: 768px) {
    .custom-searchbar {
      max-width: 100%;
    }
  
    .student-header {
      flex-direction: column;
    }
  
    .info-row {
      flex-wrap: wrap;
    }
  }
  </style>