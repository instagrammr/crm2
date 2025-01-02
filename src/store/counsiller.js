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
    totalstudentListId: [],
    totalcounsillerList: [],
    totalfollowupListId: [],
    totalregisteredListId: [],
    totaldropedListId: [],
    totaluploadListId: [],
    totalStatusList: [],
    totaltodayListId: [],
    totalremarkListId: [],
    totalRegisteredFilterListId: [],
    totalFollowupFilterListId: [],
    totalleadDayMonthListId: [],
    totalleadDocumentAssignId: [],
  }),
  mutations: {
    SET_DOCUMENTSTATUS_LIST(state, payload) {
      state.totalDocumentStatusList = payload;
    },
    SET_TOTALREMARKLIST_ID(state, data) {
      state.totalremarkListId = data;
    },
    SET_TOTALLEADDOCUMENTASSIGN_ID(state, data) {
      state.totalleadDocumentAssignId = data;
    },
    SET_TOTALLEADDAYMONTH_LISTID(state, data) {
      state.totalleadDayMonthListId = data;
    },
    SET_TOTALFOLLOWUPFILTER_LISTID(state, data) {
      state.totalFollowupFilterListId = data;
    },
    SET_TOTALREGISTEREDFILTER_LISTID(state, data) {
      state.totalRegisteredFilterListId = data;
    },
    SET_STUDENT_LISTID(state, data) {
      state.totalstudentListId = data;
    },
    SET_TOTALTODAY_LISTID(state, data) {
      state.totaltodayListId = data;
    },
    SET_STATUS_LIST(state, payload) {
      state.totalStatusList = payload;
    },
    SET_TOTALLEAD_LISTID(state, data) {
      state.totalLeadListId = data;
    },
    SET_TOTALUPLOAD_LISTID(state, data) {
      state.totaluploadListId = data;
    },
    SET_COUNSILLER_LIST(state, payload) {
      state.totalcounsillerList = payload;
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
    async fetchtotalconvertedLeadCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_converted/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALCONVERTEDLEAD_COUNT', response.data.totalcounsillerconvertedLeadCount);
        return response.totalcounsillerconvertedLeadCount;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotaltodayLeadCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_today/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALTODAYLEAD_COUNT', response.data.TodayCounsillerLeadCount);
        return response.TodayCounsillerLeadCount;
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
    async fetchtotalLeadDocumentAssignId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_documentAssign/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        console.log("Response from API:", response.data); // Log the response
        const leads = response.data;
        commit('SET_TOTALLEADDOCUMENTASSIGN_ID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalLeadDayMonthlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_filter/count/${userId}`, {
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
    async fetchtotalFollowupFilterlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_followup_filter/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        console.log("Response from API:", response.data); // Log the response
        const leads = response.data;
        commit('SET_TOTALFOLLOWUPFILTER_LISTID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalRegisteredFilterlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_register_filter/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        console.log("Response from API:", response.data); // Log the response
        const leads = response.data;
        commit('SET_TOTALREGISTEREDFILTER_LISTID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotaltodaylistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_today/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        console.log("Response from API:", response.data); // Log the response
        const leads = response.data;
        commit('SET_TOTALTODAY_LISTID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalstudentlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_status/list/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        console.log("Response from API:", response.data); // Log the response
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
    async fetchtotalleadCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALLEAD_COUNT', response.data.Totalcounsiller_leadCount);
        return response.Totalcounsiller_leadCount;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalfollowupCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_followup/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALFOLLOWUP_COUNT', response.data.Totalcounsiller_followupCount);
        return response.Totalcounsiller_followupCount;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalregisteredCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_registered/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALREGISTERED_COUNT', response.data.Totalcounsiller_registeredCount);
        return response.Totalcounsiller_registeredCount;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotaldropedCount({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_droped/count/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   userId,
          // },
        });
        // console.log("Response from API:", response.data);
        commit('SET_TOTALDROPED_COUNT', response.data.Totalcounsiller_droppedCount);
        return response.Totalcounsiller_registeredCount;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalLeadlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller/list/${userId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        // console.log("Response from API:", response.data); // Log the response
        const leads = response.data;
        commit('SET_TOTALLEAD_LISTID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching lead data:', error);
        throw error;
      }
    },
    async fetchtotalfollowuplistId({ commit }, userId,) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_followup/list/${userId}`, {
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
    async fetchtotalregisteredlistId({ commit }, userId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_registered/list/${userId}`, {
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
    async fetchtotaldropedlistId({ commit }, userId,) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}lead_counsiller_droped/list/${userId}`, {
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
    async fetchtotalcounsillerlist(context) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'));
        // console.log(auth);
        const response = await axios.get(`${baseURL}counsiller/read`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        // console.log("Response from API:", response.data); // Log the response
        const leads = response.data.data;
        context.commit('SET_COUNSILLER_LIST', leads);
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
    async delete_passport({ commit, state }, data) {
      const auth = JSON.parse(localStorage.getItem('user'))
      const project = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_BASE_URL}upload/passport_image/${data.id}`,
        headers: {
          Authorization: 'Bearer ' + auth.access_token
        }

      })
      console.log(project);
    },
    async delete_aadhar({ commit, state }, data) {
      const auth = JSON.parse(localStorage.getItem('user'))
      const project = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_BASE_URL}upload/aadhar_image/${data.id}`,
        headers: {
          Authorization: 'Bearer ' + auth.access_token
        }

      })
      console.log(project);
    },
    async delete_pan({ commit, state }, data) {
      const auth = JSON.parse(localStorage.getItem('user'))
      const project = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_BASE_URL}upload/pan_image/${data.id}`,
        headers: {
          Authorization: 'Bearer ' + auth.access_token
        }

      })
      console.log(project);
    },
    async delete_documents({ commit, state }, data) {
      const auth = JSON.parse(localStorage.getItem('user'))
      const project = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_BASE_URL}upload/delete/${data.id}`,
        headers: {
          Authorization: 'Bearer ' + auth.access_token
        }

      })
      console.log(project);
    },
    async FETCH_DOCUMENTS({ commit }, leadId) {
      try {
        const auth = JSON.parse(localStorage.getItem('user'))
        const response = await axios.get(`${baseURL}upload/list/${leadId}`, {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
          // params: {
          //   id,
          // },
        });
        // console.log("Response from API:", response.data);
        const leads = response.data;
        commit('SET_TOTALUPLOAD_LISTID', leads);
        // console.log("Extracted leads array:", leads); // Log the leads array
        return leads;
      } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
      }
    },
    async ADD_UPLOAD({ commit }, payload) {
      const data = new FormData();
      // data.append('image', payload.image);
      data.append('passport_no', payload.passport_no);
      data.append('aadhar_no', payload.aadhar_no);
      data.append('pan_no', payload.pan_no);
      data.append('leadId', payload.leadId);

      payload.passport_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`passport_image`, file);
        }
      });

      // Handle multiple aadhar images with same key
      payload.aadhar_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`aadhar_image`, file);
        }
      });

      // Handle multiple pan images with same key
      payload.pan_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`pan_image`, file);
        }
      });

      // Debug: Log FormData entries
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      const auth = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}upload/create`, data, {
          headers: {
            'Authorization': `Bearer ${auth.access_token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Server response:', response.data);
        // Handle the successful response here
      } catch (error) {
        console.error('Error creating:', error);
        // Handle the error here
      }
    },
    async UPDATE_UPLOAD({ commit }, payload) {
      const data = new FormData();
      // data.append('image', payload.image);
      data.append('passport_no', payload.passport_no);
      data.append('aadhar_no', payload.aadhar_no);
      data.append('pan_no', payload.pan_no);
      data.append('leadId', payload.leadId);

      payload.passport_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`passport_image`, file);
        }
      });

      // Handle multiple aadhar images with same key
      payload.aadhar_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`aadhar_image`, file);
        }
      });

      // Handle multiple pan images with same key
      payload.pan_image.forEach((file) => {
        if (file instanceof File) {
          data.append(`pan_image`, file);
        }
      });

      // Debug: Log FormData entries
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }
      const auth = JSON.parse(localStorage.getItem('user'))
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}upload/update/${payload.id}`, data, {
          headers: {
            'Authorization': `Bearer ${auth.access_token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error updating documents:', error);
        throw error;
      }
    },
    async Add_lead({ commit, state }, data) {
      const auth = JSON.parse(localStorage.getItem('user'))
      const response = await axios({
        method: 'post',
        data: data,
        url: `${import.meta.env.VITE_API_BASE_URL}lead/Create`,
        headers: {
          Authorization: 'Bearer ' + auth.access_token
        }
      })
      console.log("Add_lead response:", response.data);
      console.log(response);
      if (response && response.data && response.data.id) {
        return response.data; // Return the entire response or just the `id`
      } else {
        throw new Error("Missing ID in API response");
      }

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
