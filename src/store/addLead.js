import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
    namespaced: true,
    state: () => ({
      totalLeadCount: 0,
      totalAllLeadCount: 0,
      totalfollowupCount: 0,
      totalregisteredCount: 0,
      totalcancelledCount: 0,
      totalvisaProcessingCount: 0,
      totalvisaRejectedCount: 0,
      totalCounsillerAssignedCount: 0,
      totalDocumentAssignedCount: 0,
      totalApplicationAssignedCount: 0,
      totalApplicationNotProcessedLeadCount: 0,
      totalApplicationOkForProcessingLeadCount: 0,
      totalApplicationProcessedLeadCount: 0,
      totalApplicationRecievedLeadCount: 0,
      totalCaseClosedCount: 0,
      totalDocumentPendingCount: 0,
      totalConditionalOfferIssuedCount: 0,
      totalUnconditionalOfferCount: 0,
      totalCasIssuedCount: 0,
      totalCasDocWaitingEdCount: 0,
      totalInterviewResultsWaitingCount: 0,
      totalInterviewScheduledCount: 0,
      totalVisaProcessCount: 0,
      totalVisaFiledCount: 0,
      totalVisaRecievedCount: 0,
      totalCompletedCount: 0,
      totalDocumentsPendingLeadCount: 0,
      totalCompleteDocumentationRecievedLeadCount: 0,
      totalSOPCreatingLeadCount: 0,
      totalMoveToApplicationLeadCount: 0,
      totaldaymonthleadId: [],
      totalLeadListId: [],
      totalLeadList: [],
      totalfollowupListId: [],
      totalcancelledListId: [],
      totalregisteredListId: [],
      totaltodayListId: [],
      totalStatusList: [],
      totalleadStatusList: [],
    }),
    mutations: {
      SET_TOTALLEAD_LIST(state, data) {
        state.totalLeadList = data;
      },
      SET_STATUS_LIST(state, payload) {
        state.totalStatusList = payload;
      },
      SET_LEADSTATUS_LIST(state, payload) {
        state.totalleadStatusList = payload;
      },
      SET_TOTALMONTHDAYLEAD_ID(state, data) {
        state.totaldaymonthleadId = data;
      },
      SET_TOTALLEAD_LISTID(state, data) {
        state.totalLeadListId = data;
      },
      SET_TOTALFOLLOWUP_LISTID(state, data) {
        state.totalfollowupListId = data;
      },
      SET_TOTALREGISTERED_LISTID(state, data) {
        state.totalregisteredListId = data;
      },
      SET_TOTALCANCELLED_LISTID(state, data) {
        state.totalcancelledListId = data;
      },
      SET_TOTALTODAY_LISTID(state, data) {
        state.totaltodayListId = data;
      },
      SET_TOTALAPPLICATIONASSIGN_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalApplicationAssignedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALDOCUMENTASSIGN_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalDocumentAssignedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALCOUNSILLERASSIGN_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCounsillerAssignedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALVISAREJECTED_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalvisaRejectedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALVISAPROCESSING_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalvisaProcessingCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALALLLEAD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalAllLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALLEAD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALFOLLOWUP_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalfollowupCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALREGISTERED_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalregisteredCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALCANCELLED_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalcancelledCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSA_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalApplicationNotProcessedLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSB_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalApplicationOkForProcessingLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSC_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalApplicationProcessedLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSD_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalApplicationRecievedLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSE_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCaseClosedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSF_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalDocumentPendingCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSG_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalConditionalOfferIssuedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSH_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalUnconditionalOfferCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSI_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCasIssuedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSJ_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCasDocWaitingEdCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSK_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalInterviewResultsWaitingCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSL_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalInterviewScheduledCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSM_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalVisaProcessCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSN_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalVisaFiledCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSO_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalVisaRecievedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSP_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCompletedCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSQ_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalDocumentsPendingLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSR_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalCompleteDocumentationRecievedLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUSS_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalSOPCreatingLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
      SET_TOTALAPPLICATIONSTATUST_COUNT(state, count) {
        // console.log('State before mutation:', state.totalLeadCount);
        state.totalMoveToApplicationLeadCount = count;
        // console.log('State after mutation:', state.totalLeadCount);
      },
    },
    actions: {
      async fetchtotalApplicationNotProcessedLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalApplicationNotProcessedLeadCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSA_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalApplicationOkForProcessingLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalApplicationOkForProcessingLeadCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSB_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalApplicationProcessedLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalApplicationProcessedLeadCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSC_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalApplicationRecievedLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalApplicationRecievedLeadCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSD_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCaseClosedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalCaseClosedCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSE_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalDocumentPendingCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalDocumentPendingCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSF_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalConditionalOfferIssuedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalConditionalOfferIssuedCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSG_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalUnconditionalOfferCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalUnconditionalOfferCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSH_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCasIssuedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalCasIssuedCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSI_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCasDocWaitingEdCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalCasDocWaitingEdCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSJ_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalInterviewResultsWaitingCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalInterviewResultsWaitingCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSK_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalInterviewScheduledCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalInterviewScheduledCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSL_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalVisaProcessCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalVisaProcessCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSM_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalVisaFiledCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalVisaFiledCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSN_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalVisaRecievedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalVisaRecievedCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSO_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCompletedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalCompletedCount/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSP_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalDocumentsPendingLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalDocumentsPending/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSQ_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCompleteDocumentationRecievedLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalCompleteDocumentationRecieved/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSR_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalSOPCreatingLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalSOPCreating/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUSS_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalMoveToApplicationLeadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_totalMoveToApplication/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONSTATUST_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalleadlist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead/list`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data.rows;
          context.commit('SET_TOTALLEAD_LIST', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
      async fetchtotalleadstatuslist(context) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_status/read`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data.data;
          context.commit('SET_LEADSTATUS_LIST', leads);
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
      async fetchtotalLeadlistId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_staff/list/${userId}`, {
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
      async fetchtotalfollowuplistId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_followup/list/${userId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALFOLLOWUP_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalregisteredlistId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_registered/list/${userId}`, {
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
      async fetchtotalcancelledlistId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_cancelled/list/${userId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          // console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALCANCELLED_LISTID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotaltodaylistId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_staff_today/${userId}`, {
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
      async fetchtotalmonthdayleadId({commit},userId) {
        try {
          const auth = JSON.parse(localStorage.getItem('user'));
          // console.log(auth);
          const response = await axios.get(`${baseURL}lead_filter/count/${userId}`, {
            headers: {
              Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
          });
          console.log("Response from API:", response.data); // Log the response
          const leads = response.data;
          commit('SET_TOTALMONTHDAYLEAD_ID', leads);
          // console.log("Extracted leads array:", leads); // Log the leads array
          return leads;
        } catch (error) {
          console.error('Error fetching lead data:', error);
          throw error;
        }
      },
      async fetchtotalAllleadCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALALLLEAD_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalVisaprocessingCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_processing/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALVISAPROCESSING_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalVisaRejectedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_rejected/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALVISAREJECTED_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalCounsillerAssignedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_counsillerA/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALCOUNSILLERASSIGN_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalDocumentAssignedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_documentA/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALDOCUMENTASSIGN_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalApplicationAssignedCount({ commit}) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_applicationA/count`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALAPPLICATIONASSIGN_COUNT', response.data.Total_leadCount);
            return response.Total_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalleadCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_staff/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALLEAD_COUNT', response.data.Totalstaff_leadCount);
            return response.Totalstaff_leadCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalfollowupCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_followup/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALFOLLOWUP_COUNT', response.data.TotalfollowupCount);
            return response.TotalfollowupCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalregisteredCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_registered/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALREGISTERED_COUNT', response.data.TotalregisteredCount);
            return response.TotalregisteredCount;
          } catch (error) {
            console.error('Error fetching lead data:', error);
            throw error;
          }
      },
      async fetchtotalcancelledCount({ commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}lead_cancelled/count/${userId}`, {
              headers: {
                Authorization: 'Bearer ' + auth.access_token,
              },
              // params: {
              //   userId,
              // },
            });
            // console.log("Response from API:", response.data);
            commit('SET_TOTALCANCELLED_COUNT', response.data.TotalCancelledCount);
            return response.TotalCancelledCount;
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
      async Add_lead({ commit, state }, data) {
        const auth = JSON.parse(localStorage.getItem('user'))
        const project = await axios({
            method: 'post',
            data: data,
            url: `${import.meta.env.VITE_API_BASE_URL}lead/Create`,
            headers: {
                Authorization: 'Bearer ' + auth.access_token
            }
        })
        console.log(project);
        },
    },
    
}        
