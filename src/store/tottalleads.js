import axios from 'axios';

export default {
  namespaced: true,

  state: {
    totalLeads: [], // Updated from leadCancelledList to totalLeads
    isLoading: false,
    errorMessage: null,
  },

  mutations: {
    SET_TOTAL_LEADS(state, list) { // Updated mutation name
      state.totalLeads = list;
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },

  actions: {
    async fetchTotalLeads({ commit }) { // Updated action name
      console.log("Action 'fetchTotalLeads' started");

      // Set loading state and clear error message
      console.log("Setting loading state to 'true'");
      commit('SET_IS_LOADING', true);

      console.log("Clearing any previous error messages");
      commit('SET_ERROR_MESSAGE', null);

      try {
        console.log("Retrieving authentication data from localStorage");
        const authData = JSON.parse(localStorage.getItem('user') || '{}');

        if (!authData.access_token) {
          console.log("No access token found, throwing authentication error");
          throw new Error('Authentication required');
        }

        console.log("Making GET request to fetch total leads");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lead/read`,
          {
            headers: { Authorization: `Bearer ${authData.access_token}` }
          }
        );

        console.log("Total leads data retrieved successfully", data);
        console.log("Committing 'SET_TOTAL_LEADS' mutation");
        commit('SET_TOTAL_LEADS', data);

      } catch (error) {
        console.error("An error occurred while fetching leads:", error.message);
        commit('SET_ERROR_MESSAGE', error.message);
      } finally {
        console.log("Setting loading state to 'false'");
        commit('SET_IS_LOADING', false);
        console.log("Action 'fetchTotalLeads' completed");
      }
    },
  },

  getters: {
    totalLeads: state => state.totalLeads, // Updated getter name
    isLoading: state => state.isLoading,
    errorMessage: state => state.errorMessage,
  },
};
