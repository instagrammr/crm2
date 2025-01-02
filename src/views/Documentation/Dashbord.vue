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
              <ion-title class="main-title">Document  Dashboard</ion-title>
              <ion-button class="noti" fill="clear" slot="end" @click="navigateToNoti()">
                <ion-icon :icon="notificationsOutline" class="bell"></ion-icon>
                <ion-badge v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</ion-badge>
              </ion-button>
            </ion-toolbar>
          </ion-header>
          
           <!-- Filter Segment -->
           <ion-content>
            <ion-grid class="stats-grid">
              <ion-row>
                <!-- Summary Stats Cards -->
                <ion-col size="12" size-md="4">
                  <div class="stats-card primary-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-users"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Total Leads</h4>
                      <span class="stats-value">{{ totalLeadCount }}</span>
                      <div class="stats-trend">
                        <i class="fas fa-arrow-up mr-1"></i>
                        {{ calculateGrowth(totalLeadCount) }}%
                      </div>
                    </div>
                  </div>
                </ion-col>

                <ion-col size="12" size-md="4">
                  <div class="stats-card success-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Present</h4>
                      <span class="stats-value">{{ totalcurrentPresentCount }}</span>
                      <div class="stats-trend positive">
                        <i class="fas fa-signal mr-1"></i>
                        Active
                      </div>
                    </div>
                  </div>
                </ion-col>

                <ion-col size="12" size-md="4">
                  <div class="stats-card danger-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Absent</h4>
                      <span class="stats-value">{{ totalcurrentAbsentCount }}</span>
                      <div class="stats-trend negative">
                        <i class="fas fa-arrow-down mr-1"></i>
                        Inactive
                      </div>
                    </div>
                  </div>
                </ion-col>

                <ion-col size="12" size-md="4">
                  <div class="stats-card warning-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-sync-alt"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Follow-up Leads</h4>
                      <span class="stats-value">{{ totalFollowupCount }}</span>
                      <div class="stats-trend positive">
                        <i class="fas fa-signal mr-1"></i>
                      </div>
                    </div>
                  </div>
                </ion-col>

                <ion-col size="12" size-md="4">
                  <div class="stats-card danger-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Droped Leads</h4>
                      <span class="stats-value">{{ totalDropedCount }}</span>
                      <div class="stats-trend negative">
                        <i class="fas fa-arrow-down mr-1"></i>
                        Inactive
                      </div>
                    </div>
                  </div>
                </ion-col>

                <ion-col size="12" size-md="4">
                  <div class="stats-card success-gradient">
                    <div class="stats-icon">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h4>Converted Leads</h4>
                      <span class="stats-value">{{ totalconvertedLeadCount }}</span>
                      <div class="stats-trend positive">
                        <i class="fas fa-signal mr-1"></i>
                      </div>
                    </div>
                  </div>
                </ion-col>

                <!-- Graph Section -->
                <ion-col size="12">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Lead Analytics</ion-card-title>
                      <ion-segment :value="graphType" @ionChange="changeGraphType($event)" class="graph-type-segment">
                        <ion-segment-button value="line">
                          <ion-label>
                            <i class="fas fa-chart-line mr-2"></i>
                            Line
                          </ion-label>
                        </ion-segment-button>
                        <ion-segment-button value="bar">
                          <ion-label>
                            <i class="fas fa-chart-bar mr-2"></i>
                            Bar
                          </ion-label>
                        </ion-segment-button>
                      </ion-segment>
                    </ion-card-header>
                    <ion-card-content>
                      <div class="chart-container">
                        <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-col>

                <!-- Time Filter -->
                <ion-col size="12">
                  <ion-segment :value="filterType" @ionChange="changeLeadFilter($event)" class="lead-filter-segment">
                    <ion-segment-button value="day">
                      <ion-label>
                        <i class="fas fa-calendar-day mr-2"></i>
                        Daily View
                      </ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="month">
                      <ion-label>
                        <i class="fas fa-calendar-alt mr-2"></i>
                        Monthly View
                      </ion-label>
                    </ion-segment-button>
                  </ion-segment>
                </ion-col>

                <!-- Detailed Data Table -->
                <ion-col size="12">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>
                        <i class="fas fa-list-alt mr-2"></i>
                        {{ filterType === 'day' ? 'Daily' : 'Monthly' }} Details
                      </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list v-if="paginatedLeads.length > 0">
                        <ion-item v-for="(lead, index) in paginatedLeads" :key="index">
                          <ion-label>
                            <h2>
                              <i class="fas fa-calendar mr-2"></i>
                              {{ filterType === 'day'
                                ? formatDate(lead)
                                : formatMonthYear(lead)
                              }}
                            </h2>
                            <p>
                              <i class="fas fa-chart-bar mr-2"></i>
                              Total Leads: {{ lead.totalLeads }}
                            </p>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                      <ion-text v-else color="medium">
                        <i class="fas fa-exclamation-circle mr-2"></i>
                        No data available for the selected period.
                      </ion-text>

                      <!-- Pagination -->
                      <div v-if="filteredLeads.length > itemsPerPage" class="pagination-controls">
                        <ion-button @click="prevPage" :disabled="currentPage === 1" fill="clear">
                          <i class="fas fa-chevron-left mr-1"></i>
                          Previous
                        </ion-button>
                        <span>Page {{ currentPage }} of {{ totalPages }}</span>
                        <ion-button @click="nextPage" :disabled="currentPage === totalPages" fill="clear">
                          Next
                          <i class="fas fa-chevron-right ml-1"></i>
                        </ion-button>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>


