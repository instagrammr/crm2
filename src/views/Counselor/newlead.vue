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
              <ion-title>New Leads</ion-title>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>

          <ion-content>
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


            <div class="leads-list" v-if="totaltodayListId && totaltodayListId.rows">
              <ion-list>
                <ion-item-sliding v-for="lead in totaltodayListId.rows" :key="lead.id">
                  <ion-item>
                    <ion-avatar slot="start">
                      <img
                        src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                        alt="Lead Avatar" class="lead-avatar" />
                    </ion-avatar>
                    <ion-label>
                      <h2>
                        {{ lead.student_name }}
                      </h2>
                      <div class="info-grid">
                        <div class="info-item">
                          <ion-icon :icon="callOutline" class="info-icon"></ion-icon>
                          <span>{{ lead.mobile }}</span>
                        </div>
                        <div class="info-item">
                          <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
                          <span>{{ new Date(lead.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                            }) }}</span>
                        </div>
                        <div class="info-item">
                          <ion-icon :icon="globeOutline" class="info-icon"></ion-icon>
                          <span>{{ lead.country }}</span>
                        </div>
                        <div>

                          <span class="status-badge">{{ lead.priority?.status_name || '' }}</span>

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
                    <ion-item-option color="success" @click="openWhatsApp(lead)">
                      <ion-icon :icon="logoWhatsapp"></ion-icon>
                      WhatsApp
                    </ion-item-option>
                    <ion-item-option color="primary" @click="makeCall(lead)">
                      <ion-icon :icon="callOutline"></ion-icon>
                      Call
                    </ion-item-option>

                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </div>


            <!-- Add Modal -->
            <ion-modal :isOpen="showAdd" @didDismiss="showAdd = false" class="update-modal" full-screen
              css-class="full-screen-modal">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-button" fill="clear" @click="closeModalAndRefresh">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Add Lead</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <form class="update-form">
                  <ion-input v-model="newDate" label="Date" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newName" label="Name" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newMobile" label="Mobile" type="tel" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newAddress" label="Address" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newCountry" label="Country" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newRemark" label="Remark" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-if="requiresRemark" v-model="RemarkDate" label="remark Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>
                  <ion-input v-model="newuniversity" label="university" type="text" labelPlacement="floating"
                    fill="solid" class="form-input"></ion-input>
                  <ion-input v-model="newcourse" label="course" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newSource" label="Lead Source" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-select v-model="newPriorityId" label="Priority" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalStatusList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>
                  <ion-select v-model="newcounsillerId" label="Status" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalCounsillerList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>
                  <ion-input v-if="requiresFollowUpDate" v-model="followUpDate" label="Follow-up Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>

                  <ion-input v-model="userId" type="hidden"></ion-input>


                  <!-- Error message -->
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>


                  <ion-button expand="block" class="save-button" @click="addNewLead">
                    <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                    Add New Leads
                  </ion-button>
                  <!-- </div> -->
                </form>
              </ion-content>
            </ion-modal>

            <!-- Update Modal -->
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="update-modal" full-screen
              css-class="full-screen-modal">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-button" fill="clear" @click="closeModalAndRefresh">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Update Lead</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <form class="update-form">
                  <ion-input v-model="date" label="Date" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="name" label="Name" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="mobile" label="Mobile" type="tel" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="address" label="Address" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="country" label="Country" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="source" label="Lead Source" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
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
                  <ion-select v-model="priorityId" label="Priority" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalStatusList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>
                  <ion-select v-model="counsillerId" label="Status" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalCounsillerList" :key="status.id" :value="status.id">
                      {{ status.status_name }}
                    </ion-select-option>
                  </ion-select>
                  <ion-input v-if="requiresFollowUpDate" v-model="newfollowUpDate" label="Follow-up Date" type="date"
                    labelPlacement="floating" fill="solid" class="form-input"></ion-input>
                    <ion-select v-model="document" label="Staff" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totaldocumentList" :key="status.id" :value="status.id">
                      {{ status.username }}
                    </ion-select-option>
                  </ion-select>
                  <ion-button expand="block" class="save-button" @click="updateLead">
                    <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                    Save Changes
                  </ion-button>
                  <!-- Error message -->
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>
                </form>
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
                        <p>{{ selectedLead?.counsiller?.status_name || 'Pending' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item v-if="selectedLead?.followup_date">
                      <ion-label>
                        <h2>Follow-up Date</h2>
                        <p>{{ formatDate(selectedLead.followup_date) }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h2>Assigned To</h2>
                        <p>{{ selectedLead?.documentation?.username || 'Not assigned' }}</p>
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

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button class="add" @click="showAdd = true">
                <ion-icon :icon="addOutline" class="icon"></ion-icon>
              </ion-fab-button>
            </ion-fab>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { alertController } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton, IonIcon,
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem, IonAvatar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonFabButton, IonFab,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
} from '@ionic/vue';
import {
  peopleOutline, personAddOutline, closeCircleOutline,
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline, trendingUpOutline, flashOutline,
  personCircleOutline, trendingDownOutline, saveOutline, closeOutline,
  warningOutline, cloudUploadOutline, addOutline, notificationsOutline,
  logoWhatsapp
} from 'ionicons/icons';
import SideMenu from '../../components/Counselorside.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, SideMenu, IonPage, IonModal, IonInput,
    IonItem, IonSelect, IonSelectOption, IonLabel, IonFabButton, IonFab, IonList,
    IonBadge, IonAvatar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  },
  data() {
    return {
      showViewModals: false, // Add this
      selectedLead: null,    // Add this
      showUpdate: false,
      showAdd: false,
      name: '',
      mobile: '',
      address: '',
      country: '',
      source: '',
      tenth: '',
      twelth: '',
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
      newRemarkDate: '',
      newRemark: "",
      RemarkDate: '',
      newuniversity: '',
      newcourse: '',
      Remark: '',
      remarkId: null,
      editingRemarkId: null,
      isAddingRemark: false,
      university: '',
      course: '',
      passimages: [], // Array of {file, url} objects
      aadharimages: [], // Array of {file, url} objects
      panimages: [], // Array of {file, url} objects
      deleteItem: {},
      imageFile: null,
      imageFile1: null,
      imageFile2: null,
      degree: '',
      pg: '',
      ielts: '',
      year: '',
      field: '',
      showDelete: false,
      counsillerId: null,
      priorityId: null,
      document: null,
      newDate: '',
      newName: '',
      newMobile: '',
      newAddress: '',
      newCountry: '',
      newSource: '',
      newtenth: '',
      newtwelth: '',
      newdegree: '',
      newpg: '',
      newielts: '',
      newyear: '',
      newfield: '',
      newPriorityId: null,
      newcounsillerId: null,
      newdocument: null,
      userId: null,
      newpan_no: '',
      newaadhar_no: '',
      newpass_no: '',
      currentleadId: null,
      CleadId: null,
      currentDocumentId: null,
      existingPassportUrl: '',
      existingAadharUrl: '',
      existingPanUrl: '',
      documentsLoaded: false,
      followUpDate: null,
      newfollowUpDate: null,
      errorMessage: '',
      notificationCount: 0,
      searchQuery: "", // Search query for filtering leads
      peopleOutline, personAddOutline, closeCircleOutline,
      refreshCircleOutline, callOutline, locationOutline,
      timeOutline, globeOutline, createOutline, eyeOutline,
      trash, chevronBackOutline, trendingUpOutline, flashOutline,
      personCircleOutline, trendingDownOutline, saveOutline, closeOutline,
      warningOutline, cloudUploadOutline, addOutline, notificationsOutline,
      logoWhatsapp
    };
  },
  computed: {
    ...mapState('counsiller', ['totaltodayListId', 'totalCounsillerList', 'totaluploadListId', 'totalStatusList', 'totaltodayLeadCount', 
                              'totalremarkListId', 'totalDropedCount', 'totalFollowupCount', 'totalLeadCount']),
    ...mapState('user', ['totaldocumentList']),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    hasExistingDocuments() {
      return this.currentDocumentId !== null;
    },
    hasExistingPassportImages() {
      // Check if passport images are from the database (have a URL that doesn't start with blob)
      return this.passimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    hasExistingAadharImages() {
      return this.aadharimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    hasExistingPanImages() {
      return this.panimages.some(image => image.url && !image.url.startsWith('blob:'));
    },
    requiresRemark() {
      return this.newRemark.trim() !== "" || this.Remark.trim() !== "";
    },

    requiresFollowUpDate() {
      const specificCounselorId = 2;
      return this.newcounsillerId === specificCounselorId || this.counsillerId === specificCounselorId;
    },
  },
  methods: {
    ...mapActions('counsiller', ['fetchtotaltodaylistId', 'fetchtotalCounsillerlist', 'update_lead', 'delete_leads',
      'ADD_UPLOAD', 'UPDATE_UPLOAD', 'FETCH_DOCUMENTS', 'delete_passport', 'delete_documents', 'fetchtotalleadCount', 'fetchtotalfollowupCount', 'fetchtotaldropedCount',
      'delete_aadhar', 'delete_pan', 'fetchtotalstatuslist', 'Add_lead', 'fetchtotaltodayLeadCount', 'Add_remark', 'fetchtotalremarkListId', 'update_remark', 'fetchtotalremarkListId']),
    ...mapActions('user', ['fetchtotaldocumentlist']),
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
    filteredLeads() {
      if (!this.totaltodayListId?.rows) return [];

      const searchLower = this.searchQuery?.toLowerCase() || ''; // Handle empty or undefined searchQuery
      return this.totaltodayListId.rows.filter(lead => {
        return (
          lead.student_name?.toLowerCase().includes(searchLower) ||
          lead.country?.toLowerCase().includes(searchLower) ||
          lead.mobile?.toLowerCase().includes(searchLower)
        );
      });
    },
    closeModalAndRefresh() {
      // Close the modal
      this.showUpdate = false;
      window.location.reload();
    },
    triggerPassportInput() {
      this.$refs.passportInput.click();
    },
    handleSearch(event) {
      this.searchQuery = event.target.value;
    },
    isExistingImage(image, type) {
      // Check if the image is from the database (has a URL that doesn't start with blob)
      return image.url && !image.url.startsWith('blob:');
    },
    onPassportChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.passimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    triggerAadharInput() {
      this.$refs.aadharInput.click();
    },
    onAadharChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.aadharimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    triggerPanInput() {
      this.$refs.panInput.click();
    },
    onPanChange(event) {
      const files = Array.from(event.target.files);
      if (files.length) {
        this.panimages = files.map(file => ({
          file: file,
          url: URL.createObjectURL(file)
        }));
      }
    },
    async removeAllpassImages() {

      const isConfirmed = confirm('Are you sure you want to delete all passport images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_passport({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.passimages = [];
              this.existingPassportUrl = '';

              // Optional: Simple alert for success
              alert('Passport images deleted successfully');
            } catch (error) {
              console.error('Error deleting passport images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.passimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }
      // Add similar logic for aadhar and pan if needed
    },
    async removeAllaadImages() {

      const isConfirmed = confirm('Are you sure you want to delete all aadhar images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_aadhar({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.aadharimages = [];
              this.existingAadharUrl = '';

              // Optional: Simple alert for success
              alert('Aadhar images deleted successfully');
            } catch (error) {
              console.error('Error deleting images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.aadharimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }
      // Add similar logic for aadhar and pan if needed
    },
    async removeAllpanImages() {

      const isConfirmed = confirm('Are you sure you want to delete all pan images?');

      if (isConfirmed) {
        try {
          // Check if there's an existing document ID
          if (this.currentDocumentId) {
            try {
              // Call Vuex action to delete passport images
              await this.delete_pan({ id: this.currentDocumentId });

              // Clear local image arrays and URLs
              this.panimages = [];
              this.existingPanUrl = '';

              // Optional: Simple alert for success
              alert('Pan images deleted successfully');
            } catch (error) {
              console.error('Error deleting pan images:', error);
              alert('Failed to delete passport images');
            }
          } else {
            // If no document ID, just clear local images
            this.panimages = [];
          }
        } catch (error) {
          console.error('Error in removeAllImages:', error);
        }
      }
      // Add similar logic for aadhar and pan if needed
    },
    removeImage(type, index) {
      switch (type) {
        case 'passport':
          URL.revokeObjectURL(this.passimages[index].url);
          this.passimages.splice(index, 1);
          break;
        case 'aadhar':
          URL.revokeObjectURL(this.aadharimages[index].url);
          this.aadharimages.splice(index, 1);
          break;
        case 'pan':
          URL.revokeObjectURL(this.panimages[index].url);
          this.panimages.splice(index, 1);
          break;
      }
    },
    handledelete(lead) {
      this.opendeleteDialog(lead);
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
    async deletedocuments() {
      try {
        // Confirm deletion
        const confirmed = confirm('Are you sure you want to delete all document details?');

        if (confirmed && this.currentDocumentId) {
          // Call Vuex action to delete documents
          await this.delete_documents({ id: this.currentDocumentId });

          // Reset document-related fields
          this.pass_no = '';
          this.aadhar_no = '';
          this.pan_no = '';
          this.passimages = [];
          this.aadharimages = [];
          this.panimages = [];
          this.existingPassportUrl = '';
          this.existingAadharUrl = '';
          this.existingPanUrl = '';
          this.currentDocumentId = null;

          // Optional: Show success message
          alert('Documents deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting documents:', error);
        alert('Failed to delete documents');
      }
    },
    // async updateLeadStatus(lead) {
    //   const payload = {
    //     id: lead.id,
    //     counsillerId: lead.counsillerId,
    //   };
    //   try {
    //     await this.update_lead(payload);
    //     console.log('Lead status updated successfully:', lead.id);
    //     await this.fetchleadData();
    //   } catch (error) {
    //     console.error('Error updating lead status:', error);
    //   }
    // },

    // async updateLeadStaff(lead) {
    //   const payload = {
    //     id: lead.id,
    //     documentAssignId: lead.documentAssignId,
    //   };
    //   try {
    //     await this.update_lead(payload);
    //     console.log('Lead staff updated successfully:', lead.id);
    //     await this.fetchleadData(); 
    //   } catch (error) {
    //     console.error('Error updating lead staff:', error);
    //   }
    // },
    async fetchleadData() {
      const userId = this.$route.params.id;
      // const userId = this.$route.params.id;
      try {
        await this.fetchtotaltodaylistId(userId);
        await this.fetchtotalleadCount(userId);
        await this.fetchtotalfollowupCount(userId);
        await this.fetchtotaldropedCount(userId);
        await this.fetchtotalCounsillerlist();
        await this.fetchtotaldocumentlist();
        await this.fetchtotalstatuslist();
        await this.fetchtotaltodayLeadCount(userId);
        await this.fetchtotalremarkListId();
        // console.log("Leads fetched successfully:", this.totalLeadListId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
    async saveChanges() {
      try {

        const leadId = await this.addNewLead(); // Capture the returned lead ID
        await this.addNewUpload(leadId); // Pass the lead ID to addNewUpload

        this.$toast.show({ message: "Changes saved successfully!" });

        // Close the modal
        await this.fetchleadData();
        this.showAdd = false;
      } catch (error) {
        console.error("Error saving changes:", error);

        // Handle error feedback
        this.errorMessage = "Failed to save changes. Please try again.";
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

    async openUpdateModal(leadId) {
      console.log('Opening modal for lead ID:', leadId);
      // this.resetModalData();
      try {
        const leadData = await this.totaltodayListId.rows.find((lead) => lead.id === leadId);

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
          this.document = leadData.documentAssignId;
          this.counsillerId = leadData.counsillerId;
          this.priorityId = leadData.priorityId;
          this.currentleadId = leadId;
          this.newfollowUpDate = leadData.followup_date
            ? new Date(leadData.followup_date).toISOString().split("T")[0]
            : null;
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
    async updateLead() {
      console.log('leadId:', this.currentleadId);
      const payload = {
        id: this.currentleadId,
        student_name: this.name,
        mobile: this.mobile,
        date: this.date,
        country: this.country,
        address: this.address,
        lead_source: this.source,
        mark_tenth: this.tenth,
        mark_twelth: this.twelth,
        mark_degree: this.degree,
        mark_pg: this.pg,
        mark_ielts: this.ielts,
        experience_year: this.year,
        experience_field: this.field,
        counsillerId: this.counsillerId,
        documentAssignId: this.document,
        priorityId: this.priorityId,
        university: this.university,
        course: this.course,
        followup_date: this.requiresFollowUpDate ? this.newfollowUpDate : null, // Include if applicable

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

    async addOrUpdateUpload() {
      if (!this.currentleadId) {
        this.errorMessage = 'No lead selected for document upload.';
        return;
      }

      const payload = {
        passport_no: this.pass_no,
        aadhar_no: this.aadhar_no,
        pan_no: this.pan_no,
        leadId: this.currentleadId,
        passport_image: Array.from(new Set(this.passimages.map(img => img.file || img.url))),
        aadhar_image: Array.from(new Set(this.aadharimages.map(img => img.file || img.url))),
        pan_image: Array.from(new Set(this.panimages.map(img => img.file || img.url))),

        // passport_image: this.passimages.map(img => img.file || img.url),
        // aadhar_image: this.aadharimages.map(img => img.file || img.url),
        // pan_image: this.panimages.map(img => img.file || img.url)

      };

      console.log('Payload:', payload);

      try {
        if (this.currentDocumentId) {
          await this.UPDATE_UPLOAD({
            id: this.currentDocumentId,
            ...payload
          });
          console.log('Documents updated successfully');
        } else {
          await this.ADD_UPLOAD(payload);
          console.log('Documents uploaded successfully');
        }
        await this.fetchDocuments(this.currentleadId);
      } catch (error) {
        console.error('Error handling documents:', error);
        this.errorMessage = 'Failed to process documents. Please try again.';
      }
    },
    async addNewLead() {

      const payload = {
        date: this.newDate,
        student_name: this.newName,
        mobile: this.newMobile,
        address: this.newAddress,
        country: this.newCountry,
        lead_source: this.newSource,
        userId: this.userId,
        // mark_tenth: this.newtenth,
        // mark_twelth: this.newtwelth,
        // mark_degree: this.newdegree,
        // mark_pg: this.newpg,
        // mark_ielts: this.newielts,
        // experience_year: this.newyear,
        // experience_field: this.newfield,
        university: this.newuniversity,
        course: this.newcourse,
        priorityId: this.newPriorityId,
        counsillerId: this.newcounsillerId,
        followup_date: this.requiresFollowUpDate ? this.followUpDate : null,
        documentAssignId: this.newdocument,
      };

      try {
        const response = await this.Add_lead(payload); // Replace with your actual API call
        console.log("Add_lead response:", response); // Debug the response

        if (!response || !response.id) {
          throw new Error("Lead creation failed: Missing ID in response");
        }

        if (this.requiresRemark) {
          const remarkPayload = {
            leadId: response.id, // Assuming the remark is associated with the created lead
            remark: this.newRemark,
            remark_date: this.RemarkDate,
          };

          const remarkResponse = await this.Add_remark(remarkPayload); // Replace with your actual API call
          console.log("Add_remark response:", remarkResponse);
        }
        await this.fetchleadData();
        this.showAdd = false;
        console.log("Lead added successfully, ID:", response.id);
        return response.id; // Return the lead ID from the response
        // this.resetAddForm();
      } catch (error) {
        console.error("Error adding lead:", error);
        this.errorMessage = "Failed to add lead. Please try again.";
        throw error;
      }
    },
    async addNewUpload(leadId) {

      const payload = {
        passport_no: this.newpass_no,
        aadhar_no: this.newaadhar_no,
        pan_no: this.newpan_no,
        leadId: leadId,
        passport_image: Array.from(new Set(this.passimages.map(img => img.file || img.url))),
        aadhar_image: Array.from(new Set(this.aadharimages.map(img => img.file || img.url))),
        pan_image: Array.from(new Set(this.panimages.map(img => img.file || img.url))),
      };

      try {
        await this.ADD_UPLOAD(payload); // Replace with your actual API call
        console.log("Document uploaded successfully!");
        this.showAdd = false;
        // this.resetAddForm();
      } catch (error) {
        console.error("Error uploading documents:", error);
        this.errorMessage = "Failed to upload documents. Please try again.";
        throw error;
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
      this.userId = this.$route.params.id;
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

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 10px;
  color: rgb(26, 105, 5);
}
</style>