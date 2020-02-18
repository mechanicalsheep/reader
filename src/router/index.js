import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase, { database } from 'firebase'
import ReaderScreen from '../views/ReaderScreen'
import db from '../database'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: function () {
      return import('../views/AddUser.vue')
    },
    meta:{
      //TODOS change later,  only super admin would be able to add users.
      requiresAuth: false,
      allowedRoles: ''
    }
  },
  {
    path: '/myLibrary',
    name: 'MyLibrary',
    component: function () {
      return import('../views/MyLibrary.vue')
    },
    meta:{
      //TODOS change later, 
      requiresAuth: false,
      allowedRoles: ''
    }
  },
  {
    path: '/storyCreator',
    name: 'StoryCreator',
    component: function () {
      return import('../views/StoryCreator.vue')
    },
    props:true,
    meta:{
      //TODOS change later,  only super admin would be able to add users.
      requiresAuth: false,
      allowedRoles: ''
    }
  },
  {
    path: '/readerScreen',
    name: 'ReaderScreen',
    component: ReaderScreen,
    meta: {
      requiresAuth:true,
      allowedRoles:'superAdmin'
    }
  },
  {
    path: '/parentDashboard',
    name: 'ParentDashboard',
    component: function () {
      return import('../views/ParentDashboard.vue')
    },
    meta:{
      requiresAuth: true,
      allowedRoles: 'superAdmin'
    }
  },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: function () {
      return import('../views/AdminDashboard.vue')
    },
    meta:{
      requiresAuth:false
      // requiresAuth: true,
      // allowedRoles: 'superAdmin'
    }
  },
  {
    path: '/staffDashboard',
    name: 'StaffDashboard',
    component: function () {
      return import('../views/StaffDashboard.vue')
    },
    meta:{
      requiresAuth: true,
      allowedRoles: 'staff'
    }
  },
  {
    path: '/studentDashboard',
    name: 'StudentDashboard',
    component: function () {
      return import('../views/StudentDashboard.vue')
    },
    meta:{
      //TODOS: set back authentications, will remove for testings.
      requiresAuth: false,
      allowedRoles: 'studentAdmin'
    }
  },
  {
    path: '/dev',
    name: 'Dev',
    component: function () {
      return import('../components/Dev.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      requiresAuth:false,
      allowedRoles:''
    },
    component: function(){
      return import('../views/Login.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  // console.log(store.getters.getCurrentUser);
  
  const currentUser = firebase.auth().currentUser;
  // debugger;
  var currentUserData;
  if(currentUser!=null){
    currentUserData=store.getters.getCurrentUser;
  //  currentUserData = db.collection('Users').doc(currentUser.uid);
  if(currentUser.uid== currentUserData.id){}
// console.log("current user is the same as the authenticated")
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  var allowedRoles="";
  try{

    allowedRoles = to.matched[0].meta.allowedRoles;//to.matched.some(record=> record.meta.allowedRoles);
    // console.log(allowedRoles)
  }
  catch{
    console.log("no roles")
  }
  if(allowedRoles!=null){

    // console.log(allowedRoles);
  }
  if(requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next();
  else if(requiresAuth && currentUser){
    if(from.path==='/login' && currentUserData.roles.includes(allowedRoles)){
      console.log("allowed user role. " +allowedRoles)
      next();
    }
    else{
      console.log("not allowed user "+ currentUserData.username)
      console.log("needed role: "+ allowedRoles)
      console.log("current roles: "+ currentUserData.roles[0]);
      next('/login')
    }
    var self=this;
    let user = '';
    let data;
    
  }
  else{
    next();
  }
})

export default router
