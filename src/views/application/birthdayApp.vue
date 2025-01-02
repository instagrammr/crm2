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
                  <ion-icon :icon="searchOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
              <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles">
              </ion-refresher-content>
            </ion-refresher>
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
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard, IonPage,
  IonCardContent, IonList, IonItem, IonLabel, IonBadge,
  IonRefresher,
  IonRefresherContent
} from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import { defineComponent, ref } from 'vue';
import { alertController } from '@ionic/vue';
import { notificationsOutline, searchOutline, calendarOutline } from 'ionicons/icons';
import SideMenu from '../../components/applicationside.vue';

export default defineComponent({
  name: 'AttendanceComponent',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonSplitPane, IonGrid, IonRow, IonCol, IonCard,
    IonCardContent, IonList, IonItem, IonLabel, SideMenu,
    IonPage, IonBadge,
    IonRefresher,
    IonRefresherContent
  },
  data() {
    return {
      notificationsOutline,
      searchOutline,
      calendarOutline,
      notificationCount: 0,
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
    ...mapState('application', ['totaltodayLeadCount',]),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
  },
  methods: {
    ...mapActions('user', ['fetchtotaluserlist',]),
    ...mapActions('application', [
      'fetchtotaltodayLeadCount',
    ]),
    navigateToNoti() {
      this.$router.push({ name: 'NotificationApp' });
    },
    async showNewLeadAlert() {
      const alert = await alertController.create({
        header: 'New Lead',
        message: `You have ${this.totaltodayLeadCount} lead${this.totaltodayLeadCount > 1 ? 's' : ''} to follow up!`,
        buttons: ['OK'],
      });
      await alert.present();
    },
    async handleRefresh(event) {
      try {

        // Refresh all your data
        await this.fetchleadData();

        const currentCount = this.totaltodayLeadCount;

        this.notificationCount = currentCount;

        // Show alert if there's any count
        if (currentCount > 0) {
          console.log('Leads detected, showing alert...');
          await this.showNewLeadAlert();
        }

        // Complete the refresh
        event.target.complete();
      } catch (error) {
        console.error('Error refreshing data:', error);
        event.target.complete();
      }
    },
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotaluserlist();
        await this.fetchtotaltodayLeadCount(userId);
        // console.log("Leads fetched successfully:", this.totalfollowupListId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
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
      console.error('Error fetching lead list:', error);
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