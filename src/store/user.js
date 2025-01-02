import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;


export default {
    namespaced: true,
    state: {
        userData: JSON.parse(localStorage.getItem('user')) || {},
        totaladminList: [],
        totalroleList: [],
        totalcounsillerList: [],
        totaldocumentList: [],
        totalapplicationList: [],
        totaluserListId: [],
        totaluserList: [],
        totalstaffCount: 0,
        // totalstatusList: [],
    },
    mutations: {
        SET_USER(state, userData) {
            state.userData = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('Mutation completed - new state:', state.userData);
        },
        SET_ADMIN_LIST(state, payload) {
            state.totaladminList = payload;
        },
        // SET_STATUS_LIST(state, payload) {
        //     state.totalstatusList = payload;
        // },
        SET_TOTALSTAFF_COUNT(state, count) {
            state.totalstaffCount = count;
        },
        SET_ROLE_LIST(state, payload) {
            state.totalroleList = payload;
        },
        SET_COUNSILLER_LIST(state, payload) {
            state.totalcounsillerList = payload;
        },
        SET_DOCUMENT_LIST(state, payload) {
            state.totaldocumentList = payload;
        },
        SET_APPLICATION_LIST(state, payload) {
            state.totalapplicationList = payload;
        },
        SET_TOTALUSER_LISTID(state, data) {
            state.totaluserListId = data;
        },
        SET_TOTALUSER_LIST(state, payload) {
            state.totaluserList = payload;
        },
        RESET_STATE(state) {
            // Reset all user-related state to initial values
            state.userData = null;
            state.token = null;
            // Reset any other user-related state
        }
    },
    actions: {
        resetUserState({ commit }) {
            commit('RESET_STATE');
        },
        async USER_LOGIN({ commit }, payload) {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_API_BASE_URL}user/sign_in`,
                    data: {
                        email: payload.email,
                        password: payload.password
                    }
                });

                console.log('Raw login response:', response);

                // Store the complete response data
                commit('SET_USER', response.data);

                return response.data;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        async SIGN_UP({ commit }, data) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                const response = await axios({
                    method: 'post',
                    data: data,
                    url: `${import.meta.env.VITE_API_BASE_URL}Admin/create`,
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Signup error:', error);
                throw error;
            }
        },
        async fetchtotaluserlistId({ commit }, id) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/list/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data;
                commit('SET_TOTALUSER_LISTID', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotaluserlist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
                context.commit('SET_TOTALUSER_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotalrolelist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}Roles`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                console.log("Response from API:", response.data); // Log the response
                const leads = response.data.data;
                context.commit('SET_ROLE_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotaladminlist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/admin_list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
                context.commit('SET_ADMIN_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotalcounsillerlist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/counsiller_list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
                context.commit('SET_COUNSILLER_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotaldocumentlist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/document_list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
                context.commit('SET_DOCUMENT_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotalapplicationlist(context) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/application_list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
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
                const response = await axios.get(`${baseURL}lead_status/list`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   id,
                    // },
                });
                // console.log("Response from API:", response.data); // Log the response
                const leads = response.data.rows;
                context.commit('SET_STATUS_LIST', leads);
                // console.log("Extracted leads array:", leads); // Log the leads array
                return leads;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
        async fetchtotalstaffCount({ commit }) {
            try {
                const auth = JSON.parse(localStorage.getItem('user'));
                // console.log(auth);
                const response = await axios.get(`${baseURL}user/staff_count`, {
                    headers: {
                        Authorization: 'Bearer ' + auth.access_token,
                    },
                    // params: {
                    //   userId,
                    // },
                });
                // console.log("Response from API:", response.data);
                commit('SET_TOTALSTAFF_COUNT', response.data.TotalStaffCount);
                return response.TotalStaffCount;
            } catch (error) {
                console.error('Error fetching lead data:', error);
                throw error;
            }
        },
        async ADD_USER({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'post',
                data: data,
                url: `${import.meta.env.VITE_API_BASE_URL}user/sign_up`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            })
            console.log(project);
        },
        async update_user({ commit }, data) {
            try {
                  const auth = JSON.parse(localStorage.getItem('user'))
                  const lead = await axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_API_BASE_URL}user/update/${data.id}`,
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
        async delete_user({ commit, state }, data) {
            const auth = JSON.parse(localStorage.getItem('user'))
            const project = await axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_BASE_URL}user/delete/${data.id}`,
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }

            })
            console.log(project);
        },  
    },
    getters: {
        userId: state => {
            return state.userData?.id ?? null;
        },
        userRoleId: state => {
            // Get the first role from the role array
            return state.userData?.role?.[0] ?? null;
        },
        user: state => {
            return state.userData ?? null;
        }
    }
}