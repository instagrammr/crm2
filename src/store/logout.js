import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    logoutLoading: false,
    logoutError: null
  },
  
  mutations: {
    SET_LOGOUT_LOADING(state, loading) {
      state.logoutLoading = loading;
    },
    
    SET_LOGOUT_ERROR(state, error) {
      state.logoutError = error;
    }
  },
  
  actions: {
    async LOGOUT({ commit }) {
      console.log("Starting LOGOUT action...");
      try {
        commit('SET_LOGOUT_LOADING', true);
        
        const auth = localStorage.getItem('user');
        console.log("Retrieved auth data:", auth);
        
        const authData = auth ? JSON.parse(auth) : null;
        console.log("Parsed auth data:", authData);
        
        if (!authData?.access_token) {
          console.error("No authentication token found");
          throw new Error('No authentication token found');
        }
        
        console.log("Preparing to logout...");
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user/log_out`,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );
        
        console.log("Logout successful:", response.data);
        
        // Clear local storage
        localStorage.removeItem('user');
        
        // Optional: Clear other auth-related state in your store
        // You might want to add mutations to reset other modules' state
        
        return response.data;
      } catch (error) {
        console.error("Error during logout:", error.response?.data || error.message);
        commit('SET_LOGOUT_ERROR', error.response?.data?.message || error.message);
        throw error;
      } finally {
        commit('SET_LOGOUT_LOADING', false);
        console.log("Finished LOGOUT action");
      }
    }
  },
  
  getters: {
    logoutLoading: state => state.logoutLoading,
    logoutError: state => state.logoutError
  }
};