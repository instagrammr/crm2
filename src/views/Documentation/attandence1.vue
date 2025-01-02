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
                <ion-searchbar v-model="searchQuery" placeholder="Search here" class="custom-searchbar"
                  @ionInput="handleSearch" clear-icon="close-circle" show-clear-button="always"></ion-searchbar>
              </ion-buttons>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
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
                      <h3>26 Days</h3>
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
import { alertController } from '@ionic/vue';
import { format } from 'date-fns';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton, IonIcon,
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonPage, IonBadge
} from '@ionic/vue';
import {
  peopleOutline, personOutline, closeCircleOutline,
  logInOutline, timeOutline, calendarOutline,
  notificationsOffOutline, notificationsOutline
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';

export default defineComponent({
  name: 'AttendanceStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    SideMenu, IonPage, IonBadge
  },
  setup() {
    const searchQuery = ref('');
    const searchDebounceTimeout = ref(null);
    const notificationCount = ref(0);

    return {
      searchQuery,
      searchDebounceTimeout,
      peopleOutline,
      personOutline,
      closeCircleOutline,
      logInOutline,
      timeOutline,
      calendarOutline,
      notificationsOffOutline,
      notificationsOutline,
      notificationCount

    };
  },
  computed: {
    ...mapState('attendance', ['totalAttendaceListId', 'totalcurrentAbsentCount', 'totalcurrentPresentCount']),
    ...mapState('document', ['totaltodayLeadCount',]),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    attendanceRecords() {
      const recordsData = this.totalAttendaceListId?.rows || [];

      return recordsData.map(record => {
        const loginTime = new Date(record.login_time);
        const logoutTime = record.logout_time ? new Date(record.logout_time) : null;

        return {
          date: format(loginTime, 'yyyy-MM-dd'),
          checkIn: format(loginTime, 'HH:mm'),
          checkOut: logoutTime ? format(logoutTime, 'HH:mm') : 'N/A',
          status: record.attendance_status?.status_name || 'Unknown',
          actualTime: '9.00 am to 4.00 pm'
        };
      });
    },

    filteredAttendanceRecords() {
      if (!this.searchQuery) {
        return this.attendanceRecords;
      }

      const query = this.searchQuery.toLowerCase().trim();

      return this.attendanceRecords.filter(record => {
        return (
          record.date.toLowerCase().includes(query) ||
          record.checkIn.toLowerCase().includes(query) ||
          record.checkOut.toLowerCase().includes(query) ||
          record.status.toLowerCase().includes(query) ||
          record.actualTime.toLowerCase().includes(query)
        );
      });
    }
  },

  methods: {
    ...mapActions('attendance', [
      'fetchtotalAttendancelistId',
      'fetchtotalCurrentAbsentCount',
      'fetchtotalCurrentPresentCount'
    ]),
    ...mapActions('document', [
      'fetchtotaltodayLeadCount',
    ]),
    navigateToNoti() {
      this.$router.push({ name: 'NotificationDoc' });
    },
    async showNewLeadAlert() {
      const alert = await alertController.create({
        header: 'New Lead',
        message: `You have ${this.totaltodayLeadCount} lead${this.totaltodayLeadCount > 1 ? 's' : ''} to follow up!`,
        buttons: ['OK'],
      });
      await alert.present();
    },
    handleSearch(event) {
      // Clear any existing timeout
      if (this.searchDebounceTimeout) {
        clearTimeout(this.searchDebounceTimeout);
      }

      // Set a new timeout to update the search query
      this.searchDebounceTimeout = setTimeout(() => {
        this.searchQuery = event.target.value;
      }, 300); // 300ms debounce
    },

    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalAttendancelistId(userId);
        await this.fetchtotalCurrentAbsentCount(userId);
        await this.fetchtotalCurrentPresentCount(userId);
        await this.fetchtotaltodayLeadCount(userId);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    },
  },
  watch: {
    totaltodayLeadCount(newCount) {
      if (newCount > 0) {
        this.notificationCount = newCount; // Update local count
        this.showNewLeadAlert(); // Trigger the alert for any leads
      }
    },
  },
  async mounted() {
    try {
      await this.fetchleadData();
      this.notificationCount = this.totaltodayLeadCount;
      if (this.totaltodayLeadCount > 0) {
        await this.showNewLeadAlert();
      }
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  },

  beforeUnmount() {
    // Clear any existing timeout when component is unmounted
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }
  }
});
</script>

<style scoped>
.notification-badge {
  position: absolute;
  top: 7px;
  right: 9px;
  background: red;
  color: white;
  font-size: 9px;
  border-radius: 50%;
  padding: 3px 5px;
  z-index: 10;
}

.view-modal {
  --height: 100%;
  --width: 100%;
  --max-height: 100%;
  --max-width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}

.custom-searchbar {
  max-width: 300px;
  padding: 0 10px;
}

.stats-grid,
.time-status-grid {
  padding: 16px;
  background-color: #f5f5f5;
}

.stats-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
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