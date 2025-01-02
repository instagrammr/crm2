<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <SideMenu />

        <div class="ion-page" id="main-content">
          <ion-header class="header-container">
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-button class="menu-button"></ion-menu-button>
              </ion-buttons>
              <ion-title>Leads</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
          
            <!-- Stats Grid -->
            <ion-grid >
              <ion-row>
                <ion-col>
                  <div class="stats-card primary">
                    <div class="stats-content">
                      <div class="stats-icon-container">
                        <ion-icon :icon="peopleOutline"></ion-icon>
                      </div>
                      <h4>Total Leads</h4>
                      <span class="stats-value">{{ totalLeadCount }}</span>
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>

            <!-- Search Bar -->
            <div class="search-container">
              <ion-searchbar
                v-model="searchQuery"
                @ionInput="handleSearch"
                placeholder="Search leads..."
              ></ion-searchbar>
            </div>

            <!-- Leads Table -->
            <div class="table-container" v-if="totalLeadListId && totalLeadListId.rows">
              <table class="leads-table">
                <thead>
  <tr>
    <th>#</th> <!-- Added number column -->
    <th>Profile</th>
    <th>Name</th>
    <th>Contact</th>
    <th>Date</th>
    <th>Country</th>
    <th>Source</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr v-for="(lead, index) in displayLeads" :key="lead.id">
    <td>{{ index + 1 }}</td>
    <td>
      <ion-avatar>
        <img
          alt="Profile"
          src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
        />
      </ion-avatar>
    </td>
    <td>{{ lead.student_name }}</td>
    <td>{{ formatPhone(lead.mobile) }}</td>
    <td>{{ formatDate(lead.date) }}</td>
    <td>{{ lead.country }}</td>
    <td>{{ lead.lead_source }}</td>
    <td class="actions">
      <ion-button fill="clear" @click="openUpdateModal(lead.id)">
        <ion-icon :icon="createOutline" />
      </ion-button>
      <ion-button fill="clear" color="danger" @click="handledelete(lead)">
        <ion-icon :icon="trashOutline" />
      </ion-button>
    </td>
  </tr>
</tbody>
              </table>
            </div>

            <!-- Update Modal -->
            <ion-modal
              :is-open="showUpdate"
              @didDismiss="showUpdate = false"
              class="update-modal"
            >
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="showUpdate = false">
                      <ion-icon :icon="chevronBackOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                  <ion-title>Update Lead</ion-title>
                </ion-toolbar>
              </ion-header>

              <ion-content class="modal-content">
                <form class="update-form" @submit.prevent="updateLead">
                  <div class="form-group">
                    <ion-item>
                      <ion-label position="floating">Date</ion-label>
                      <ion-input v-model="date" type="date" required></ion-input>
                    </ion-item>
                  </div>

                  <div class="form-group">
                    <ion-item>
                      <ion-label position="floating">Full Name </ion-label>
                      
                      <ion-input v-model="name" type="text" required></ion-input>
                    </ion-item>
                  </div>

                  <div class="form-group">
                    <ion-item>
                      <ion-label position="floating">Mobile Number</ion-label>
                      <ion-input v-model="mobile" type="tel" required></ion-input>
                    </ion-item>
                  </div>

                  <div class="form-grid">
                    <div class="form-group">
                      <ion-item>
                        <ion-label position="floating">Country</ion-label>
                        <ion-input v-model="country" type="text" required></ion-input>
                      </ion-item>
                    </div>

                    <div class="form-group">
                      <ion-item>
                        <ion-label position="floating">Lead Source</ion-label>
                        <ion-input v-model="source" type="text" required></ion-input>
                      </ion-item>
                    </div>
                  </div>

                  <div class="education-section">
                    <div class="form-group">
                      <ion-item>
                        <ion-label position="floating">Assign Counsellor</ion-label>
                        <ion-select v-model="staff" interface="action-sheet">
                          <ion-select-option
                            v-for="counsellor in totalcounsillerList"
                            :key="counsellor.id"
                            :value="counsellor.id"
                          >
                            {{ counsellor.username }}
                          </ion-select-option>
                        </ion-select>
                      </ion-item>
                    </div>
                  </div>

                  <ion-button expand="block" type="submit" class="submit-button">
                    Update Lead
                  </ion-button>
                </form>
              </ion-content>
            </ion-modal>

            <!-- Delete Modal -->
            <ion-modal
              :is-open="showDelete"
              @didDismiss="closeDeleteDialog"
              class="delete-modal"
            >
              <ion-header>
                <ion-toolbar>
                  <ion-title>Confirm Delete</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeDeleteDialog">
                      <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>

              <ion-content class="delete-content">
                <div class="delete-warning">
                  <h2>Delete Lead</h2>
                  <p>Are you sure you want to delete this lead?</p>
                </div>

                <div class="delete-actions">
                  <ion-button color="medium" expand="block" @click="closeDeleteDialog">
                    Cancel
                  </ion-button>
                  <ion-button color="danger" expand="block" @click="confirmdelete">
                    Yes, Delete
                  </ion-button>
                </div>
              </ion-content>
            </ion-modal>

            <!-- Alert -->
            <ion-alert
              :is-open="showAlert"
              :header="alertType === 'success' ? 'Success' : 'Error'"
              :message="alertMessage"
              :buttons="['OK']"
              @didDismiss="showAlert = false"
            ></ion-alert>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>


  <script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonMenuButton, 
  IonButton, 
  IonIcon, 
  IonSplitPane, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonSearchbar,
  IonCard, 
  IonCardContent, 
  IonPage, 
  IonModal, 
  IonInput,
  IonItem, 
  IonSelect, 
  IonSelectOption, 
  IonLabel, 
  IonChip, 
  IonAvatar, 
  IonAlert
} from '@ionic/vue';

