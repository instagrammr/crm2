<template>
  <ion-page>
    <ion-content class="ion-padding login-background">
      <div class="login-container">
        

        <transition name="fade">
          <div v-if="error" class="error-alert">
            <ion-icon :icon="alertCircle" class="error-icon"></ion-icon>
            <span>{{ error }}</span>
            <button @click="clearError" class="close-error">
              <ion-icon :icon="close"></ion-icon>
            </button>
          </div>
        </transition>

        <ion-card class="login-card">
          <ion-card-header>
            <img 
            src="https://i.ibb.co/6D4R7xx/NEXONIX-3-7-1.png" 
            alt="Nexonix Logo" 
            class="logo-image"
          />
            <ion-card-title>Welcome Back </ion-card-title>
            
            <ion-card-subtitle>NEXONIX </ion-card-subtitle>
           
          </ion-card-header>
          
          <ion-card-content class="login-content">
            <form @submit.prevent="login" class="login-form">
              <div class="input-group">
                <label>Email Address</label>
                <div class="input-wrapper">
                  <ion-icon :icon="mailOutline" class="input-icon"></ion-icon>
                  <ion-input 
                    v-model="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    :class="{'invalid': emailError}"
                    @blur="validateEmail"
                  ></ion-input>
                </div>
                <div v-if="emailError" class="error-text">{{ emailError }}</div>
              </div>

              <div class="input-group">
                <label>Password</label>
                <div class="input-wrapper">
                  <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
                  <ion-input 
                    v-model="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    :class="{'invalid': passwordError}"
                    @blur="validatePassword"
                  ></ion-input>
                </div>
                <div v-if="passwordError" class="error-text">{{ passwordError }}</div>
              </div>

              <div class="form-footer">
                <ion-checkbox>Remember me</ion-checkbox>
                <a href="#" class="forgot-link">Forgot Password?</a>
              </div>

              <ion-button 
                expand="block" 
                type="submit" 
                :disabled="!isFormValid || isLoading"
                class="login-button"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <span v-else>Sign In</span>
              </ion-button>
            </form>

            <div class="signup-link">
              Don't have an account? <a href="#">Sign up now</a>
            </div>
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
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonCheckbox
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
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonCheckbox
  },
  setup() {
    return {
      mailOutline,
      lockClosedOutline,
      alertCircle,
      close
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      isLoading: false,
      rememberMe: false
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
        this.emailError = 'Please enter a valid email address';
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
          rememberMe: this.rememberMe
        };
        
        const response = await this.USER_LOGIN(payload);
        const roleId = response.role?.[0];
        
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
  }
});
</script>

<style scoped>
:root {
  --primary-color: #00A67E;
  --primary-light: #00C49A;
  --primary-dark: #008F6B;
  --background-color: #F5F7FA;
  --card-background: #ffffff;
  --text-color: #2D3748;
  --error-color: #E53E3E;
  --gray-light: #A0AEC0;
}

.login-background {
  --background: var(--background-color);
  background: linear-gradient(145deg, #F5F7FA 0%, #E4E7EB 100%);
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  
}

/* Logo Styles */
.logo-container {
  margin-bottom: 2.5rem;
  text-align: center;
}

.logo-image {
  width: 150px;
  height: auto;
  margin-left: 110px; /* Pushes the image to the right in a flex container */
}


/* Card Styles */
.login-card {
  width: 100%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: var(--card-background);
  overflow: hidden;
}

ion-card-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

ion-card-title {
  font-size: 1.8rem;
  color: var(--text-color);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

ion-card-subtitle {
  color: var(--gray-light);
  font-size: 1.1rem;
}

/* Form Styles */
.login-form {
  padding: 1rem 2rem 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--gray-light);
  font-size: 1.25rem;
}

ion-input {
  --padding-start: 3rem !important;
  --padding-end: 1rem !important;
  --padding-top: 1rem !important;
  --padding-bottom: 1rem !important;
  --background: #F7FAFC;
  --color: var(--text-color);
  margin: 0;
  border-radius: 10px;
  font-size: 1rem;
}

.input-wrapper ion-input.invalid {
  --background: #FFF5F5;
  border: 1px solid var(--error-color);
}

.error-text {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Form Footer */
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.forgot-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Button Styles */
.login-button {
  --background: var(--primary-color);
  --background-hover: var(--primary-dark);
  --color: white;
  height: 48px;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1rem 0;
  --border-radius: 10px;
}

.login-button:disabled {
  --background: var(--gray-light);
}

/* Error Alert */
.error-alert {
  display: flex;
  align-items: center;
  background-color: #FFF5F5;
  color: var(--error-color);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 450px;
}

.error-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.close-error {
  background: none;
  border: none;
  color: var(--error-color);
  margin-left: auto;
  padding: 0.5rem;
  cursor: pointer;
}

/* Signup Link */
.signup-link {
  text-align: center;
  margin-top: 2rem;
  color: var(--gray-light);
  font-size: 0.95rem;
}

.signup-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Styles */
@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .logo-image {
    width: 150px;
  }
  
  .login-card {
    box-shadow: none;
  }
  
  .login-form {
    padding: 1rem;
  }
}
</style>