// store/modules/auth.js
import axios from 'axios';

const auth = {
  namespaced: true,
  
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    logoutLoading: false,
    logoutError: null,
    attendanceId: null
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    SET_LOGOUT_LOADING(state, loading) {
      state.logoutLoading = loading;
    },
    SET_LOGOUT_ERROR(state, error) {
      state.logoutError = error;
    },
    SET_ATTENDANCE_ID(state, id) {
      state.attendanceId = id;
    },
    CLEAR_STATE(state) {
      state.user = null;
      state.logoutError = null;
      state.attendanceId = null;
    }
  },

  actions: {
    async logout({ commit, state }) {
      commit('SET_LOGOUT_LOADING', true);
      commit('SET_LOGOUT_ERROR', null);

      try {
        if (!state.user?.access_token) {
          throw new Error('No authentication token found');
        }

        // Make the logout API call
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/log_out`,
          {
            headers: {
              Authorization: `Bearer ${state.user.access_token}`
            }
          }
        );

        // Clear all auth related data
        commit('SET_USER', null);
        commit('CLEAR_STATE');
        
        // Remove other stored data if any
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_LOGOUT_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOGOUT_LOADING', false);
      }
    }
  },

  getters: {
    isAuthenticated: state => !!state.user,
    logoutLoading: state => state.logoutLoading,
    logoutError: state => state.logoutError,
    currentUser: state => state.user
  }
};

export default auth;