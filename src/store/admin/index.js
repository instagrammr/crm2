import { createStore } from "vuex";
import user from "./user";
import staffListModule from "./staffList";
import logout from "./logout";
import attendance from "./attendance";
import leads from "./registeredLeads";
import leadFollowups from "./followupleads";
import leadCancelled from "./cancelledleads";  // Importing the cancelledLeads module
import tottalleads from "./tottalleads";
import addleads from "./createlead";

const store = createStore({
    state: {
        // Global state if needed
    },
    
    mutations: {
        // Global mutations if needed
    },
    
    actions: {
        // Global actions if needed
    },
    
    modules: {
        user,
        staffListModule,
        logout,
        attendance,
        leads,
        leadFollowups,
        leadCancelled,
        tottalleads,
        addleads,
      

    }
});

export default store;
