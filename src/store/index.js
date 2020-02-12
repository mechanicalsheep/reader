import Vue from 'vue'
import Vuex from 'vuex'
import * as book from '../database/InvisibleAlligators';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage:0,
      currentBook:'',
      currentUser:''

  },
    getters:{
      getCurrentPage: state=>{
          return state.currentPage
      },
        getCurrentBook:state=>{
            return state.currentBook
      },
      getCurrentUser:state=>{
        return state.currentUser;
      }
    },
  mutations: {
    setCurrentUser:(state, user)=>{
      state.currentUser=user;
    },
    setCurrentPage:(state, payload)=> {
        if(payload>=0 && payload < book.pageCount){

     state.currentPage=payload
        }
    }
  },
  actions: {
  },
  modules: {
  }
})
