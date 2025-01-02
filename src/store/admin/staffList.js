import axios from 'axios';

export default {
  namespaced: true,
  
  state: {
    staffList: [],
    loading: false,
    error: null
  },
  
  mutations: {
    SET_STAFF_LIST(state, data) {
      state.staffList = Array.isArray(data?.data) ? data.data : [];
    },
    
    SET_LOADING(state, loading) {
      state.loading = !!loading;
    },
    
    SET_ERROR(state, error) {
      state.error = error;
    },
    
    ADD_STAFF(state, staff) {
      state.staffList.push(staff);
    },
    
    REMOVE_STAFF(state, staffId) {
      state.staffList = state.staffList.filter(staff => staff.id !== staffId);
    },

    // Add new mutation for update
    UPDATE_STAFF(state, updatedStaff) {
      const index = state.staffList.findIndex(staff => staff.id === updatedStaff.id);
      if (index !== -1) {
        state.staffList.splice(index, 1, updatedStaff);
      }
    }
  },
  
  actions: {
    async FETCH_STAFF_LIST({ commit }) {
      try {
        commit('SET_LOADING', true);
        const auth = localStorage.getItem('user');
        const authData = auth ? JSON.parse(auth) : null;
        
        if (!authData?.access_token) {
          throw new Error('No authentication token found');
        }
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user/staff_list`,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );
        
        commit('SET_STAFF_LIST', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async CREATE_STAFF({ commit }, staffData) {
      console.log("Starting CREATE_STAFF action...");
      try {
        commit('SET_LOADING', true);
        
        const auth = localStorage.getItem('user');
        console.log("Retrieved auth data:", auth);
        
        const authData = auth ? JSON.parse(auth) : null;
        console.log("Parsed auth data:", authData);
        
        if (!authData?.access_token) {
          console.error("No authentication token found");
          throw new Error('No authentication token found');
        }
        
        console.log("Preparing to send staffData:", staffData);
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}user/sign_up`,
          staffData,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );
        
        console.log("Staff created successfully:", response.data);
        
        commit('ADD_STAFF', response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating staff:", error.response?.data || error.message);
        commit('SET_ERROR', error.response?.data?.message || error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
        console.log("Finished CREATE_STAFF action");
      }
    },

    async DELETE_STAFF({ commit }, staffId) {
      console.log("Starting DELETE_STAFF action...");
      try {
        commit('SET_LOADING', true);
        
        const auth = localStorage.getItem('user');
        console.log("Retrieved auth data:", auth);
        
        const authData = auth ? JSON.parse(auth) : null;
        console.log("Parsed auth data:", authData);
        
        if (!authData?.access_token) {
          console.error("No authentication token found");
          throw new Error('No authentication token found');
        }
        
        console.log("Preparing to delete staff with ID:", staffId);
        
        const response = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}user/delete/${staffId}`,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );
        
        console.log("Staff deleted successfully:", response.data);
        
        commit('REMOVE_STAFF', staffId);
        return response.data;
      } catch (error) {
        console.error("Error deleting staff:", error.response?.data || error.message);
        commit('SET_ERROR', error.response?.data?.message || error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
        console.log("Finished DELETE_STAFF action");
      }
    },

    // Add new action for update
    async UPDATE_STAFF({ commit }, { staffId, updateData }) {
      console.log("Starting UPDATE_STAFF action...");
      try {
        commit('SET_LOADING', true);
        
        const auth = localStorage.getItem('user');
        console.log("Retrieved auth data:", auth);
        
        const authData = auth ? JSON.parse(auth) : null;
        console.log("Parsed auth data:", authData);
        
        if (!authData?.access_token) {
          console.error("No authentication token found");
          throw new Error('No authentication token found');
        }
        
        console.log("Preparing to update staff with ID:", staffId);
        console.log("Update data:", updateData);
        
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}user/update/${staffId}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );
        
        console.log("Staff updated successfully:", response.data);
        
        commit('UPDATE_STAFF', response.data);
        return response.data;
      } catch (error) {
        console.error("Error updating staff:", error.response?.data || error.message);
        commit('SET_ERROR', error.response?.data?.message || error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
        console.log("Finished UPDATE_STAFF action");
      }
    }
  },
  
  getters: {
    staffList: state => state.staffList,
    loading: state => state.loading,
    error: state => state.error
  }
};