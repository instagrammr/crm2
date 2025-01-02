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
            <ion-title>Add Employees</ion-title>
            <ion-buttons slot="end">
              <ion-button>
                <ion-icon :icon="notificationsOutline"></ion-icon>
              </ion-button>
              <ion-button>
                <ion-icon :icon="searchOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <div class="page-header">
            <ion-text color="medium">
              <h2>{{ currentDate }}</h2>
            </ion-text>
            <div class="stats-container">
              <div class="stat-card">
                <ion-icon :icon="peopleOutline" />
                <div class="stat-content">
                  <span class="stat-value">{{ totalstaffCount }}</span>
                  <span class="stat-label">Total Staff</span>
                </div>
              </div>
            </div>
          </div>
          <div class="leads-list" v-if="totaluserList">
              <ion-list>
                <ion-item-sliding v-for="user in totaluserList" :key="user.id">
                  <ion-item>
                    <ion-card-content>
                      <div class="lead-header">
                        <div class="lead-info">
                          <h3>
                            <ion-icon :icon="personCircleOutline" class="lead-avatar"></ion-icon>
                            {{ user.username }}
                          </h3>
                          <div class="info-row">
                            <span class="info-item">
                              <ion-icon :icon="callOutline" class="info-icon"></ion-icon>
                              {{ user.mobile }}
                            </span>
                            <!-- <span class="info-item">
                              <ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
                              {{ new Date(lead.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) }}
                            </span> -->
                            <span class="info-item">
                              <ion-icon :icon="mail" class="info-icon"></ion-icon>
                              {{ user.email }}
                            </span>
                            <span class="info-item">
                              <ion-icon class="info-icon"></ion-icon>
                              role: {{ user.role.roletype }}
                            </span>
                          </div>
                          <br />
                        </div>
                      </div>
                    </ion-card-content>
                  </ion-item>

                  <ion-item-options side="start">
                    <ion-item-option color="primary" @click="openUpdateModal(user.id)">
                      <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
                    </ion-item-option>
                  </ion-item-options>

                  <ion-item-options side="end">
                    <ion-item-option color="danger" @click="handledelete(user)">
                      <ion-icon :icon="trash" slot="icon-only"></ion-icon>
                    </ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </div>
            <ion-modal :isOpen="showAdd" @didDismiss="showAdd = false">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-button" fill="clear" @click="showAdd = false">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Add Employees</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <form class="update-form">
                  <ion-input v-model="username" label="Name" type="name" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="email" label="email" type="text" labelPlacement="floating" fill="solid"
                  class="form-input"></ion-input>
                  <ion-input v-model="password"  type="password" label="Password" labelPlacement="floating" fill="solid"
                    class="form-input"><ion-input-password-toggle slot="end"></ion-input-password-toggle></ion-input>
                  <ion-input v-model="newMobile" label="Mobile" type="tel" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="dob" label="DOB" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="designation" label="designation" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-select v-model="roleId" label="Select role" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalroleList" :key="status.id" :value="status.id">
                      {{ status.roletype }}
                    </ion-select-option>
                  </ion-select>

                  <!-- Error message -->
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>


                  <ion-button expand="block" class="save-button" @click="adduser">
                    <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                    Add Employees
                  </ion-button>
                  <!-- </div> -->
                </form>
              </ion-content>
            </ion-modal>
            <ion-modal :isOpen="showUpdate" @didDismiss="showUpdate = false">
              <ion-header>
                <ion-toolbar class="modal-toolbar">
                  <ion-grid>
                    <ion-row class="ion-align-items-center">
                      <ion-col size="auto">
                        <ion-button class="back-button" fill="clear" @click="showUpdate = false">
                          <ion-icon :icon="chevronBackOutline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col>
                        <ion-title class="modal-title">Update Employees</ion-title>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-toolbar>
              </ion-header>
              <ion-content>
                <form class="update-form">
                  <ion-input v-model="newusername" label="Name" type="name" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newemail" label="email" type="text" labelPlacement="floating" fill="solid"
                  class="form-input"></ion-input>
                  <ion-input v-model="newpassword" label="Password" type="password" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="Mobile" label="Mobile" type="tel" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newdob" label="DOB" type="date" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-input v-model="newdesignation" label="designation" type="text" labelPlacement="floating" fill="solid"
                    class="form-input"></ion-input>
                  <ion-select v-model="newroleId" label="Select role" labelPlacement="floating" fill="solid"
                    class="form-select">
                    <ion-select-option v-for="status in totalroleList" :key="status.id" :value="status.id">
                      {{ status.roletype }}
                    </ion-select-option>
                  </ion-select>

                  <!-- Error message -->
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>


                  <ion-button expand="block" class="save-button" @click="updateUser">
                    <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                    Update Employees
                  </ion-button>
                  <!-- </div> -->
                </form>
              </ion-content>
            </ion-modal>
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
                  <h2>Delete User?</h2>
                  <p>Are you sure you want to delete this User? This action cannot be undone.</p>
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
          <!-- You can add your existing content here -->
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button class="add" @click="showAdd = true">
                <ion-icon :icon="addOutline" class="icon"></ion-icon>
              </ion-fab-button>
            </ion-fab>
        </ion-content>
      </div>
    </ion-split-pane>
    <ion-alert
      :is-open="showSuccessAlert"
      header="Success"
      message="user added successfully!"
      :buttons="[{
        text: 'OK',
        handler: handleAlertDismiss
      }]"
    />
  </ion-app>
