<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <SideMenu />
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar class="header-toolbar">
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title>Student Status</ion-title>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <div class="leads-list" v-if="totalstudentListId && totalstudentListId.rows">
              <ion-card v-for="lead in totalstudentListId.rows" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }}</h3>
                      <div class="info-row">
                        <span><i class="fas fa-phone-alt"></i>{{ lead.mobile }}</span>
                        <span v-if="lead.documentAssignId" style="color: blue;">Documentation</span>
                        <span v-if="lead.applicationAssignId" style="color: blue;">Application</span>
                        <span v-if="lead.student_status && lead.student_status.status_name" style="color: blue;">
                            {{ lead.student_status.status_name }}
                          </span>
                        <span><i class="fas fa-clock"></i> {{ new Date(lead.date).toISOString().split('T')[0] }}</span>
                      </div>
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
import { defineComponent, ref, computed } from 'vue';
import { mapActions, mapState } from 'vuex';
import { alertController } from '@ionic/vue';
import { 
   notificationsOutline
} from 'ionicons/icons';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonCard, IonCardContent, 
  IonPage, IonInfiniteScroll, IonInfiniteScrollContent, IonBadge,
  IonButton, IonIcon, IonSplitPane
} from '@ionic/vue';
import SideMenu from '../../components/Counselorside.vue';

export default defineComponent({
  name: 'StudentStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonCard, IonCardContent, 
    IonPage, SideMenu, IonInfiniteScroll, IonInfiniteScrollContent, IonBadge,
    IonButton, IonIcon, IonSplitPane
  },
  
  setup() {
    const searchQuery = ref('');
    const activeFilter = ref('all');
    const page = ref(1);
    const perPage = ref(10);
    const notificationCount = ref(0);

    
    return {
      searchQuery,
      activeFilter,
      page,
      perPage,
      notificationCount,
      notificationsOutline
    };
  },

  computed: {
    ...mapState('counsiller', ['totalstudentListId', 'totaltodayLeadCount']),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
  },

  methods: {
    ...mapActions('counsiller', ['fetchtotalstudentlistId', 'fetchtotaltodayLeadCount']),
    navigateToNoti() {
          this.$router.push({ name: 'notificationCouns' });
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
      this.searchQuery = event.target.value;
    },
    
    clearSearch() {
      this.searchQuery = '';
      this.activeFilter = 'all';
    },
    
    handleFilterChange(event) {
      this.activeFilter = event.detail.value;
    },
    
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalstudentlistId(userId);
        await this.fetchtotaltodayLeadCount(userId);
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
      console.error('Error fetching data:', error);
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
.leads-list ion-card {
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  color: var(--text-color, #333);
}
.leads-list ion-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
.lead-header {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}
.lead-info h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.info-row {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}
.info-row span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.info-row span i {
  color: var(--icon-color, #007bff);
}
.info-row span:hover {
  text-decoration: underline;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .leads-list ion-card {
    margin: 10px;
  }
  .lead-info h3 {
    font-size: 18px;
  }
  .info-row {
    font-size: 12px;
    gap: 5px;
  }
}

</style>
