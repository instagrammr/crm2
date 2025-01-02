// DashboardView.vue
<template>
  <ion-page>
    <ion-app>
      <ion-split-pane content-id="main-content">
        <side-menu />
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar class="header-toolbar">
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-title class="main-title">
                <i class="fas fa-chart-line mr-2"></i>
                Analytics Dashboard
              </ion-title>
            </ion-toolbar>
          </ion-header>
          
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

                <!-- Graph Section -->
                <ion-col size="12">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Lead Analytics</ion-card-title>
                      <ion-segment 
                        :value="graphType" 
                        @ionChange="changeGraphType($event)"
                        class="graph-type-segment"
                      >
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
                        <apexchart
                          type="line"
                          height="350"
                          :options="chartOptions"
                          :series="chartSeries"
                        ></apexchart>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-col>

                <!-- Time Filter -->
                <ion-col size="12">
                  <ion-segment 
                    :value="filterType" 
                    @ionChange="changeLeadFilter($event)"
                    class="lead-filter-segment"
                  >
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
                        <ion-button 
                          @click="prevPage" 
                          :disabled="currentPage === 1"
                          fill="clear"
                        >
                          <i class="fas fa-chevron-left mr-1"></i>
                          Previous
                        </ion-button>
                        <span>Page {{ currentPage }} of {{ totalPages }}</span>
                        <ion-button 
                          @click="nextPage" 
                          :disabled="currentPage === totalPages"
                          fill="clear"
                        >
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
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import VueApexCharts from 'vue3-apexcharts';
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonMenuButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, 
  IonPage, IonSplitPane, IonSegment, IonSegmentButton, 
  IonLabel, IonList, IonItem, IonText, IonButton
} from '@ionic/vue';

import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    apexchart: VueApexCharts,
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, 
    SideMenu, IonPage, IonSplitPane, IonSegment, 
    IonSegmentButton, IonLabel, IonList, IonItem, IonText, 
    IonButton
  },
  data() {
    return {
      filterType: 'day',
      graphType: 'line',
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
            formatter: function(val) {
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
    ...mapState('addLead', [
      'totalLeadCount',
      'totaldaymonthleadId' 
    ]),
    ...mapState('attendance', [ 
      'totalcurrentAbsentCount', 
      'totalcurrentPresentCount',
      'totalcurrentLateCount'
    ]),
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
    ...mapActions('addLead', [
      'fetchtotalleadCount',
      'fetchtotalmonthdayleadId'
    ]),
    ...mapActions('attendance', [
      'fetchtotalCurrentLateCount', 
      'fetchtotalCurrentAbsentCount', 
      'fetchtotalCurrentPresentCount',
    ]),

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
      const leadData = this.totaldaymonthleadId.leadsByDayAndMonth || [];
      
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
        await this.fetchtotalmonthdayleadId(userId);
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
          this.fetchtotalCurrentLateCount(userId),
          this.fetchtotalmonthdayleadId(userId)
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
  },
  watch: {
    totaldaymonthleadId: {
      handler() {
        this.processLeadData();
      },
      deep: true
    }
  }
});
</script>
<style scoped>
/* Font Awesome Import (Add this in your main CSS or index.html) */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.lead-filter-segment {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.stats-grid {
  padding: 20px;
  background: var(--ion-background-color);
}

.stats-card {
  border-radius: 12px;
  padding: 24px;
  color: white;
  height: 100%;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.stats-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.stats-card.primary-gradient { background: linear-gradient(135deg, #667eea, #764ba2); }
.stats-card.success-gradient { background: linear-gradient(135deg, #2afadf, #4c83ff); }
.stats-card.danger-gradient { background: linear-gradient(135deg, #ff6b6b, #ff4757); }

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

/* Utility classes for margin and spacing */
.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }

.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
}
</style>