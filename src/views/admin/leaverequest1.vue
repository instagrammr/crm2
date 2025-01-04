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
              <ion-title>Leave Request</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search requests..."
                  class="custom-searchbar"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <div v-if="totalapproverListId && totalapproverListId.rows">
              <ion-card class="leave-card" v-for="leave in totalapproverListId.rows" :key="leave.id">
                <ion-card-content>
                  <div class="leave-header">
                    <div class="user-info">
                      <div class="avatar-container">
                        <ion-avatar class="user-avatar">
                          <img src="https://cdn-icons-png.flaticon.com/512/67/67902.png" alt="User" />
                        </ion-avatar>
                        <span class="status-indicator" :class="getStatusClass(leave.request_status?.status_name)"></span>
                      </div>
                      <div class="user-details">
                        <h2 class="user-name">{{ leave.name }}</h2>
                        <div class="status-badge" :class="getStatusClass(leave.request_status?.status_name)">
                          {{ leave.request_status?.status_name || 'N/A' }}
                        </div>
                      </div>
                    </div>
                    
                    <div class="action-buttons">
                      <ion-button fill="clear" class="view-btn" @click="openUpdateModal(leave.id)">
                        <ion-icon :icon="eyeOutline"></ion-icon>
                        View
                      </ion-button>
                      <ion-button fill="clear" class="delete-btn" @click="handledelete(leave)">
                        <ion-icon :icon="trash"></ion-icon>
                        Delete
                      </ion-button>
                    </div>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Update Modal -->
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="update-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-btn" fill="clear" @click="showUpdate = false">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Update Leave Request</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              
              <ion-content>
                <div class="form-container">
                  <ion-item>
                    
                    <ion-label position="floating">Name</ion-label>
                 <br>&nbsp; &nbsp; 
                    <ion-input v-model="name" type="text" class="form-input"></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="floating">Reason</ion-label>
                    <br>&nbsp; &nbsp; 
                    <ion-input v-model="reason" type="text" class="form-input"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">date</ion-label>
                    <br>&nbsp; &nbsp; 
                    <ion-input v-model="date" type="text" class="form-input"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Current Status</ion-label>
                    <br>&nbsp; &nbsp; 
                    <ion-input v-model="statusId" type="text" readonly class="form-input"></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="floating">Update Status</ion-label>
                    <ion-select v-model="requestStatusId" interface="popover" class="status-select">
                      <ion-select-option v-for="status in totalstatusList" :key="status.id" :value="status.id">
                        {{ status.status_name }}
                      </ion-select-option>
                    </ion-select>
                  </ion-item>
                </div>
                
                <ion-button expand="block" class="update-btn" @click="updateLead">
                  Update Request
                </ion-button>
              </ion-content>
            </ion-modal>

            <!-- Delete Confirmation Modal -->
            <ion-modal :is-open="showDelete" @didDismiss="closeDeleteDialog" class="delete-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-title>Confirm Delete</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="closeDeleteDialog">Close</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              
              <ion-content class="ion-padding">
                <div class="delete-content">
                  <ion-icon :icon="trash" class="delete-icon"></ion-icon>
                  <h2>Delete Leave Request</h2>
                  <p>Are you sure you want to delete this leave request? This action cannot be undone.</p>
                  
                  <div class="delete-actions">
                    <ion-button color="medium" expand="block" @click="closeDeleteDialog">
                      Cancel
                    </ion-button>
                    <ion-button color="danger" expand="block" @click="confirmdelete">
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
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonAvatar, IonCard, IonCardContent, IonPage, IonInput,
  IonModal, IonSelect, IonSelectOption, IonItem, IonLabel
} from '@ionic/vue';
import { 
  addOutline, chevronBackOutline, eyeOutline, trash, personOutline
} from 'ionicons/icons';
import SideMenu from '../../components/SideMenu.vue';

