import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
    namespaced: true,
    state: () => ({
      totalstatusList: [],
      totaldayList: [],
      totalLeaveListId: [],
      totalapproverListId: [],
    }),
    mutations: {
      SET_STATUS_LIST(state, payload) {
        state.totalstatusList = payload;
      },
      SET_DAY_LIST(state, payload) {
        state.totaldayList = payload;
      },
      SET_TOTALLEAVE_LISTID(state, data) {
        state.totalLeaveListId = data;
      },
      SET_TOTALAPPROVER_LISTID(state, data) {
        state.totalapproverListId = data;
      },
    },
    actions: {
        async ADD_LEAVE({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'post',
                data: data,
                url: `${import.meta.env.VITE_API_BASE_URL}leave/Create`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            })
            console.log(project);
        },
        async update_leave({ commit }, data) {
            try {
                  const auth = JSON.parse(localStorage.getItem('user'))
                  const lead = await axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_API_BASE_URL}leave/update/${data.id}`,
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token
                    },
                    data: data
            })
            // console.log('API response:', lead);
            return lead.data;
            } catch (error) {
              console.error('Error updating:', error);
              console.error('API response:', error.response);
              console.error('Full error object:', error);
              throw error;
            }
            
          },
        async fetchtotalLeavelistId({commit}, userId) {
            try {
              const auth = JSON.parse(localStorage.getItem('user'));
              // console.log(auth);
              const response = await axios.get(`${baseURL}leave/list/${userId}`, {
                headers: {
                  Authorization: 'Bearer ' + auth.access_token,
                },
                // params: {
                //   id,
                // },
              });
              // console.log("Response from API:", response.data); // Log the response
              const leads = response.data;
              commit('SET_TOTALLEAVE_LISTID', leads);
              // console.log("Extracted leads array:", leads); // Log the leads array
              return leads;
            } catch (error) {
              console.error('Error fetching leave data:', error);
              throw error;
            }
          },
          async fetchtotalapproverlistId({commit}, userId) {
            try {
              const auth = JSON.parse(localStorage.getItem('user'));
              // console.log(auth);
              const response = await axios.get(`${baseURL}leave/read/${userId}`, {
                headers: {
                  Authorization: 'Bearer ' + auth.access_token,
                },
                // params: {
                //   id,
                // },
              });
              console.log("Response from API:", response.data); // Log the response
              const leads = response.data;
              commit('SET_TOTALAPPROVER_LISTID', leads);
              // console.log("Extracted leads array:", leads); // Log the leads array
              return leads;
            } catch (error) {
              console.error('Error fetching leave data:', error);
              throw error;
            }
          },
        async fetchtotalstatuslist(context) {
            try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}request_status/read`, {
                headers: {
                Authorization: 'Bearer ' + auth.access_token,
                },
                // params: {
                //   id,
                // },
            });
            // console.log("Response from API:", response.data); // Log the response
            const leads = response.data.data;
            context.commit('SET_STATUS_LIST', leads);
            // console.log("Extracted leads array:", leads); // Log the leads array
            return leads;
            } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
            }
        },
        async fetchtotaldaylist(context) {
          try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}leaveday_status/read`, {
              headers: {
              Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   id,
              // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_DAY_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
          } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
          }
        },
        async delete_leave({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_BASE_URL}leave/delete/${data.id}`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }

            })
            console.log(project);
        },
    },
    
}        
