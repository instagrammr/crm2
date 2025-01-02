<template>
  <ion-page>
    <ion-split-pane content-id="main-content">
      <side-menu />
      
      <div class="ion-page" id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Add Student</ion-title>
            <ion-buttons slot="end">
              <ion-button>
                <ion-icon :icon="notificationsOutline"></ion-icon>
              </ion-button>
          
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <div class="header-row">
            <ion-text color="medium">
              <h2>» {{ currentDate }}</h2>
            </ion-text>
    
            
          </div>

          <ion-card class="custom-card">
            <ion-card-header>
              <ion-card-title>Add New Student</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <form @submit.prevent="addLead" class="form-container">
                <ion-list>
                  <ion-item class="custom-item">

                    <ion-label position="stacked">Student Name</ion-label>
                     <br> &nbsp; 
                    <ion-input 
                      v-model="formData.name"
                      class="custom-input"
                      type="text"
                      required
                      placeholder="Enter student name"
                    ></ion-input>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Date</ion-label>
                    <br> &nbsp; 
                    <ion-input 
                      v-model="formData.date"
                      class="custom-input"
                      type="date"
                      required
                    ></ion-input>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Mobile Number</ion-label>
                    <br> &nbsp; 
                    <ion-input 
                      v-model="formData.mobile"
                      class="custom-input"
                      type="tel"
                      required
                      placeholder="Enter mobile number"
                    ></ion-input>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Address</ion-label>
                    <br> &nbsp; 
                    <ion-textarea
                      v-model="formData.address"
                      class="custom-input"
                      required
                      placeholder="Enter address"
                    ></ion-textarea>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Country</ion-label>
                    <br> &nbsp; 
                    <ion-select
                      v-model="formData.country"
                      class="custom-select"
                      placeholder="Select country"
                      required
                    >
                      <ion-select-option 
                        v-for="country in countries" 
                        :key="country"
                        :value="country"
                      >
                        {{ country }}
                      </ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Lead Source</ion-label>
                    <br> &nbsp; 
                    <ion-input
                      v-model="formData.source"
                      class="custom-input"
                      type="text"
                      required
                      placeholder="Enter lead source"
                    ></ion-input>
                  </ion-item>

                  <ion-item class="custom-item">
                    <ion-label position="stacked">Staff Name</ion-label>
                    <br> &nbsp; 
                    <ion-select
                      v-model="formData.staff"
                      class="custom-select"
                      placeholder="Select staff"
                      required
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
                </ion-list>

                <ion-button 
                  expand="block" 
                  type="submit"
                  class="submit-button ion-margin-top"
                >
                  Add Student
                </ion-button>
              </form>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </div>
    </ion-split-pane>

    <ion-alert
      :is-open="showAlert.isOpen"
      :header="showAlert.header"
      :message="showAlert.message"
      :buttons="[{
        text: 'OK',
        handler: handleAlertDismiss
      }]"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { notificationsOutline, searchOutline } from 'ionicons/icons';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonSplitPane,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
  IonAlert,
} from '@ionic/vue';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'AddStudentForm',
  
  components: {
    SideMenu,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonSplitPane,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonList,
    IonAlert,
  },

  data() {
    return {
      formData: {
        name: '',
        date: '',
        mobile: '',
        address: '',
        country: '',
        source: '',
        staff: null,
      },
      showAlert: {
        isOpen: false,
        header: '',
        message: '',
      },
      searchOutline,
      notificationsOutline,
      countries: ['USA', 'UK', 'Canada', 'Australia', 'India'], // Add more countries as needed
      currentDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  },

  computed: {
    ...mapState('user', ['totalcounsillerList']),
  },

  methods: {
    ...mapActions('user', ['fetchtotalcounsillerlist']),
    ...mapActions('addLead', ['Add_lead']),

    async addLead() {
      try {
        const payload = {
          student_name: this.formData.name,
          date: this.formData.date,
          userId: this.$route.params.id,
          address: this.formData.address,
          country: this.formData.country,
          mobile: this.formData.mobile,
          lead_source: this.formData.source,
          counsillerAssignId: this.formData.staff
        };

        await this.Add_lead(payload);
        this.showAlert = {
          isOpen: true,
          header: 'Success',
          message: 'Student added successfully!'
        };
        this.resetForm();
      } catch (error) {
        this.showAlert = {
          isOpen: true,
          header: 'Error',
          message: 'Failed to add student. Please try again.'
        };
        console.error('Error creating lead:', error);
      }
    },

    handleAlertDismiss() {
      this.showAlert.isOpen = false;
    },

    resetForm() {
      this.formData = {
        name: '',
        date: '',
        mobile: '',
        address: '',
        country: '',
        source: '',
        staff: null,
      };
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
    await this.fetchleadData();
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