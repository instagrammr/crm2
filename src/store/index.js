import { createStore } from "vuex";
import user from "./user";
import staffListModule  from "./staffList";
import logout  from "./logout";
import counsiller  from "./counsiller";
import attendance  from "./attendance";
import leave  from "./leave";
import document  from "./document";
import application  from "./application";
import addLead  from "./addLead";
import message from "./message";

const store = createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user,
        staffListModule ,
        logout,
        addLead,
        counsiller,
        attendance,
        application,
        document,
        leave,
        message 
    }
});
export default store;