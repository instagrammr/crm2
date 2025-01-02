import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
    namespaced: true,
    state: () => ({
      totalLeadCount: 0,
      totalFollowupCount: 0,
      totalRegisteredCount: 0,
      totalDropedCount: 0,
      totaltodayLeadCount: 0,
      totalconvertedLeadCount: 0,
      totalLeadListId: [],
      totalapplicationList: [],
      totalstatusList: [],
      totalfollowupListId: [],
      totalregisterdListId: [],
      totaldropedListId: [],
      totalstudentListId: [],
      totalstatusListId: [],
      totaltodayListId: [],
      totalpriorityList: [],
      totalremarkListId: [],
      totalleadDayMonthListId: [],
    }),
    mutations: {
      SET_TOTALLEADDAYMONTH_LISTID(state, data) {
        state.totalleadDayMonthListId = data;
      },
      SET_TOTALREMARKLIST_ID(state, data) {
        state.totalremarkListId = data;
      },
      SET_STUDENT_LISTID(state, data) {
        state.totalstudentListId = data;
      },
      SET_PRIORITY_LIST(state, payload) {
        state.totalpriorityList = payload;
      },
      SET_TOTALTODAY_LISTID(state, data) {
        state.totaltodayListId = data;
      },
      SET_TOTALLEAD_LISTID(state, data) {
        state.totalLeadListId = data;
      },
      SET_APPLICATION_LIST(state, payload) {
        state.totalapplicationList = payload;
      },
      SET_STATUS_LIST(state, payload) {
        state.totalstatusList = payload;
      },
      SET_TOTALFOLLOWUP_LISTID(state, data) {
        state.totalfollowupListId = data;
      },
      SET_TOTALREGISTERED_LISTID(state, data) {
        state.totalregisterdListId = data;
      },
      SET_TOTALDROPED_LISTID(state, data) {
        state.totaldropedListId = data;
      },
      SET_STATUS_LISTID(state, data) {
        state.totalstatusListId = data;
      },
      SET_TOTALCONVERTEDLEAD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalconvertedLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALTODAYLEAD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totaltodayLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALLEAD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALFOLLOWUP_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalFollowupCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALREGISTERED_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalRegisteredCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALDROPED_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalDropedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
    },
    actions: {
      async fetchtotalconvertedLeadCount({ commit }, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_converted/count/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   userId,
            // },
          });
          // console.log("Response from API:", response.data);
          commit('SET_TOTALCONVERTEDLEAD_COUNT', response.data.totalapplicationconvertedLeadCount);
          return response.totalapplicationconvertedLeadCount;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalLeadDayMonthlistId({ commit }, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_filter/count/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALLEADDAYMONTH_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotaltodayLeadCount({ commit }, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_today/count/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   userId,
            // },
          });
          // console.log("Response from API:", response.data);
          commit('SET_TOTALTODAYLEAD_COUNT', response.data.TodayApplicationLeadCount);
          return response.TodayApplicationLeadCount;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalremarkListId({ commit }, leadId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}remark/list/${leadId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALREMARKLIST_ID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalstudentlistId({commit}, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_status/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_STUDENT_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalprioritylist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}priority/read`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_PRIORITY_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      async fetchtotaltodaylistId({commit}, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_today/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALTODAY_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalleadCount({ commit}, applicationAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_application/count/${applicationAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALLEAD_COUNT', response.data.TotalapplicationLeadCount);
            return response.TotalapplicationLeadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalfollowupCount({ commit}, applicationAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_application_followup/count/${applicationAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALFOLLOWUP_COUNT', response.data.Totalfollowup_applicationCount);
            return response.Totalfollowup_applicationCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalregisteredCount({ commit}, applicationAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_application_registered/count/${applicationAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALREGISTERED_COUNT', response.data.Totalsubmit_applicationCount);
            return response.Totalsubmit_applicationCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotaldropedCount({ commit}, applicationAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_application_dropped/count/${applicationAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALDROPED_COUNT', response.data.Totaldroped_applicationCount);
            return response.Totaldroped_applicationCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalLeadlistId({commit}, applicationAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALLEAD_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalfollowuplistId({commit}, applicationAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_followup/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); 
          const leads = response.data;
          commit('SET_TOTALFOLLOWUP_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalregisteredlistId({commit}, applicationAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_registered/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALREGISTERED_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotaldropedlistId({commit}, applicationAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_application_dropped/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALDROPED_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalstatuslistId({commit}, applicationAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_status/list/${applicationAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_STATUS_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async update_lead({ commit }, data) {
        try {
              const auth = JSON.parse(localStorage.getItem('user'))
              const lead = await axios({
                method: 'put',
                url: `${import.meta.env.VITE_API_BASE_URL}lead/update/${data.id}`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                },
                data: data
        })
        // console.log('API response:', lead);
        return lead.data;
        } catch (error) {
          console.error('Error updating leads:', error);
          console.error('API response:', error.response);
          console.error('Full error object:', error);
          throw error;
        }
        
      },
      async fetchtotalapplicationlist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}application/read`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_APPLICATION_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      async fetchtotalstatuslist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}student_status/read`, {
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
      async delete_leads({ commit, state }, data) {
        const auth = JSON.parse(localStorage.getItem('user'))
        const project = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_API_BASE_URL}lead/delete/${data.id}`,
            headers: {
                Authorization: 'Bearer ' + auth.access_token
            }

        })
        console.log(project);
      },
      async Add_remark({ commit, state }, data) {
        const auth = JSON.parse(localStorage.getItem('user'))
        const response = await axios({
          method: 'post',
          data: data,
          url: `${import.meta.env.VITE_API_BASE_URL}remark/Create`,
          headers: {
            Authorization: 'Bearer ' + auth.access_token
          }
        })
        console.log(response);
      },
      async update_remark({ commit }, data) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'))
          const lead = await axios({
            method: 'put',
            url: `${import.meta.env.VITE_API_BASE_URL}remark/update/${data.id}`,
            headers: {
              Authorization: 'Bearer ' + auth.access_token
            },
            data: data
          })
          // console.log('API response:', lead);
          return lead.data;
        } catch (error) {
          console.error('Error updating leads:', error);
          console.error('API response:', error.response);
          console.error('Full error object:', error);
          throw error;
        }
  
      },
      async delete_remark({ commit, state }, data) {
        const auth = JSON.parse(localStorage.getItem('user'))
        const project = await axios({
          method: 'delete',
          url: `${import.meta.env.VITE_API_BASE_URL}remark/delete/${data.id}`,
          headers: {
            Authorization: 'Bearer ' + auth.access_token
          }
  
        })
        console.log("Remark deleted successfully:", project);
      },
    },
    
}        
