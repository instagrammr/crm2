// store/modules/lead.js
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    leads: [],
    currentLead: null,
    counsellors: [],
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    totalLeads: 0,
    leadStatuses: []
  },

  mutations: {
    SET_LEADS(state, leads) {
      state.leads = leads;
    },
    SET_CURRENT_LEAD(state, lead) {
      state.currentLead = lead;
    },
    SET_COUNSELLORS(state, counsellors) {
      state.counsellors = counsellors;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, message) {
      state.errorMessage = message;
      state.successMessage = null;
    },
    SET_SUCCESS(state, message) {
      state.successMessage = message;
      state.errorMessage = null;
    },
    SET_TOTAL_LEADS(state, total) {
      state.totalLeads = total;
    },
    SET_LEAD_STATUSES(state, statuses) {
      state.leadStatuses = statuses;
    },
    UPDATE_LEAD_IN_LIST(state, updatedLead) {
      const index = state.leads.findIndex(lead => lead.id === updatedLead.id);
      if (index !== -1) {
        state.leads.splice(index, 1, updatedLead);
      }
    },
    REMOVE_LEAD_FROM_LIST(state, leadId) {
      state.leads = state.leads.filter(lead => lead.id !== leadId);
    }
  },

  actions: {
    // Create new lead
    async createLead({ commit }, leadData) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/Create`;
        const response = await axios.post(
          url,
          {
            date: leadData.date,
            student_name: leadData.student_name,
            mobile: leadData.mobile,
            address: leadData.address,
            country: leadData.country,
            lead_source: leadData.lead_source,
            mark_tenth: leadData.mark_tenth,
            mark_twelth: leadData.mark_twelth,
            mark_degree: leadData.mark_degree,
            mark_pg: leadData.mark_pg,
            mark_ielts: leadData.mark_ielts,
            experience_year: leadData.experience_year,
            experience_field: leadData.experience_field,
            userId: leadData.userId,
            leadStatusId: leadData.leadStatusId,
            roleId: leadData.roleId
          },
          {
            headers: { Authorization: `Bearer ${authData.access_token}` }
          }
        );

        commit('SET_SUCCESS', 'Lead created successfully');
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Fetch leads with pagination
    async fetchLeads({ commit }, { page = 1, limit = 10, searchQuery = '' }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/list`;
        const response = await axios.get(url, {
          params: { page, limit, search: searchQuery },
          headers: { Authorization: `Bearer ${authData.access_token}` }
        });

        commit('SET_LEADS', response.data.leads);
        commit('SET_TOTAL_LEADS', response.data.total);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Update lead
    async updateLead({ commit }, { leadId, leadData }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/update/${leadId}`;
        const response = await axios.put(
          url,
          leadData,
          {
            headers: { Authorization: `Bearer ${authData.access_token}` }
          }
        );

        commit('UPDATE_LEAD_IN_LIST', response.data);
        commit('SET_SUCCESS', 'Lead updated successfully');
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Delete lead
    async deleteLead({ commit }, leadId) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/delete/${leadId}`;
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${authData.access_token}` }
        });

        commit('REMOVE_LEAD_FROM_LIST', leadId);
        commit('SET_SUCCESS', 'Lead deleted successfully');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Fetch single lead
    async fetchLead({ commit }, leadId) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/${leadId}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${authData.access_token}` }
        });

        commit('SET_CURRENT_LEAD', response.data);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // Fetch counsellor list
   // store/modules/lead.js
async fetchCounsellorList({ commit }) {
  console.log('1. Starting fetchCounsellorList action');
  commit('SET_LOADING', true);
  commit('SET_ERROR', null);
  
  console.log('2. Loading state set to true, error cleared');
  
  try {
    console.log('3. Retrieving auth data from localStorage');
    const authData = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('4. Retrieved auth data:', {
      hasToken: !!authData.access_token,
      tokenLength: authData.access_token ? authData.access_token.length : 0
    });

    if (!authData.access_token) {
      console.error('5. No access token found');
      throw new Error('Authentication required');
    }

    const url = `${import.meta.env.VITE_API_BASE_URL}/user/counsiller_list`;
    console.log('6. Making API request to:', url);

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${authData.access_token}` }
    });
    
    console.log('7. API response received:', {
      status: response.status,
      dataLength: response.data ? response.data.length : 0
    });

    commit('SET_COUNSELLORS', response.data);
    console.log('8. Counsellors data committed to store');

    return response.data;
  } catch (error) {
    console.error('ERROR occurred in fetchCounsellorList:', {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status
    });

    const errorMessage = error.response?.data?.message || error.message;
    commit('SET_ERROR', errorMessage);
    throw error;
  } finally {
    console.log('9. Cleaning up - setting loading state to false');
    commit('SET_LOADING', false);
  }
},

    // Fetch lead statuses
    async fetchLeadStatuses({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const authData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authData.access_token) {
          throw new Error('Authentication required');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/lead/statuses`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${authData.access_token}` }
        });

        commit('SET_LEAD_STATUSES', response.data);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        commit('SET_ERROR', errorMessage);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    isLoading: state => state.isLoading,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage,
    leads: state => state.leads,
    currentLead: state => state.currentLead,
    counsellors: state => state.counsellors,
    totalLeads: state => state.totalLeads,
    leadStatuses: state => state.leadStatuses,
    
    // Get lead by ID
    getLeadById: state => id => {
      return state.leads.find(lead => lead.id === id);
    },

    // Get filtered leads
    getFilteredLeads: state => (searchTerm = '') => {
      if (!searchTerm) return state.leads;
      searchTerm = searchTerm.toLowerCase();
      return state.leads.filter(lead => 
        lead.student_name.toLowerCase().includes(searchTerm) ||
        lead.mobile.includes(searchTerm) ||
        lead.country.toLowerCase().includes(searchTerm)
      );
    }
  }
};