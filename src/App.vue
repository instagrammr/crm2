<!-- <template>
  <ion-app>
    <router-view></router-view>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script> -->
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

// import Navbar from '../src/components/Navbar.vue';

  export default defineComponent({
    name: 'App',
    components: { IonApp, IonRouterOutlet, },
  });
</script>
