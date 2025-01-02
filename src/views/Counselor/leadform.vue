<template>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <SideMenu />
        
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title>Lead Form</ion-title>
              <ion-buttons slot="end">
                <ion-searchbar
                  placeholder="Search here"
                  class="custom-searchbar"
                ></ion-searchbar>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
  
          <ion-content>
            <!-- Stats Cards -->
            <ion-grid class="stats-grid">
              <ion-row>
                <ion-col size="6" size-md="3">
                  <div class="stats-card">
                    <div class="stats-icon dark">
                      <ion-icon :icon="peopleOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <span class="stats-value">0000</span>
                      <span class="stats-label">This Month</span>
                    </div>
                  </div>
                </ion-col>
                
                <ion-col size="6" size-md="3">
                  <div class="stats-card">
                    <div class="stats-icon dark">
                      <ion-icon :icon="personOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <span class="stats-value">0000</span>
                      <span class="stats-label">This Month</span>
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="3">
                  <div class="stats-card">
                    <div class="stats-icon dark">
                      <ion-icon :icon="desktopOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <span class="stats-value">0000</span>
                      <span class="stats-label">This Month</span>
                    </div>
                  </div>
                </ion-col>
  
                <ion-col size="6" size-md="3">
                  <div class="stats-card">
                    <div class="stats-icon dark">
                      <ion-icon :icon="laptopOutline"></ion-icon>
                    </div>
                    <div class="stats-content">
                      <span class="stats-value">0000</span>
                      <span class="stats-label">This Month</span>
                    </div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
  
            <!-- Lead Form -->
            <div class="form-container">
              <h2>Lead Form</h2>
              <form @submit.prevent="handleSubmit">
                <ion-grid>
                  <ion-row>
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Student Name</ion-label>
                        <ion-input v-model="formData.studentName" type="text" required></ion-input>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Mobile Number</ion-label>
                        <ion-input v-model="formData.mobileNumber" type="tel" required></ion-input>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Country</ion-label>
                        <ion-select v-model="formData.country">
                          <ion-select-option value="singapore">Singapore</ion-select-option>
                          <ion-select-option value="malaysia">Malaysia</ion-select-option>
                          <ion-select-option value="indonesia">Indonesia</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Status</ion-label>
                        <ion-select v-model="formData.status">
                          <ion-select-option value="new">New</ion-select-option>
                          <ion-select-option value="followup">Follow Up</ion-select-option>
                          <ion-select-option value="converted">Converted</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Cost</ion-label>
                        <ion-input v-model="formData.cost" type="number"></ion-input>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Remarks</ion-label>
                        <ion-textarea v-model="formData.remarks"></ion-textarea>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12">
                      <ion-item>
                        <ion-label position="floating">Address</ion-label>
                        <ion-textarea v-model="formData.address"></ion-textarea>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Lead Source</ion-label>
                        <ion-input v-model="formData.leadSource" type="text"></ion-input>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Work Experience</ion-label>
                        <ion-input v-model="formData.workExperience" type="text"></ion-input>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12">
                      <div class="marks-container">
                        <ion-label>Marks</ion-label>
                        <ion-segment v-model="formData.marks" class="marks-segment">
                          <ion-segment-button value="10th">
                            <ion-label>10th</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="12th">
                            <ion-label>12th</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="degree">
                            <ion-label>Degree</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="pg">
                            <ion-label>PG</ion-label>
                          </ion-segment-button>
                        </ion-segment>
                      </div>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12">
                      <ion-item>
                        <ion-checkbox v-model="formData.followUp">Follow up</ion-checkbox>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row v-if="formData.followUp">
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Called Date</ion-label>
                        <ion-datetime v-model="formData.calledDate" display-format="DD/MM/YYYY"></ion-datetime>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="6">
                      <ion-item>
                        <ion-label position="floating">Next Follow up Date</ion-label>
                        <ion-datetime v-model="formData.nextFollowUpDate" display-format="DD/MM/YYYY"></ion-datetime>
                      </ion-item>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col size="12">
                      <div class="priority-container">
                        <ion-label>Priority</ion-label>
                        <ion-segment v-model="formData.priority">
                          <ion-segment-button value="low">
                            <ion-label>Low</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="medium">
                            <ion-label>Medium</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="high">
                            <ion-label>High</ion-label>
                          </ion-segment-button>
                          <ion-segment-button value="urgent">
                            <ion-label>Urgent</ion-label>
                          </ion-segment-button>
                        </ion-segment>
                      </div>
                    </ion-col>
                  </ion-row>
  
                  <ion-row>
                    <ion-col>
                      <ion-button expand="block" type="submit" class="submit-button">
                        SUBMIT
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </form>
            </div>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { 
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonItem, IonLabel, IonInput, IonTextarea, IonSelect,
    IonSelectOption, IonSegment, IonSegmentButton,
    IonCheckbox, IonDatetime
  } from '@ionic/vue';
  import {
    peopleOutline, personOutline, desktopOutline,
    laptopOutline
  } from 'ionicons/icons';
  import SideMenu from '../../components/Counselorside.vue';
  
  export default defineComponent({
    name: 'LeadForm',
    components: {
      IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
      IonButtons, IonMenuButton, IonButton, IonIcon,
      IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
      IonItem, IonLabel, IonInput, IonTextarea, IonSelect,
      IonSelectOption, IonSegment, IonSegmentButton,
      IonCheckbox, IonDatetime, SideMenu
    },
    setup() {
      const formData = ref({
        studentName: '',
        mobileNumber: '',
        country: '',
        status: '',
        cost: '',
        remarks: '',
        address: '',
        leadSource: '',
        workExperience: '',
        marks: '10th',
        followUp: false,
        calledDate: '',
        nextFollowUpDate: '',
        priority: 'low'
      });
  
      const handleSubmit = () => {
        console.log('Form submitted:', formData.value);
        // Add your form submission logic here
      };
  
      return {
        peopleOutline,
        personOutline,
        desktopOutline,
        laptopOutline,
        formData,
        handleSubmit
      };
    }
  });
  </script>
  
  <style scoped>
  .custom-searchbar {
    max-width: 300px;
    padding: 0 10px;
  }
  
  .stats-grid {
    padding: 16px;
    background-color: white;
  }
  
  .stats-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .stats-icon.dark {
    background: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
  
  .stats-icon.dark ion-icon {
    font-size: 20px;
    color: #fff;
  }
  
  .form-container {
    padding: 16px;
    background: #fff;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .form-container h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #333;
  }
  
  .marks-container,
  .priority-container {
    margin: 16px 0;
  }
  
  .marks-segment,
  .priority-segment {
    margin-top: 8px;
  }
  
  .submit-button {
    margin-top: 24px;
    --background: #000;
  }
  
  @media (max-width: 768px) {
    .custom-searchbar {
      max-width: 100%;
    }
  }
  </style>