import { 
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
  trashOutline, 
  chevronBackOutline, 
  peopleCircleOutline,
  checkmarkCircleOutline, 
  timerOutline, 
  trendingUpOutline,
  trendingDownOutline, 
  removeOutline, 
  funnelOutline,
  closeOutline, 
  warningOutline
} from 'ionicons/icons';

import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'TotalLeads',
  
  components: {
    IonApp, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonMenuButton, 
    IonButton, 
    IonIcon, 
    IonSplitPane, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonSearchbar,
    IonCard, 
    IonCardContent, 
    SideMenu, 
    IonPage, 
    IonModal, 
    IonInput, 
    IonItem, 
    IonSelect, 
    IonSelectOption, 
    IonLabel,
    IonChip, 
    IonAvatar, 
    IonAlert
  },

  data() {
    return {
      showUpdate: false,
      showDelete: false,
      showAlert: false,
      alertMessage: '',
      alertType: '',
      searchQuery: '',
      filteredLeads: [],
      searchFields: ['student_name', 'mobile', 'country', 'lead_source', 'status'],
      searchDebounceTimer: null,
      
      // Form fields
      name: '',
      mobile: '',
      address: '',
      country: '',
      source: '',
      date: '',
      tenth: '',
      twelth: '',
      degree: '',
      pg: '',
      ielts: '',
      year: '',
      field: '',
      staff: null,
      
      // Delete handling
      deleteItem: {},
      currentleadId: null,
      
      // Icons
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
      trashOutline, 
      chevronBackOutline, 
      peopleCircleOutline,
      checkmarkCircleOutline, 
      timerOutline, 
      trendingUpOutline,
      trendingDownOutline, 
      removeOutline, 
      funnelOutline,
      closeOutline, 
      warningOutline,

      // Stats
      convertedCount: 0,
      pendingCount: 0,
      droppedCount: 0
    };
  },

  computed: {
    ...mapState('addLead', ['totalLeadListId', 'totalLeadCount']),
    ...mapState('user', ['totalcounsillerList']),
    
    displayLeads() {
      return this.searchQuery.trim() ? this.filteredLeads : (this.totalLeadListId?.rows || []);
    }
  },

  methods: {
    ...mapActions('addLead', [
      'fetchtotalLeadlistId', 
      'fetchtotalleadCount', 
      'update_lead', 
      'delete_leads'
    ]),
    ...mapActions('user', ['fetchtotalcounsillerlist']),

    // Search handling
    handleSearch(event) {
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      const query = event.target.value.toLowerCase().trim();
      this.searchQuery = query;

      if (!query) {
        this.filteredLeads = [];
        this.calculateStats();
        return;
      }

      this.searchDebounceTimer = setTimeout(() => {
        this.performSearch(query);
      }, 300);
    },

    performSearch(query) {
      try {
        if (!this.totalLeadListId?.rows) {
          console.warn('No leads data available for search');
          return;
        }

        this.filteredLeads = this.totalLeadListId.rows.filter(lead => {
          return this.searchFields.some(field => {
            const value = lead[field];
            if (value === null || value === undefined) {
              return false;
            }

            switch (field) {
              case 'mobile':
                return value.toString().includes(query);
              case 'status':
                return value ? value.toLowerCase().includes(query) : false;
              default:
                return value.toString().toLowerCase().includes(query);
            }
          });
        });

        this.updateFilteredStats();
      } catch (error) {
        console.error('Error performing search:', error);
        this.showAlert = true;
        this.alertMessage = 'Error performing search';
        this.alertType = 'error';
      }
    },

    updateFilteredStats() {
      this.convertedCount = this.filteredLeads.filter(l => l.status === 'Converted').length;
      this.pendingCount = this.filteredLeads.filter(l => l.status === 'Pending').length;
      this.droppedCount = this.filteredLeads.filter(l => l.status === 'Dropped').length;
    },

    // Format utilities
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    formatPhone(phone) {
      return phone?.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') || '';
    },

    getInitialsAvatar(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    },

    getStatusClass(status) {
      const statusMap = {
        'New': 'primary',
        'Converted': 'success',
        'Pending': 'warning',
        'Dropped': 'danger'
      };
      return statusMap[status] || 'primary';
    },

    // Modal handling
    async openUpdateModal(leadId) {
      try {
        const leadData = this.totalLeadListId.rows.find(
          (lead) => lead.id === leadId
        );
        
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
          this.staff = leadData.counsillerAssignId;
          this.currentleadId = leadId;
          
          this.showUpdate = true;
        } else {
          this.showAlert = true;
          this.alertMessage = 'Lead not found';
          this.alertType = 'error';
        }
      } catch (error) {
        console.error('Error fetching lead data:', error);
        this.showAlert = true;
        this.alertMessage = 'Error loading lead data';
        this.alertType = 'error';
      }
    },

    async updateLead() {
      const payload = {
        id: this.currentleadId,
        student_name: this.name,
        mobile: this.mobile,
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
        counsillerAssignId: this.staff
      };

      try {
        await this.update_lead(payload);
        this.showUpdate = false;
        await this.fetchleadData();
        
        this.showAlert = true;
        this.alertMessage = 'Lead updated successfully';
        this.alertType = 'success';
      } catch (error) {
        console.error('Error updating lead:', error);
        this.showAlert = true;
        this.alertMessage = 'Error updating lead';
        this.alertType = 'error';
      }
    },

    // Delete handling
    handledelete(lead) {
      this.deleteItem = lead;
      this.showDelete = true;
    },

    closeDeleteDialog() {
      this.showDelete = false;
      this.deleteItem = {};
    },

    async confirmdelete() {
      if (this.deleteItem.id) {
        try {
          await this.delete_leads(this.deleteItem);
          this.closeDeleteDialog();
          await this.fetchleadData();
          
          this.showAlert = true;
          this.alertMessage = 'Lead deleted successfully';
          this.alertType = 'success';
        } catch (error) {
          console.error('Error deleting lead:', error);
          this.showAlert = true;
          this.alertMessage = 'Error deleting lead';
          this.alertType = 'error';
        }
      }
    },

    // Data fetching
    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await Promise.all([
          this.fetchtotalLeadlistId(userId),
          this.fetchtotalleadCount(userId),
          this.fetchtotalcounsillerlist()
        ]);

        if (this.totalLeadListId?.rows) {
          this.calculateStats();
        }
      } catch (error) {
        console.error('Error fetching lead data:', error);
        this.showAlert = true;
        this.alertMessage = 'Error loading data';
        this.alertType = 'error';
      }
    },

    calculateStats() {
      const leads = this.totalLeadListId?.rows || [];
      this.convertedCount = leads.filter(l => l.status === 'Converted').length;
      this.pendingCount = leads.filter(l => l.status === 'Pending').length;
      this.droppedCount = leads.filter(l => l.status === 'Dropped').length;
    }
  },

  async mounted() {
    await this.fetchleadData();
  },

  watch: {
    showAlert(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showAlert = false;
          this.alertMessage = '';
          this.alertType = '';
        }, 3000);
      }
    }
  }
});
</script>


