<template>
  <ion-menu content-id="main-content" type="overlay">
    <ion-content class="custom-menu">
      <div class="admin-info">
        <img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" alt="Admin" class="admin-image" />
        <h2>{{ userName }}</h2>
        <ion-icon :icon="ellipsisVertical" class="edit-icon"></ion-icon>
      </div>
      <ion-list>
        <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
          <ion-item 
            @click="selectPage(i)" 
            router-direction="root" 
            :router-link="p.url" 
            lines="none" 
            detail="false" 
            class="hydrated" 
            :class="{ selected: selectedIndex === i }"
          >
            <ion-icon slot="start" :icon="p.icon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
        
        <!-- Logout Button -->
        <ion-menu-toggle auto-hide="false">
          <ion-item 
            @click="handleLogout" 
            lines="none" 
            detail="false" 
            class="logout-item"
          >
            <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
    
    <!-- Loading Overlay -->
    <div v-if="isLoggingOut" class="loading-overlay">
      <ion-spinner name="circular"></ion-spinner>
    </div>
  </ion-menu>
</template>
  
  <script>
  import { useRouter, useRoute } from 'vue-router';
  import { IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonAlert, IonSpinner } from '@ionic/vue';
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import axios from 'axios';
  import { gridOutline, peopleOutline, calendarOutline, ellipsisVertical, briefcaseOutline, logOutOutline } from 'ionicons/icons';
  // import { mapGetters } from 'vuex'
  
  
  export default {
    name: 'SideMenu',
    components: {
      IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonAlert, IonSpinner
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
    
      const selectedIndex = ref(0);
      const showLogoutConfirm = ref(false);
      
      const userId = computed(() => store.getters['user/userId']);
      const userName = computed(() => store.state.user.userData?.username ?? 'Unknown');

      const appPages = [
        { title: 'Dashboard', url:  { name: 'cldashbord', params: { id: userId.value } }, icon: gridOutline },
        { title: 'Total leads', url: { name: 'totallleads', params: { id: userId.value } }, icon: calendarOutline },
         { title: 'New leads', url: { name: 'clnewlead', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Followup leads', url:{ name: 'clfollowupleads', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Registerd leads', url: { name: 'registerdleads', params: { id: userId.value } }, icon: calendarOutline },
       
        // { title: 'Leads form', url: { name: 'leadform' }, icon: calendarOutline },
        { title: 'Cancelled Leads', url: { name: 'cancelled', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Attendees', url: { name: 'attandence', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Leave Request', url: { name: 'leaverequest', params: { id: userId.value } }, icon: briefcaseOutline },
        // { title: 'Report', url: { name: '' }, icon: calendarOutline },
        // { title: 'Support', url: { name: '' }, icon: calendarOutline },
        { title: 'Birthday', url: { name: 'BirthdayCouns', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Student status', url: { name: 'studentStatusCouns', params: { id: userId.value } }, icon: calendarOutline },
        { title: 'Lead status', url: { name: 'leadStatusCouns', params: { id: userId.value }}, icon: calendarOutline }

      ];

      const filteredPages = computed(() => {
      const roleId = store.state.user.userData?.role?.[0] ?? null;
      if (roleId === 2 ) {
        return appPages;
      }
      return [];
    });

    const updateSelectedIndex = () => {
      selectedIndex.value = appPages.findIndex((page) => {
        if (typeof page.url === 'string') {
          return page.url === route.path;
        } else if (page.url.name) {
          return page.url.name === route.name;
        }
        return false;
      });
    };

    const selectPage = (index) => {
      selectedIndex.value = index;
      const selectedPage = appPages[index];
      if (selectedPage.url) {
        router.push(selectedPage.url);
      }
    };

    const presentLogoutConfirm = () => {
      showLogoutConfirm.value = true;
    };

    const dismissLogoutConfirm = () => {
      showLogoutConfirm.value = false;
    };

    const handleLogout = async () => {
      const auth = JSON.parse(localStorage.getItem('user'));
      try {
        await axios({
          method: 'get',
          url: `${import.meta.env.VITE_API_BASE_URL}user/log_out`,
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
        });
        
        // Clear all stored data
        localStorage.clear();
        sessionStorage.clear();
        
        // Reset Vuex store
        await store.dispatch('user/resetUserState');
        
        // Navigate to login page
        await router.push({ name: 'login' });
        
        // Close the alert
        showLogoutConfirm.value = false;
        
        // Refresh the page after a brief delay
        setTimeout(() => {
          window.location.reload();
        }, 100);

      } catch (error) {
        console.error('Error logging out:', error);
      }
  };
    const alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: dismissLogoutConfirm
      },
      {
        text: 'Yes',
        handler: handleLogout
      }
    ];

    // Initialize selected index
    updateSelectedIndex();
    router.afterEach(updateSelectedIndex);

    return {
      selectedIndex,
      appPages,
      selectPage,
      filteredPages,
      userName,
      showLogoutConfirm,
      presentLogoutConfirm,
      dismissLogoutConfirm,
      handleLogout,
      logOutOutline,
      alertButtons,
      ellipsisVertical
    };
    },
    // computed:{
    //   ...mapGetters('user', ['userId']),
    // }
  };
  </script>
  
  <style scoped>
.custom-menu {
  --background: #000000 !important;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

.admin-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: relative;
}

.admin-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.admin-info h2 {
  color: white;
  margin: 0;
  font-size: 1.2rem;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
  --color: white;
  --padding-start: 10px;
  --padding-end: 10px;
  margin-bottom: 5px;
}

ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-item ion-icon {
  color: white;
}

ion-label {
  font-weight: 500;
}

.logout-item {
  margin-top: 20px;
  --background: rgba(var(--ion-color-danger-rgb), 0.1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>