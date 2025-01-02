import axios from 'axios'

export default {
    namespaced: true,
    state: {
        userData: JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations: {
        SET_USER(state, userData) {
            state.userData = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            console.log('Mutation completed - new state:', state.userData);
        }
    },
    actions: {
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