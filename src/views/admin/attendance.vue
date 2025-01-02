<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <side-menu />
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar class="custom-toolbar">
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title>Attendance Tracker</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content class="ion-padding">
            <div class="attendance-container">
              <ion-card class="filter-card">
                <ion-card-content>
                  <ion-grid>
                    <ion-row class="filter-row">
                      <ion-col size-xs="12" size-sm="8">
                        <ion-label class="date-label">Select Date</ion-label>
                        <ion-datetime 
                          presentation="date" 
                          v-model="specificDate"
                          @ionChange="applyDateFilter"
                          class="custom-datetime"
                        ></ion-datetime>
                      </ion-col>
                      <ion-col size-xs="12" size-sm="4" class="ion-text-center ion-align-self-end">
                        <ion-button 
                          expand="block" 
                          @click="resetFilter" 
                          color="secondary"
                          class="reset-button"
                        >
                          Reset Filter
                        </ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-card-content>
              </ion-card>

              <ion-card class="attendance-list-card">
                <ion-card-header>
                  <ion-card-title class="attendance-title">
                    Attendance List 
                    <small v-if="appliedDate" class="date-filter-text">
                      ({{ formatDate(appliedDate) }})
                    </small>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-list v-if="attendanceList.length" class="attendance-list" lines="full">
                    <ion-item v-for="attendance in attendanceList" :key="attendance.id" class="attendance-item">
                      <ion-avatar slot="start" class="user-avatar">
                        <img :src="attendance.user.avatar || '/assets/default-avatar.png'" :alt="attendance.user.username + ' avatar'">
                      </ion-avatar>
                      <ion-label>
                        <h2 class="username">{{ attendance.user.username }}</h2>
                        <p class="status-text">
                          <ion-badge 
                            :color="getStatusColor(attendance.attendance_status.status_name)"
                            class="status-badge"
                          >
                            {{ attendance.attendance_status.status_name }}
                          </ion-badge>
                        </p>
                      </ion-label>
                      <ion-label slot="end">
                        <p class="date-text">{{ formatDate(attendance.date) }}</p>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                  <p v-else class="no-records-text">
                    No attendance records found.
                  </p>
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
import { 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonMenuButton, 
  IonButton, 
  IonSplitPane, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonPage,
  IonCardContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonDatetime, 
  IonCardTitle, 
  IonCardHeader,
  IonAvatar,
  IonBadge
} from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import { defineComponent } from 'vue';
import SideMenu from '../../components/SideMenu.vue';

export default defineComponent({
  name: 'AttendanceComponent',
  components: {
    IonApp, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonMenuButton, 
    IonButton, 
    IonSplitPane, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonPage,
    IonCardContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonDatetime, 
    IonCardTitle, 
    IonCardHeader,
    IonAvatar,
    IonBadge,
    SideMenu
  },
  data() {
    return {
      specificDate: null,
      appliedDate: null
    }
  },
  computed: {
    ...mapState('attendance', ['totalAttendaceList']),
    attendanceList() {
      if (!this.totalAttendaceList) return [];
      
      return this.totalAttendaceList.filter(attendance => {
        if (!this.appliedDate) return true;
        
        const attendanceDate = new Date(attendance.login_time || attendance.createdAt);
        const filterDate = new Date(this.appliedDate);
        return attendanceDate.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchtotalattendancelist']),
    
    async fetchLeadData() {
      try {
        await this.fetchtotalattendancelist(); 
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString();
    },
    
    applyDateFilter() {
      this.appliedDate = this.specificDate;
      console.log('Date filter applied:', this.appliedDate);
    },

    resetFilter() {
      this.specificDate = null;
      this.appliedDate = null;
    },

    // New method to get badge color based on status
    getStatusColor(status) {
      switch(status.toLowerCase()) {
        case 'present': return 'success';
        case 'absent': return 'danger';
        case 'late': return 'warning';
        default: return 'medium';
      }
    }
  },
  async mounted() {
    try {
      await this.fetchLeadData();
    } catch (error) {
      console.error('Error in mounted hook:', error);
    }
  }
});
</script>
  
<style scoped>
.attendance-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filter-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.date-label {
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
}

.custom-datetime {
  width: 100%;
  --background: white;
  --border-radius: 8px;
  --border-color: #ddd;
  --border-style: solid;
  --border-width: 1px;
  padding: 10px;
}

.reset-button {
  height: 48px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.attendance-list-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.attendance-list {
  background-color: transparent;
}

.attendance-item {
  --padding-start: 15px;
  --inner-padding-end: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.user-avatar {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.username {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.status-text {
  display: flex;
  align-items: center;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
}

.date-text {
  color: #666;
  font-size: 14px;
  text-align: right;
}

.date-filter-text {
  color: #666;
  font-size: 14px;
  margin-left: 10px;
}

.no-records-text {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px;
}

.attendance-title {
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 700;
}
</style>