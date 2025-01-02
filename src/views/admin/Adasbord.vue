<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <side-menu />
        
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title>
                <div class="flex items-center">
                  <ion-icon :icon="gridOutline" class="mr-2"></ion-icon>
                  Dashboard Overview
                </div>
              </ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content class="dashboard-content">
            <div class="dashboard-header">
              <h1>Welcome Back!</h1>
              <p>{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>

            <div class="dashboard-grid">
              <ion-card class="metric-card total-staff">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="peopleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Total Staff</h3>
                    <p>{{ totalstaffCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>+5% this week</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card total-students">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="schoolOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Total Students</h3>
                    <p>{{ totalAllLeadCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>+12% this month</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card counselor-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="peopleCircleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Counselor Leads</h3>
                    <p>{{ totalCounsillerAssignedCount || 0 }}</p>
                    <div class="metric-trend positive">
                      <ion-icon :icon="trendingUpOutline"></ion-icon>
                      <span>Active Cases</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Document Processing</h3>
                    <p>{{ totalDocumentAssignedCount || 0 }}</p>
                    <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card visa-processing">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="airplaneOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Processing</h3>
                    <p>{{ totalvisaProcessingCount || 0 }}</p>
                    <div class="metric-trend warning">
                      <ion-icon :icon="hourglassOutline"></ion-icon>
                      <span>Pending</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card visa-status">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Rejected</h3>
                    <p>{{ totalvisaRejectedCount || 0 }}</p>
                    <div class="metric-trend negative">
                      <ion-icon :icon="alertCircleOutline"></ion-icon>
                      <span>Needs Review</span>
                    </div>
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Not Processed</h3>
                    <p>{{ totalApplicationNotProcessedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Ok For Processing</h3>
                    <p>{{ totalApplicationOkForProcessingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Processed</h3>
                    <p>{{ totalApplicationProcessedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Application Recieved</h3>
                    <p>{{ totalApplicationRecievedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Case Closed</h3>
                    <p>{{ totalCaseClosedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Document Pending</h3>
                    <p>{{ totalDocumentPendingCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Conditional Offer Issued</h3>
                    <p>{{ totalConditionalOfferIssuedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Unconditional Offer</h3>
                    <p>{{ totalUnconditionalOfferCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Cas Issued</h3>
                    <p>{{ totalCasIssuedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Cas Doc Waiting Ed</h3>
                    <p>{{ totalCasDocWaitingEdCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Interview Results Waiting</h3>
                    <p>{{ totalInterviewResultsWaitingCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Interview Scheduled</h3>
                    <p>{{ totalInterviewScheduledCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Process</h3>
                    <p>{{ totalVisaProcessCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Filed</h3>
                    <p>{{ totalVisaFiledCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Visa Recieved</h3>
                    <p>{{ totalVisaRecievedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>total Completed</h3>
                    <p>{{ totalCompletedCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Documents Pending</h3>
                    <p>{{ totalDocumentsPendingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Complete Documentation Recieved</h3>
                    <p>{{ totalCompleteDocumentationRecievedLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>


              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>SOP Creating</h3>
                    <p>{{ totalSOPCreatingLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>

              <ion-card class="metric-card document-leads">
                <ion-ripple-effect></ion-ripple-effect>
                <div class="metric-content">
                  <div class="metric-icon">
                    <ion-icon :icon="documentTextOutline"></ion-icon>
                  </div>
                  <div class="metric-details">
                    <h3>Move To Application</h3>
                    <p>{{ totalMoveToApplicationLeadCount || 0 }}</p>
                    <!-- <div class="metric-trend neutral">
                      <ion-icon :icon="timeOutline"></ion-icon>
                      <span>In Progress</span>
                    </div> -->
                  </div>
                </div>
              </ion-card>


            </div>
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
  IonButtons, IonMenuButton, IonSplitPane, IonIcon, 
  IonPage, IonCard, IonRippleEffect
} from '@ionic/vue';
import { 
  peopleOutline, schoolOutline, documentTextOutline,
  airplaneOutline, checkmarkCircleOutline, alertCircleOutline,
  peopleCircleOutline, gridOutline, trendingUpOutline,
  timeOutline, hourglassOutline
} from 'ionicons/icons';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'DashboardComponent',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonSplitPane, IonIcon,
    IonPage, IonCard, IonRippleEffect, SideMenu
  },
  data() {
    return {
      peopleOutline, schoolOutline, documentTextOutline,
      airplaneOutline, checkmarkCircleOutline, alertCircleOutline,
      peopleCircleOutline, gridOutline, trendingUpOutline,
      timeOutline, hourglassOutline
    };
  },
  computed: {
    ...mapState('addLead', [
      'totalAllLeadCount', 'totalvisaRejectedCount',
      'totalvisaProcessingCount', 'totalCounsillerAssignedCount',
      'totalDocumentAssignedCount', 'totalApplicationAssignedCount',
      'totalApplicationNotProcessedLeadCount',
      'totalApplicationOkForProcessingLeadCount',
      'totalApplicationProcessedLeadCount',
      'totalApplicationRecievedLeadCount',
      'totalCaseClosedCount',
      'totalDocumentPendingCount',
      'totalConditionalOfferIssuedCount',
      'totalUnconditionalOfferCount',
      'totalCasIssuedCount',
      'totalCasDocWaitingEdCount',
      'totalInterviewResultsWaitingCount',
      'totalInterviewScheduledCount',
      'totalVisaProcessCount',
      'totalVisaFiledCount',
      'totalVisaRecievedCount',
      'totalCompletedCount',
      'totalDocumentsPendingLeadCount',
      'totalCompleteDocumentationRecievedLeadCount',
      'totalSOPCreatingLeadCount',
      'totalMoveToApplicationLeadCount'
    ]),
    ...mapState('user', ['totalstaffCount'])
  },
  methods: {
    ...mapActions('addLead', [
      'fetchtotalAllleadCount', 'fetchtotalVisaprocessingCount',
      'fetchtotalVisaRejectedCount', 'fetchtotalCounsillerAssignedCount',
      'fetchtotalDocumentAssignedCount', 'fetchtotalApplicationAssignedCount',
      'fetchtotalApplicationNotProcessedLeadCount',
      'fetchtotalApplicationOkForProcessingLeadCount',
      'fetchtotalApplicationProcessedLeadCount',
      'fetchtotalApplicationRecievedLeadCount',
      'fetchtotalCaseClosedCount',
      'fetchtotalDocumentPendingCount',
      'fetchtotalConditionalOfferIssuedCount',
      'fetchtotalUnconditionalOfferCount',
      'fetchtotalCasIssuedCount',
      'fetchtotalCasDocWaitingEdCount',
      'fetchtotalInterviewResultsWaitingCount',
      'fetchtotalInterviewScheduledCount',
      'fetchtotalVisaProcessCount',
      'fetchtotalVisaFiledCount',
      'fetchtotalVisaRecievedCount',
      'fetchtotalCompletedCount',
      'fetchtotalDocumentsPendingLeadCount',
      'fetchtotalCompleteDocumentationRecievedLeadCount',
      'fetchtotalSOPCreatingLeadCount',
      'fetchtotalMoveToApplicationLeadCount'
    ]),
    ...mapActions('user', ['fetchtotalstaffCount']),
    async fetchleadData() {
      
      try {

          await this.fetchtotalAllleadCount();
          await this.fetchtotalstaffCount();
          await this.fetchtotalVisaprocessingCount();
          await this.fetchtotalVisaRejectedCount();
          await this.fetchtotalCounsillerAssignedCount();
          await this.fetchtotalDocumentAssignedCount();
          await this.fetchtotalApplicationAssignedCount();
          await this.fetchtotalApplicationNotProcessedLeadCount();
          await this.fetchtotalApplicationOkForProcessingLeadCount();
          await this.fetchtotalApplicationProcessedLeadCount();
          await this.fetchtotalApplicationRecievedLeadCount();
          await this.fetchtotalCaseClosedCount();
          await this.fetchtotalDocumentPendingCount();
          await this.fetchtotalConditionalOfferIssuedCount();
          await this.fetchtotalUnconditionalOfferCount();
          await this.fetchtotalCasIssuedCount();
          await this.fetchtotalCasDocWaitingEdCount();
          await this.fetchtotalInterviewResultsWaitingCount();
          await this.fetchtotalInterviewScheduledCount();
          await this.fetchtotalVisaProcessCount();
          await this.fetchtotalVisaFiledCount();
          await this.fetchtotalVisaRecievedCount();
          await this.fetchtotalCompletedCount();
          await this.fetchtotalDocumentsPendingLeadCount();
          await this.fetchtotalCompleteDocumentationRecievedLeadCount();
          await this.fetchtotalSOPCreatingLeadCount();
          await this.fetchtotalMoveToApplicationLeadCount();

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
  },
  async mounted() {
    await this.fetchleadData();
  }
});
</script>

<style scoped>
.dashboard-content {
  --background: #f5f7fa;
}

.dashboard-header {
  padding: 1.5rem;
  background: #214d8f;
  color: white;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.dashboard-header p {
  margin: 0.5rem 0 0;
  opacity: 0.9;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  padding: 1.25rem;
}

.metric-card {
  margin: 0;
  overflow: hidden;
  position: relative;
}

.metric-content {
  display: flex;
  padding: 1.25rem;
  align-items: center;
  gap: 1rem;
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-size: 1.5rem;
}

.metric-details {
  flex: 1;
}

.metric-details h3 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ion-color-medium);
}

.metric-details p {
  margin: 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ion-color-dark);
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.metric-trend ion-icon {
  font-size: 1rem;
}

.metric-trend.positive {
  color: var(--ion-color-success);
}

.metric-trend.negative {
  color: var(--ion-color-danger);
}

.metric-trend.neutral {
  color: var(--ion-color-warning);
}

.metric-trend.warning {
  color: var(--ion-color-warning);
}

/* Card-specific styles */
.total-staff .metric-icon {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  color: var(--ion-color-primary);
}

.total-students .metric-icon {
  background: rgba(var(--ion-color-success-rgb), 0.1);
  color: var(--ion-color-success);
}

.counselor-leads .metric-icon {
  background: rgba(var(--ion-color-tertiary-rgb), 0.1);
  color: var(--ion-color-tertiary);
}

.document-leads .metric-icon {
  background: rgba(var(--ion-color-warning-rgb), 0.1);
  color: var(--ion-color-warning);
}

.visa-processing .metric-icon {
  background: rgba(var(--ion-color-secondary-rgb), 0.1);
  color: var(--ion-color-secondary);
}

.visa-status .metric-icon {
  background: rgba(var(--ion-color-danger-rgb), 0.1);
  color: var(--ion-color-danger);
}
</style>a