</ion-page>
</template>

<script>
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonSplitPane, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonText, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonAlert, IonItemOptions, IonList, IonCol, IonRow, IonGrid, IonModal, IonFabButton,
  IonFab, IonItemSliding, IonItemOption, IonInputPasswordToggle, IonPage
} from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import { defineComponent, ref } from 'vue';
import { notificationsOutline, searchOutline, todayOutline, peopleOutline, callOutline, mail, saveOutline, chevronBackOutline, addOutline, personCircleOutline,
  trash, createOutline, warningOutline, closeOutline
 } from 'ionicons/icons';
import SideMenu from '../../components/SideMenu.vue';
export default defineComponent({
  name: 'StudentStatusComponent',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonSplitPane, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonText, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, SideMenu,
    IonAlert, IonItemOptions, IonList, IonCol, IonRow, IonGrid, IonModal, IonFabButton,
    IonFab, IonItemSliding, IonItemOption, IonInputPasswordToggle, IonPage
  },
  data() {
    return {
      showAdd: false,
      showUpdate: false,
      showDelete: false,
      username: '',
      email: '',
      password: '',
      dob: '',
      newMobile: '',
      newusername: '',
      newemail: '',
      Mobile: '',
      newdob: '',
      newpassword: '',
      newdesignation: '',
      designation: '',
      newroleId: null,
      deleteItem: {},
      searchOutline,
      todayOutline,
      peopleOutline,
      closeOutline,
      notificationsOutline,
      chevronBackOutline,
      personCircleOutline,
      warningOutline,
      createOutline,
      trash,
      addOutline,
      saveOutline,
      callOutline,
      errorMessage: '',
      currentleadId: null,
      mail,
      showSuccessAlert: false,
      roleId: null,
      currentDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) 
    }
  },
  computed: {
    ...mapState('user', ['totalstaffCount','totaluserList', 'totalroleList']),
  },
  methods: {
    ...mapActions('user', ['fetchtotalstaffCount', 'fetchtotaluserlist', 'fetchtotalrolelist', 'ADD_USER', 'update_user', 'delete_user']),

    async adduser() {
      const projectPayload = {
        username: this.username,
        password: this.password,
        email: this.email,
        date_of_birth: this.dob,
        mobile: this.newMobile,
        designation: this.newdesignation,
        roleId: this.roleId,
      };

      try {
        await this.ADD_USER(projectPayload);
        this.showSuccessAlert = true;
        await this.fetchleadData();
        this.showAdd = false;
      } catch (error) {
        console.error('Error creating lead:', error);
      }
    },
    handledelete(user) {
      this.opendeleteDialog(user);
    },
    opendeleteDialog(user) {
      this.deleteItem = user;
      this.showDelete = true;
    },
    closeDeleteDialog() {
      this.showDelete = false;
      this.deleteItem = {};
    },
    confirmdelete() {
      if (this.deleteItem.hasOwnProperty('id')) {
        this.delete_user(this.deleteItem)
          .then(() => {
            console.log('user deleted successfully');
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
    async openUpdateModal(userId) {
      console.log('Opening modal for lead ID:', userId);
      // this.resetModalData();
      try {
        const leadData = await this.totaluserList.find((user) => user.id === userId);

        if (leadData) {
          this.newusername = leadData.username;
          this.Mobile = leadData.mobile;
          this.newpassword = leadData.password;
          this.newemail = leadData.email;
          this.newdob = new Date(leadData.date_of_birth).toISOString().split('T')[0];
          this.newdesignation = leadData.designation;
          this.newroleId = leadData.roleId;
          this.currentleadId = userId;
          this.showUpdate = true;
        } else {
          console.error('No user found with ID:', userId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async updateUser() {
      console.log('leadId:', this.currentleadId);
      const payload = {
        id: this.currentleadId,
        username: this.newusername,
        password: this.newpassword,
        email: this.newemail,
        date_of_birth: this.newdob,
        mobile: this.Mobile,
        designation: this.designation,
        roleId: this.newroleId,
      };

      try {
        await this.update_user(payload);
        console.log('user updated successfully');
        this.showUpdate = false;
        await this.fetchleadData();
      } catch (error) {
        console.error('Error updating lead:', error);
      }
    },
    handleAlertDismiss() {
      this.showSuccessAlert = false;
      // Optional: Reset form or navigate
    },

    async fetchleadData() {
      try {
        await this.fetchtotalstaffCount();
        await this.fetchtotaluserlist();
        await this.fetchtotalrolelist();
      } catch (error) {
        console.error('Error fetching counsellor list:', error);
      }
    },
  },
  async mounted() {
    try {
      this.fetchleadData();
    } catch (error) {
      console.error('Error in mounted:', error);
    }
  }
});
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-row ion-button {
    margin-top: 10px;
  }
}

ion-card {
  margin-bottom: 20px;
  border-radius: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  margin-bottom: 15px;
}

ion-button[color="medium"] {
  --color: #000;
}
.page-header {
  margin-bottom: 24px;
}
.stats-container {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex: 1;
}
.stat-content {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--ion-color-dark);
}
.stat-label {
  font-size: 14px;
  color: var(--ion-color-medium);
}

.page-header {
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 16px;
  color: white;
}

.page-header h2 {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1.5rem;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.stat-card ion-icon {
  font-size: 2.5rem;
  margin-right: 16px;
  color: #6366f1;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.leads-list ion-item {
  --background: transparent;
  margin-bottom: 16px;
}

ion-card-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

ion-card-content:hover {
  transform: translateY(-2px);
}

.lead-header {
  padding: 16px;
}

.lead-info h3 {
  font-size: 1.2rem;
  color: #374151;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lead-avatar {
  font-size: 24px;
  color: #6366f1;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.9rem;
}

.info-icon {
  color: #6366f1;
  font-size: 16px;
}

/* Form Styling */
.form-input {
  margin-bottom: 16px;
  --background: #f3f4f6;
  --border-radius: 10px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.form-select {
  margin-bottom: 16px;
  --background: #f3f4f6;
  --border-radius: 10px;
}

.save-button {
  margin-top: 24px;
  --background: #6366f1;
  --border-radius: 10px;
  --box-shadow: 0 4px 6px rgba(99, 102, 241, 0.25);
}

.add {
  --background: #6366f1;
  --box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Delete Modal Styling */
.delete-modal .warning-icon {
  font-size: 48px;
  color: #ef4444;
  margin-bottom: 16px;
}

.delete-content {
  text-align: center;
  padding: 24px;
}

.delete-content h2 {
  color: #1f2937;
  margin-bottom: 8px;
}

.delete-content p {
  color: #6b7280;
  margin-bottom: 24px;
}

.delete-actions {
  display: flex;
  gap: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }
  
  .stat-card {
    width: 100%;
  }
  
  .info-row {
    flex-direction: column;
    gap: 8px;
  }
}

/* Modal Header Styling */
.modal-toolbar {
  --background: #6366f1;
  --color: white;
}

.modal-title {
  color: white;
  font-weight: 600;
}

.back-button {
  --color: white;
}

/* Success Alert Styling */
ion-alert.success-alert {
  --background: white;
  --height: auto;
  --width: 300px;
  --border-radius: 16px;
}
</style>