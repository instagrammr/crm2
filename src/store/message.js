import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
    namespaced: true,
    state: () => ({
      totaladminListId: [],
      totaluserListId: [],
    }),
    mutations: {
      SET_TOTALADMIN_LISTID(state, data) {
        state.totaladminListId = data;
      },
      SET_TOTALUSER_LISTID(state, data) {
        state.totaluserListId = data;
      },
    },
    actions: {
        async ADD_MESSAGE({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'post',
                data: data,
                url: `${import.meta.env.VITE_API_BASE_URL}message/Create`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            })
            console.log(project);
        },
        async update_message({ commit }, data) {
            try {
                  const auth = JSON.parse(localStorage.getItem('user'))
                  const lead = await axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_API_BASE_URL}message/update/${data.id}`,
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
        async fetchtotaladminlistId({commit}, adminId) {
            try {
              const auth = JSON.parse(localStorage.getItem('user'));
              // console.log(auth);
              const response = await axios.get(`${baseURL}message/list/${adminId}`, {
                headers: {
                  Authorization: 'Bearer ' + auth.access_token,
                },
                // params: {
                //   id,
                // },
              });
              console.log("Response from API:", response.data); // Log the response
              const leads = response.data;
              commit('SET_TOTALADMIN_LISTID', leads);
              // console.log("Extracted leads array:", leads); // Log the leads array
              return leads;
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          },
        async fetchtotaluserlistId({commit}, userId) {
        try {
            const auth = JSON.parse(localStorage.getItem('user'));
            // console.log(auth);
            const response = await axios.get(`${baseURL}message/read/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + auth.access_token,
            },
            // params: {
            //   id,
            // },
            });
            console.log("Response from API:", response.data); // Log the response
            const leads = response.data;
            commit('SET_TOTALUSER_LISTID', leads);
            // console.log("Extracted leads array:", leads); // Log the leads array
            return leads;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        },
        async delete_message({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_BASE_URL}message/delete/${data.id}`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }

            })
            console.log(project);
        },
    },
    
}        
