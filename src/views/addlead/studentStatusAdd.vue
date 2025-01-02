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
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <!-- No Results Message -->
            <div v-if="filteredStudents.length === 0" class="no-results">
              <ion-icon :icon="searchOutline" class="no-results-icon"></ion-icon>
              <h3>No students found</h3>
              <p>Try adjusting your search or filters</p>
            </div>

            <!-- Students List -->
            <div class="leads-list" v-else>
              <ion-card v-for="student in filteredStudents" :key="student.id" class="student-card">
                <ion-card-content>
                  <div class="student-header">
                    <div class="student-info">
                      <div class="name-status-row">
                        <h3>{{ student.student_name }}</h3>
                        <ion-chip :class="getStatusClass(student.student_status?.status_name)">
                          {{ student.student_status?.status_name || 'N/A' }}
                        </ion-chip>
                      </div>
                      
                      <div class="info-grid">
                        <div class="info-item">
                          <ion-icon :icon="callOutline"></ion-icon>
                          <span>{{ student.mobile }}</span>
                        </div>
                        <div class="info-item">
                          <ion-icon :icon="timeOutline"></ion-icon>
                          <span>Created: {{ formatDate(student.date) }}</span>
                        </div>
                        <div class="info-item">
                          <ion-icon :icon="globeOutline"></ion-icon>
                          <span>{{ student.country }}</span>
                        </div>
                      </div>
                      
                      <div class="source-details">
                        <ion-badge color="tertiary">{{ student.lead_source }}</ion-badge>
                      </div>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Infinite Scroll -->
            <ion-infinite-scroll @ionInfinite="loadMore">
              <ion-infinite-scroll-content 
                loading-spinner="bubbles"
                loading-text="Loading more students...">
              </ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { mapActions, mapState } from 'vuex';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonSearchbar, IonCard, IonCardContent, 
  IonPage, IonSegment, IonSegmentButton, IonLabel,
  IonChip, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/vue';
import { 
  callOutline, locationOutline, timeOutline, globeOutline,
  createOutline, eyeOutline, refreshCircleOutline, searchOutline
} from 'ionicons/icons';
import SideMenu from '../../components/addleadside.vue';


export default defineComponent({
  name: 'StudentStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonSearchbar, IonCard, IonCardContent, 
    IonPage, IonSegment, IonSegmentButton, IonLabel,
    IonChip, IonBadge, SideMenu, IonInfiniteScroll,
    IonInfiniteScrollContent
  },
  
  setup() {
    const searchQuery = ref('');
    const activeFilter = ref('all');
    const page = ref(1);
    const perPage = ref(10);
    
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
      searchOutline
    }
  },

  computed: {
    ...mapState('user', ['totalstatusList']),
    
    filteredStudents() {
      let filtered = this.totalstatusList || [];
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(student => 
          student.student_name?.toLowerCase().includes(query) ||
          student.mobile?.toLowerCase().includes(query) ||
          student.location?.toLowerCase().includes(query) ||
          student.country?.toLowerCase().includes(query)
        );
      }
      
      if (this.activeFilter !== 'all') {
        filtered = filtered.filter(student => 
          student.student_status?.status_name?.toLowerCase() === this.activeFilter
        );
      }
      
      return filtered;
    }
  },

  methods: {
    ...mapActions('user', ['fetchtotalstatuslist']),
    
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
    
    getStatusClass(status) {
      const statusMap = {
        'active': 'status-active',
        'pending': 'status-pending',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
      };
      return statusMap[status?.toLowerCase()] || 'status-default';
    },
    
    async loadMore(event) {
      this.page++;
      await this.fetchtotalstatuslist({
        page: this.page,
        perPage: this.perPage
      });
      event.target.complete();
    },
    
    async fetchInitialData() {
      try {
        await this.fetchtotalstatuslist({
          page: this.page,
          perPage: this.perPage
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
  },

  mounted() {
    this.fetchInitialData();
  }
});
</script>

<style scoped>
/* Searchbar specific styles */
.custom-searchbar {
  --background: white;
  --color: black;
  --placeholder-color: #666;
  --icon-color: black !important;
  --clear-button-color: black;
  max-width: 300px;
  border-radius: 8px;
  --box-shadow: none;
}

/* Target all searchbar parts to ensure black color */
.custom-searchbar ::part(search-icon) {
  color: black !important;
}

.custom-searchbar ::part(clear-icon) {
  color: black !important;
}

.custom-searchbar ::part(icon) {
  color: black !important;
}

/* Rest of the styles */
.search-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
}

.leads-list {
  padding: 16px;
  background-color: var(--ion-color-light);
  min-height: 100%;
}

.student-card {
  margin: 12px 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.student-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.student-info {
  flex: 1;
}

.name-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.name-status-row h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ion-color-medium);
}

.info-item ion-icon {
  font-size: 18px;
  color: var(--ion-color-primary);
}

.source-details {
  margin-top: 12px;
}

.status-active {
  --background: var(--ion-color-success);
  --color: white;
}

.status-pending {
  --background: var(--ion-color-warning);
  --color: white;
}

.status-completed {
  --background: var(--ion-color-primary);
  --color: white;
}

.status-cancelled {
  --background: var(--ion-color-danger);
  --color: white;
}

.status-default {
  --background: var(--ion-color-medium);
  --color: white;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: var(--ion-color-medium);
  text-align: center;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .custom-searchbar {
    max-width: 100%;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .name-status-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>