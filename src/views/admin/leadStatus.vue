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
              <ion-title>Lead Status</ion-title>
              
              <!-- Search Controls -->
              <ion-buttons slot="end" class="search-controls">
               
                
                <ion-searchbar
                  :placeholder="`Search by ${getSearchFieldLabel()}...`"
                  class="custom-searchbar"
                  v-model="searchQuery"
                  @ionInput="handleSearch"
                  @ionClear="clearSearch"
                  animated
                  show-clear-button="always"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content>
          

            <!-- Leads List -->
            <div class="leads-list" v-if="filteredLeads && filteredLeads.length">
              <ion-card v-for="lead in filteredLeads" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }}</h3>
                      <div class="info-row">
                        <span>
                          <ion-icon :icon="callOutline"></ion-icon>
                          {{ lead.mobile || 'N/A' }}
                        </span>
                        <span>
                          <ion-icon :icon="globeOutline"></ion-icon>
                          {{ lead.country || 'N/A' }}
                        </span>
                        <span>
                          <ion-icon :icon="locationOutline"></ion-icon>
                          {{ lead.lead_source || 'N/A' }}
                        </span>
                      </div>
                      <div class="source-row">
                        <span style="color: blue;">
                          Documentation Status: {{ lead.document_status?.status_name || 'N/A' }}
                        </span>
                        <span style="color: blue; margin-left: 30px;">
                          Application Status: {{ lead.student_status?.status_name || 'N/A' }}
                        </span>
                      </div>
                    </div>
                    <div class="action-buttons">
                      <ion-button fill="clear" size="small" @click="openUpdateModal(lead.id)">
                        <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                      </ion-button>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- No Results Message -->
            <div v-else-if="searchQuery" class="no-results">
              <ion-card>
                <ion-card-content>
                  <p>No leads found matching "{{ searchQuery }}" in {{ getSearchFieldLabel() }}</p>
                  <ion-button fill="clear" @click="clearSearch">Clear Search</ion-button>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="loading-state">
              <ion-spinner name="crescent"></ion-spinner>
              <p>Loading leads...</p>
            </div>

            <!-- Update Modal -->
            <ion-modal 
              :is-open="showUpdate" 
              @didDismiss="showUpdate = false" 
              class="modal" 
              css-class="full-screen-modal"
            >
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="closeModalAndRefresh">
                      <ion-icon :icon="chevronBackOutline"></ion-icon>
                      Back
                    </ion-button>
                  </ion-buttons>
                  <ion-title>Lead Details</ion-title>
                </ion-toolbar>
              </ion-header>

              <ion-content>
                <div class="form">
                  <ion-list>
                    <!-- Basic Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Basic Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Date</ion-label>
                        <ion-input v-model="date" type="date"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Student Name</ion-label>
                        <ion-input v-model="name" type="text"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Mobile Number</ion-label>
                        <ion-input v-model="mobile" type="tel"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Address</ion-label>
                        <ion-input v-model="address" type="text"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Country</ion-label>
                        <ion-input v-model="country" type="text"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Lead Source</ion-label>
                        <ion-input v-model="source" type="text"></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Academic Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Academic Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">10th Mark</ion-label>
                        <ion-input v-model="tenth" type="number"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">12th Mark</ion-label>
                        <ion-input v-model="twelth" type="number"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Degree Mark</ion-label>
                        <ion-input v-model="degree" type="number"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">PG Mark</ion-label>
                        <ion-input v-model="pg" type="number"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">IELTS Score</ion-label>
                        <ion-input v-model="ielts" type="number"></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Experience Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Experience Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Years of Experience</ion-label>
                        <ion-input v-model="year" type="number"></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Field of Experience</ion-label>
                        <ion-input v-model="field" type="text"></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Status Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Status Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Lead Created By</ion-label>
                        <ion-input :value="userId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Assigned Counselor</ion-label>
                        <ion-input :value="counsillerAId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Counselor Status</ion-label>
                        <ion-input :value="counsillerId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Next Followup</ion-label>
                        <ion-input :value="followupCouns" readonly></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Document Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Document Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Document Handler</ion-label>
                        <ion-input :value="documentAId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Document Status</ion-label>
                        <ion-input :value="documentId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Document Followup</ion-label>
                        <ion-input :value="followupDoc" readonly></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Application Information -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Application Information</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Application Handler</ion-label>
                        <ion-input :value="applicationAId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Application Status</ion-label>
                        <ion-input :value="applicationId" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Application Followup</ion-label>
                        <ion-input :value="followupApp" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Student Status</ion-label>
                        <ion-input :value="studentStatusId" readonly></ion-input>
                      </ion-item>
                    </ion-item-group>

                    <!-- Document Upload Section -->
                    <ion-item-group>
                      <ion-item-divider>
                        <ion-label>Uploaded Documents</ion-label>
                      </ion-item-divider>

                      <ion-item>
                        <ion-label position="stacked">Passport Number</ion-label>
                        <ion-input v-model="pass_no" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">Aadhar Number</ion-label>
                        <ion-input v-model="aadhar_no" readonly></ion-input>
                      </ion-item>

                      <ion-item>
                        <ion-label position="stacked">PAN Number</ion-label>
                        <ion-input v-model="pan_no" readonly></ion-input>
                      </ion-item>

                      <!-- Document Images -->
                      <div class="document-images">
                        <!-- Passport Images -->
                        <div class="image-section">
                          <ion-label>Passport Images</ion-label>
                          <div class="image-grid">
                            <div v-for="(image, index) in passimages" :key="index" class="image-container">
                              <img :src="image.url" alt="Passport" />
                            </div>
                          </div>
                        </div>

                        <!-- Aadhar Images -->
                        <div class="image-section">
                          <ion-label>Aadhar Images</ion-label>
                          <div class="image-grid">
                            <div v-for="(image, index) in aadharimages" :key="index" class="image-container">
                              <img :src="image.url" alt="Aadhar" />
                            </div>
                          </div>
                        </div>

                        <!-- PAN Images -->
                        <div class="image-section">
                          <ion-label>PAN Images</ion-label>
                          <div class="image-grid">
                            <div v-for="(image, index) in panimages" :key="index" class="image-container">
                              <img :src="image.url" alt="PAN" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ion-item-group>
                  </ion-list>
                </div>
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
  IonItem, IonSelect, IonSelectOption, IonLabel, IonList,
  IonItemDivider, IonItemGroup, IonSpinner
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
    IonCard, IonCardContent, SideMenu, IonPage, IonModal,
    IonInput, IonItem, IonSelect, IonSelectOption, IonLabel,
    IonList, IonItemDivider, IonItemGroup, IonSpinner
  },
  data() {
    return {
      searchQuery: '',
      searchField: 'name', // Default search field
      isLoading: false,
      showUpdate: false,
      name: '',
      mobile: '',
      address: '',
      country: '',
      source: '',
      tenth: '',
      twelth: '',
      degree: '',
      pg: '',
      ielts: '',
      year: '',
      field: '',
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
      followupCouns: '',
      followupDoc: '',
      followupApp: '',
      passimages: [],
      aadharimages: [],
      panimages: [],
      imageFile: null,
      imageFile1: null,
      imageFile2: null,
      currentDocumentId: null,
      existingPassportUrl: '',
      existingAadharUrl: '',
      existingPanUrl: '',
      documentsLoaded: false,
      studentStatusId: null,
      counsillerAId: null,
      documentAId: null,
      applicationAId: null,
      showDelete: false,
      applicationId: null,
      documentId: null,
      counsillerId: null,
      userId: null,
      currentleadId: null,
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
    };
  },

  computed: {
    ...mapState('addLead', ['totalLeadList', 'totalAllLeadCount']),
    ...mapState('counsiller', ['totaluploadListId']),

    filteredLeads() {
      if (!this.searchQuery) {
        return this.totalLeadList;
      }

      const query = this.searchQuery.toLowerCase().trim();
      
      return this.totalLeadList.filter(lead => {
        switch (this.searchField) {
          case 'name':
            return lead.student_name?.toLowerCase().includes(query);
          case 'mobile':
            return lead.mobile?.toString().includes(query);
          case 'country':
            return lead.country?.toLowerCase().includes(query);
          case 'source':
            return lead.lead_source?.toLowerCase().includes(query);
          case 'docStatus':
            return lead.document_status?.status_name?.toLowerCase().includes(query);
          case 'appStatus':
            return lead.student_status?.status_name?.toLowerCase().includes(query);
          default:
            return false;
        }
      });
    }
  },

  methods: {
    ...mapActions('addLead', ['fetchtotalleadlist', 'fetchtotalAllleadCount']),
    ...mapActions('counsiller', ['FETCH_DOCUMENTS']),

    getSearchFieldLabel() {
      const labels = {
        name: 'Student Name',
        mobile: 'Mobile Number',
        country: 'Country',
        source: 'Lead Source',
        docStatus: 'Document Status',
        appStatus: 'Application Status'
      };
      return labels[this.searchField] || 'All Fields';
    },

    handleSearch(event) {
      this.searchQuery = event.target.value;
    },

    clearSearch() {
      this.searchQuery = '';
      this.searchField = 'name';
    },

    async fetchleadData() {
      this.isLoading = true;
      try {
        await this.fetchtotalleadlist();
        await this.fetchtotalAllleadCount();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    closeModalAndRefresh() {
      this.showUpdate = false;
      this.fetchleadData();
    },

    async openUpdateModal(leadId) {
      this.isLoading = true;
      try {
        const leadData = this.totalLeadList.find((lead) => lead.id === leadId);

        if (leadData) {
          this.name = leadData.student_name || '';
          this.mobile = leadData.mobile || '';
          this.date = leadData.date ? new Date(leadData.date).toISOString().split('T')[0] : '';
          this.address = leadData.address || '';
          this.country = leadData.country || '';
          this.source = leadData.lead_source || '';
          this.tenth = leadData.mark_tenth || '';
          this.twelth = leadData.mark_twelth || '';
          this.degree = leadData.mark_degree || '';
          this.pg = leadData.mark_pg || '';
          this.ielts = leadData.mark_ielts || '';
          this.year = leadData.experience_year || '';
          this.field = leadData.experience_field || '';
          this.userId = leadData.user?.username || '';
          this.counsillerAId = leadData.counsill?.username || '';
          this.documentAId = leadData.documentation?.username || '';
          this.applicationAId = leadData.applicat?.username || '';
          this.followupCouns = leadData.followup_date ? new Date(leadData.followup_date).toISOString().split('T')[0] : '';
          this.followupDoc = leadData.followup_documentdate ? new Date(leadData.followup_documentdate).toISOString().split('T')[0] : '';
          this.followupApp = leadData.followup_applicationdate ? new Date(leadData.followup_applicationdate).toISOString().split('T')[0] : '';
          this.counsillerId = leadData.counsiller?.status_name || '';
          this.applicationId = leadData.application?.status_name || '';
          this.documentId = leadData.document?.status_name || '';
          this.studentStatusId = leadData.student_status?.status_name || '';
          this.currentleadId = leadId;

          await this.fetchDocuments(leadId);
          this.showUpdate = true;
        }
      } catch (error) {
        console.error('Error opening update modal:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchDocuments(leadId) {
      try {
        const response = await this.FETCH_DOCUMENTS(leadId);

        if (response?.data?.length > 0) {
          const document = response.data[0];
          this.currentDocumentId = document.id || null;
          this.pass_no = document.passport_no || '';
          this.aadhar_no = document.aadhar_no || '';
          this.pan_no = document.pan_no || '';

          this.existingPassportUrl = document.passport_image || '';
          this.existingAadharUrl = document.aadhar_image || '';
          this.existingPanUrl = document.pan_image || '';

          // Process images
          this.passimages = this.processImageUrls(this.existingPassportUrl);
          this.aadharimages = this.processImageUrls(this.existingAadharUrl);
          this.panimages = this.processImageUrls(this.existingPanUrl);

          this.documentsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    },

    processImageUrls(urlString) {
      if (!urlString) return [];
      return urlString.split(',').map(url => ({
        url: url.trim()
      }));
    }
  },

  async mounted() {
    await this.fetchleadData();
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