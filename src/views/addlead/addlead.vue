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
              <ion-title class="main-title">Add New Lead</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding custom-content">
            <div class="form-container">
              <ion-card class="custom-card">
                <ion-card-content>
                  <form @submit.prevent="addLead" class="styled-form">
                    <ion-grid>
                      <ion-row>
                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Student Name</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="name" 
                                type="text" 
                                required
                                class="custom-input"
                                placeholder="Enter student name"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Mobile Number</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="number" 
                                type="tel" 
                                required
                                class="custom-input"
                                placeholder="Enter mobile number"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Date</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="date" 
                                type="date" 
                                required
                                class="custom-input"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Address</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="address" 
                                type="text" 
                                required
                                class="custom-input"
                                placeholder="Enter address"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Country</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="country" 
                                type="text" 
                                required
                                class="custom-input"
                                placeholder="Enter country"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Lead Source</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-input 
                                v-model="source" 
                                type="text" 
                                required
                                class="custom-input"
                                placeholder="Enter lead source"
                              ></ion-input>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-input v-model="userId" type="hidden"></ion-input>

                        <ion-col size="12" size-md="6">
                          <div class="form-group">
                            <label class="form-label">Select Counselor</label>
                            <ion-item lines="none" class="custom-item">
                              <ion-select 
                                v-model="staff" 
                                placeholder="Choose a counselor" 
                                required
                                class="custom-select"
                              >
                                <ion-select-option 
                                  v-for="staff in totalcounsillerList" 
                                  :key="staff.id" 
                                  :value="staff.id"
                                >
                                  {{ staff.username }}
                                </ion-select-option>    
                              </ion-select>
                            </ion-item>
                          </div>
                        </ion-col>

                        <ion-col size="12" class="ion-text-center">
                          <ion-button 
                            type="submit" 
                            class="submit-button"
                            expand="block"
                          >
                            Submit Lead
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </form>
                </ion-card-content>
              </ion-card>
            </div>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>

    <ion-alert
      :is-open="showSuccessAlert"
      header="Success"
      message="Lead added successfully!"
      :buttons="[{
        text: 'OK',
        handler: handleAlertDismiss
      }]"
    />
  </ion-page>
</template>

<script>
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
         IonMenuButton, IonButton, IonSplitPane, IonGrid, IonRow,
         IonCol, IonCard, IonCardContent, IonItem, IonLabel,
         IonPage, IonInput, IonSelect, IonSelectOption, IonAlert } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'AddLeadForm',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonMenuButton, IonButton, IonSplitPane, IonGrid, IonRow,
    IonCol, IonCard, IonCardContent, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, SideMenu, IonPage, IonAlert
  },
  data() {
    return {
      name: '',
      number: '',
      address: '',
      date: '',
      country: '',
      source: '',
      showSuccessAlert: false,
      staff: null,
      userId: null
    }
  },
  computed: {
    ...mapState('user', ['totalcounsillerList']),
  },
  methods: {
    ...mapActions('user', ['fetchtotalcounsillerlist']),
    ...mapActions('addLead', ['Add_lead']),
    
    async addLead() {
      const projectPayload = {
        student_name: this.name,
        date: this.date,
        userId: this.userId,
        address: this.address,
        country: this.country,
        mobile: this.number,
        lead_source: this.source,
        counsillerAssignId: this.staff
      };

      try {
        await this.Add_lead(projectPayload);
        this.showSuccessAlert = true;
      } catch (error) {
        console.error('Error creating lead:', error);
      }
    },

    handleAlertDismiss() {
      this.showSuccessAlert = false;
      // Optional: Reset form or navigate
    },

    async fetchleadData() {
      try {
        await this.fetchtotalcounsillerlist();
      } catch (error) {
        console.error('Error fetching counsellor list:', error);
      }
    },
  },
  async mounted() {
    try {
      this.userId = this.$route.params.id;
      this.fetchleadData();
    } catch (error) {
      console.error('Error in mounted:', error);
    }
  }
});
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.custom-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-left: 4px;
}

.custom-item {
  --background: #f5f5f5;
  --border-radius: 8px;
  --padding-start: 12px;
  --padding-end: 12px;
  --min-height: 48px;
  margin: 0;
}

.custom-item::part(native) {
  padding: 0;
  background: #f5f5f5;
  border-radius: 8px;
}

.custom-input {
  --padding-start: 12px;
  --padding-end: 12px;
  --placeholder-color: #999;
  --placeholder-opacity: 1;
  font-size: 14px;
}

.custom-select {
  width: 100%;
  --padding-start: 12px;
  --padding-end: 12px;
}

.submit-button {
  --background: #4a90e2;
  --background-hover: #357abd;
  --border-radius: 8px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  margin-top: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}



.main-title {
  font-size: 20px;
  font-weight: 600;
}

/* Error state styling */
.custom-input.ion-invalid.ion-touched {
  --background: #fff1f1;
}

/* Focus state styling */
.custom-item:focus-within {
  --background: #e8f0fe;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
  
  .custom-card {
    margin: 10px 0;
  }
  
  .submit-button {
    margin-top: 10px;
  }
}
</style>