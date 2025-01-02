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
              <ion-title class="main-title">Lead Management</ion-title>
              
              <ion-buttons slot="end">
                <ion-button @click="navigateToAddLead" fill="solid" color="primary">
                  <ion-icon :icon="addOutline" slot="start"></ion-icon>
                  Add New Lead
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
            <ion-card class="custom-card">
              <ion-card-content>
                <!-- Search and Filter Section -->
                <ion-grid>
                  <ion-row>
                    <ion-col size="12" size-md="4">
                      <ion-item lines="none" class="search-item">
                        <ion-input
                          v-model="searchQuery"
                          placeholder="Search leads..."
                          class="custom-input"
                          @ionChange="handleSearch"
                        >
                          <ion-icon :icon="searchOutline" slot="start"></ion-icon>
                        </ion-input>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="4">
                      <ion-item lines="none">
                        <ion-select
                          v-model="filterCounselor"
                          placeholder="Filter by Counselor"
                          class="custom-select"
                          @ionChange="handleFilter"
                        >
                          <ion-select-option 
                            v-for="counselor in totalcounsillerList"
                            :key="counselor.id"
                            :value="counselor.id"
                          >
                            {{ counselor.username }}
                          </ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                    
                    <ion-col size="12" size-md="4">
                      <ion-item lines="none">
                        <ion-select
                          v-model="sortOption"
                          placeholder="Sort by"
                          class="custom-select"
                          @ionChange="handleSort"
                        >
                          <ion-select-option value="date-new">Newest First</ion-select-option>
                          <ion-select-option value="date-old">Oldest First</ion-select-option>
                          <ion-select-option value="name-asc">Name A-Z</ion-select-option>
                          <ion-select-option value="name-desc">Name Z-A</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <!-- Table Section -->
                <div class="table-responsive">
                  <table class="custom-table">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Mobile</th>
                        <th>Date</th>
                        <th>Country</th>
                        <th>Lead Source</th>
                        <th>Counselor</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="lead in filteredLeads" :key="lead.id">
                        <td>{{ lead.student_name }}</td>
                        <td>{{ lead.mobile }}</td>
                        <td>{{ formatDate(lead.date) }}</td>
                        <td>{{ lead.country }}</td>
                        <td>{{ lead.lead_source }}</td>
                        <td>{{ getCounselorName(lead.counsillerAssignId) }}</td>
                        <td>
                          <ion-button fill="clear" @click="editLead(lead.id)">
                            <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
                          </ion-button>
                          <ion-button fill="clear" color="danger" @click="showDeleteConfirm(lead.id)">
                            <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
                          </ion-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination -->
                <ion-grid>
                  <ion-row class="ion-justify-content-between ion-align-items-center">
                    <ion-col size="12" size-md="4">
                      <div class="pagination-info">
                        Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalLeads }} entries
                      </div>
                    </ion-col>
                    <ion-col size="12" size-md="8">
                      <ion-buttons class="ion-justify-content-end">
                        <ion-button 
                          @click="prevPage" 
                          :disabled="currentPage === 1"
                          fill="clear"
                        >
                          Previous
                        </ion-button>
                        <ion-button 
                          v-for="page in totalPages" 
                          :key="page"
                          :fill="currentPage === page ? 'solid' : 'clear'"
                          @click="goToPage(page)"
                        >
                          {{ page }}
                        </ion-button>
                        <ion-button 
                          @click="nextPage"
                          :disabled="currentPage === totalPages"
                          fill="clear"
                        >
                          Next
                        </ion-button>
                      </ion-buttons>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>

    <!-- Delete Confirmation Alert -->
    <ion-alert
      :is-open="showDeleteAlert"
      header="Confirm Delete"
      message="Are you sure you want to delete this lead?"
      :buttons="[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => setShowDeleteAlert(false)
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: confirmDelete
        }
      ]"
    />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
         IonMenuButton, IonButton, IonSplitPane, IonGrid, IonRow,
         IonCol, IonCard, IonCardContent, IonItem, IonIcon,
         IonPage, IonInput, IonSelect, IonSelectOption, IonAlert } from '@ionic/vue';
import { addOutline, createOutline, trashOutline, searchOutline } from 'ionicons/icons';
import { mapActions, mapState } from 'vuex';
import SideMenu from '../../components/addleadside.vue';

