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
              <ion-title>Student Status</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search here"
                  class="custom-searchbar"
                  v-model="searchQuery"
                  @ionInput="handleSearch"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <div class="leads-list" v-if="filteredLeads.length">
              <ion-card v-for="lead in filteredLeads" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }}</h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                        <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                        <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new Date(lead.date).toISOString().split('T')[0] }}</span>
                        <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span>
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span>
                        <span>Status: {{ lead.student_status?.status_name || 'N/A' }}</span>
                      </div>
                    </div>
                    <div class="action-buttons">
                      <ion-button fill="clear" size="small" @click="openDetailsModal(lead)">
                        <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                      </ion-button>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
            <div v-else-if="searchQuery" class="no-results">
              <p>No students found matching your search.</p>
            </div>

            <!-- Details Modal -->
            <ion-modal :is-open="showDetailsModal" @didDismiss="closeDetailsModal" class="details-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="closeDetailsModal">
                      <ion-icon :icon="closeCircleOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                  <ion-title>Student Details</ion-title>
                </ion-toolbar>
              </ion-header>

              <ion-content class="ion-padding" v-if="selectedLead">
                <ion-card>
                  <ion-card-content>
                    <h2 class="detail-title">Personal Information</h2>
                    <ion-list>
                      <ion-item>
                        <ion-label>Name: {{ selectedLead.student_name }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Mobile: {{ selectedLead.mobile }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Location: {{ selectedLead.location }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Country: {{ selectedLead.country }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Lead Source: {{ selectedLead.lead_source }}</ion-label>
                      </ion-item>
                    </ion-list>

                    <h2 class="detail-title">Academic Information</h2>
                    <ion-list>
                      <ion-item>
                        <ion-label>10th Mark: {{ selectedLead.mark_tenth || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>12th Mark: {{ selectedLead.mark_twelth || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Degree Mark: {{ selectedLead.mark_degree || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>PG Mark: {{ selectedLead.mark_pg || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>IELTS Score: {{ selectedLead.mark_ielts || 'N/A' }}</ion-label>
                      </ion-item>
                    </ion-list>

                    <h2 class="detail-title">Status Information</h2>
                    <ion-list>
                      <ion-item>
                        <ion-label>Current Status: {{ selectedLead.student_status?.status_name || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Counsellor: {{ selectedLead.counsill?.username || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Document Status: {{ selectedLead.document?.status_name || 'N/A' }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>Application Status: {{ selectedLead.application?.status_name || 'N/A' }}</ion-label>
                      </ion-item>
                    </ion-list>
                  </ion-card-content>
                </ion-card>
              </ion-content>
            </ion-modal>
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
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem, IonSelect, IonSelectOption, IonLabel, IonList
} from '@ionic/vue';
import { 
  peopleOutline, personAddOutline, closeCircleOutline, 
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline
} from 'ionicons/icons';
import SideMenu from '../../components/SideMenu.vue';

export default defineComponent({
  name: 'StudentStatus',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, 
    IonInput, IonItem, IonSelect, IonSelectOption, IonLabel,
    IonList
  },
  
  data() {
    return {
      searchQuery: '',
      showDetailsModal: false,
      selectedLead: null,
      peopleOutline,
      personAddOutline,
      closeCircleOutline, 
      refreshCircleOutline,
      callOutline,
      locationOutline,
      timeOutline,
      globeOutline,
      createOutline,
      eyeOutline,
      trash,
      chevronBackOutline
    }
  },
  
  computed: {
    ...mapState('addLead', ['totalLeadList']),
    
    filteredLeads() {
      let leads = this.totalLeadList.filter(lead => lead.studentStatusId);
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        leads = leads.filter(lead => {
          return (
            (lead.student_name && lead.student_name.toLowerCase().includes(query)) ||
            (lead.mobile && lead.mobile.toString().includes(query)) ||
            (lead.location && lead.location.toLowerCase().includes(query)) ||
            (lead.country && lead.country.toLowerCase().includes(query)) ||
            (lead.lead_source && lead.lead_source.toLowerCase().includes(query)) ||
            (lead.student_status?.status_name && lead.student_status.status_name.toLowerCase().includes(query))
          );
        });
      }
      
      return leads;
    }
  },
  
  methods: {
    ...mapActions('addLead', ['fetchtotalleadlist']),
    
    handleSearch(event) {
      this.searchQuery = event.target.value;
    },
    
    openDetailsModal(lead) {
      this.selectedLead = lead;
      this.showDetailsModal = true;
    },
    
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedLead = null;
    },
    
    async fetchleadData() {
      try {
        await this.fetchtotalleadlist();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    }
  },
  
  mounted() {
    this.fetchleadData();
  }
});
</script>

<style scoped>
.lead-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.lead-info {
  flex: 1;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0.5rem 0;
}

.source-row {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.info-row span, .source-row span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.detail-title {
  margin: 1.5rem 0 1rem;
  color: var(--ion-color-primary);
  font-weight: bold;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--ion-color-medium);
}

.details-modal {
  --height: 90%;
  --border-radius: 10px;
}

ion-card {
  margin: 1rem;
}

.custom-searchbar {
  max-width: 300px;
}
</style>
  
<style scoped>
.modal2{
    --height: 24%;
    }
 .modal{
    --height: 50%;
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    /* display: flex;
    align-items: center; */
  } 
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

.stats-content h4 {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.stats-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.stats-label {
  font-size: 12px;
  color: #666;
}

.leads-list {
  padding: 16px;
}

.leads-list ion-card {
  margin: 16px 0;
}

.lead-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.lead-info h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.status-badge.cancelled {
  background: #dc2626;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
  color: #666;
}

.info-row span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.source-row {
  margin-top: 8px;
  color: #666;
}

.action-buttons ion-button {
  --color: #666;
}

@media (max-width: 768px) {
  .custom-searchbar {
    max-width: 100%;
  }

  .info-row {
    flex-direction: column;
    gap: 8px;
  }
}
</style>