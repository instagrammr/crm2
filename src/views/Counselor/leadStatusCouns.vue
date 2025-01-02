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
                <ion-buttons slot="end">
                  <ion-searchbar placeholder="Search here" class="custom-searchbar"></ion-searchbar>
                </ion-buttons>
                <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
              </ion-toolbar>
            </ion-header>
  
            <ion-content>
    
              <!-- Leads List -->
              <div class="leads-list" v-if="totalLeadListId && totalLeadListId.rows">
                <ion-card v-for="lead in totalLeadListId.rows" :key="lead.id">
                  <ion-card-content>
                    <div class="lead-header">
                      <div class="lead-info">
                        <h3>{{ lead.student_name }}
                     
                        </h3>
                        <div class="info-row">
                          <!-- <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                          <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                          <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new
                            Date(lead.date).toISOString().split('T')[0] }}</span>
                          <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span> -->
                        </div>
                        <div class="source-row">
                          <span  style="color: blue;">Documentation Status: {{ lead.document_status && lead.document_status.status_name ? lead.document_status.status_name : 'N/A' }}</span>
                          <span  style="color: blue; margin-left: 30px;">Application Status: {{ lead.student_status && lead.student_status.status_name ? lead.student_status.status_name : 'N/A' }}</span><br />
                        </div>
                        <br />
                      </div>
                      <div class="action-buttons">
                        <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                          <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                        </ion-button>
                        <!-- <ion-button fill="clear" size="small">
                          <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                        </ion-button> -->
                      </div>
                    </div>
                  </ion-card-content>
                </ion-card>
              </div>
              <ion-modal :is-open="showViewModals" @didDismiss="closeViewModal" class="view-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-title>Lead Details</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeModalAndRefresh">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>

              <ion-content class="ion-padding">
                <div class="details-container">
                  <div class="detail-section">
                    <h3 class="section-title">Personal Information</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Name</h2>
                        <p>{{ selectedLead?.student_name }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Mobile</h2>
                        <p>{{ selectedLead?.mobile }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Address</h2>
                        <p>{{ selectedLead?.address }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Country</h2>
                        <p>{{ selectedLead?.country }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Lead Source</h2>
                        <p>{{ selectedLead?.lead_source }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Academic Details</h3>
                    <ion-item>
                      <ion-label>
                        <h2>10th Mark</h2>
                        <p>{{ selectedLead?.mark_tenth || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>12th Mark</h2>
                        <p>{{ selectedLead?.mark_twelth || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Degree Mark</h2>
                        <p>{{ selectedLead?.mark_degree || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>PG Mark</h2>
                        <p>{{ selectedLead?.mark_pg || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>IELTS Score</h2>
                        <p>{{ selectedLead?.mark_ielts || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Course</h2>
                        <p>{{ selectedLead?.course || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>university</h2>
                        <p>{{ selectedLead?.university || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Experience Details</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Years of Experience</h2>
                        <p>{{ selectedLead?.experience_year || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Field of Experience</h2>
                        <p>{{ selectedLead?.experience_field || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div class="detail-section">
                    <h3 class="section-title">Status Information</h3>
                    <ion-item>
                      <ion-label>
                        <h2>Current Status</h2>
                        <p>{{ selectedLead?.application?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_applicationdate">
                      <ion-label>
                        <h2>Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_applicationdate) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Student Status</h2>
                        <p>{{ selectedLead?.student_status?.status_name || 'Not provided' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Document Status</h2>
                        <p>{{ selectedLead?.document_status?.status_name || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                  </div>
                  <div class="detail-section">
                    <h4 class="section-title">Remarks</h4>
                    <ul v-if="totalremarkListId.rows && totalremarkListId.rows.length > 0">
                      <li v-for="remark in totalremarkListId.rows" :key="remark.id">
                        <p>{{ remark.remark }}</p>
                        <small>{{ remark.remark_date
                          ? new Date(remark.remark_date).toISOString().split("T")[0]
                          : null }}</small>
                      </li>
                    </ul>
                  </div>
                  <div class="detail-section">
                    <h4 class="section-title">UPLOADED DOCUMENTS</h4>
                    <ion-input v-model="pass_no" label="Passport no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>
                    <ion-input v-model="aadhar_no" label="Aadhar no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>
                    <ion-input v-model="pan_no" label="Pan no" type="text" labelPlacement="floating" fill="solid"
                      class="form-input" readonly></ion-input>

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
  import { alertController } from '@ionic/vue';
  import { mapActions, mapState } from 'vuex';
  import {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, IonPage, IonModal, IonInput,
    IonItem, IonBadge, 
    IonSelect,
    IonSelectOption,
    IonLabel,
  } from '@ionic/vue';
  import {
    peopleOutline, personAddOutline, closeCircleOutline,
    refreshCircleOutline, callOutline, locationOutline,
    timeOutline, globeOutline, createOutline, eyeOutline,
    trash, chevronBackOutline, notificationsOutline, closeOutline
  } from 'ionicons/icons';
  import SideMenu from '../../components/Counselorside.vue';
  
  export default defineComponent({
    name: 'TotalLeads',
    components: {
      IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
      IonButtons, IonMenuButton, IonButton, IonIcon,
      IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
      IonCard, IonCardContent, SideMenu, IonPage, IonModal, IonInput,
      IonItem, IonSelect, IonSelectOption, IonLabel, IonBadge, 
    },
    data() {
      return {
        showUpdate: false,
        showViewModals: false, // Add this
        selectedLead: null,
        newRemark: '',
        university: '',
        course: '',
        remarkDate: "",
        Remark: '',
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
        // priorityId: null,
        pan_no: '',
        aadhar_no: '',
        pass_no: '',
        followupCouns: '',
        followupDoc: '',
        followupApp: '',
        passimages: [], // Array of {file, url} objects
        aadharimages: [], // Array of {file, url} objects
        panimages: [], // Array of {file, url} objects
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
        notificationCount: 0,
        peopleOutline, personAddOutline, closeCircleOutline,
        refreshCircleOutline, callOutline, locationOutline,
        timeOutline, globeOutline, createOutline, eyeOutline,
        trash, chevronBackOutline, notificationsOutline, closeOutline
      }
    },
    computed: {
      ...mapState('counsiller', ['totalLeadListId', 'totalDocumentStatusList',
       'totalcounsillerList', 'totaluploadListId', 'totalStatusList', 'totalremarkListId', 'totaltodayLeadCount']),
      notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    },
    methods: {
      ...mapActions('counsiller', ['fetchtotalLeadlistId', 'fetchtotalcounsillerlist', 'update_lead', 'delete_leads', 'fetchtotalDocuumentstatuslist',
      'ADD_UPLOAD', 'UPDATE_UPLOAD', 'FETCH_DOCUMENTS', 'delete_aadhar', 'delete_pan', 'fetchtotalstatuslist', 'fetchtotalremarkListId', 'fetchtotaltodayLeadCount']),
      closeModalAndRefresh() {
        // Close the modal
        this.showUpdate = false;
        window.location.reload();
      },
      async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalLeadlistId(userId);
        await this.fetchtotalcounsillerlist();
        await this.fetchtotalremarkListId();
        await this.fetchtotalstatuslist();
        await this.fetchtotaltodayLeadCount(userId);
        await this.fetchtotalDocuumentstatuslist();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
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
    async viewLeadDetails(lead) {
      try {
        this.selectedLead = lead;
        this.showViewModals = true; // Open modal

        // Fetch remarks for the lead
        const remarkDataResponse = await this.fetchtotalremarkListId(lead.id);
        if (remarkDataResponse && remarkDataResponse.rows) {
          this.totalremarkListId = remarkDataResponse; // Set remarks list
        } else {
          this.totalremarkListId = { rows: [] }; // Default to empty if no remarks found
        }

        // Fetch documents for the lead
        await this.fetchDocuments(lead.id); // Ensure fetch completes

      } catch (error) {
        console.error('Error fetching lead details:', error);
        this.errorMessage = 'Failed to load lead details.';
      }
    },
    closeViewModal() {
      this.showViewModals = false;
      this.selectedLead = null;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return dateString;
      
      // Format: "15 Dec 2023"
      const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric'
      };
      
      return date.toLocaleDateString('en-US', options);
    },
      async openUpdateModal(leadId) {
        console.log('Opening modal for lead ID:', leadId);
        try {
          const leadData = await this.totalLeadList.find((lead) => lead.id === leadId);
  
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
            // this.priorityId = leadData.priorityId || '';
            this.documentId = leadData.document?.status_name || '';
            this.studentStatusId = leadData.student_status?.status_name || '';
            this.currentleadId = leadId;
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
            this.currentDocumentId = document.id || null;
            this.pass_no = document.passport_no || '';
            this.aadhar_no = document.aadhar_no || '';
            this.pan_no = document.pan_no || '';
  
            // Handling images
            this.existingPassportUrl = document.passport_image || '';
            this.existingAadharUrl = document.aadhar_image || '';
            this.existingPanUrl = document.pan_image || '';
  
            // Populate image arrays
            this.passimages = this.existingPassportUrl
              ? this.existingPassportUrl.split(',').map((url) => ({ url: url.trim() }))
              : [];
            this.aadharimages = this.existingAadharUrl
              ? this.existingAadharUrl.split(',').map((url) => ({ url: url.trim() }))
              : [];
            this.panimages = this.existingPanUrl
              ? this.existingPanUrl.split(',').map((url) => ({ url: url.trim() }))
              : [];
  
            this.documentsLoaded = true; // Indicate documents were successfully loaded
          }
        } catch (error) {
          console.error('Error fetching documents:', error);
          this.errorMessage = 'Failed to load existing documents.';
  
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

  .full-screen-modal {
    --height: 100%;
    --width: 100%;
    --border-radius: 0;
    --box-shadow: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .full-screen-modal .modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .image-label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
  }
  
  .modal2 {
    --height: 100%;
  }
  
  .modal {
    --height: 100%;
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
  
  .stats-content  {
    margin: 0;
    font-size: 14px;
    color: #666;
    width: 100%;
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