export default defineComponent({
  name: 'LeadTable',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonMenuButton, IonButton, IonSplitPane, IonGrid, IonRow,
    IonCol, IonCard, IonCardContent, IonItem, IonIcon,
    IonInput, IonSelect, IonSelectOption, SideMenu, IonPage, IonAlert
  },
  data() {
    return {
      searchQuery: '',
      filterCounselor: null,
      sortOption: 'date-new',
      currentPage: 1,
      itemsPerPage: 10,
      showDeleteAlert: false,
      leadToDelete: null,
      addOutline,
      createOutline,
      trashOutline,
      searchOutline
    }
  },
  computed: {
    ...mapState('user', ['totalcounsillerList']),
    ...mapState('leads', ['leadsList']),
    
    filteredLeads() {
      let filtered = [...this.leadsList];
      
      // Apply search
      if (this.searchQuery) {
        filtered = filtered.filter(lead => 
          lead.student_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          lead.mobile.includes(this.searchQuery)
        );
      }
      
      // Apply counselor filter
      if (this.filterCounselor) {
        filtered = filtered.filter(lead => 
          lead.counsillerAssignId === this.filterCounselor
        );
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        switch(this.sortOption) {
          case 'date-new':
            return new Date(b.date) - new Date(a.date);
          case 'date-old':
            return new Date(a.date) - new Date(b.date);
          case 'name-asc':
            return a.student_name.localeCompare(b.student_name);
          case 'name-desc':
            return b.student_name.localeCompare(a.student_name);
          default:
            return 0;
        }
      });
      
      // Apply pagination
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    
    totalLeads() {
      return this.leadsList.length;
    },
    
    totalPages() {
      return Math.ceil(this.totalLeads / this.itemsPerPage);
    },
    
    paginationStart() {
      return ((this.currentPage - 1) * this.itemsPerPage) + 1;
    },
    
    paginationEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalLeads);
    }
  },
  methods: {
    ...mapActions('user', ['fetchtotalcounsillerlist']),
    ...mapActions('leads', ['fetchLeads', 'deleteLead']),
    
    handleSearch() {
      this.currentPage = 1;
    },
    
    handleFilter() {
      this.currentPage = 1;
    },
    
    handleSort() {
      this.currentPage = 1;
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    
    getCounselorName(id) {
      const counselor = this.totalcounsillerList.find(c => c.id === id);
      return counselor ? counselor.username : 'Not Assigned';
    },
    
    navigateToAddLead() {
      this.$router.push('/add-lead');
    },
    
    editLead(id) {
      this.$router.push(`/edit-lead/${id}`);
    },
    
    showDeleteConfirm(id) {
      this.leadToDelete = id;
      this.showDeleteAlert = true;
    },
    
    async confirmDelete() {
      if (this.leadToDelete) {
        try {
          await this.deleteLead(this.leadToDelete);
          await this.fetchLeads(); // Refresh the list
        } catch (error) {
          console.error('Error deleting lead:', error);
        }
      }
      this.showDeleteAlert = false;
      this.leadToDelete = null;
    },
    
    setShowDeleteAlert(value) {
      this.showDeleteAlert = value;
      if (!value) this.leadToDelete = null;
    },
    
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    
    goToPage(page) {
      this.currentPage = page;
    }
  },
  async mounted() {
    try {
      await Promise.all([
        this.fetchtotalcounsillerlist(),
        this.fetchLeads()
      ]);
    } catch (error) {
      console.error('Error in mounted:', error);
    }
  }
});
</script>

<style scoped>
.header-toolbar {
  --background: var(--ion-color-primary);
  --color: white;
}

.main-title {
  font-weight: 600;
}

.custom-card {
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-item {
  --background: transparent;
}

.custom-input,
.custom-select {
  --padding-start: 12px;
  --padding-end: 12px;
  --background: var(--ion-color-light);
  border-radius: 8px;
}

.table-responsive {
  overflow-x: auto;
  margin: 1rem 0;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.custom-table th,
.custom-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--ion-color-light);
}

.custom-table th {
  background-color: var(--ion-color-light);
  font-weight: 600;
  color: var(--ion-color-dark);
}

.custom-table tr:hover {
  background-color: var(--ion-color-light-shade);
}

.pagination-info {
  color: var(--ion-color-medium);
  font-size: 0.9rem;
}
</style>
