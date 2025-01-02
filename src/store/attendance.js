import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
    namespaced: true,
    state: () => ({
      totalPresentCount: 0,
      totalAbsentCount: 0,
      totalcurrentAbsentCount: 0,
      totalcurrentPresentCount: 0,
      totalcurrentLateCount: 0,
      totalAttendaceListId: [],
      totalAttendaceList: [],
    }),
    mutations: {
      SET_TOTALATTENDANCE_LIST(state, payload) {
        state.totalAttendaceList = payload;
      },
      SET_TOTALATTENDANCE_LISTID(state, data) {
        state.totalAttendaceListId = data;
      },
      SET_TOTALPRESENT_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalPresentCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALABSENT_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalAbsentCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALCURRENTABSENT_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalcurrentAbsentCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALCURRENTPRESENT_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalcurrentPresentCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALCURRENTLATE_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalcurrentLateCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
    },
    actions: {
      async fetchtotalattendancelist(context) {
        try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}attendance/list`, {
            headers: {
            Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
        });
        console.log("Response from API:", response.data); // Log the response
        const leads = response.data.rows;
        context.commit('SET_TOTALATTENDANCE_LIST', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
        } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
        }
      },
      async fetchtotalPresentCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}attendance_present/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALPRESENT_COUNT', response.data.TotalattendancePresentCount);
            return response.TotalattendancePresentCount;
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            throw error;
          }
      },
      async fetchtotalAbsentCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}attendance_absent/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALABSENT_COUNT', response.data.TotalattendanceAbsenceCount);
            return response.TotalattendanceAbsenceCount;
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            throw error;
          }
      },
      async fetchtotalCurrentAbsentCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}attendance_absent_current/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALCURRENTABSENT_COUNT', response.data.TotalattattendanceCurrentMonthAbsenceCount);
            return response.TotalattattendanceCurrentMonthAbsenceCount;
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            throw error;
          }
      },
      async fetchtotalCurrentPresentCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}attendance_present_current/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALCURRENTPRESENT_COUNT', response.data.TotalattendanceCurrentMonthPresentCount);
            return response.TotalattendanceCurrentMonthPresentCount;
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            throw error;
          }
      },
      async fetchtotalCurrentLateCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}attendance_late_current/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALCURRENTLATE_COUNT', response.data.TotalattattendanceCurrentMonthLateCount);
            return response.TotalattattendanceCurrentMonthLateCount;
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            throw error;
          }
      },
      async fetchtotalAttendancelistId({commit},  userId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}attendance_user/list/${userId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
        //   console.log("Response from API:", response.data); // Log the response
          commit('SET_TOTALATTENDANCE_LISTID', response.data);
          return response.data;
          // console.log("Extracted leads array:", leads); // Log the leads array
        } catch (error) {
          console.error('Error fetching attendance data:', error);
          throw error;
        }
      },
    },
    
}        
