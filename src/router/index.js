import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase, { database } from 'firebase'
import ReaderScreen from '../views/ReaderScreen'
import db from '../database'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
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
    path: '/staffDashboard',
    name: 'StaffDashboard',
    component: function () {
      return import('../views/StaffDashboard.vue')
    }
  },
  {
    path: '/studentDashboard',
    name: 'StudentDashboard',
    component: function () {
      return import('../views/StudentDashboard.vue')
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
  const currentUser = firebase.auth().currentUser;
  // debugger;
  var currentUserData;
  if(currentUser!=null){
   currentUserData = db.collection('Users').doc(currentUser.uid);

  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const allowedRoles = to.matched.some(record=> record.meta.allowedRoles);

  if(requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next();
  else if(requiresAuth && currentUser){
    if(from.path==='/login' && currentUser.roles === allowedRoles){
      console.log("allowed user.")
      next('ReaderScreen');
    }
    var self=this;
    let user = '';
    let data;
    
//     data = async() =>{
//       var mew = await currentUserData.get().then(async (snapshot)=>{return await snapshot.data()});
//       self.user= await mew;
//       console.log(mew)
//       return mew.username;
//     }
// const username=data();
// console.log(user)
// something.then(user=>{username=user.username})
//  console.log(username);
  }
  else{
    next();
  }
})

export default router
