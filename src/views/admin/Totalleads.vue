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
              <ion-title>Total Leads</ion-title>
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
            <!-- Stats Cards -->
            <ion-grid class="stats-grid">
              <ion-row>
                <ion-col >
                  <div class="stats-card primary-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="peopleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Total Leads</h4>
                      <span class="stats-value">{{ totalAllLeadCount }}</span>
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>

            <!-- Leads List -->
            <div class="leads-list" v-if="filteredLeads.length">
              <ion-card v-for="lead in filteredLeads" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }}</h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                        <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                        <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new
                          Date(lead.date).toISOString().split('T')[0] }}</span>
                        <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span>
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span><br />
                      </div>
                      <br />
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
            <div v-else-if="searchQuery" class="no-results">
              <p>No leads found matching your search.</p>
            </div>

            <!-- Update Modal -->
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="modal" full-screen
              css-class="full-screen-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-grid>
                    <ion-row>
                      <ion-col size="auto">
                        <ion-button class="back" fill="clear" @click="closeModalAndRefresh">
                          <ion-icon :icon="chevronBackOutline" style="color: black;"></ion-icon>
                        </ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <div class="form">
                  <br />
                  <ion-label>Date</ion-label>
                  <ion-input v-model="date" ref="input" type="date" fill="outline"></ion-input>
                  <br />
                  <ion-label>student name</ion-label>
                  <ion-input v-model="name" ref="input" type="text" placeholder="name" fill="outline"></ion-input>
                  <br />
                  <ion-label>Mobile number</ion-label>
                  <ion-input v-model="mobile" ref="input" type="number" placeholder="mobile" fill="outline"></ion-input>
                  <br />
                  <ion-label>Address</ion-label>
                  <ion-input v-model="address" ref="input" type="text" placeholder="address" fill="outline"></ion-input>
                  <br />
                  <ion-label>Country</ion-label>
                  <ion-input v-model="country" ref="input" type="text" placeholder="Country" fill="outline"></ion-input>
                  <br />
                  <ion-label>Lead Source</ion-label>
                  <ion-input v-model="source" ref="input" type="text" placeholder="Lead Source" fill="outline"></ion-input>
                  <br />
                  <ion-label>mark tenth</ion-label>
                  <ion-input v-model="tenth" ref="input" type="number" placeholder="mark tenth" fill="outline"></ion-input>
                  <br />
                  <ion-label>mark twelth</ion-label>
                  <ion-input v-model="twelth" ref="input" type="number" placeholder="mark twelth" fill="outline"></ion-input>
                  <br />
                  <ion-label>mark degree</ion-label>
                  <ion-input v-model="degree" ref="input" type="number" placeholder="mark degree" fill="outline"></ion-input>
                  <br />
                  <ion-label>mark pg</ion-label>
                  <ion-input v-model="pg" ref="input" type="number" placeholder="mark pg" fill="outline"></ion-input>
                  <br />
                  <ion-label>mark ielts</ion-label>
                  <ion-input v-model="ielts" ref="input" type="number" placeholder="mark ielts" fill="outline"></ion-input>
                  <br />
                  <ion-label>experience year</ion-label>
                  <ion-input v-model="year" ref="input" type="number" placeholder="experience year" fill="outline"></ion-input>
                  <br />
                  <ion-label>experience field</ion-label>
                  <ion-input v-model="field" ref="input" type="text" placeholder="experience feild" fill="outline"></ion-input>
                  <br />
                  <ion-label>Lead created</ion-label>
                  <ion-input :value="userId" readonly></ion-input>
                  <br />
                  <ion-label>Assigned to Counsiller</ion-label>
                  <ion-input :value="counsillerAId" readonly></ion-input>
                  <br />
                  <ion-label>Counsiller status</ion-label>
                  <ion-input :value="counsillerId" readonly></ion-input>
                  <br />
                  <ion-label>Followup Date</ion-label>
                  <ion-input :value="followupCouns" readonly></ion-input>
                  <br />
                  <ion-label>Assigned to Document</ion-label>
                  <ion-input :value="documentAId" readonly></ion-input>
                  <br />
                  <ion-label>Document status</ion-label>
                  <ion-input :value="documentId" readonly></ion-input>
                  <br />
                  <ion-label>Document followup</ion-label>
                  <ion-input :value="followupDoc" readonly></ion-input>
                  <br />
                  <ion-label>Assigned to Application</ion-label>
                  <ion-input :value="applicationAId" readonly></ion-input>
                  <br />
                  <ion-label>Application status</ion-label>
                  <ion-input :value="applicationId" readonly></ion-input>
                  <br />
                  <ion-label>Application followup</ion-label>
                  <ion-input :value="followupApp" readonly></ion-input>
                  <br />
                  <ion-label>Student Status</ion-label>
                  <ion-input :value="studentStatusId" readonly></ion-input>
                  <br />
                </div>
                <div class="experience-section">
                  <h4 class="section-title">UPLOADED DOCUMENTS</h4>
                  <ion-input v-model="pass_no" label="Passport no" type="text" labelPlacement="floating" fill="solid"
                    class="form-input" readonly></ion-input>
                  <ion-input v-model="aadhar_no" label="Aadhar no" type="text" labelPlacement="floating" fill="solid"
                    class="form-input" readonly></ion-input>
                  <ion-input v-model="pan_no" label="Pan no" type="text" labelPlacement="floating" fill="solid"
                    class="form-input" readonly></ion-input>

                  <div class="document-upload-section">
                    <!-- Passport -->
                    <div class="document-item">
                      <ion-label class="image-label">Passport Images</ion-label>
                      <div class="preview-container" v-if="passimages?.length">
                        <div v-for="(image, index) in passimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Passport Image" class="preview-image">
                        </div>
                      </div>
                    </div>

                    <!-- Aadhar -->
                    <div class="document-item">
                      <ion-label class="image-label">Aadhar Images</ion-label>
                      <div class="preview-container" v-if="aadharimages?.length">
                        <div v-for="(image, index) in aadharimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Aadhar Image" class="preview-image">
                        </div>
                      </div>
                    </div>

                    <!-- Pan -->
                    <div class="document-item">
                      <ion-label class="image-label">Pan Images</ion-label>
                      <div class="preview-container" v-if="panimages?.length">
                        <div v-for="(image, index) in panimages" :key="index" class="preview-wrapper">
                          <img :src="image.url || image" alt="Pan Image" class="preview-image">
                        </div>
                      </div>
                    </div>
                  </div>
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
  IonItem, IonSelect, IonSelectOption, IonLabel,
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
      searchQuery: '', // For search functionality
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

    // Filtered leads based on search query
    filteredLeads() {
      if (!this.searchQuery) return this.totalLeadList;
      
      const query = this.searchQuery.toLowerCase().trim();
      return this.totalLeadList.filter(lead => {
        return (
          (lead.student_name && lead.student_name.toLowerCase().includes(query)) ||
          (lead.mobile && lead.mobile.toString().includes(query)) ||
          (lead.location && lead.location.toLowerCase().includes(query)) ||
          (lead.country && lead.country.toLowerCase().includes(query)) ||
          (lead.lead_source && lead.lead_source.toLowerCase().includes(query))
        );
      });
    }
  },

  methods: {
    ...mapActions('addLead', ['fetchtotalleadlist', 'fetchtotalAllleadCount']),
    ...mapActions('counsiller', ['FETCH_DOCUMENTS']),

    // Search handler
    handleSearch(event) {
      this.searchQuery = event.target.value;
    },

    // Modal handlers
    closeModalAndRefresh() {
      this.showUpdate = false;
      window.location.reload();
    },

    // Data fetching
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalleadlist();
        await this.fetchtotalAllleadCount();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },

    async openUpdateModal(leadId) {
      console.log('Opening modal for lead ID:', leadId);
      try {
        const leadData = await this.totalLeadList.find((lead) => lead.id === leadId);

        if (leadData) {
          // Populate form fields
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
          
          // Populate user and assignment fields
          this.userId = leadData.user?.username || '';
          this.counsillerAId = leadData.counsill?.username || '';
          this.documentAId = leadData.documentation?.username || '';
          this.applicationAId = leadData.applicat?.username || '';
          
          // Populate dates
          this.followupCouns = leadData.followup_date ? new Date(leadData.followup_date).toISOString().split('T')[0] : '';
          this.followupDoc = leadData.followup_documentdate ? new Date(leadData.followup_documentdate).toISOString().split('T')[0] : '';
          this.followupApp = leadData.followup_applicationdate ? new Date(leadData.followup_applicationdate).toISOString().split('T')[0] : '';
          
          // Populate status fields
          this.counsillerId = leadData.counsiller?.status_name || '';
          this.applicationId = leadData.application?.status_name || '';
          this.documentId = leadData.document?.status_name || '';
          this.studentStatusId = leadData.student_status?.status_name || '';
          
          this.currentleadId = leadId;
          
          // Fetch and populate documents
          await this.fetchDocuments(leadId);
          this.showUpdate = true;
        } else {
          console.error('No lead found with ID:', leadId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async fetchDocuments(leadId) {
      try {
        const response = await this.FETCH_DOCUMENTS(leadId);
        console.log("API Response for Documents:", response);

        if (response && response.data && response.data.length > 0) {
          const document = response.data[0];
          
          // Set document ID and numbers
          this.currentDocumentId = document.id || null;
          this.pass_no = document.passport_no || '';
          this.aadhar_no = document.aadhar_no || '';
          this.pan_no = document.pan_no || '';

          // Handle document images
          this.existingPassportUrl = document.passport_image || '';
          this.existingAadharUrl = document.aadhar_image || '';
          this.existingPanUrl = document.pan_image || '';

          // Process image arrays
          this.passimages = this.existingPassportUrl
            ? this.existingPassportUrl.split(',').map(url => ({ url: url.trim() }))
            : [];
          this.aadharimages = this.existingAadharUrl
            ? this.existingAadharUrl.split(',').map(url => ({ url: url.trim() }))
            : [];
          this.panimages = this.existingPanUrl
            ? this.existingPanUrl.split(',').map(url => ({ url: url.trim() }))
            : [];

          this.documentsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
  },

  async mounted() {
    try {
      await this.fetchleadData();
    } catch (error) {
      console.error('Error in mounted hook:', error);
    }
  }
});
</script>

<style>
  /* Modern color palette and variables */
  :root {
    --primary-color: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #3f3f46;
    --background-light: #f3f4f6;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --transition: all 0.3s ease;
  }

  /* Global styles */
  ion-content {
    --background: var(--background-light);
  }

  /* Stats Grid styling */
  .stats-grid {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .stats-card {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    border-radius: 1rem;
    padding: 1.5rem;
    color: white;
    transition: var(--transition);
    box-shadow: var(--card-shadow);
  }

  .stats-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.15);
  }

  .stats-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .stats-content h4 {
    margin: 0;
    font-size: 1rem;
    opacity: 0.9;
  }

  .stats-value {
    font-size: 2rem;
    font-weight: bold;
  }

  /* Leads List styling */
  .leads-list ion-card {
    margin: 1rem;
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
    background: white;
  }

  .leads-list ion-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.15);
  }

  .lead-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .lead-info h3 {
    color: var(--primary-color);
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
  }

  .info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .info-row span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--secondary-color);
    font-size: 0.9rem;
  }

  .info-row ion-icon {
    color: var(--primary-color);
    font-size: 1.1rem;
  }

  .source-row {
    color: var(--secondary-color);
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .action-buttons ion-button {
    --color: var(--primary-color);
  }

  /* Modal styling */
  .modal ion-content {
    --background: white;
  }

  .form {
    padding: 1rem;
  }

  .form ion-label {
    color: var(--secondary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .form ion-input {
    margin-bottom: 1rem;
    --background: var(--background-light);
    --padding-start: 1rem;
    --padding-end: 1rem;
    --border-radius: 0.5rem;
  }

  /* Document section styling */
  .experience-section {
    padding: 1rem;
    background: var(--background-light);
    border-radius: 1rem;
    margin: 1rem;
  }

  .section-title {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  .preview-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .preview-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: var(--card-shadow);
  }

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Custom searchbar styling */
  .custom-searchbar {
    --background: white;
    --border-radius: 2rem;
    --box-shadow: none;
    --placeholder-color: var(--secondary-color);
    max-width: 300px;
  }
</style>

