import Vue from 'vue'
import Vuex from 'vuex'
import * as book from '../database/InvisibleAlligators';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage:0,
      currentBook:''

  },
    getters:{
      getCurrentPage: state=>{
          return state.currentPage
      },
        getCurrentBook:state=>{
            return state.currentBook
}
    },
  mutations: {
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
