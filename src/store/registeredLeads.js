import axios from 'axios';

export default {
  namespaced: true,
  state: {
    leads: [],        // Array to store the list of leads
    loading: false,   // Boolean for tracking loading state
    error: null,      // Stores any error messages
  },
  mutations: {
    SET_LEADS(state, leads) {
      console.log("Setting leads in state:", leads);  // Logs the leads being set
      state.leads = leads;
    },
    SET_LOADING(state, loading) {
      console.log("Setting loading state:", loading);  // Logs loading state change
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      console.log("Setting error in state:", error);  // Logs any error messages
      state.error = error;
    },
  },
  actions: {
    async getLeads({ commit }) {
      console.log("Action getLeads started");  // Logs the start of the action
      commit('SET_LOADING', true);
      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        console.log("Retrieved auth data:", authData);  // Logs auth data from localStorage

        // Checks for access token
        if (!authData.access_token) {
          throw new Error('No authentication token found');
        }

        console.log("Making API request to fetch leads");  // Logs before API request
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/lead_registered/list`,
          {
            headers: { Authorization: `Bearer ${authData.access_token}` },
          }
        );

        console.log("API response received:", data);  // Logs the API response
        commit('SET_LEADS', data);  // Commits the leads to the state
      } catch (error) {
        console.log("Error occurred:", error.message);  // Logs any errors encountered
        commit('SET_ERROR', error.message);  // Commits error to the state
      } finally {
        console.log("Finalizing action getLeads");  // Logs the end of the action
        commit('SET_LOADING', false);  // Sets loading state to false
      }
    },
  },
  getters: {
    leads: (state) => state.leads,       // Retrieves leads from state
    loading: (state) => state.loading,   // Retrieves loading status
    error: (state) => state.error,       // Retrieves any error message
  },
};
