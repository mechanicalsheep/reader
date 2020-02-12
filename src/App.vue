<template>
  <v-app>
    <v-app-bar
      app
      color="pink"
      dark
    >

{{user}}
      <v-spacer></v-spacer>



        <v-btn class="mr-2" v-show="isLoggedIn()" v-on:click="logout()">Log Out</v-btn>
        <v-icon>mdi-open-in-new</v-icon>
      
    </v-app-bar>

    <v-content >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import firebase from 'firebase'
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
    user:''
  }),
  methods:{
    isLoggedIn(){
      // console.log(firebase.auth().currentUser.uid)
      return firebase.auth().currentUser!=null
    },
    logout(){
      firebase.auth().signOut().then(result=>{
        console.log("signed out.");
        this.$router.replace("/login");
      })
    }
  },

};
</script>
