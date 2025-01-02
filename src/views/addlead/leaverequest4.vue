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
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <div class="leave-container1">
              <div v-if="totalLeaveListId && totalLeaveListId.rows">
                <table class="leave-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="leave,index in totalLeaveListId.rows" :key="leave.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <ion-avatar>
                          <img src="https://static.vecteezy.com/system/resources/thumbnails/042/714/998/small/3d-illustration-real-estate-real-estate-agent-male-png.png" alt="Student" />
                        </ion-avatar>
                      </td>
                      <td>{{ leave.name }}</td>
                      <td>{{ leave.reason }}</td>
                      <td>{{ leave.request_status && leave.request_status.status_name ? leave.request_status.status_name : 'N/A' }}</td>
                      <td>
                        <ion-button color="primary" size="small" @click="openUpdateModal(leave.id)">
                          <ion-icon :icon="createOutline"></ion-icon>
                          Edit
                        </ion-button>
                        <ion-button color="danger" size="small" @click="handledelete(leave)">
                          <ion-icon :icon="trash"></ion-icon>
                          Delete
                        </ion-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button class="add" @click="showModal = true">
                <ion-icon :icon="addOutline" class="icon"></ion-icon>
              </ion-fab-button>
            </ion-fab>

            <!-- Add Modal -->
            <ion-modal :isOpen="showModal" @didDismiss="showModal = false" class="modal">
              <ion-header>
                <ion-toolbar>
                  <ion-grid>
                    <ion-row>
                      <ion-col size="auto">
                        <ion-button class="back" fill="clear" @click="showModal = false">
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
                  <ion-row>
                    <ion-col>
                      <ion-select v-model="adminId" placeholder="Select admin">
                        <ion-select-option v-for="user in totaladminList" :key="user.id" :value="user.id">
                          {{ user.username }}
                        </ion-select-option>    
                      </ion-select>
                    </ion-col>
                  </ion-row>
                  <ion-input v-model="userId" ref="input" type="hidden"></ion-input>
                  <br /> 
                  <ion-input v-model="name" ref="input" type="text" placeholder="Name" fill="outline"></ion-input>
                  <br />  
                  <ion-input v-model="reason" ref="input" type="text" placeholder="Reason" fill="outline"></ion-input>
                  <br />
                  <ion-select v-model="dayId" placeholder="Select leave duration">
                    <ion-select-option v-for="duration in totaldayList" :key="duration.id" :value="duration.id">
                      {{ duration.status_name }}
                    </ion-select-option>    
                  </ion-select>   
                </div>
                <ion-button expand="block" class="save" @click="addLeave">Save</ion-button>    
              </ion-content>
            </ion-modal>

            <!-- Update Modal -->
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false" class="modal">
              <ion-header>
                <ion-toolbar>
                  <ion-grid>
                    <ion-row>
                      <ion-col size="auto">
                        <ion-button class="back" fill="clear" @click="showUpdate = false">
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
                  <ion-input v-model="name" ref="input" type="text" fill="outline"></ion-input>
                  <br /> 
                  <ion-input v-model="reason" ref="input" type="text" placeholder="name" fill="outline"></ion-input>
                  <br />  
                  <ion-row>
                    <ion-col>
                      <ion-select v-model="adminId1" placeholder="Select admin">
                        <ion-select-option v-for="user in totaladminList" :key="user.id" :value="user.id">
                          {{ user.username }}
                        </ion-select-option>    
                      </ion-select>
                    </ion-col>
                    <ion-select v-model="dayId" placeholder="Select leave duration">
                      <ion-select-option v-for="duration in totaldayList" :key="duration.id" :value="duration.id">
                        {{ duration.status_name }}
                      </ion-select-option>    
                    </ion-select> 
                  </ion-row>     
                </div>
                <ion-button expand="block" class="save" @click="updateLead">Save</ion-button>    
              </ion-content>
            </ion-modal>

            <!-- Delete Confirmation Modal -->
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
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonButton, IonIcon, 
  IonSplitPane, IonGrid, IonRow, IonCol,
  IonAvatar, IonPage, IonInput,
  IonModal, IonSelect, IonSelectOption, IonFab, IonFabButton
} from '@ionic/vue';
import { 
  addOutline, chevronBackOutline, createOutline, trash, personOutline
} from 'ionicons/icons';
import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'LeaveRequest',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonGrid, IonRow, IonCol,
    IonAvatar, IonPage, IonInput,
    IonModal, IonSelect, IonSelectOption, IonFab, IonFabButton,
    SideMenu
  },
  data() {
    return {
      name: '',
      reason: '',
      addOutline,
      chevronBackOutline,
      trash,
      personOutline,
      createOutline,
      showModal: false,
      requestStatusId: null,
      adminId: null,
      adminId1: null,
      userId: null,
      dayId: null,
      showUpdate: false,
      currentleaveId: null,
      deleteItem: {},
      showDelete: false,
    };
  },
  computed: {
    ...mapState('leave', ['totalstatusList', 'totalLeaveListId', 'totaldayList']),
    ...mapState('user', ['totaladminList']),
  },
  methods: {
    ...mapActions('leave', ['fetchtotalstatuslist', 'ADD_LEAVE', 'fetchtotalLeavelistId', 'update_leave', 'delete_leave', 'fetchtotaldaylist']),
    ...mapActions('user', ['fetchtotaladminlist']),
    
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

    async addLeave() {
      const payload = {
        name: this.name,
        reason: this.reason,
        requestStatusId: this.requestStatusId,
        approverId: this.adminId,
        requesterId: this.userId,
        leavedayStatusId: this.dayId	
      };

      try {
        await this.ADD_LEAVE(payload);
        this.showModal = false;
        await this.fetchleadData();
      } catch (error) {
        console.error('Error adding:', error);
        this.errorMessage = 'Failed to create leave. Please try again.'; 
      }
    },

    async openUpdateModal(leaveId) {
      try {
        const leadData = await this.totalLeaveListId.rows.find((leave) => leave.id === leaveId);
        
        if (leadData) {
          this.name = leadData.name;
          this.reason = leadData.reason;
          this.adminId1 = leadData.approverId;
          this.dayId = leadData.leavedayStatusId;
          this.currentleaveId = leaveId;
          this.showUpdate = true;
        } else {
          console.error('No lead found with ID:', leaveId);
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
        approverId: this.adminId1,
        leavedayStatusId: this.dayId	
      };

      try {
        await this.update_leave(payload);
        this.showUpdate = false;
        await this.fetchleadData();
      } catch (error) {
        console.error('Error updating leave:', error);
      }
    },

    confirmdelete() {
      if (this.deleteItem.hasOwnProperty('id')) {
        this.delete_leave(this.deleteItem)
          .then(() => {
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
        await this.fetchtotalstatuslist();
        await this.fetchtotaladminlist();
        await this.fetchtotalLeavelistId(userId);
        await this.fetchtotaldaylist();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
  },
  async mounted() {
    try {
      this.userId = this.$route.params.id; 
      this.fetchleadData();
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  }
});
</script>
    
  <style>



/* Container Styles */
.leave-container1{
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;

}
/* Table Styles */
.leave-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.leave-table th {
  background: #000;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}

.leave-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  color: #333;
  font-size: 14px;
}

.leave-table tr:last-child td {
  border-bottom: none;
}
.leave-table th {
  background: #000;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  width: 16.66%; /* Makes all columns equal width (100% ÷ 6 columns) */
  table-layout: fixed; /* Ensures equal width distribution */
}

.leave-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  table-layout: fixed; /* Add this line to enforce equal column widths */
}
.leave-table tr:hover {
  background-color: #f8f9fa;
}

.leave-table ion-avatar {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.leave-table ion-button {
  margin: 0 4px;
}






/* Form Styling */
.form {
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
}

.form ion-input,
.form ion-select {
  margin-bottom: 1rem;
  --background: #fff;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --padding-start: 12px;
  border: 1px solid #d1d1d1;
}

ion-input {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  margin-bottom: 16px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  background: #fff;
}

ion-select {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  margin-bottom: 16px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  background: #fff;
}

/* Button Styles */
ion-button.save {
 
  margin: 16px;
  --border-radius: 8px;
  font-weight: 600;
}

ion-button.back {
  --color: white;
  --padding-start: 8px;
  --padding-end: 8px;
}

ion-button.back:hover {
  transform: scale(1.1);
}

/* FAB Button */
ion-fab-button.add {

  --box-shadow: 0 4px 8px rgba(98, 0, 234, 0.3);
}


/* Icon Styles */
.icon {
  font-size: 24px;
}

/* Grid and Layout */
ion-grid {
  padding: 0;
}

ion-row {
  align-items: center;
}

ion-col {
  padding: 8px;
}

/* Responsive Design */


/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .leave-container {
    background-color: #1a1a1a;
  }

  .leave-table {
    background: #2d2d2d;
  }

  .leave-table td {
    border-bottom: 1px solid #404040;
    color: #fff;
  }

  .leave-table tr:hover {
    background-color: #3d3d3d;
  }

  .form {
    background: #2d2d2d;
  }

  ion-input,
  ion-select {
    --background: #2d2d2d;
    border-color: #404040;
    color: white;
  }
}

/* Animation Effects */
.leave-table tr {
  transition: background-color 0.2s ease;
}

ion-button {
  transition: transform 0.2s ease;
}

ion-button:active {
  transform: scale(0.95);
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: 600;
}

.mt-2 {
  margin-top: 8px;
}

.mb-2 {
  margin-bottom: 8px;
}

  </style>