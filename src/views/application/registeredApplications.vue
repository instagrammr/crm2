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
              <ion-title>Registered Application</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search here"
                  class="custom-searchbar"
                ></ion-searchbar>
              </ion-buttons>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <!-- Stats Cards -->
            <ion-grid class="stats-grid">
          <ion-row>
                <ion-col size="6" size-md="4">
                  <div class="stats-card primary-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="peopleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4 style="color: aliceblue;">Total Leads</h4>
                      <span class="stats-value">{{ totalLeadCount }}</span>
                      
                    </div>
                  </div>
                </ion-col>
                
             
  
                <ion-col size="6" size-md="4">
                  <div class="stats-card danger-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="closeCircleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4 style="color: aliceblue;">Dropped</h4>
                      <span class="stats-value">{{ totalDropedCount }}</span>
                    
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="4">
                  <div class="stats-card warning-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="refreshCircleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4 style="color: aliceblue;">Follow Up</h4>
                      <span class="stats-value">{{ totalFollowupCount }}</span>
                     
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
  
            <!-- Leads List -->
            <div  v-if="totalregisterdListId && totalregisterdListId.rows">
              <ion-card v-for="lead in totalregisterdListId.rows" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }} 
                  
                      </h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>
                        <span><ion-icon :icon="locationOutline"></ion-icon>{{ lead.location }}</span>
                        <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new Date(lead.date).toISOString().split('T')[0] }}</span>
                        <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span>
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span><br />
                      
                      </div>
                      <br />
                    
                    </div>
                    <div class="action-buttons">
                      <ion-button fill="clear" size="small" @click="openUpdateModal(lead.id)">
                        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                      </ion-button>
                      <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                          <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                        </ion-button>
                   
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="modal" full-screen
              css-class="full-screen-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-grid>
                    <ion-row>
                      <ion-col size="auto">
                        <ion-button class="back" fill="clear" @click="closeModalAndRefresh">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col class="col">
                        <ion-title class="ion-text-center">Update Lead</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <div class="form">
                  <br />
                  <ion-input v-model="date" ref="input" type="date" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="name" ref="input" type="text" placeholder="name" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="mobile" ref="input" type="number" placeholder="mobile" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="address" ref="input" type="text" placeholder="address" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="country" ref="input" type="text" placeholder="Country" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="source" ref="input" type="text" placeholder="Lead Source"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="tenth" ref="input" type="number" placeholder="mark tenth"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="twelth" ref="input" type="number" placeholder=" mark twelth"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="degree" ref="input" type="number" placeholder="mark degree"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="pg" ref="input" type="number" placeholder="mark pg" fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="ielts" ref="input" type="number" placeholder="mark ielts"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="year" ref="input" type="number" placeholder="experience year"
                    fill="outline"></ion-input>
                  <br />
                  <ion-input v-model="field" ref="input" type="text" placeholder="experience feild"
                    fill="outline"></ion-input>
                  <br />
                  <div class="remarks-section">
                    <h4 class="section-title">Remarks</h4>
                    <ul v-if="totalremarkListId.rows && totalremarkListId.rows.length > 0">
                      <li v-for="remark in totalremarkListId.rows" :key="remark.id">
                        <p>{{ remark.remark }}</p>
                        <small>{{ remark.remark_date
                          ? new Date(remark.remark_date).toISOString().split("T")[0]
                          : null }}</small>
                        <ion-button fill="clear" @click="editRemark(remark)">Edit</ion-button>
                        <ion-button fill="clear" color="danger" @click="deleteRemark(remark.id)">
                          Delete
                        </ion-button>
                      </li>
                    </ul>
                    <ion-input v-model="newRemark" label="Add or Update Remark" type="text" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                    <ion-input v-model="remarkDate" label="Remark Date" type="date" labelPlacement="floating"
                      fill="solid" class="form-input"></ion-input>
                    <ion-button @click="saveRemark">Save Remark</ion-button>
                  </div>
                  <!-- <ion-input v-model="Remark" label="Remark" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-if="requiresRemark" v-model="newRemarkDate" label="remark Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input> -->
                  <ion-input v-model="university" label="university" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="course" label="course" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-row>
                    <ion-col>
                      <ion-select v-model="applicationId" placeholder="Select status">
                        <ion-select-option v-for="status in totalapplicationList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                    </ion-col>
                  </ion-row>
                  <ion-input v-if="requiresFollowUpDate" v-model="newfollowUpDate" label="Follow-up Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>
                  <ion-row>
                    <ion-col>
                      <ion-label>Application Status</ion-label>
                      <ion-select v-model="status" placeholder="Select status">
                        <ion-select-option v-for="status in totalstatusList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                    </ion-col>
                  </ion-row>
                </div>
                <ion-button expand="block" class="save" @click="updateLead">Save</ion-button>
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
                        <!-- Existing delete all button logic remains the same -->
                      </div>
                    </div>
                  </div>
                  <!-- Upload/Update button -->
                </div>
              </ion-content>
            </ion-modal>

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

            <ion-modal :is-open="showDelete" @didDismiss="closeDeleteDialog" class="modal2">
            <ion-header>
              <ion-toolbar>
                <ion-title>Confirm Delete</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="closeDeleteDialog">Close</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <p>Are you sure you want to delete this info?</p>
              <ion-row>
                <ion-col>
                  <ion-button color="danger" expand="block" @click="confirmdelete">Yes, Delete</ion-button>
                </ion-col>
                <ion-col>
                  <ion-button color="primary" expand="block" @click="closeDeleteDialog">Cancel</ion-button>
                </ion-col>
              </ion-row>
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
import { alertController } from '@ionic/vue';

