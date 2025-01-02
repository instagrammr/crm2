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
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
  
            <!-- Leads List -->
            <div class="leads-list"   v-if="filteredLeads.length">
              <ion-card v-for="lead in filteredLeads" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }} 
                        <!-- <span class="status-badge" :class="lead.lead_status.status_name.toLowerCase()">
                          {{ lead.lead_status.status_name }}
                        </span> -->
                      </h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                        <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                        <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new Date(lead.date).toISOString().split('T')[0] }}</span>
                        <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span>
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span>
                        <span> status: {{ lead.student_status && lead.student_status.status_name ? lead.student_status.status_name : 'N/A' }}</span>

                      </div>
                    </div>
                    <!-- <div class="action-buttons">
                      <ion-button fill="clear" size="small" @click="openUpdateModal(lead.id)">
                        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                      </ion-button>
                      <ion-button fill="clear" size="small">
                        <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                      </ion-button>
                      <ion-button fill="clear" size="small" @click="handledelete(lead)">
                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                      </ion-button>
                    </div> -->
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
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel, 
} from '@ionic/vue';
import { 
  peopleOutline, personAddOutline, closeCircleOutline, 
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline
} from 'ionicons/icons';
import SideMenu from '../../components/SideMenu.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, IonInput,
    IonItem, IonSelect, IonSelectOption, IonLabel
  },
  data() {
    return {
      showUpdate: false,
      name: '',
      mobile: '',
      address: '',
      country: '',
      source: '',
      tenth: '',
      twelth: '',
      deleteItem: {},
      degree: '',
      pg: '',
      ielts: '',
      year: '',
      field: '',
      showDelete:false,
      counsillerId: null,
      document: null,
      currentleadId: null, 
      peopleOutline, personAddOutline, closeCircleOutline, 
      refreshCircleOutline, callOutline, locationOutline,
      timeOutline, globeOutline, createOutline, eyeOutline,
      trash, chevronBackOutline
    }
  },
  computed: {
    ...mapState('addLead', ['totalLeadList',]),
    filteredLeads() {
      return this.totalLeadList.filter(lead => lead.studentStatusId);
    },
    
     },
  methods: {
    ...mapActions('addLead', ['fetchtotalleadlist',]),
    async fetchleadData() {
      try {
        await this.fetchtotalleadlist();
        // console.log("Leads fetched successfully:", this.totalLeadListId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
    
  },
  // watch: {
  // totalcounsillerList(newVal) {
  //   console.log('Updated Counselor List:', newVal);
  // }
  // },
    async mounted() {
      try {
        this.fetchleadData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
});
</script>
  
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