<script>
import { defineComponent, ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { alertController } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';

import {
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonIcon, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonPage, IonSplitPane,
  IonSegment, IonSegmentButton, IonLabel,
  IonDatetime, IonDatetimeButton, IonModal, IonItem,
  IonList, IonBadge,
  IonText,
  IonButton
} from '@ionic/vue';
import {
  peopleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  trendingUpOutline,
  documentTextOutline,
  addCircleOutline,
  removeCircleOutline,
  statsChartOutline,
  notificationsOutline
} from 'ionicons/icons';
import SideMenu from '../../components/Documentationside.vue';

export default defineComponent({
  name: 'LeadConversionDashboard',
  components: {
    apexchart: VueApexCharts,
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonIcon, IonCard, IonButton,
    IonCardHeader, IonCardTitle, IonCardContent, IonText,
    IonGrid, IonRow, IonCol, SideMenu, IonPage, IonList,
    IonSplitPane, IonSegment, IonSegmentButton, IonItem,
    IonLabel, IonDatetime, IonDatetimeButton, IonModal,
    IonBadge
  },
  setup() {
    return {
      peopleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      trendingUpOutline,
      documentTextOutline,
      addCircleOutline,
      removeCircleOutline,
      statsChartOutline,
      notificationsOutline
    };
  },
  data() {
    return {
      filterType: 'day',
      graphType: 'line',
      notificationCount: 0,
      filteredLeads: [],
      currentPage: 1,
      itemsPerPage: 6,
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Time Period'
          }
        },
        yaxis: {
          title: {
            text: 'Lead Count'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " leads"
            }
          }
        },
        theme: {
          mode: 'light',
          palette: 'palette1'
        }
      },
      chartSeries: [{
        name: "Leads",
        data: []
      }]
    }
  },
  computed: {
    ...mapState('document', [ 'totalleadDayMonthListId', 'totalconvertedLeadCount',
      'totalLeadCount', 'totalFollowupCount', 'totalDropedCount', 'totaltodayLeadCount',]),
      ...mapState('attendance', [
      'totalcurrentAbsentCount',
      'totalcurrentPresentCount',
    ]),
    notificationCount() {
      // Replace this with the logic to fetch the actual notification count
      return this.totaltodayLeadCount; // Assuming `totaltodayLeadCount` has the count
    },
    paginatedLeads() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredLeads.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredLeads.length / this.itemsPerPage);
    }
  },
  methods: {
    ...mapActions('document', ['fetchtotalleadCount', 'fetchtotalLeadDayMonthlistId', 'fetchtotaltodayLeadCount',
      'fetchtotalleadCount',
      'fetchtotaldropedCount',
      'fetchtotalfollowupCount',
      'fetchtotalconvertedLeadCount']),

    ...mapActions('attendance', [ 
      'fetchtotalCurrentAbsentCount', 
      'fetchtotalCurrentPresentCount',
    ]),
    
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
    // Method to get filtered value based on current filter and card title
    calculateGrowth(value) {
      // Simple growth calculation - replace with actual logic
      return ((value / 100) * Math.random() * 10).toFixed(1);
    },

    formatDate(lead) {
      const monthName = this.months[lead.month - 1];
      return `${monthName} ${lead.day}, ${lead.year}`;
    },

    formatMonthYear(lead) {
      const monthName = this.months[lead.month - 1];
      return `${monthName} ${lead.year}`;
    },

    updateChartData() {
      const categories = this.filteredLeads.map(lead =>
        this.filterType === 'day' ? this.formatDate(lead) : this.formatMonthYear(lead)
      );
      const data = this.filteredLeads.map(lead => lead.totalLeads);

      this.chartOptions = {
        ...this.chartOptions,
        chart: {
          ...this.chartOptions.chart,
          type: this.graphType
        },
        xaxis: {
          ...this.chartOptions.xaxis,
          categories
        }
      };

      this.chartSeries = [{
        name: "Leads",
        data
      }];
    },

    changeGraphType(event) {
      this.graphType = event.detail.value;
      this.updateChartData();
    },

    processLeadData() {
      const leadData = this.totalleadDayMonthListId.leadsByDayAndMonth || [];

      if (this.filterType === 'day') {
        this.filteredLeads = leadData.map(item => ({
          year: item.year,
          month: item.month,
          day: item.day,
          totalLeads: item.totalLeads
        }));
      } else {
        const monthlyLeads = {};
        leadData.forEach(item => {
          const key = `${item.year}-${item.month}`;
          if (!monthlyLeads[key]) {
            monthlyLeads[key] = {
              year: item.year,
              month: item.month,
              totalLeads: item.totalLeads
            };
          } else {
            monthlyLeads[key].totalLeads += item.totalLeads;
          }
        });

        this.filteredLeads = Object.values(monthlyLeads);
      }

      this.currentPage = 1;
      this.updateChartData();
    },

    async changeLeadFilter(event) {
      this.filterType = event.detail.value;

      try {
        const userId = this.$route.params.id;
        await this.fetchtotalLeadDayMonthlistId(userId);
        this.processLeadData();
      } catch (error) {
        console.error('Error fetching filtered lead data:', error);
        this.filteredLeads = [];
      }
    },
    
    async fetchLeadData() {
      try {
        const userId = this.$route.params.id;
        await Promise.all([
          this.fetchtotalleadCount(userId),
          this.fetchtotalCurrentPresentCount(userId),
          this.fetchtotalCurrentAbsentCount(userId),
          this.fetchtotalLeadDayMonthlistId(userId),
          this.fetchtotalfollowupCount(userId),
          this.fetchtotaldropedCount(userId),
          this.fetchtotalconvertedLeadCount(userId),
          this.fetchtotaltodayLeadCount(userId)
        ]);

        this.processLeadData();
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  async mounted() {
    await this.fetchLeadData();
    this.notificationCount = this.totaltodayLeadCount;
    if (this.totaltodayLeadCount > 0) {
      await this.showNewLeadAlert();
    }
  },
  watch: {
    totaldaymonthleadId: {
      handler() {
        this.processLeadData();
      },
      deep: true
    },
    totaltodayLeadCount(newCount) {
      if (newCount > 0) {
        this.notificationCount = newCount; // Update local count
        this.showNewLeadAlert(); // Trigger the alert for any leads
      }
    },
  }
});
</script>

<style scoped>
.stats-grid {
  padding: 20px;
  background: var(--ion-background-color);
}

.stats-card {
  border-radius: var(--card-border-radius);
  padding: 24px;
  color: white;
  height: 100%;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-speed) ease;
  cursor: pointer;
}

.stats-card.primary-gradient { background: var(--gradient-primary); }
.stats-card.success-gradient { background: var(--gradient-success); }
.stats-card.danger-gradient { background: var(--gradient-danger); }

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
  background: rgba(255,255,255,0.2);
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

.lead-conversion-chart {
  margin: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.chart-container {
  height: 300px;
  width: 100%;
}

.chart-summary {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background-color: #f4f5f8;
  padding: 15px;
  border-radius: 8px;
}

.summary-item {
  text-align: center;
}

.summary-item span {
  display: block;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.summary-item strong {
  font-size: 1.2em;
  color: var(--ion-color-primary);
}

@media (max-width: 768px) {
  .stats-grid {
    padding: 10px;
  }
  
  .stats-card {
    min-height: 160px;
    padding: 16px;
  }
  
  .chart-summary {
    flex-direction: column;
    gap: 10px;
  }
}
</style>