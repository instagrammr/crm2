import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/Home.vue';
import AdminHome from '../views/admin/Adasbord.vue';
import login from "../views/login.vue";
import employees from "../views/admin/employees.vue";
import attendance from "../views/admin/attendance.vue";
import registered from "../views/admin/registered-leads.vue";
import followup from "../views/admin/followup-leads.vue";
import cancelledleads from "../views/admin/cancelled-leads.vue";
import Totalleads from "../views/admin/Totalleads.vue";
import StudentStatus from "../views/admin/StudentStatus.vue";
import addleads from "../views/admin/addleads.vue";
import addemployees from "../views/admin/addemployees.vue";
import addlead from "../views/addlead/addlead.vue";
import attendanceAdd from "../views/addlead/attendanceAdd.vue";
import viewlead from "../views/addlead/viewlead.vue";
import leaddashbord from '../views/addlead/leadDashbord.vue';
import leaverequest4 from "../views/addlead/leaverequest4.vue";
import cldashbord from '../views/Counselor/dashbord.vue';
import clnewlead from '../views/Counselor/newlead.vue';
import leaverequest from '../views/Counselor/leaverequest.vue';
import leaverequest1 from '../views/admin/leaverequest1.vue';
import clfollowupleads from '../views/Counselor/followupleads.vue';
import registerdleads from '../views/Counselor/registerdleads.vue';
import totallleads from '../views/Counselor/totallleads.vue';
import leadform from '../views/Counselor/leadform.vue';
import cancelled from '../views/Counselor/cancelled.vue';
import studentstatus from '../views/Counselor/studentStatusCouns.vue';
import attandence from '../views/Counselor/attandence.vue';
import Dashbord from '../views/Documentation/Dashbord.vue';
import newdocuments from '../views/Documentation/newdocuments.vue';
import followupdoc from '../views/Documentation/followupdoc.vue';
import TotalDocuments from '../views/Documentation/TotalDocuments.vue';
import DropedDocuments from '../views/Documentation/DropedDocuments.vue';
import registereddocument from '../views/Documentation/registereddocument.vue';
import ADashbord from '../views/application/Dashboard.vue';
import DropedApplications from '../views/application/DropedApplications.vue';
import FollowupApplicatio from '../views/application/FollowupApplicatio.vue';
import NewApplications from '../views/application/NewApplications.vue';
import registeredApplications from '../views/application/registeredApplications.vue';
import TotalApplications from '../views/application/TotalApplications.vue';
import attendance1 from '../views/Documentation/attandence1.vue';
import leaverequest2 from '../views/Documentation/leaverequest2.vue';
import attendance2 from '../views/application/attandence2.vue';
import leaverequest3 from '../views/application/leaverequest3.vue';
import studentStatusAdd from '../views/addlead/studentStatusAdd.vue';
import studentStatusCouns from '../views/Counselor/studentStatusCouns.vue';
import studentStatusDoc from '../views/Documentation/studentStatusDoc.vue';
import studentStatusApp from '../views/application/studentStatus.vue';
import Birthday from '../views/admin/birthday.vue';
import BirthdayAdd from '../views/addlead/birthdayAdd.vue';
import BirthdayCouns from '../views/Counselor/birthdayCouns.vue';
import BirthdayDoc from '../views/Documentation/birthdayDoc.vue';
import BirthdayApp from '../views/application/birthdayApp.vue';
import Notification from '../views/Counselor/notification.vue';
import NotificationDoc from '../views/Documentation/notificationDoc.vue';
import NotificationApp from '../views/application/notificationApp.vue';
import leadStatus from '../views/admin/leadStatus.vue';
import leadStatusCouns from '../views/Counselor/leadStatusCouns.vue';
import leadStatusDoc from '../views/Documentation/leadStatusDoc.vue';
import leadStatusApp from '../views/application/leadStatusApp.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  // Admin Routes
  {
    path: '/admin/dasbord/:id',
    name: 'Adasbord',
    component: AdminHome
  },
  {
    path: '/admin/employees',
    name: 'employees',
    component: employees
  },
  {
    path: '/admin/attendance',
    name: 'attendance',
    component: attendance
  },
  {
    path: '/admin/registered/:id',
    name: 'registered',
    component: registered
  },
  {
    path: '/admin/followup-leads/:id',
    name: 'followup',
    component: followup
  },
  {
    path: '/admin/cancelled-leads/:id',
    name: 'cancelled-leads',
    component: cancelledleads
  },
  {
    path: '/admin/Totalleads',
    name: 'Totalleads',
    component: Totalleads
  },
  {
    path: '/admin/leave-request1/:id',
    name: 'leaverequest1',
    component: leaverequest1
  },
  {
    path: '/admin/leadStatus',
    name: 'leadStatus',
    component: leadStatus
  },
  {
    path: '/admin/StudentStatus',
    name: 'StudentStatus',
    component: StudentStatus
  },
  {
    path: '/admin/birthday',
    name: 'Birthday',
    component: Birthday
  },
  {
    path: '/admin/addemployees',
    name: 'addemployees',
    component: addemployees
  },
  {
    path: '/admin/addleads/:id',
    name: 'addleads',
    component: addleads
  },

  // Add Lead Routes
  {
    path: '/addlead/leaddashbord/:id',
    name: 'leaddashbord',
    component: leaddashbord
  },
  {
    path: '/addlead/addlead/:id',
    name: 'addlead',
    component: addlead
  },
  {
    path: '/addlead/attendanceAdd/:id',
    name: 'attendanceAdd',
    component: attendanceAdd
  },
  {
    path: '/addlead/leaverequest4/:id',
    name: 'leaverequest4',
    component: leaverequest4
  },
  {
    path: '/addlead/viewlead/:id',
    name: 'viewlead',
    component: viewlead
  },
  {
    path: '/addlead/birthday',
    name: 'BirthdayAdd',
    component: BirthdayAdd
  },
  {
    path: '/addlead/StudentStatusAdd',
    name: 'studentStatusAdd',
    component: studentStatusAdd
  },

  // Counselor Routes
  {
    path: '/Counselor/Dashbord/:id',
    name: 'cldashbord',
    component: cldashbord
  },
  {
    path: '/Counselor/notification/:id',
    name: 'notificationCouns',
    component: Notification
  },
  {
    path: '/Counselor/newleads/:id',
    name: 'clnewlead',
    component: clnewlead
  },
  {
    path: '/Counselor/followupleads/:id',
    name: 'clfollowupleads',
    component: clfollowupleads
  },
  {
    path: '/Counselor/registerdleads/:id',
    name: 'registerdleads',
    component: registerdleads
  },
  {
    path: '/Counselor/totallleads/:id',
    name: 'totallleads',
    component: totallleads
  },
  {
    path: '/Counselor/leadsform',
    name: 'leadform',
    component: leadform
  },
  {
    path: '/Counselor/cancelled/:id',
    name: 'cancelled',
    component: cancelled
  },
  {
    path: '/Counselor/leave-request/:id',
    name: 'leaverequest',
    component: leaverequest
  },
  {
    path: '/Counselor/BirthdayCouns/:id',
    name: 'BirthdayCouns',
    component: BirthdayCouns
  },
  {
    path: '/Counselor/studentStatusCouns/:id',
    name: 'studentStatusCouns',
    component: studentStatusCouns
  },
  {
    path: '/Counselor/leadStatusCouns/:id',
    name: 'leadStatusCouns',
    component: leadStatusCouns
  },
  {
    path: '/Counselor/attandence/:id',
    name: 'attandence',
    component: attandence
  },

  // Documentation Routes
  {
    path: '/documentation/dashboard/:id',
    name: 'Dashbord',
    component: Dashbord
  },
  {
    path: '/documentation/NotificationDoc/:id',
    name: 'NotificationDoc',
    component: NotificationDoc
  },
  {
    path: '/documentation/new-documents/:id',
    name: 'newdocuments',
    component: newdocuments
  },
  {
    path: '/documentation/followup-documents/:id',
    name: 'followupdoc',
    component: followupdoc
  },
  {
    path: '/documentation/total-documents/:id',
    name: 'TotalDocuments',
    component: TotalDocuments
  },
  {
    path: '/documentation/dropped-documents/:id',
    name: 'DropedDocuments',
    component: DropedDocuments
  },
  {
    path: '/documentation/registered-applications/:id',
    name: 'registereddocument',
    component: registereddocument
  },
  {
    path: '/documentation/attandence/:id',
    name: 'attendance1',
    component: attendance1
  },
  {
    path: '/documentation/leave-request2/:id',
    name: 'leaverequest2',
    component: leaverequest2
  },
  {
    path: '/documentation/BirthdayDoc/:id',
    name: 'BirthdayDoc',
    component: BirthdayDoc
  },
  {
    path: '/documentation/leadStatusDoc/:id',
    name: 'leadStatusDoc',
    component: leadStatusDoc
  },
  {
    path: '/documentation/studentStatusDoc/:id',
    name: 'studentStatusDoc',
    component: studentStatusDoc
  },

  // Application Routes
  {
    path: '/Application/Dashbord/:id',
    name: 'ADashbord',
    component: ADashbord
  },
  {
    path: '/Application/NotificationApp/:id',
    name: 'NotificationApp',
    component: NotificationApp
  },
  {
    path: '/Application/DropedApplications/:id',
    name: 'DropedApplications',
    component: DropedApplications
  },
  {
    path: '/Application/FollowupApplication/:id',
    name: 'FollowupApplicatio',
    component: FollowupApplicatio
  },
  {
    path: '/Application/NewApplications/:id',
    name: 'NewApplications',
    component: NewApplications
  },
  {
    path: '/Application/registeredApplications/:id',
    name: 'registeredApplications',
    component: registeredApplications
  },
  {
    path: '/Application/TotalApplications/:id',
    name: 'TotalApplications',
    component: TotalApplications
  },
  {
    path: '/Application/attandence2/:id',
    name: 'attendance2',
    component: attendance2
  },
  {
    path: '/Application/leave-request3/:id',
    name: 'leaverequest3',
    component: leaverequest3
  },
  {
    path: '/Application/BirthdayApp/:id',
    name: 'BirthdayApp',
    component: BirthdayApp
  },
  {
    path: '/Application/leadStatusApp/:id',
    name: 'leadStatusApp',
    component: leadStatusApp
  },
  {
    path: '/Application/student_status/:id',
    name: 'studentStatusApp',
    component: studentStatusApp
  },
  
  // Catch-all 404 route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Navigation guard (optional)
router.beforeEach((to, from, next) => {
  // Add any navigation guards here if needed
  next();
});

export default router;