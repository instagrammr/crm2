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
              <ion-title>Dropped Documents</ion-title>
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
            <div class="leads-list">
              <ion-card v-for="lead in totaldropedListId.rows" :key="lead.id">
                <ion-card-content>
                  <div class="lead-header">
                    <div class="lead-info">
                      <h3>{{ lead.student_name }}

                      </h3>
                      <div class="info-row">
                        <span><ion-icon :icon="callOutline"></ion-icon>{{ lead.mobile }}</span>

                        <span><ion-icon :icon="timeOutline"></ion-icon>Create Date: {{ new
                          Date(lead.date).toISOString().split('T')[0] }} </span>
                        <span><ion-icon :icon="globeOutline"></ion-icon>Country: {{ lead.country }}</span>
                      </div>
                      <div class="source-row">
                        <span>Lead Source: {{ lead.lead_source }}</span>
                      </div>
                      <ion-select v-model="lead.documentId" label="Status" labelPlacement="floating" fill="solid"
                        class="form-select" @ionChange="updateLeadStatus(lead)">
                        <ion-select-option v-for="status in totaldocumentList" :key="status.id" :value="status.id">
                          {{ status.status_name }}
                        </ion-select-option>
                      </ion-select>
                    </div>
                    <ion-button fill="clear" slot="end" @click.stop="viewLeadDetails(lead)">
                      <ion-icon :icon="eyeOutline" class="view-icon"></ion-icon>
                    </ion-button>
                  </div>
                  <!-- Add Remark Button -->
                  <ion-button expand="block" color="primary" @click="openAddRemarkModal(lead)">
                    Add Remark
                  </ion-button>
                  <ion-button expand="block" color="secondary" @click="openViewRemarksModal(lead)">
                    View Remarks
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </div>
          </ion-content>
        </div>
      </ion-split-pane>
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
      <!-- Add Remark Modal -->
      <ion-modal :is-open="showRemarkModal" @didDismiss="closeRemarkModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Add Remark</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeRemarkModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-textarea placeholder="Write your remark here..." v-model="currentRemark" auto-grow rows="10"
            class="remark-input"></ion-textarea>
          <ion-input v-model="RemarkDate" label="remark date" type="date" labelPlacement="floating" fill="solid"
            class="form-input"></ion-input>
          <ion-button expand="block" color="success" @click="saveRemark">Save Remark</ion-button>
        </ion-content>
      </ion-modal>

      <!-- View Remarks Modal -->
      <ion-modal :is-open="showViewRemarksModal" @didDismiss="closeViewRemarksModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>View Remarks</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeViewRemarksModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item v-for="remark in totalremarkListId.rows" :key="remark.id">
              <ion-label>
                <h3>{{ remark.remark }}</h3>
                <p>{{ remark.remark_date
                  ? new Date(remark.remark_date).toISOString().split("T")[0]
                  : null }}</p>
              </ion-label>
              <ion-buttons slot="end">
                <!-- Edit Button -->
                <ion-button @click="editRemark(remark)">Edit</ion-button>
                <!-- Delete Button -->
                <ion-button color="danger" @click="deleteRemark(remark.id)">Delete</ion-button>
              </ion-buttons>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
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
  IonCard, IonCardContent, IonPage, IonSelectOption, IonSelect,
  IonBadge, IonModal, IonInput, IonLabel, IonTextarea,
  IonItem, IonList,
} from '@ionic/vue';
import {
  peopleOutline, personAddOutline, closeCircleOutline,
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  ellipsisVertical, notificationsOutline, closeOutline
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon, IonBadge,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar, IonModal, IonInput,
    IonItem, IonList, IonLabel, IonTextarea,
    IonCard, IonCardContent, SideMenu, IonPage, IonSelectOption, IonSelect
  },
  data() {
    return {
      showViewModals: false, // Add this
      selectedLead: null,    // Add this
      showViewRemarksModal: false,
      currentRemarks: [], // Store remarks for the selected lead
      passimages: [], // Array of {file, url} objects
      aadharimages: [], // Array of {file, url} objects
      panimages: [], // Array of {file, url} objects
      pan_no: '',
      aadhar_no: '',
      pass_no: '',
      searchQuery: '',
      expandedId: null,
      showRemarkModal: false,
      currentRemark: "",
      RemarkDate: '',
      notificationCount: 0,
      currentLead: null,
      isEditingRemark: false,
      documentsLoaded: false,
      currentDocumentId: null,
      currentRemarkId: null,
      locationOutline,
      peopleOutline,
      timeOutline, globeOutline, callOutline,
      closeCircleOutline, notificationsOutline, eyeOutline,
      closeOutline, refreshCircleOutline, personAddOutline
    };
  },
  computed: {
    ...mapState('document', ['totaldropedListId', 'totalDropedCount', 'totalFollowupCount', 'totalSubmitCount', 'totalLeadCount', 'totaldocumentList', 'totaltodayLeadCount', 'totalremarkListId',]),
    ...mapState('counsiller', ['totaluploadListId']),
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
    ...mapActions('document', ['fetchtotaldropedlistId', 'fetchtotaldropedCount', 'fetchtotalfollowupCount', 'fetchtotalleadCount',
      'fetchtotaldocumentlist', 'update_lead', 'fetchtotalremarkListId', 'Add_remark', 'update_remark', 'delete_remark', 'fetchtotaltodayLeadCount',]),
    ...mapActions('counsiller', ['FETCH_DOCUMENTS']),
    navigateToNoti() {
      this.$router.push({ name: 'NotificationDoc' });
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
    async updateLeadStatus(lead) {
      const payload = {
        id: lead.id,
        documentId: lead.documentId,
      };
      try {
        await this.update_lead(payload);
        console.log('Lead status updated successfully:', lead.id);
        await this.fetchleadData();
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
    async fetchDocuments(leadId) {

      try {
        const response = await this.FETCH_DOCUMENTS(leadId);
        // console.log("API Response for Documents:", response);

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
    closeModalAndRefresh() {
      // Close the modal
      this.showUpdate = false;
      window.location.reload();
    },
    openAddRemarkModal(lead) {
      this.currentLead = lead.id;
      this.currentRemark = lead.remark || ''; // Load existing remark if any
      this.showRemarkModal = true;
      this.isEditingRemark = false;
    },
    closeRemarkModal() {
      this.showRemarkModal = false;
      this.currentLead = null;
      this.currentRemark = '';
      this.RemarkDate = null;
      this.isEditingRemark = false;
    },
    async saveRemark() {

      if (!this.currentRemark) {
        this.errorMessage = "Remark cannot be empty.";
        return;
      }

      const payload = {
        id: this.currentRemarkId,
        remark: this.currentRemark,
        remark_date: this.RemarkDate || null,
        leadId: this.currentLead,
      };

      // console.log("Remark Date:", this.RemarkDate);
      try {

        if (this.isEditingRemark) {

          const response = await this.update_remark(payload); // Replace with your actual API call
          console.log("update_remark response:", response); // Debug the response
        } else {
          const response = await this.Add_remark(payload); // Replace with your actual API call
          console.log("Add_remark response:", response); // Debug the response
        }

        const updatedRemarks = await this.fetchtotalremarkListId(this.currentLead);
        this.currentRemarks = updatedRemarks.rows || [];

        this.closeRemarkModal(); // Close the modal
      } catch (error) {
        console.error(
          this.isEditingRemark ? "Error updating remark:" : "Error adding remark:",
          error
        );
        this.errorMessage = `Failed to ${this.isEditingRemark ? "update" : "add"
          } remark. Please try again.`;
      }
    },
    async openViewRemarksModal(lead) {
      try {
        // Assuming there's an API or Vuex action to fetch remarks by lead ID
        const response = await this.fetchtotalremarkListId(lead.id);
        this.currentRemarks = response.rows || []; // Assign remarks to currentRemarks
        this.currentLead = lead.id;
        this.showViewRemarksModal = true; // Open the modal
      } catch (error) {
        console.error("Error fetching remarks:", error);
        this.errorMessage = "Failed to fetch remarks. Please try again.";
      }
    },
    closeViewRemarksModal() {
      this.showViewRemarksModal = false;
      this.currentRemarks = [];
      this.currentLead = null;
    },
    async editRemark(remark) {
      this.currentRemark = remark.remark;
      this.RemarkDate = remark.remark_date
        ? new Date(remark.remark_date).toISOString().split("T")[0]
        : null;
      this.currentRemarkId = remark.id; // Track remark ID for editing
      this.isEditingRemark = true;
      this.showRemarkModal = true;
    },
    async deleteRemark(remark) {
      try {
        console.log("Attempting to delete remark:", remark);
        const confirmDelete = confirm("Are you sure you want to delete this remark?");
        if (confirmDelete) {
          await this.delete_remark({ id: remark }); // Pass the required format to Vuex
          console.log("Remark deleted successfully");
          await this.fetchtotalremarkListId(this.currentLead); // Refresh remarks list
        }
      } catch (error) {
        console.error("Error deleting remark:", error);
        alert("Failed to delete the remark. Please try again.");
      }
    },
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotaldropedlistId(userId);
        await this.fetchtotaldropedCount(userId);
        await this.fetchtotalfollowupCount(userId);
        await this.fetchtotalleadCount(userId);
        await this.fetchtotaldocumentlist();
        await this.fetchtotalremarkListId();
        await this.fetchtotaltodayLeadCount(userId);
        // console.log("Leads fetched successfully:", this.totalfollowupListId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
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
      console.error('Error fetching project list:', error);
    }
  }
});
</script>




<style>
/* Global Variables */
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

:root {
  --card-border-radius: 12px;
  --transition-speed: 0.3s;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --gradient-primary: linear-gradient(135deg, #4e54c8, #8f94fb);
  --gradient-success: linear-gradient(135deg, #2ecc71, #26c6da);
  --gradient-danger: linear-gradient(135deg, #ff4b2b, #ff416c);
  --gradient-warning: linear-gradient(135deg, #f6d365, #fda085);
}




/* Stats Grid */
.stats-grid {
  padding: 20px;
  background: var(--ion-background-color);
}

/* Stats Cards */
.stats-card {
  border-radius: var(--card-border-radius);
  padding: 24px;
  color: white;
  height: 100%;
  min-height: 160px;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-speed) ease;
  cursor: pointer;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: var(--transition-speed);
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stats-card:hover::before {
  opacity: 1;
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

.stats-content {
  position: relative;
  z-index: 1;
}

.stats-content h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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


/* Updated Card Styles with Modern Design */


.leads-list .ion-card {
  margin-bottom: 16px;
  border-radius: 16px;
  box-shadow: var(--shadow-elevated);
  background: white;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border-soft);
}

.leads-list .ion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.lead-header {
  display: flex;
  align-items: flex-start;
  padding: 20px;
}

.lead-info {
  flex-grow: 1;
}

.lead-info h3 {
  color: var(--color-text-dark);
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--color-text-muted);
}

.info-row span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-row ion-icon {
  color: var(--ion-color-primary);
  margin-right: 6px;
  font-size: 1rem;
}

.source-row {
  margin-bottom: 16px;
  color: var(--color-text-muted);
  font-style: italic;
}

/* Enhanced Form Select */
.form-select {
  --background: var(--color-background-light);
  --border-radius: 12px;
  --border-color: var(--color-border-soft);
  --color: var(--color-text-dark);
  margin-top: 12px;
}

/* Gradient Badges for Statistic Cards */
.stats-card {
  transition: all 0.4s ease;
  background-size: 200% auto;
  background-position: left center;
}

.stats-card:hover {
  background-position: right center;
  transform: scale(1.03);
}

.primary-gradient {
  background-image: var(--gradient-primary);
}

.danger-gradient {
  background-image: var(--gradient-danger);
}

.warning-gradient {
  background-image: var(--gradient-warning);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .lead-header {
    flex-direction: column;
  }

  .info-row {
    flex-direction: column;
    gap: 8px;
  }
}
</style>