<style scoped>
.table-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background: white;
}

.leads-table thead {
  background-color: #000000;
  color: white;
}

.leads-table th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.leads-table td {
  padding: 15px;
  border-bottom: 1px solid #edf2f7;
  color: #2d3748;
  font-size: 14px;
  vertical-align: middle;
}

.leads-table tbody tr:hover {
  background-color: #f7fafc;
}

.leads-table ion-avatar {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.leads-table .actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.leads-table .actions ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
  height: 32px;
}

.leads-table .actions ion-icon {
  font-size: 18px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .table-container {
    margin: 10px;
    padding: 10px;
  }

  .leads-table th,
  .leads-table td {
    padding: 10px;
    font-size: 13px;
  }

  .leads-table .actions ion-button {
    --padding-start: 4px;
    --padding-end: 4px;
  }
}



.stats-card.primary {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
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



.form-group ion-item:focus-within {
  --border-color: #c8c5fc;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.1);
}

.form-group ion-label {
  color: #525f7f;
  font-weight: 600;
 margin-bottom: 23px;
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

 

  .submit-button {
    height: 50px;
  }
}


.search-container {
  padding: 10px 20px;
  max-width: 400px;
  margin-left: auto; /* Push to right side */
  margin-right: 20px;
  display: flex;
  justify-content: flex-end; /* Align to right */
}

.search-container ion-searchbar {
  --height: 40px;
  --border-radius: 8px;
  --box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  --placeholder-color: #6b7280;
  --icon-color: #6b7280;
  --background: white;
  padding: 0;
}

/* Add hover effect */
.search-container ion-searchbar:hover {
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .search-container {
    margin-right: 10px;
    padding: 8px 10px;
  }
  
  .search-container ion-searchbar {
    --height: 36px;
  }
}
</style>