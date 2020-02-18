<template>
  <v-app>
    <v-app-bar
      app
      color="pink"
      dark
    >
<h2 class="cursive justify-center align-center" style="text-align:center">Nurture Academy</h2>
{{user}}
      <v-spacer></v-spacer>

<div v-show="isLoggedIn()">

        <v-btn class="mr-2" v-on:click="showUser()">Show Current User</v-btn>
        <v-btn class="mr-2" v-on:click="logout()">Log Out</v-btn>

        <v-icon>mdi-open-in-new</v-icon>
      
</div>
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
    },
    showUser(){
      var currentUser = firebase.auth().currentUser;
      this.$toasted.info(currentUser.email + "  is logged on", 
      {
        text : 'Close',
        onClick : (e, toastObject) => {
         toastObject.goAway(0);
        }})
    }
  },

};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
.cursive{
font-family: 'Pacifico', cursive;
}
</style>
