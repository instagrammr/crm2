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
      totalDocumentStatusList: [],
      totalLeadListId: [],
      totaldocumentList: [],
      totalstudentListId: [],
      totalfollowupListId: [],
      totalregisteredListId: [],
      totalremarkListId: [],
      totaldropedListId: [],
      totaltodayListId: [],
      totalStatusList: [],
      totalleadDayMonthListId: [],
    }),
    mutations: {
      SET_DOCUMENTSTATUS_LIST(state, payload) {
        state.totalDocumentStatusList = payload;
      },
      SET_TOTALLEADDAYMONTH_LISTID(state, data) {
        state.totalleadDayMonthListId = data;
      },
      SET_TOTALREMARKLIST_ID(state, data) {
        state.totalremarkListId = data;
      },
      SET_STUDENT_LISTID(state, data) {
        state.totalstudentListId = data;
      },
      SET_STATUS_LIST(state, payload) {
        state.totalStatusList = payload;
      },
      SET_TOTALTODAY_LISTID(state, data) {
        state.totaltodayListId = data;
      },
      SET_TOTALLEAD_LISTID(state, data) {
        state.totalLeadListId = data;
      },
      SET_DOCUMENT_LIST(state, payload) {
        state.totaldocumentList = payload;
      },
      SET_TOTALFOLLOWUP_LISTID(state, data) {
        state.totalfollowupListId = data;
      },
      SET_TOTALREGISTERED_LISTID(state, data) {
        state.totalregisteredListId = data;
      },
      SET_TOTALDROPED_LISTID(state, data) {
        state.totaldropedListId = data;
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
      async fetchtotalDocuumentstatuslist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}document_status/read`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_DOCUMENTSTATUS_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      async fetchtotalconvertedLeadCount({ commit }, documentAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_converted/count/${documentAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   userId,
            // },
          });
          // console.log("Response from API:", response.data);
          commit('SET_TOTALCONVERTEDLEAD_COUNT', response.data.totaldocumentconvertedLeadCount);
          return response.totaldocumentconvertedLeadCount;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalLeadDayMonthlistId({ commit }, documentAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_filter/count/${documentAssignId}`, {
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
      async fetchtotaltodayLeadCount({ commit }, documentAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_today/count/${documentAssignId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   userId,
            // },
          });
          // console.log("Response from API:", response.data);
          commit('SET_TOTALTODAYLEAD_COUNT', response.data.TodayDocumentLeadCount);
          return response.TodayDocumentLeadCount;
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
      async fetchtotalstudentlistId({commit}, userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_status/list/${userId}`, {
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
      async fetchtotalstatuslist(context) {
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
          context.commit('SET_STATUS_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      async fetchtotaltodaylistId({commit}, documentAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_today/${documentAssignId}`, {
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
      async fetchtotalleadCount({ commit}, documentAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_document/count/${documentAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALLEAD_COUNT', response.data.TotaldocumentLeadCount);
            return response.TotaldocumentLeadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalfollowupCount({ commit}, documentAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_document_followup/count/${documentAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALFOLLOWUP_COUNT', response.data.Totalfollowup_documentCount);
            return response.Totalfollowup_documentCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalregisteredCount({ commit}, documentAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_document_registerd/count/${documentAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALREGISTERED_COUNT', response.data.Totalsubmit_documentCount);
            return response.Totalsubmit_documentCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotaldropedCount({ commit}, documentAssignId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_document_dropped/count/${documentAssignId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALDROPED_COUNT', response.data.Totaldropped_documentCount);
            return response.Totaldropped_documentCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalLeadlistId({commit}, documentAssignId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document/list/${documentAssignId}`, {
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
      async fetchtotalfollowuplistId({commit}, documentAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_followup/list/${documentAssignId}`, {
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
      async fetchtotalregisteredlistId({commit}, documentAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_registered/list/${documentAssignId}`, {
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
      async fetchtotaldropedlistId({commit}, documentAssignId,) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_document_droped/list/${documentAssignId}`, {
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
      async fetchtotaldocumentlist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}document/read`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_DOCUMENT_LIST', leads);
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