import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem, IonSelect, IonSelectOption, IonLabel, IonList,
  IonBadge
} from '@ionic/vue';
import { 
  peopleOutline, personAddOutline, closeCircleOutline, 
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline, closeOutline, notificationsOutline
} from 'ionicons/icons';
import SideMenu from '../../components/applicationside.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, 
    IonInput, IonItem, IonSelect, IonSelectOption, IonLabel,
    IonList, IonBadge
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
      remarkId: null,
      newRemarkDate: '',
      editingRemarkId: null,
      isAddingRemark: false,
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
      newfollowUpDate: null,
      showDelete: false,
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
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
      applicationId: null,
      status: null,
      currentleadId: null,
      date: '',
      notificationCount: 0,
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
      chevronBackOutline, 
      closeOutline,
      notificationsOutline
    }
  },

  computed: {
    ...mapState('application', [
      'totalregisterdListId', 
      'totalLeadCount', 
      'totalFollowupCount', 
      'totalRegisteredCount', 
      'totalDropedCount', 
      'totalapplicationList', 
      'totalstatusList', 'totaltodayLeadCount', 'totalremarkListId'
    ]),
    ...mapState('counsiller', ['totaluploadListId']),
    
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    requiresFollowUpDate() {
        const specificDocumentId = 2; 
        return this.applicationId === specificDocumentId;        
      },
  },

  methods: {
    ...mapActions('application', [
      'fetchtotalregisteredlistId',
      'fetchtotalleadCount',
      'fetchtotalfollowupCount',
      'fetchtotaldropedCount',
      'fetchtotalregisteredCount',
      'fetchtotalapplicationlist',
      'fetchtotalstatuslist',
      'update_lead',
      'delete_leads',
      'fetchtotalremarkListId', 'Add_remark', 'update_remark', 'delete_remark', 'fetchtotaltodayLeadCount'
    ]),
    ...mapActions('counsiller', ['FETCH_DOCUMENTS']),
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
    
    handledelete(lead) {
      this.opendeleteDialog(lead);
    },

    closeModalAndRefresh() {
      this.showUpdate = false;
      window.location.reload();
    },

    opendeleteDialog(lead) {
      this.deleteItem = lead;
      this.showDelete = true;
    },

    closeDeleteDialog() {
      this.showDelete = false;
      this.deleteItem = {};
    },

    confirmdelete() {
      if (this.deleteItem.hasOwnProperty('id')) {
        this.delete_leads(this.deleteItem)
          .then(() => {
            console.log('leads deleted successfully');
            this.closeDeleteDialog();
            this.fetchleadData();
          })
          .catch((error) => {
            console.error('Error deleting:', error);
          });
      } else {
        console.error('Unable to delete: id property not found');
      }
    },

    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalregisteredlistId(userId);
        await this.fetchtotalleadCount(userId);
        await this.fetchtotalfollowupCount(userId);
        await this.fetchtotalregisteredCount(userId);
        await this.fetchtotaldropedCount(userId);
        await this.fetchtotalapplicationlist();
        await this.fetchtotalstatuslist();
        await this.fetchtotalremarkListId();
        await this.fetchtotaltodayLeadCount(userId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },

    async openUpdateModal(leadId) {
      console.log('Opening modal for lead ID:', leadId);
      try {
        const leadData = await this.totalregisterdListId.rows.find((lead) => lead.id === leadId);

        if (leadData) {
          this.name = leadData.student_name;
          this.mobile = leadData.mobile;
          this.date = new Date(leadData.date).toISOString().split('T')[0];
          this.address = leadData.address;
          this.country = leadData.country;
          this.source = leadData.lead_source;
          this.tenth = leadData.mark_tenth;
          this.twelth = leadData.mark_twelth;
          this.degree = leadData.mark_degree;
          this.pg = leadData.mark_pg;
          this.ielts = leadData.mark_ielts;
          this.year = leadData.experience_year;
          this.field = leadData.experience_field;
          this.applicationId = leadData.applicationId;
          this.status = leadData.studentStatusId;
          this.newfollowUpDate = leadData.followup_applicationdate
            ? new Date(leadData.followup_applicationdate).toISOString().split("T")[0]
            : null;
          this.currentleadId = leadId;
          this.university = leadData.university;
          this.course = leadData.course;

          const remarkDataResponse = await this.fetchtotalremarkListId(leadId);

          if (remarkDataResponse && remarkDataResponse.rows && remarkDataResponse.rows.length > 0) {
            const remarkData = remarkDataResponse.rows[0]; // Access the first remark
            this.Remark = remarkData.remark || ""; // Default to empty if undefined
            this.remarkId = remarkData.id;
            this.newRemarkDate = remarkData.remark_date
              ? new Date(remarkData.remark_date).toISOString().split("T")[0]
              : null;
          } else {
            this.remarkId = null;
            this.Remark = ""; // Default if no remark found
            this.newRemarkDate = null;
          }
          await this.fetchDocuments(leadId);
          this.showUpdate = true;
        } else {
          console.error('No lead found with ID:', leadId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async saveRemark() {
      try {
        const validRemarkDate = this.remarkDate || new Date().toISOString().split("T")[0];
        if (this.editingRemarkId) {
          // Update existing remark
          const payload = {
            id: this.editingRemarkId,
            remark: this.newRemark,
            remark_date: this.remarkDate,
            leadId: this.currentleadId,
          };
          await this.update_remark(payload); // API call to update remark
          console.log("Remark updated successfully");
        } else {
          // Add new remark
          const payload = {
            remark: this.newRemark,
            remark_date: validRemarkDate,
            leadId: this.currentleadId,
          };
          await this.Add_remark(payload); // API call to add new remark
          console.log("Remark added successfully");
        }
        this.newRemark = "";
        this.remarkDate = "";
        this.editingRemarkId = null;
        this.isAddingRemark = false;
        await this.fetchtotalremarkListId(this.currentleadId); // Refresh remarks
      } catch (error) {
        console.error("Error saving remark:", error);
      }
    },
    editRemark(remark) {
      this.newRemark = remark.remark;
      this.editingRemarkId = remark.id;
      this.remarkDate = remark.remark_date
        ? new Date(remark.remark_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]; // Default to current date
      this.isAddingRemark = true;
    },
    async deleteRemark(remark) {
      try {
        console.log("Attempting to delete remark:", remark);
        const confirmDelete = confirm("Are you sure you want to delete this remark?");
        if (confirmDelete) {
          await this.delete_remark({ id: remark }); // Pass the required format to Vuex
          console.log("Remark deleted successfully");
          await this.fetchtotalremarkListId(this.currentleadId); // Refresh remarks list
        }
      } catch (error) {
        console.error("Error deleting remark:", error);
        alert("Failed to delete the remark. Please try again.");
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

          this.existingPassportUrl = document.passport_image || '';
          this.existingAadharUrl = document.aadhar_image || '';
          this.existingPanUrl = document.pan_image || '';

          this.passimages = this.existingPassportUrl
            ? this.existingPassportUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];
          this.aadharimages = this.existingAadharUrl
            ? this.existingAadharUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];
          this.panimages = this.existingPanUrl
            ? this.existingPanUrl.split(',').map((url) => ({ url: url.trim() }))
            : [];

          this.documentsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    },

    async updateLead() {

console.log('leadId:', this.currentleadId)

const payload = {
  id: this.currentleadId,
  student_name: this.name,
  mobile: this.mobile,
  address: this.address,
  date: this.date,
  country: this.country,
  lead_source: this.source,
  mark_tenth: this.tenth,
  mark_twelth: this.twelth,
  mark_degree: this.degree,
  mark_pg: this.pg,
  mark_ielts: this.ielts,
  experience_year: this.year,
  experience_field: this.field,
  // priorityId: this.priorityId
  applicationId: this.applicationId,
  followup_applicationdate: this.requiresFollowUpDate ? this.newfollowUpDate : null, // Include if applicable
  studentStatusId: this.status,
  university: this.university,
  course: this.course,
};

try {
  await this.update_lead(payload);
  console.log('lead updated successfully');

  if (this.requiresRemark && (this.Remark || this.newRemarkDate)) {
    const remarkPayload = {
      id: this.remarkId,
      leadId: this.currentleadId, // Associate remark with the lead ID
      remark: this.Remark, // The updated remark
      remark_date: this.newRemarkDate, // The updated remark date
    };

    if (this.remarkId) {
      // If remarkId exists, update the existing remark
      remarkPayload.id = this.remarkId;
      await this.update_remark(remarkPayload);
      console.log('Remark updated successfully');
    } else {
      // If remarkId is null, create a new remark
      await this.Add_remark(remarkPayload);
      console.log('New remark created successfully');
    }

  }
  this.showUpdate = false;
  await this.fetchleadData();

} catch (error) {
  console.error('Error updating lead:', error);
}
},

    openDetailsModal(lead) {
      this.selectedLead = lead;
      this.showDetails = true;
    },

    closeDetailsModal() {
      this.showDetails = false;
      this.selectedLead = null;
    }
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

.stats-card.primary-gradient { background: var(--gradient-primary); }
.stats-card.success-gradient { background: var(--gradient-success); }
.stats-card.danger-gradient { background: var(--gradient-danger); }
.stats-card.warning-gradient { background: var(--gradient-warning); }

.stats-icon {
  font-size: 1.5rem;
  margin-bottom: 11px;
  opacity: 0.9;
}





.stats-value {
  font-size: 2rem;
  font-weight: 700;
  display: block;
  margin: 8px 0;
  color: white !important;
  letter-spacing: -0.5px;
}

.stats-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  margin-top: 8px;
}

.stats-trend.positive {
  background: rgba(46, 213, 115, 0.2);
  color: #2ed573;
}

.stats-trend.negative {
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
}


.custom-searchbar {
  max-width: 300px;
  padding: 0 10px;
}
.image-label {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
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
/* General Layout Improvements */
.ion-page {
  background-color: #f5f7fa;
}

/* Enhanced Stats Cards */
.stats-grid {
  padding: 20px;
  background-color: transparent;
}

.stats-card {
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  color: white;
  height: 100%;
  min-height: 160px;
  position: relative;
  overflow: hidden;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.stats-card.primary-gradient { 
  background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
}

.stats-card.danger-gradient { 
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.stats-card.warning-gradient { 
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stats-icon {
  font-size: 2rem;
  margin-bottom: 16px;
  opacity: 0.9;
  position: relative;
}

.stats-content h4 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
  letter-spacing: 0.5px;
}

.stats-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 12px 0;
  letter-spacing: -0.5px;
}

/* Enhanced Lead Cards */
ion-card {
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

ion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
}

.lead-header {
  padding: 16px;
}

.lead-info h3 {
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 12px 0;
  color: #4b5563;
  font-size: 0.95rem;
}

.info-row span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.info-row ion-icon {
  color: #6b7280;
  font-size: 1.1rem;
}

/* Enhanced Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons ion-button {
  --padding-start: 12px;
  --padding-end: 12px;
  height: 36px;
}

.action-buttons ion-button::part(native) {
  border-radius: 8px;
  transition: all 0.2s ease;
}

/* Enhanced Search Bar */
.custom-searchbar {
  --background: white;
  --box-shadow: none;
  --border-radius: 12px;
  --placeholder-color: #9ca3af;
  --icon-color: #6b7280;
  max-width: 300px;
  margin: 8px 16px;
  border: 1px solid rgba(0,0,0,0.1);
}

/* Modal Styling */
.modal ion-header ion-toolbar {
  --background: #f8fafc;
  --border-color: transparent;
}

.form {
  padding: 20px;
}

.form ion-input {
  margin-bottom: 16px;
  --background: white;
  --padding-start: 16px;
  --padding-end: 16px;
  --border-radius: 8px;
  --highlight-color: #6366f1;
}

/* Document Upload Section */
.document-upload-section {
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.preview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.preview-wrapper {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .stats-grid {
    padding: 12px;
  }
  
  .stats-card {
    min-height: 140px;
    padding: 16px;
  }
  
  .stats-value {
    font-size: 2rem;
  }
  
  .info-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .custom-searchbar {
    max-width: 100%;
    margin: 8px;
  }
}
</style>