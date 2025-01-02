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
              <ion-title>Attendance Status</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search here"
                  class="custom-searchbar"
                  v-model="searchQuery"
                  @ionChange="performSearch"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <!-- Stats Cards -->
            <ion-grid class="time-status-grid">
              <ion-row>
                <ion-col size="6" size-md="3">
                  <div class="time-card login">
                    <div class="time-icon">
                      <ion-icon :icon="logInOutline"></ion-icon>
                    </div>
                    <div class="time-content">
                      <h3>9:30</h3>
                      <p>LOG IN</p>
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="3">
                  <div class="time-card present">
                    <div class="time-icon">
                      <ion-icon :icon="timeOutline"></ion-icon>
                    </div>
                    <div class="time-content">
                      <h3>Present</h3>
                      <p>{{ totalcurrentPresentCount }}</p>
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="3">
                  <div class="time-card working">
                    <div class="time-icon">
                      <ion-icon :icon="calendarOutline"></ion-icon>
                    </div>
                    <div class="time-content">
                      <h3>30 Days</h3>
                      <p>WORKING DAYS</p>
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="3">
                  <div class="time-card leave">
                    <div class="time-icon">
                      <ion-icon :icon="notificationsOffOutline"></ion-icon>
                    </div>
                    <div class="time-content">
                      <h3>LEAVE</h3>
                      <p>{{ totalcurrentAbsentCount }}</p>
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
  
            <!-- Attendance Table -->
            <div class="attendance-table">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>CHECK IN</th>
                    <th>CHECK OUT</th>
                    <th>STATUS</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in filteredAttendanceRecords" :key="index">
                    <td>{{ record.date }}</td>
                    <td>{{ record.checkIn }}</td>
                    <td>{{ record.checkOut }}</td>
                    <td>
                      <span :class="['status-badge', record.status.toLowerCase()]">
                        {{ record.status }}
                      </span>
                    </td>
                
                  </tr>
                  <tr v-if="filteredAttendanceRecords.length === 0">
                    <td colspan="5" class="no-results">No attendance records found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { mapActions, mapState } from 'vuex';
import { format } from 'date-fns';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonPage
} from '@ionic/vue';
import { 
  peopleOutline, personOutline, closeCircleOutline,
  logInOutline, timeOutline, calendarOutline,
  notificationsOffOutline
} from 'ionicons/icons';
import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'AttendanceStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    SideMenu, IonPage
  },
  setup() {
    const searchQuery = ref('');

    return {
      peopleOutline,
      personOutline,
      closeCircleOutline,
      logInOutline,
      timeOutline,
      calendarOutline,
      notificationsOffOutline,
      searchQuery
    };
  },
  computed: {
    ...mapState('attendance', [
      'totalAttendaceListId', 
      'totalcurrentAbsentCount', 
      'totalcurrentPresentCount',
    ]),

    attendanceRecords() {
      // Check if totalAttendaceListId contains a `data` array
      const recordsData = this.totalAttendaceListId?.rows || [];
      
      // Map through `data` to transform it into the desired format
      const records = recordsData.map(record => {
        const loginTime = new Date(record.login_time);
        const logoutTime = record.logout_time ? new Date(record.logout_time) : null;

        return {
          date: format(loginTime, 'yyyy-MM-dd'), // Format date as 'YYYY-MM-DD'
          checkIn: format(loginTime, 'HH:mm'), // Format check-in time as 'HH:mm'
          checkOut: logoutTime ? format(logoutTime, 'HH:mm') : 'N/A', // Format logout time
          status: record.attendance_status?.status_name || 'Unknown', // Adjust as per data structure
          actualTime: '9.00 am to 4.00 pm' // Update this calculation if needed
        };
      });

      return records;
    },

    filteredAttendanceRecords() {
      if (!this.searchQuery) return this.attendanceRecords;

      const query = this.searchQuery.toLowerCase().trim();
      return this.attendanceRecords.filter(record => 
        Object.values(record).some(value => 
          String(value).toLowerCase().includes(query)
        )
      );
    }
  },

  methods: {
    ...mapActions('attendance', [
      'fetchtotalAttendancelistId', 
      'fetchtotalCurrentAbsentCount', 
      'fetchtotalCurrentPresentCount',
    ]),

    performSearch() {
      // You can add any additional search-related logic here if needed
      // Currently, the search is handled by the computed filteredAttendanceRecords
    },

    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalAttendancelistId(userId);
        await this.fetchtotalCurrentAbsentCount(userId);
        await this.fetchtotalCurrentPresentCount(userId);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    },
  },

  async mounted() {
    try {
      this.fetchleadData();
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  }
});
</script>

<style scoped>
.custom-searchbar {
  max-width: 300px;
  padding: 0 10px;
}

.stats-grid, .time-status-grid {
  padding: 16px;
  background-color: #110808;
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

.time-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.time-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.login .time-icon {
  background: #e3f2fd;
  color: #2196f3;
}

.present .time-icon {
  background: #e8f5e9;
  color: #4caf50;
}

.working .time-icon {
  background: #fff3e0;
  color: #ff9800;
}

.leave .time-icon {
  background: #ffebee;
  color: #f44336;
}

.time-content h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.time-content p {
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
}

.attendance-table {
  margin: 16px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f5f5f5;
  font-weight: 500;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.status-badge.present {
  background: #e8f5e9;
  color: #4caf50;
}

.status-badge.leave {
  background: #ffebee;
  color: #f44336;
}

.actual-time {
  color: #2196f3;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #888;
}

@media (max-width: 768px) {
  .custom-searchbar {
    max-width: 100%;
  }

  .attendance-table {
    margin: 16px 8px;
    overflow-x: auto;
  }

  table {
    min-width: 800px;
  }
}


</style>