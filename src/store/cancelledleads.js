import axios from 'axios';

export default {
  namespaced: true,

  state: {
    leadCancelledList: [],
    isLoading: false,
    errorMessage: null,
  },

  mutations: {
    SET_LEAD_CANCELLED_LIST(state, list) {
      state.leadCancelledList = list;
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
  },

  actions: {
    async fetchLeadCancelled({ commit }) {
      console.log("Action 'fetchLeadCancelled' started");

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

        console.log("Making GET request to fetch cancelled leads");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lead_cancelled/list`,
          {
            headers: { Authorization: `Bearer ${authData.access_token}` }
          }
        );

        console.log("Cancelled leads data retrieved successfully", data);
        console.log("Committing 'SET_LEAD_CANCELLED_LIST' mutation");
        commit('SET_LEAD_CANCELLED_LIST', data);

      } catch (error) {
        console.error("An error occurred while fetching leads:", error.message);
        commit('SET_ERROR_MESSAGE', error.message);
      } finally {
        console.log("Setting loading state to 'false'");
        commit('SET_IS_LOADING', false);
        console.log("Action 'fetchLeadCancelled' completed");
      }
    },
  },

  getters: {
    leadCancelledList: state => state.leadCancelledList,
    isLoading: state => state.isLoading,
    errorMessage: state => state.errorMessage,
  },
};
