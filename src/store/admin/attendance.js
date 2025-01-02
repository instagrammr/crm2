import axios from 'axios';

export default {
  namespaced: true,
  state: {
    attendanceList: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_ATTENDANCE_LIST(state, data) {
      state.attendanceList = Array.isArray(data?.data) ? data.data : [];
    },
    SET_LOADING(state, loading) {
      state.loading = !!loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async FETCH_ATTENDANCE_LIST({ commit }) {
      try {
        commit('SET_LOADING', true);
        const auth = localStorage.getItem('user');
        const authData = auth ? JSON.parse(auth) : null;

        if (!authData?.access_token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/attendance/list`,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`
            }
          }
        );

        commit('SET_ATTENDANCE_LIST', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    attendanceList: state => state.attendanceList,
    loading: state => state.loading,
    error: state => state.error
  }
};