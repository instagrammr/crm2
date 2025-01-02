<template>
  <ion-page>
    <ion-content class="ion-padding login-background">
      <div class="login-container">
        <div class="logo-container">
          <svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill="#4A90E2"/>
            <path d="M10 10H40V25H25V40H10V10Z" fill="white"/>
            <text x="32" y="22" font-family="Arial" font-size="20" fill="white">R</text>
          </svg>
          <h1>Relavio</h1>
        </div>

        <!-- Error Alert -->
        <transition name="slide-fade">
          <div v-if="error" class="error-alert">
            <ion-icon name="alert-circle" class="error-icon"></ion-icon>
            <span>{{ error }}</span>
            <button @click="clearError" class="close-error">
              <ion-icon name="close"></ion-icon>
            </button>
          </div>
        </transition>

        <ion-card class="login-card">
          <ion-card-header>
            <ion-card-title>Welcome Back</ion-card-title>
            <ion-card-subtitle>Sign in to continue</ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content>
            <form @submit.prevent="login" class="login-form">
              <div class="input-wrapper">
                <ion-icon name="mail-outline" class="input-icon"></ion-icon>
                <ion-input 
                  v-model="email" 
                  type="email" 
                  placeholder="Email Address" 
                  :class="{'invalid': emailError}"
                  @blur="validateEmail"
                ></ion-input>
              </div>
              <div v-if="emailError" class="error-text">{{ emailError }}</div>

              <div class="input-wrapper">
                <ion-icon name="lock-closed-outline" class="input-icon"></ion-icon>
                <ion-input 
                  v-model="password" 
                  type="password" 
                  placeholder="Password" 
                  :class="{'invalid': passwordError}"
                  @blur="validatePassword"
                ></ion-input>
              </div>
              <div v-if="passwordError" class="error-text">{{ passwordError }}</div>

              <ion-button 
                expand="block" 
                type="submit" 
                :disabled="!isFormValid"
                class="login-button"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <span v-else>Log In</span>
              </ion-button>
            </form>
          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/vue';
import { mailOutline, lockClosedOutline, alertCircle, close } from 'ionicons/icons';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      isLoading: false
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password && !this.emailError && !this.passwordError;
    }
  },
  methods: {
    ...mapActions('user', ['USER_LOGIN']),
    
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Email is required';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Invalid email format';
      } else {
        this.emailError = '';
      }
    },
    
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password is required';
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters';
      } else {
        this.passwordError = '';
      }
    },
    
    clearError() {
      this.error = '';
    },
    
    async login() {
      this.validateEmail();
      this.validatePassword();
      
      if (!this.isFormValid) return;
      
      this.isLoading = true;
      this.error = '';
      
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        
        const response = await this.USER_LOGIN(payload);
        const roleId = response.role?.[0];
        
        // Routing logic based on role
        const routeMap = {
          1: { name: 'Adasbord' },
          2: { name: 'cldashbord' },
          3: { name: 'Dashbord' },
          4: { name: 'ADashbord' },
          5: { name: 'leaddashbord' }
        };
        
        const route = routeMap[roleId];
        if (route) {
          await this.$router.push({ 
            name: route.name, 
            params: { id: response.id }
          });
        } else {
          this.error = 'Invalid user role';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    // Optional: If you want to use Ionicons
    this.mailOutline = mailOutline;
    this.lockClosedOutline = lockClosedOutline;
    this.alertCircle = alertCircle;
    this.close = close;
  }
});
</script>

<style scoped>
/* Global Styles */
:root {
  --primary-color: #4A90E2;
  --background-color: #f4f6f9;
  --card-background: #ffffff;
  --text-color: #333;
  --error-color: #FF3B30;
}

.login-background {
  background-color: var(--background-color);
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

/* Logo Styles */
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-container h1 {
  font-size: 2.5rem;
  margin-top: 1rem;
  color: var(--text-color);
  font-weight: bold;
}

/* Login Card Styles */
.login-card {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

ion-card-title {
  font-size: 1.8rem;
  color: var(--text-color);
  font-weight: 700;
}

ion-card-subtitle {
  color: #666;
}

/* Form Styles */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 10px;
  color: #888;
  z-index: 10;
}

ion-input {
  padding-left: 40px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.input-wrapper ion-input.invalid {
  border: 2px solid var(--error-color);
}

.error-text {
  color: var(--error-color);
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.forgot-password {
  text-align: right;
  margin-bottom: 1rem;
}

.forgot-password a {
  color: var(--primary-color);
  text-decoration: none;
}

/* Button Styles */
.login-button {
  --background: var(--primary-color);
  --color: white;
  height: 50px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 10px;
}

.login-button:disabled {
  opacity: 0.6;
}

/* Error Alert Styles */
.error-alert {
  display: flex;
  align-items: center;
  background-color: #FFE5E5;
  color: var(--error-color);
  padding: 0.75rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 450px;
}

.error-icon {
  margin-right: 10px;
  color: var(--error-color);
}

.close-error {
  background: none;
  border: none;
  color: var(--error-color);
  margin-left: auto;
  cursor: pointer;
}

/* Signup Link */
.signup-link {
  margin-top: 1rem;
  color: #666;
}

.signup-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>