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
              <ion-title>Attendance Dashboard</ion-title>
            </ion-toolbar>
          </ion-header>
          
          <ion-content class="ion-padding">
            <div class="attendance-container">
              <!-- Stats Cards Row -->
              <ion-grid>
                <ion-row>
                  <!-- Present Today -->
                  <ion-col size-xs="12" size-sm="3">
                    <ion-card class="stats-card animate-gradient-1">
                      <ion-card-header>
                        <ion-card-title class="stats-title">Today's Present</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <div class="stats-content">
                          <div class="stats-number">{{ todayPresentCount }}</div>
                          <div class="stats-label">Present Today</div>
                        </div>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>

                  <!-- Absent Today -->
                  <ion-col size-xs="12" size-sm="3">
                    <ion-card class="stats-card animate-gradient-2">
                      <ion-card-header>
                        <ion-card-title class="stats-title">Today's Absent</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <div class="stats-content">
                          <div class="stats-number">{{ todayAbsentCount }}</div>
                          <div class="stats-label">Absent Today</div>
                        </div>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>

                  <!-- Late Today -->
                  <ion-col size-xs="12" size-sm="3">
                    <ion-card class="stats-card animate-gradient-3">
                      <ion-card-header>
                        <ion-card-title class="stats-title">Today's Late</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <div class="stats-content">
                          <div class="stats-number">{{ todayLateCount }}</div>
                          <div class="stats-label">Late Today</div>
                        </div>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>

                  <!-- Total Today -->
                  <ion-col size-xs="12" size-sm="3">
                    <ion-card class="stats-card animate-gradient-4">
                      <ion-card-header>
                        <ion-card-title class="stats-title">Total Today</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <div class="stats-content">
                          <div class="stats-number">{{ todayTotalCount }}</div>
                          <div class="stats-label">Total Records Today</div>
                        </div>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>

              <!-- Filter Card -->
              <ion-card class="filter-card">
                <ion-card-content>
                  <ion-grid>
                    <ion-row class="filter-row">
                      <ion-col size-xs="12" size-sm="8">
                        <ion-button 
                          expand="block" 
                          fill="outline" 
                          class="date-select-button"
                          @click="openDateModal"
                        >
                          <ion-icon 
                            :icon="calendarOutline" 
                            slot="start"
                          ></ion-icon>
                          {{ selectedDateDisplay || 'Select Date' }}
                        </ion-button>
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

              <!-- Date Picker Modal -->
              <ion-modal 
                :is-open="isDateModalOpen"
                @didDismiss="closeDateModal"
                class="date-modal"
              >
                <ion-header>
                  <ion-toolbar>
                    <ion-title>Select Date</ion-title>
                    <ion-buttons slot="end">
                      <ion-button @click="closeDateModal">Close</ion-button>
                    </ion-buttons>
                  </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                  <ion-datetime
                    presentation="date"
                    v-model="specificDate"
                    :show-default-buttons="true"
                    @ionChange="handleDateSelect"
                  ></ion-datetime>
                </ion-content>
              </ion-modal>

              <!-- Monthly User Statistics Card -->
              <ion-card class="monthly-stats-card">
                <ion-card-header>
                  <ion-card-title class="attendance-title">
                    Monthly User Statistics
                    <small class="date-filter-text">
                      ({{ formatDisplayDate(new Date()) }})
                    </small>
                  </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                  <div class="table-container" v-if="monthlyUserStats.length">
                    <table class="attendance-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Present Days</th>
                          <th>Absent Days</th>
                          <th>Late Days</th>
                          <th>Total Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="stat in monthlyUserStats" :key="stat.username">
                          <td class="username-cell">{{ stat.username }}</td>
                          <td>
                            <ion-badge color="success" class="status-badge">
                              {{ stat.present }}
                            </ion-badge>
                          </td>
                          <td>
                            <ion-badge color="danger" class="status-badge">
                              {{ stat.absent }}
                            </ion-badge>
                          </td>
                          <td>
                            <ion-badge color="warning" class="status-badge">
                              {{ stat.late }}
                            </ion-badge>
                          </td>
                          <td>
                            <ion-badge color="medium" class="status-badge">
                              {{ stat.present + stat.absent + stat.late }}
                            </ion-badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p v-else class="no-records-text">
                    No monthly statistics available.
                  </p>
                </ion-card-content>
              </ion-card>

              <!-- Daily Attendance List Card -->
              <ion-card class="attendance-table-card">
                <ion-card-header>
                  <ion-card-title class="attendance-title">
                    Daily Attendance List
                    <small v-if="appliedDate" class="date-filter-text">
                      ({{ formatDisplayDate(appliedDate) }})
                    </small>
                  </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                  <div class="table-container" v-if="attendanceList.length">
                    <table class="attendance-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Status</th>
                          <th>Login Time</th>
                          <th>Logout Time</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="attendance in attendanceList" :key="attendance.id">
                          <td class="username-cell">{{ attendance.user.username }}</td>
                          <td>
                            <ion-badge
                              :color="getStatusColor(attendance.attendance_status.status_name)"
                              class="status-badge"
                            >
                              {{ attendance.attendance_status.status_name }}
                            </ion-badge>
                          </td>
                          <td>{{ formatDateTime(attendance.login_time) }}</td>
                          <td>{{ formatDateTime(attendance.logout_time) }}</td>
                          <td>{{ calculateDuration(attendance.login_time, attendance.logout_time) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
  IonBadge,
  IonModal,
  IonIcon
} from '@ionic/vue';
import { calendarOutline } from 'ionicons/icons';
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
    IonBadge,
    IonModal,
    IonIcon,
    SideMenu
  },
  data() {
    return {
      specificDate: null,
      appliedDate: null,
      isDateModalOpen: false,
      selectedDateDisplay: '',
      calendarOutline
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
    },
    
    monthlyUserStats() {
      if (!this.totalAttendaceList) return [];
      
      // Get current month's first and last day
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      // Group attendance by username
      const userStats = {};
      
      this.totalAttendaceList.forEach(attendance => {
        const attendanceDate = new Date(attendance.login_time || attendance.createdAt);
        
        // Only process current month's attendance
        if (attendanceDate >= firstDayOfMonth && attendanceDate <= lastDayOfMonth) {
          const username = attendance.user.username;
          
          if (!userStats[username]) {
            userStats[username] = {
              username,
              present: 0,
              absent: 0,
              late: 0
            };
          }
          
          const status = attendance.attendance_status.status_name.toLowerCase();
          switch(status) {
            case 'present':
              userStats[username].present++;
              break;
            case 'absent':
              userStats[username].absent++;
              break;
            case 'late':
              userStats[username].late++;
              break;
          }
        }
      });
      
      // Convert to array and sort by username
      return Object.values(userStats).sort((a, b) => 
        a.username.localeCompare(b.username)
      );
    },
    
    todayPresentCount() {
      if (!this.totalAttendaceList) return 0;

      const today = new Date().toISOString().split('T')[0];
      return this.totalAttendaceList.filter(attendance => {
        const attendanceDate = new Date(attendance.login_time || attendance.createdAt).toISOString().split('T')[0];
        return attendanceDate === today && 
               attendance.attendance_status.status_name.toLowerCase() === 'present';
      }).length;
    },

    todayAbsentCount() {
      if (!this.totalAttendaceList) return 0;

      const today = new Date().toISOString().split('T')[0];
      return this.totalAttendaceList.filter(attendance => {
        const attendanceDate = new Date(attendance.login_time || attendance.createdAt).toISOString().split('T')[0];
        return attendanceDate === today && 
               attendance.attendance_status.status_name.toLowerCase() === 'absent';
      }).length;
    },

    todayLateCount() {
      if (!this.totalAttendaceList) return 0;

      const today = new Date().toISOString().split('T')[0];
      return this.totalAttendaceList.filter(attendance => {
        const attendanceDate = new Date(attendance.login_time || attendance.createdAt).toISOString().split('T')[0];
        return attendanceDate === today && 
               attendance.attendance_status.status_name.toLowerCase() === 'late';
      }).length;
    },

    todayTotalCount() {
      return this.todayPresentCount + this.todayAbsentCount + this.todayLateCount;
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchtotalattendancelist']),
    
    openDateModal() {
      this.isDateModalOpen = true;
    },

    closeDateModal() {
      this.isDateModalOpen = false;
    },

    handleDateSelect(event) {
      this.specificDate = event.detail.value;
      this.appliedDate = this.specificDate;
      this.selectedDateDisplay = this.formatDisplayDate(this.specificDate);
      this.closeDateModal();
    },
    
    async fetchLeadData() {
      try {
        await this.fetchtotalattendancelist();
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    },
    
    formatDisplayDate(dateString) {
      if (!dateString) return '';
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '-';
      const date = new Date(dateTimeString);
      
      const formatNumber = (num) => num.toString().padStart(2, '0');
      
      const day = formatNumber(date.getDate());
      const month = formatNumber(date.getMonth() + 1);
      const year = date.getFullYear();
      const hours = formatNumber(date.getHours());
      const minutes = formatNumber(date.getMinutes());
      const seconds = formatNumber(date.getSeconds());
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },

    calculateDuration(loginTime, logoutTime) {
      if (!loginTime || !logoutTime) return '-';
      
      const start = new Date(loginTime);
      const end = new Date(logoutTime);
      const diff = end - start;
      
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      
      return `${hours}h ${minutes}m`;
    },

    resetFilter() {
      this.specificDate = null;
      this.appliedDate = null;
      this.selectedDateDisplay = '';
    },

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
  max-width: 1200px;
  margin: 0 auto;
}

.stats-card {
  height: 100%;
  background: linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%);
}

.animate-gradient-1 {
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
}

.animate-gradient-2 {
  background: linear-gradient(135deg, #FF9800 0%, #F44336 100%);
}

.animate-gradient-3 {
  background: linear-gradient(135deg, #9C27B0 0%, #673AB7 100%);
}

.stats-content {
  text-align: center;
  color: white;
}

.stats-number {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stats-label {
  font-size: 1.1em;
  opacity: 0.9;
}

.stats-title {
  color: white;
  font-size: 1.2em;
}

.filter-card {
  margin: 1rem 0;
}

.date-select-button {
  width: 100%;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-table th,
.attendance-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--ion-color-light);
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}

.no-records-text {
  text-align: center;
  color: var(--ion-color-medium);
  padding: 2rem;
}

.date-filter-text {
  font-size: 0.8em;
  color: var(--ion-color-medium);
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .attendance-table {
    display: block;
    overflow-x: auto;
  }
  
  .stats-card {
    margin-bottom: 1rem;
  }
}
</style>