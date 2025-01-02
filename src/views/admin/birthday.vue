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
              <ion-title>Upcoming Birthdays</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="toggleSearch">
                  <ion-icon :icon="searchOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
            
            <!-- Search and Filter Bar -->
            <ion-toolbar v-if="isSearchVisible" color="light">
              <ion-searchbar 
                v-model="searchQuery" 
                placeholder="Search by name"
                @ionChange="filterBirthdays"
              ></ion-searchbar>
              <ion-segment 
                v-model="sortOrder" 
                @ionChange="sortBirthdays"
              >
                <ion-segment-button value="upcoming">
                  <ion-label>Upcoming</ion-label>
                </ion-segment-button>
                <ion-segment-button value="recent">
                  <ion-label>Recent</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
              <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <div v-if="filteredBirthdays.length === 0" class="no-birthdays-container">
              <ion-text color="medium">
                <h2>No birthdays found</h2>
                <p>Try adjusting your search or filter</p>
              </ion-text>
            </div>

            <ion-list v-else>
              <ion-item-sliding v-for="user in filteredBirthdays" :key="user.id">
                <ion-item>
                  <ion-card class="birthday-card" style="width: 100%;">
                    <ion-card-content>
                      <div class="birthday-content">
                        <div class="birthday-avatar">
                          <ion-avatar>
                            <img :src="user.avatar || 'default-avatar.png'" :alt="user.username">
                          </ion-avatar>
                        </div>
                        <div class="birthday-details">
                          <h2>{{ user.username}}</h2>
                        
                          <p>
                            <ion-icon :icon="calendarOutline" class="icon-small"></ion-icon>
                            {{ formatBirthday(user.date_of_birth) }}
                          </p>
                          <ion-chip 
                            :color="getBirthdayProximityColor(user.date_of_birth)"
                            outline
                          >
                            {{ getBirthdayProximityText(user.date_of_birth) }}
                          </ion-chip>
                        </div>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </ion-item>
                <ion-item-options side="end">
                  <ion-item-option color="success" @click="shareOnWhatsApp(user)">
                    <ion-icon :icon="logoWhatsapp"></ion-icon>
                    Share
                  </ion-item-option>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>
          </ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  </ion-page>
</template>

<script>
import { 
  IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, 
  IonMenuButton, IonButton, IonIcon, IonSplitPane, 
  IonCard, IonCardContent, IonList, IonAvatar,
  IonSearchbar, IonSegment, IonSegmentButton, 
  IonRefresher, IonRefresherContent, 
  IonText, IonChip, IonPage,
  IonItemSliding, IonItem, IonItemOptions, IonItemOption
} from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import { defineComponent } from 'vue';
import { 
  notificationsOutline, 
  searchOutline, 
  calendarOutline,
  logoWhatsapp
} from 'ionicons/icons';
import SideMenu from '../../components/SideMenu.vue';

