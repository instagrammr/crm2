import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    followupList: [],
    isLoading: false,
    errorMessage: null,
  },

  mutations: {
    SET_FOLLOWUP_LIST(state, list) {
      state.followupList = list;
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },

  actions: {
    async fetchLeadFollowups({ commit }) {
      commit('SET_IS_LOADING', true);
      commit('SET_ERROR_MESSAGE', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lead_followup/list`,
          {
            headers: { Authorization: `Bearer ${authData.access_token}` }
          }
        );

        commit('SET_FOLLOWUP_LIST', data);
      } catch (error) {
        commit('SET_ERROR_MESSAGE', error.message);
      } finally {
        commit('SET_IS_LOADING', false);
      }
    },
  },

  getters: {
    followupList: state => state.followupList,
    isLoading: state => state.isLoading,
    errorMessage: state => state.errorMessage,
  },
};