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
              <ion-title class="page-title">Total Leads</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar v-model="searchQuery" placeholder="Search by name, mobile.." class="custom-searchbar"
                  show-clear-button="focus" @ionInput="handleSearch"></ion-searchbar>
              </ion-buttons>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <!-- Stats Cards -->

            <ion-grid class="">
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
                  <div class="stats-card danger-gradient">
                    <div class="stats-icon">
                      <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <h4>Registered</h4>
                      <span class="stats-value">{{ totalRegisteredCount }}</span>

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
            <!-- Leads List -->
            <div class="leads-list" v-if="totalLeadListId && totalLeadListId.rows">
              <ion-item-sliding v-for="lead in totalLeadListId.rows" :key="lead.id">
                <ion-item class="lead-item">
                  <ion-avatar slot="start" class="lead-avatar">
                    <img
                      src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                      alt="Lead Avatar" />
                  </ion-avatar>

                  <ion-label>
                    <h2 class="lead-name">{{ lead.student_name }}</h2>
                    <div class="info-row">
                      <span class="info-item">
                        <ion-icon :icon="callOutline"></ion-icon>
                        {{ lead.mobile }}
                      </span>
                      <span class="info-item">
                        <ion-icon :icon="globeOutline"></ion-icon>
                        Country: {{ lead.country }}
                      </span>
                    </div>
                  </ion-label>
                  <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                    <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                  </ion-button>
                </ion-item>

                <ion-item-options side="start">
                  <ion-item-option color="primary" @click="openUpdateModal(lead.id)">
                    <ion-icon :icon="createOutline" class="option-icon"></ion-icon>
                    Edit
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
        
                  <ion-input v-model="university" label="university" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="course" label="course" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-row>
                    <ion-col>
                      <ion-select v-model="documentId" placeholder="Select status">
                        <ion-select-option v-for="status in totaldocumentList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                    </ion-col>
                  </ion-row>
                  <ion-input v-if="requiresFollowUpDate" v-model="newfollowUpDate" label="Follow-up Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>
                    <ion-row>
                    <ion-col>
                      <ion-select v-model="DocumentStatusId" placeholder="Select Document Status">
                        <ion-select-option v-for="status in totalDocumentStatusList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-select v-model="application" placeholder="Select staff">
                        <ion-select-option v-for="status in totalapplicationList" :key="status.id" :value="status.id">
                          {{ status.username }}
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
                        <p>{{ selectedLead?.document?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_documentdate">
                      <ion-label>
                        <h2>Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_documentdate) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Assigned To</h2>
                        <p>{{ selectedLead?.applicat?.username || 'Not assigned' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Student Status</h2>
                        <p>{{ selectedLead?.student_status?.status_name || 'Not assigned' }}</p>
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
                  <ion-input v-model="pass_no" label="Passport no" type="text" labelPlacement="floating" 
                    fill="solid" class="form-input" readonly></ion-input>
                  <ion-input v-model="aadhar_no" label="Aadhar no" type="text" labelPlacement="floating" 
                    fill="solid" class="form-input" readonly></ion-input>
                  <ion-input v-model="pan_no" label="Pan no" type="text" labelPlacement="floating" 
                    fill="solid" class="form-input" readonly></ion-input>

                  <!-- Passport -->
                  <div class="document-item">
                    <ion-label class="image-label">Passport Images</ion-label>
                    <div class="preview-container" v-if="passimages?.length">
                      <div v-for="(image, index) in passimages" :key="index" class="preview-wrapper">
                        <img :src="image.url || image" alt="Passport Image" class="preview-image">
                        <ion-button fill="clear" @click="downloadImage(image.url || image, 'passport', index)" 
                          class="download-btn">
                          <ion-icon :icon="downloadOutline"></ion-icon>

                        </ion-button>
                      </div>
                    </div>
                  </div>

                  <!-- Aadhar -->
                  <div class="document-item">
                    <ion-label class="image-label">Aadhar Images</ion-label>
                    <div class="preview-container" v-if="aadharimages?.length">
                      <div v-for="(image, index) in aadharimages" :key="index" class="preview-wrapper">
                        <img :src="image.url || image" alt="Aadhar Image" class="preview-image">
                        <ion-button fill="clear" @click="downloadImage(image.url || image, 'aadhar', index)" 
                          class="download-btn">
                          <ion-icon :icon="downloadOutline"></ion-icon>
                        </ion-button>
                      </div>
                    </div>
                  </div>

                  <!-- Pan -->
                  <div class="document-item">
                    <ion-label class="image-label">Pan Images</ion-label>
                    <div class="preview-container" v-if="panimages?.length">
                      <div v-for="(image, index) in panimages" :key="index" class="preview-wrapper">
                        <img :src="image.url || image" alt="Pan Image" class="preview-image">
                        <ion-button fill="clear" @click="downloadImage(image.url || image, 'pan', index)" 
                          class="download-btn">
                          <ion-icon :icon="downloadOutline"></ion-icon>
                        </ion-button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </ion-content>
            </ion-modal>

            <!-- Delete Confirmation Modal -->
            <ion-modal :is-open="showDelete" @didDismiss="closeDeleteDialog" class="delete-modal">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-title>Confirm Delete</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeDeleteDialog">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <div class="delete-content">
                  <ion-icon :icon="warningOutline" class="warning-icon"></ion-icon>
                  <h2>Delete Lead?</h2>
                  <p>Are you sure you want to delete this lead? This action cannot be undone.</p>
                  <div class="delete-actions">
                    <ion-button color="medium" expand="block" @click="closeDeleteDialog">Cancel</ion-button>
                    <ion-button color="danger" expand="block" @click="confirmdelete">
                      <ion-icon :icon="trash" slot="start"></ion-icon>
                      Delete
                    </ion-button>
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
import { toastController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapState } from 'vuex';
import { alertController } from '@ionic/vue';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton, IonIcon,
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem, IonAvatar, IonItemOption, IonItemOptions,
  IonSelect, IonItemSliding,
  IonSelectOption,
  IonLabel,
  IonBadge
} from '@ionic/vue';
import {
  peopleOutline, personAddOutline, closeCircleOutline,
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline, notificationsOutline, closeOutline,
  checkmarkCircleOutline,downloadOutline
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, IonInput,
    IonItem, IonSelect, IonSelectOption, IonLabel, IonBadge,
    IonAvatar, IonItemOption, IonItemOptions, IonItemSliding
  },
  data() {
    return {
      downloadOutline  ,
      showViewModals: false, // Add this
      selectedLead: null,
      showUpdate: false,
      newRemark: '',
      university: '',
      course: '',
      remarkDate: "",
      Remark: '',
      remarkId: null,
      newRemarkDate: '',
      editingRemarkId: null,
      isAddingRemark: false,
      DocumentStatusId: null,
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
      application: null,
      showDelete: false,
      documentId: null,
      currentleadId: null,
      newfollowUpDate: null,
      notificationCount: 0,
      peopleOutline, personAddOutline, closeCircleOutline,
      refreshCircleOutline, callOutline, locationOutline,
      timeOutline, globeOutline, createOutline, eyeOutline,
      trash, chevronBackOutline, notificationsOutline, closeOutline,
      checkmarkCircleOutline
    }
  },
  computed: {
    ...mapState('document', ['totalLeadListId', 'totalLeadCount', 'totalFollowupCount', 'totalRegisteredCount', 'totalDocumentStatusList',
      'totalDropedCount', 'totaldocumentList', 'totaltodayLeadCount', 'totalremarkListId']),
    ...mapState('counsiller', ['totaluploadListId']),
    ...mapState('user', ['totalapplicationList']),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    requiresFollowUpDate() {
      const specificDocumentId = 2;
      return this.documentId === specificDocumentId;
    },
  },
  methods: {
    ...mapActions('document', ['fetchtotalLeadlistId', 'fetchtotalleadCount', 'fetchtotalfollowupCount', 'fetchtotaldropedCount', 'fetchtotaldocumentlist', 'fetchtotalDocuumentstatuslist',
      'update_lead', 'delete_leads', 'fetchtotalremarkListId', 'Add_remark', 'update_remark', 'delete_remark', 'fetchtotaltodayLeadCount', 'fetchtotalregisteredCount']),
    ...mapActions('counsiller', ['FETCH_DOCUMENTS']),
    ...mapActions('user', ['fetchtotalapplicationlist']),
    navigateToNoti() {
      this.$router.push({ name: 'NotificationDoc' });
    },

    async downloadImage(imageUrl, type, index) {
  try {
    // Automatically redirect HTTP to HTTPS
    if (imageUrl.startsWith("http://")) {
      imageUrl = imageUrl.replace("http://", "https://");
    }

    // Show loading toast
    const loadingToast = await toastController.create({
      message: 'Downloading image...',
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    await loadingToast.present();

    // Add CORS headers to the request
    const response = await fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'image/*, application/octet-stream'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convert response to blob
    const blob = await response.blob();

    // Create object URL
    const url = window.URL.createObjectURL(blob);

    // Use Ionic Capacitor File API for mobile devices
    if (this.$capacitor && this.$capacitor.Plugins.Filesystem) {
      const { Filesystem } = this.$capacitor.Plugins;

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];

        try {
          // Save file using Capacitor
          await Filesystem.writeFile({
            path: `${type}_document_${index + 1}.jpg`,
            data: base64Data,
            directory: 'DOCUMENTS',
            recursive: true
          });

          // Success toast
          const successToast = await toastController.create({
            message: 'Image saved successfully',
            duration: 2000,
            position: 'bottom',
            color: 'success'
          });
          await successToast.present();
        } catch (error) {
          console.error('Filesystem write error:', error);
          throw error;
        }
      };
    } else {
      // Browser download fallback
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}_document_${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success toast
      const successToast = await toastController.create({
        message: 'Image downloaded successfully',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await successToast.present();
    }

    // Cleanup
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Download failed:', error);

    // Error toast
    const errorToast = await toastController.create({
      message: 'Failed to download image. Please try again later.',
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await errorToast.present();
  }
}
,


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
        await this.fetchtotalregisteredCount(userId);
        await this.fetchtotalfollowupCount(userId);
        await this.fetchtotaldropedCount(userId);
        await this.fetchtotaldocumentlist();
        await this.fetchtotalapplicationlist();
        await this.fetchtotalremarkListId();
        await this.fetchtotalDocuumentstatuslist();
        await this.fetchtotaltodayLeadCount(userId);

      } catch (error) {
        console.error('Error fetching lead data:', error);
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
          // this.priorityId = leadData.priorityId;
          this.documentId = leadData.documentId;
          this.application = leadData.applicationAssignId;
          this.currentleadId = leadId;
          this.newfollowUpDate = leadData.followup_documentdate
            ? new Date(leadData.followup_documentdate).toISOString().split("T")[0]
            : null;
          this.DocumentStatusId = leadData.documentStatusId;  
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
        followup_documentdate: this.requiresFollowUpDate ? this.newfollowUpDate : null, // Include if applicable
        // priorityId: this.priorityId,
        documentId: this.documentId,
        university: this.university,
        course: this.course,
        applicationAssignId: this.application,
        documentStatusId: this.DocumentStatusId
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

.preview-wrapper {
  position: relative;
  display: inline-block;
  margin: 8px;
}

.preview-image {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}

.download-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  --background: rgba(255, 255, 255, 0.9);
  
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.preview-wrapper:hover .download-btn {
  opacity: 1;
}

.document-item {
  margin-bottom: 20px;
}

.image-label {
  font-weight: 500;
  margin-bottom: 10px;
  display: block;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

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

.stats-card.primary-gradient {
  background: var(--gradient-primary);
}

.stats-card.success-gradient {
  background: var(--gradient-success);
}

.stats-card.danger-gradient {
  background: var(--gradient-danger);
}

.stats-card.warning-gradient {
  background: var(--gradient-warning);
}

.stats-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  opacity: 0.9;
}





.stats-value {
  font-size: 2rem;
  font-weight: 700;
  display: block;
  margin: 8px 0;
  letter-spacing: -0.5px;
}

.stats-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
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

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  width: fit-content;
}

.trend-indicator.positive {
  background-color: rgba(5, 150, 105, 0.1);
  color: var(--success-color);
}

.trend-indicator.negative {
  background-color: rgba(220, 38, 38, 0.1);
  color: var(--danger-color);
}



.status-badge.registered {
  background-color: rgba(5, 150, 105, 0.1);
  color: var(--success-color);
}




.lead-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #555;
  text-align: right;
}

@media (max-width: 768px) {


  .lead-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .label,
  .value {
    text-align: left;
    width: 100%;
  }
}


.status-badge.pending {
  background-color: rgba(217, 119, 6, 0.1);
  color: var(--warning-color);
}

.status-badge.dropped {
  background-color: rgba(220, 38, 38, 0.1);
  color: var(--danger-color);
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 1rem 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.source-row {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.source-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
}

.source-icon {
  color: var(--primary-color);
}

/* Form Controls */
.form-input,
.form-select {
  margin-bottom: 1rem;
  --border-radius: var(--radius-md);
  --background: var(--background-input);
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: var(--text-muted);
  --color: var(--text-primary);
  font-size: 0.875rem;
}

.form-input:focus-within,
.form-select:focus-within {
  --background: var(--background-card);
  box-shadow: 0 0 0 2px var(--border-focus);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --border-radius: var(--radius-md);
  height: 2.25rem;
  transition: var(--transition-all);
}

.action-btn.edit {
  --background: rgba(99, 102, 241, 0.1);
  --color: var(--primary-color);
}

.action-btn.view {
  --background: rgba(5, 150, 105, 0.1);
  --color: var(--success-color);
}

.action-btn.delete {
  --background: rgba(220, 38, 38, 0.1);
  --color: var(--danger-color);
}

.action-btn:hover {
  --background: var(--primary-color);
  --color: white;
  transform: translateY(-2px);
}

.action-btn.view:hover {
  --background: var(--success-color);
}

.action-btn.delete:hover {
  --background: var(--danger-color);
}

/* Modal Styles */
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


.delete-modal {
  /* --height: auto; */
  --height: 24%;
  --width: 90%;
  --max-width: 600px;
  --border-radius: var(--radius-lg);
  --background: var(--background-card);
}





.update-form {
  padding: 1.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-light);
}

/* Delete Modal Specific Styles */
.delete-content {
  text-align: center;
  padding: 2rem;
}

.warning-icon {
  font-size: 3rem;
  color: var(--danger-color);
  margin-bottom: 1rem;
}

.delete-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.delete-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.delete-actions {
  display: flex;
  gap: 1rem;
}

.delete-actions ion-button {
  flex: 1;
  --border-radius: var(--radius-md);
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-wrapper {
  position: relative;

}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-button {
  position: absolute;
  top: -8px;
  right: -8px;
  --padding-start: 4px;
  --padding-end: 4px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {

  .leads-list {
    padding: 1rem;
  }


  .custom-searchbar {
    max-width: 100%;
    margin: 0.5rem 1rem;
  }



  .lead-header {
    flex-direction: column;
    gap: 1rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-up {
  animation: slideUp 0.4s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}











.status-badge.pending {
  background-color: #f0ad4e;
  color: #fff;
}

.status-badge.approved {
  background-color: #5cb85c;
  color: #fff;
}

.status-badge.rejected {
  background-color: #d9534f;
  color: #fff;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-buttons ion-button {
  --background: transparent;
  --color: #007bff;
}

.action-buttons ion-button.delete {
  --color: #d9534f;
}


.lead-header {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Space between image and text */
}

.lead-avatar {
  width: 40px;
  /* Adjust size of the image */
  height: 40px;
  border-radius: 50%;
  /* Make the image circular */
  object-fit: cover;
  /* Ensure the image fits well within the circle */
}
</style>


<style scoped>
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

  width: 99%;

  margin: 0 auto 16px;
}

.leads-list ion-item-sliding:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
}

.leads-list ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --min-height: 120px;
}

.leads-list ion-avatar {

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

.form {
  padding: 20px;
}

.form ion-input {
  margin-bottom: 15px;
  --background: #ffffff;
  --padding-start: 15px;
  --padding-end: 15px;
  --border-radius: 8px;
  --border-width: 1px;
  --border-color: #ddd;
}

.save {
  margin: 20px;
  --border-radius: 8px;
}

.document-upload-section {
  margin-top: 20px;
  padding: 15px;
}

.document-item {
  margin-bottom: 20px;
}

.image-label {
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0;
  padding: 0 20px;
}

@media (max-width: 600px) {
  .leads-list ion-item-sliding {
    height: 140px;
  }

  .leads-list ion-item {
    --min-height: 140px;
  }

  .info-grid {
    flex-direction: column;
    gap: 8px;
  }

  .form {
    padding: 10px;
  }

  .preview-wrapper {
    width: 80px;
    height: 80px;
  }
}

.modal2 {
  --height: auto;
  --width: 90%;
  max-width: 400px;
}

.custom-searchbar {
  max-width: 300px;
}

.back {
  margin: 0;
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>