export default defineComponent({
  name: 'BirthdayListComponent',
  components: {
    IonApp, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonMenuButton, IonButton, IonIcon, 
    IonSplitPane, IonCard, IonCardContent, 
    IonList, IonSearchbar, IonSegment, 
    IonSegmentButton, IonRefresher, 
    IonRefresherContent, IonText, 
    IonAvatar, IonChip, SideMenu, IonPage,
    IonItemSliding, IonItem, IonItemOptions, IonItemOption
  },
  data() {
    return {
      notificationsOutline,
      searchOutline,
      calendarOutline,
      logoWhatsapp,
   
      searchQuery: '',
      isSearchVisible: false,
      sortOrder: 'upcoming'
    }
  },
  computed: {
    ...mapState('user', ['totaluserList']),
    filteredBirthdays() {
      let filtered = this.totaluserList;

      // Search filter
      if (this.searchQuery) {
        filtered = filtered.filter(user => 
          user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Sort birthdays
      return this.sortBirthdayList(filtered);
    }
  },
  methods: {
    ...mapActions('user', ['fetchtotaluserlist']),
    
    async fetchleadData() {
      try {
        await this.fetchtotaluserlist();
      } catch (error) {
        console.error('Error fetching lead data:', error);
        this.$toast.show('Failed to load birthdays', 'error');
      }
    },
    
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
    },
    
    formatBirthday(birthdate) {
      const date = new Date(birthdate);
      return date.toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric'
      });
    },
    
    sortBirthdayList(list) {
      const today = new Date();
      
      return list.sort((a, b) => {
        const aBirthday = this.getNextBirthdayDate(a.date_of_birth);
        const bBirthday = this.getNextBirthdayDate(b.date_of_birth);
        
        return this.sortOrder === 'upcoming' 
          ? aBirthday - bBirthday 
          : bBirthday - aBirthday;
      });
    },
    
    getNextBirthdayDate(birthdate) {
      const today = new Date();
      const birthday = new Date(birthdate);
      
      let nextBirthday = new Date(
        today.getFullYear(), 
        birthday.getMonth(), 
        birthday.getDate()
      );
      
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      return nextBirthday;
    },
    
    getBirthdayProximityText(birthdate) {
      const daysUntilBirthday = this.getDaysUntilBirthday(birthdate);
      
      if (daysUntilBirthday === 0) return 'Today!';
      if (daysUntilBirthday === 1) return 'Tomorrow';
      if (daysUntilBirthday <= 7) return `In ${daysUntilBirthday} days`;
      
      return this.formatBirthday(birthdate);
    },
    
    getBirthdayProximityColor(birthdate) {
      const daysUntilBirthday = this.getDaysUntilBirthday(birthdate);
      
      if (daysUntilBirthday === 0) return 'success';
      if (daysUntilBirthday <= 7) return 'warning';
      
      return 'medium';
    },
    
    getDaysUntilBirthday(birthdate) {
      const today = new Date();
      const birthday = new Date(birthdate);
      
      let nextBirthday = new Date(
        today.getFullYear(), 
        birthday.getMonth(), 
        birthday.getDate()
      );
      
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      const timeDiff = nextBirthday.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    
    shareOnWhatsApp(user) {
      // Calculate days until birthday and format message
      const daysUntilBirthday = this.getDaysUntilBirthday(user.date_of_birth);
      const birthdayDate = this.formatBirthday(user.date_of_birth);
      
      // Construct WhatsApp sharing message
      let message = `🎂 Upcoming Birthday! 

Name: ${user.username}
mobile: ${user.mobile}

Birthday: ${birthdayDate}`;

      // Add proximity information
      if (daysUntilBirthday === 0) {
        message += `\n🎉 Birthday is TODAY! 🎉`;
      } else if (daysUntilBirthday === 1) {
        message += `\n🎈 Birthday is TOMORROW! 🎈`;
      } else {
        message += `\n🎈 Birthday is in ${daysUntilBirthday} days`;
      }

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);

      // Construct WhatsApp share URL
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

      // Open WhatsApp in a new window/tab
      window.open(whatsappUrl, '_blank');
    },
    
    async doRefresh(event) {
      try {
        await this.fetchleadData();
        event.target.complete();
      } catch (error) {
        event.target.complete();
        this.$toast.show('Refresh failed', 'error');
      }
    },

    // Optional: Filter method for search functionality
    filterBirthdays() {
      // This method is already handled in the computed property
      // But you can add additional filtering logic if needed
    }
  },
  
  async mounted() {
    try {
      await this.fetchleadData();
    } catch (error) {
      console.error('Error fetching lead list:', error);
    }
  }
});
</script>

<style scoped>
.birthday-content {
  display: flex;
  align-items: center;
}

.birthday-avatar {
  margin-right: 15px;
}

.birthday-details {
  flex-grow: 1;
}

.icon-small {
  margin-right: 5px;
  vertical-align: middle;
}
</style>