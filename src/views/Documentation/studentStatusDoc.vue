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
              <ion-buttons slot="end" class="search-container">
                <ion-searchbar
                  v-model="searchQuery"
                  placeholder="Search by name, mobile, or location"
                  class="custom-searchbar"
                  @ionInput="handleSearch"
                  clear-icon="close-circle"
                  show-clear-button="always"
                ></ion-searchbar>
              
              </ion-buttons>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
       

            <!-- Students List -->
            <div class="leads-list"  v-if="totalstudentListId && totalstudentListId.rows">
              <ion-card v-for="lead in totalstudentListId.rows" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }} 
                      
                      </h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                        <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                        <span v-if="lead.applicationAssignId" style="color: blue;">Application</span>
                        <span v-if="lead.student_status && lead.student_status.status_name" style="color: blue;">
                            {{ lead.student_status.status_name }}
                          </span>
                    
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span><br />
                        <!-- <span> status: {{ lead.application && lead.application.status_name ? lead.application.status_name : 'N/A' }}</span> -->
                      </div>
                      <br />
                      <!-- <ion-select 
                        v-model="lead.applicationId" 
                        label="Status" 
                        labelPlacement="floating" 
                        fill="solid" 
                        class="form-select"
                        @ionChange="updateLeadStatus(lead)"
                      >
                        <ion-select-option 
                          v-for="status in totalapplicationList" 
                          :key="status.id" 
                          :value="status.id"
                        >
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                      <br />
                      <ion-select v-model="lead.studentStatusId" label="Status" labelPlacement="floating" fill="solid" class="form-select" @ionChange="updateStudentStatus(lead)">
                        <ion-select-option v-for="status in totalstatusList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select> -->
                    </div>
                    </div>
                  </ion-card-content>
                </ion-card>
                </div>

            <!-- Infinite Scroll -->
        
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
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonSearchbar, IonCard, IonCardContent, 
  IonPage, IonSegment, IonSegmentButton, IonLabel, IonBadge,
  IonChip, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/vue';
import { 
  callOutline, locationOutline, timeOutline, globeOutline,
  createOutline, eyeOutline, refreshCircleOutline, searchOutline,
  notificationsOutline
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';

export default defineComponent({
  name: 'StudentStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonSearchbar, IonCard, IonCardContent, 
    IonPage, IonSegment, IonSegmentButton, IonLabel,
    IonChip, IonBadge, SideMenu, IonInfiniteScroll,
    IonInfiniteScrollContent, 
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
      callOutline,
      locationOutline,
      timeOutline,
      globeOutline,
      createOutline,
      eyeOutline,
      refreshCircleOutline,
      searchOutline,
      notificationsOutline,
      notificationCount
    }
  },

  computed: {
    ...mapState('document', ['totalstudentListId', 'totaltodayLeadCount']),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    // filteredStudents() {
    //   let filtered = this.totalstudentListId || [];
      
    //   if (this.searchQuery) {
    //     const query = this.searchQuery.toLowerCase();
    //     filtered = filtered.filter(student => 
    //       student.student_name?.toLowerCase().includes(query) ||
    //       student.mobile?.toLowerCase().includes(query) ||
    //       student.location?.toLowerCase().includes(query) ||
    //       student.country?.toLowerCase().includes(query)
    //     );
    //   }
      
    //   if (this.activeFilter !== 'all') {
    //     filtered = filtered.filter(student => 
    //       student.student_status?.status_name?.toLowerCase() === this.activeFilter
    //     );
    //   }
      
    //   return filtered;
    // }
  },

  methods: {
    ...mapActions('document', ['fetchtotalstudentlistId', 'fetchtotaltodayLeadCount']),
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
      this.searchQuery = event.target.value;
    },
    
    clearSearch() {
      this.searchQuery = '';
      this.activeFilter = 'all';
    },
    
    handleFilterChange(event) {
      this.activeFilter = event.detail.value;
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    
    // getStatusClass(status) {
    //   const statusMap = {
    //     'active': 'status-active',
    //     'pending': 'status-pending',
    //     'completed': 'status-completed',
    //     'cancelled': 'status-cancelled'
    //   };
    //   return statusMap[status?.toLowerCase()] || 'status-default';
    // },
    
    // async loadMore(event) {
    //   this.page++;
    //   await this.fetchtotalstudentlistId({
    //     page: this.page,
    //     perPage: this.perPage
    //   });
    //   event.target.complete();
    // },
    
    // async fetchInitialData() {
    //   try {
    //     await this.fetchtotalstudentlistId({
    //       page: this.page,
    //       perPage: this.perPage
    //     });
    //   } catch (error) {
    //     console.error('Error fetching student data:', error);
    //   }
    // }
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalstudentlistId(userId);
        await this.fetchtotaltodayLeadCount(userId);
        // await this.fetchtotalprioritylist();
        // console.log("Leads fetched successfully:", this.totalLeadListId);
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