export default defineComponent({
  name: 'LeaveRequests',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonAvatar, IonCard, IonCardContent, SideMenu, IonPage, 
    IonInput, IonModal, IonSelect, IonSelectOption, IonItem, 
    IonLabel
  },
  data() {
    return {
      name: '',
      reason: '',
      date: '',
      addOutline,
      chevronBackOutline,
      trash,
      personOutline,
      eyeOutline,
      statusId: null,
      requestStatusId: null,
      userId: null,
      showUpdate: false,
      currentleaveId: null,
      deleteItem: {},
      showDelete: false,
    };
  },
  computed: {
    ...mapState('leave', ['totalstatusList', 'totalapproverListId']),
    ...mapState('user', ['totaladminList']),
  },
  methods: {
    ...mapActions('leave', ['fetchtotalstatuslist', 'ADD_LEAVE', 'fetchtotalapproverlistId', 'update_leave', 'delete_leave']),
    ...mapActions('user', ['fetchtotaladminlist']),
    
    getStatusClass(status) {
      const statusMap = {
        'Approved': 'status-approved',
        'Pending': 'status-pending',
        'Rejected': 'status-rejected'
      };
      return statusMap[status] || 'status-pending';
    },

    handledelete(leave) {
      this.opendeleteDialog(leave);
    },

    opendeleteDialog(leave) {
      this.deleteItem = leave;
      this.showDelete = true;
    },

    closeDeleteDialog() {
      this.showDelete = false;
      this.deleteItem = {};
    },

    async openUpdateModal(leaveId) {
      try {
        const leadData = await this.totalapproverListId.rows.find((leave) => leave.id === leaveId);
        if (leadData) {
          this.name = leadData.name;
          this.reason = leadData.reason;
          this.requestStatusId = leadData.requestStatusId;
          this.statusId = leadData.leaveday_status.status_name;
          this.currentleaveId = leaveId;
          this.showUpdate = true;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async updateLead() {
      const payload = {
        id: this.currentleaveId,
        name: this.name,
        reason: this.reason,
        requestStatusId: this.requestStatusId
      };

      try {
        await this.update_leave(payload);
        this.showUpdate = false;
        await this.fetchleadData();
      } catch (error) {
        console.error('Error updating leave:', error);
      }
    },

    async confirmdelete() {
      if (this.deleteItem.hasOwnProperty('id')) {
        try {
          await this.delete_leave(this.deleteItem);
          this.closeDeleteDialog();
          await this.fetchleadData();
        } catch (error) {
          console.error('Error deleting:', error);
        }
      }
    },

    async fetchleadData() {
      const userId = this.$route.params.id;
      try {
        await this.fetchtotalstatuslist();
        await this.fetchtotaladminlist();
        await this.fetchtotalapproverlistId(userId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
  },
  
  async mounted() {
    try {
      this.userId = this.$route.params.id;
      await this.fetchleadData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});
</script>

<style scoped>
.leave-card {
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.2s ease;
}

.leave-card:hover {
  transform: translateY(-2px);
}

.leave-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-container {
  position: relative;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border: 2px solid #eee;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-approved {
  background: #10B981;
  color: white;
}

.status-pending {
  background: #F59E0B;
  color: white;
}

.status-rejected {
  background: #EF4444;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  --color: #3B82F6;
}

.delete-btn {
  --color: #EF4444;
}

/* Modal Styles */
.update-modal {
  --height: 80%;
  --border-radius: 16px;
}

.form-container {
  padding: 1rem;
}

.form-input {
  margin: 0.5rem 0;
}

.update-btn {
  margin: 1rem;
  --background: #3B82F6;
}

.delete-modal {
  --height: auto;
  --max-height: 300px;
}

.delete-content {
  text-align: center;
  padding: 1.5rem;
}

.delete-icon {
  font-size: 3rem;
  color: #EF4444;
  margin-bottom: 1rem;
}

.delete-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .leave-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>