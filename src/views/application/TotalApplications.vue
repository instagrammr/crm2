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
              <ion-title>Total Application</ion-title>
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
            <!-- Stats Cards -->
            <ion-grid>
              <ion-row>
                <ion-col size="6" size-md="4">
                  <div class="stats-card primary-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="peopleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Total Leads</h4>
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
                      <h4>Dropped</h4>
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
                      <h4>Follow Up</h4>
                      <span class="stats-value">{{ totalFollowupCount }}</span>

                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>




          
            <div class="leads-list" v-if="totalLeadListId && totalLeadListId.rows">

              <ion-item-sliding v-for="lead in totalLeadListId.rows" :key="lead.id">
                <ion-item>
                  <ion-avatar slot="start">
                    <img
                      src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                      alt="Lead Avatar" class="lead-avatar" />
                  </ion-avatar>
                  <ion-label>
                    <h2>{{ lead.student_name }}</h2>
                    <span class="status-badge"
                      :class="lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name.toLowerCase() : 'pending'">
                      {{ lead.counsiller && lead.counsiller.status_name ? lead.counsiller.status_name : 'Pending' }}
                    </span>
                    <div class="info-grid">

                      <div class="info-item">
                        <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
                       
                         <span>{{ formatDate(lead.date) }}</span>
                      </div>
                      <div class="info-item">
                        <ion-icon :icon="globeOutline" class="info-icon"></ion-icon>
                        <span>{{ lead.country }}</span>
                      </div>
                    </div>
                  </ion-label>
                  <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                    <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                  </ion-button>
                </ion-item>

                <ion-item-options side="start">
                  <ion-item-option color="primary" @click="openUpdateModal(lead.id)">
                    <ion-icon :icon="createOutline"></ion-icon>
                    Edit
                  </ion-item-option>
                </ion-item-options>

                <ion-item-options side="end">
                
                  <ion-item-option color="primary" @click="makeCall(lead)">
                    <ion-icon :icon="callOutline"></ion-icon>
                    Call
                  </ion-item-option>

                </ion-item-options>
              </ion-item-sliding>

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
                        <ion-select-option v-for="status in totalApplicationList" :key="status.id" :value="status.id">
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
import { alertController } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton, IonIcon,
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem, IonAvatar, IonItemOption, IonItemOptions,
  IonSelect, IonItemSliding,
  IonSelectOption, IonBadge, 
  IonLabel,
} from '@ionic/vue';
import {
  peopleOutline, personAddOutline, closeCircleOutline,
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline, notificationsOutline, closeOutline
} from 'ionicons/icons';
import SideMenu from '../../components/applicationside.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, IonInput,
    IonItem, IonSelect, IonSelectOption, IonLabel, IonAvatar, 
    IonItemOption, IonItemOptions, IonItemSliding, IonBadge, 
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
      // priorityId: null,
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
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
      applicationId: null,
      status: null,
      currentleadId: null,
      notificationCount: 0,
      peopleOutline, personAddOutline, closeCircleOutline,
      refreshCircleOutline, callOutline, locationOutline,
      timeOutline, globeOutline, createOutline, eyeOutline,
      trash, chevronBackOutline, notificationsOutline, closeOutline
    }
  },
  computed: {
    ...mapState('application', ['totalLeadListId', 'totalLeadCount', 'totalFollowupCount', 'totalRegisteredCount', 'totalDropedCount', 'totalApplicationList', 'totalstatusList', 'totaltodayLeadCount', 'totalremarkListId']),
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
    ...mapActions('application', ['fetchtotalLeadlistId', 'fetchtotalleadCount', 'fetchtotalfollowupCount', 'fetchtotaldropedCount', 'fetchtotalregisteredCount', 'fetchtotalApplicationlist', 'fetchtotalstatuslist', 'update_lead', 'delete_leads',
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
      // Close the modal
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
        await this.fetchtotalLeadlistId(userId);
        await this.fetchtotalleadCount(userId);
        await this.fetchtotalfollowupCount(userId);
        await this.fetchtotalregisteredCount(userId);
        await this.fetchtotaldropedCount(userId);
        await this.fetchtotalApplicationlist();
        await this.fetchtotalstatuslist();
        await this.fetchtotalremarkListId();
        await this.fetchtotaltodayLeadCount(userId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },


    openWhatsApp(lead) {
      if (lead.mobile) {
        // Modify the phone number format as needed (remove spaces, add country code, etc.)
        const phoneNumber = lead.mobile.replace(/\s+/g, '');
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
      } else {
        alert('No mobile number available');
      }
    },

    makeCall(lead) {
      if (lead.mobile) {
        window.location.href = `tel:${lead.mobile}`;
      } else {
        alert('No mobile number available');
      }
    },

    async openUpdateModal(leadId) {
      console.log('Opening modal for lead ID:', leadId);
      try {
        const leadData = await this.totalLeadListId.rows.find((lead) => lead.id === leadId);

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
        // this.resetDocumentFields();
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

.stats-card.primary {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
}

.leads-list {
  padding: 0 16px;
  background-color: #ffffff;
}

.leads-list ion-list {
  background: transparent;
}

.leads-list ion-item-sliding {
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background-color: white;
}

.leads-list ion-item-sliding:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
}

.leads-list ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
}

.leads-list ion-avatar {
  width: 64px;
  height: 64px;
  margin-right: 16px;
  border: 3px solid #e1e4e8;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.leads-list ion-avatar img {
  border-radius: 50%;
  object-fit: cover;
}

.leads-list ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.leads-list h2 {
  font-weight: 700;
  color: #1a2138;
  margin-bottom: 10px;
  font-size: 19px;
  letter-spacing: -0.4px;
}

.info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  color: #525f7f;
  font-size: 14px;
  background-color: #f8f9fa;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.info-item:hover {
  background-color: #e9ecef;
}

.info-icon {
  margin-right: 8px;
  color: #5e72e4;
  font-size: 18px;
}

.leads-list ion-item-options {
  border-radius: 16px;
}

.leads-list ion-item-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  transition: background-color 0.3s ease;
}

.leads-list ion-item-option ion-icon {
  margin-bottom: 6px;
  font-size: 22px;
}

/* Animated hover effects for options */
.leads-list ion-item-option:hover {
  opacity: 0.9;
}

/* Responsive adjustments */
@media (max-width: 375px) {
  .leads-list ion-avatar {
    width: 54px;
    height: 54px;
  }

  .leads-list h2 {
    font-size: 17px;
  }

  .info-item {
    font-size: 13px;
    padding: 5px 8px;
  }

  .info-icon {
    font-size: 16px;
  }
}

.update-modal {


  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}


.modal-header ion-toolbar {
  --background: transparent;
  --color: white;
}

.modal-back {
  color: rgb(20, 18, 18);
}

.modal-content {
  --background: #f4f6f9;
}

.update-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  margin: 20px;
}

.form-group {
  position: relative;
}

.form-group ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
  --border-color: #e0e6ed;
  --border-radius: 12px;
  --border-width: 2px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.form-group ion-item:focus-within {
  --border-color: #c8c5fc;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.1);
}

.form-group ion-label {
  color: #525f7f;
  font-weight: 600;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.form-group ion-input,
.form-group ion-select {
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-size: 16px;
  color: #1a2138;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.education-section {
  margin-top: 10px;
}

.submit-button {

  --border-radius: 12px;
  --color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  height: 55px;
  margin-top: 20px;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  transition: transform 0.2s ease;
}

.submit-button:hover {
  transform: translateY(-3px);

}

/* Responsive adjustments */
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .update-form {
    margin: 10px;
    padding: 20px 15px;
  }

  .submit-button {
    height: 50px;
  }
}
</style>