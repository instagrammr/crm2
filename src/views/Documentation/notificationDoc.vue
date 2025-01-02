<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <SideMenu />

        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="goBack">Back</ion-button>
              </ion-buttons>
              <ion-title>Notification</ion-title>

            </ion-toolbar>
          </ion-header>

          <ion-content>

            <div class="leads-list" v-if="totaltodayListId && totaltodayListId.rows">
              <ion-list>
                <ion-item-sliding v-for="lead in totaltodayListId.rows" :key="lead.id">
                  <ion-item @click="goToLeadDetail()">
                    <ion-avatar slot="start">
                      <img
                        src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                        alt="Lead Avatar" class="lead-avatar" />
                    </ion-avatar>
                    <ion-label>
                      <h2>
                        A new lead {{ lead.student_name }} is added
                      </h2>
                    </ion-label>
                  </ion-item>

                </ion-item-sliding>
              </ion-list>
            </div>

          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { mapActions, mapState } from 'vuex';
import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton, IonIcon,
  IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
  IonCard, IonCardContent, IonPage, IonModal, IonInput,
  IonItem,
  IonAvatar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonFabButton, IonFab,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBackButton
} from '@ionic/vue';
import {
  peopleOutline, personAddOutline, closeCircleOutline,
  refreshCircleOutline, callOutline, locationOutline,
  timeOutline, globeOutline, createOutline, eyeOutline,
  trash, chevronBackOutline, trendingUpOutline, flashOutline,
  personCircleOutline, trendingDownOutline, saveOutline, closeOutline,
  warningOutline, cloudUploadOutline, addOutline, logoWhatsapp
} from 'ionicons/icons';

export default defineComponent({
  name: 'TotalLeads',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton, IonIcon,
    IonSplitPane, IonGrid, IonRow, IonCol, IonSearchbar,
    IonCard, IonCardContent, IonPage, IonModal, IonInput,
    IonItem, IonSelect, IonSelectOption, IonLabel, IonFabButton, IonFab, IonList,
    IonAvatar,
    IonItemSliding,
    IonBackButton,
    IonItemOptions,
    IonItemOption
  },
  data() {
    return {
      errorMessage: '',
      searchQuery: "", // Search query for filtering leads
      peopleOutline, personAddOutline, closeCircleOutline,
      refreshCircleOutline, callOutline, locationOutline,
      timeOutline, globeOutline, createOutline, eyeOutline,
      trash, chevronBackOutline, trendingUpOutline, flashOutline,
      personCircleOutline, trendingDownOutline, saveOutline, closeOutline,
      warningOutline, cloudUploadOutline, addOutline, logoWhatsapp
    };
  },
  computed: {
    ...mapState('document', ['totaltodayListId',]),

  },
  methods: {
    ...mapActions('document', ['fetchtotaltodaylistId']),
    goBack() {
      this.$router.go(-1); // Go back in the history stack
      // Or use this.$router.push('/home') to go to a specific page
    },

    async fetchleadData() {
      const userId = this.$route.params.id;
      // const userId = this.$route.params.id;
      try {
        await this.fetchtotaltodaylistId(userId);
        // console.log("Leads fetched successfully:", this.totalLeadListId);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },
    goToLeadDetail() {
      this.$router.push({ name: 'newdocuments' }); // Navigate to lead detail page
    }
  },
  async mounted() {
    try {
      this.userId = this.$route.params.id;
      this.fetchleadData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});
</script>





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