<template>
<v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
        {{user.username}}
        <!-- <v-btn v-on:click="getUser()">Get User</v-btn> -->
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#E91F63"
                dark
                flat
              >

                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>

              <v-btn icon right :class="textClass" v-on:click="toggleActive('textClass')"><v-icon>mdi-textbox</v-icon></v-btn>
              <v-btn icon right :class="qrScannerClass" v-on:click="toggleActive('qrScannerClass')"><v-icon>mdi-qrcode-scan</v-icon></v-btn>
               
              </v-toolbar>
              <v-card-text>

                <v-form v-show="showForm" @submit.prevent="submit()">
                    <v-btn type="submit" hidden></v-btn>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-at"
                    type="email"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-textbox-password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>

                <div v-show="showQrScanner">
<!-- <p>Last result: <b>{{ decodedContent }}</b></p>
<p class="error">{{ qrScannerError }}</p> -->
<p class="error">{{ qrScannerError }}</p>
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#E91F63" style="color:white;" v-on:click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    

</template>

<style>
.active{
    background-color: rgb(153, 17, 63);
    /* filter:brightness(10%); */
}
</style>

<script>

import Encryption from "../scripts/encrypt"
import {QrcodeStream} from 'vue-qrcode-reader'
import firebase from "firebase"
import db from "../database"
export default {

    name: 'Login',
    components:{
        QrcodeStream,
        // CardGenerator
    },
data(){
    return{
        email:'',
        password:'',
        textClass:'active',
        qrScannerClass:'',
        showForm:true,
        showQrScanner:false,
        qrScannerError:'',
        user:'loadinguserData'
       
    }
},
firestore :{

},

    methods:{
        submit(){
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data=>{

                console.log("Success");
              var docref = db.collection('Users').doc(data.user.uid);
              docref.get().then(user=>{
                if(user.exists){
                  console.log("user exists")
                  var userData = user.data();
                  this.$store.commit('setCurrentUser', userData);
                  if (userData.roles.includes("superAdmin")){

                    this.$router.replace('/adminDashboard');
                  }
                  else if(userData.roles.includes("userData")){
                    this.$router.replace("/userDataDashboard");
                  }
                  else if(userData.roles.includes("parent")){
                    this.$router.replace("/parentDashboard");
                  }
                  // console.log(this.$store.getters.getCurrentUser);
                }
              })
                
            })
            .catch(err=>{
                this.error=err.message;
                console.log(this.error);
               
                this.$toasted.error("Error logging in. Please make sure your username and password are correct", {duration:6000})
            });
            // console.log(this.$firestore.user);
        },
        getUser(){
          var docRef = db.collection("Users").doc('6qIkrVtiHgYlpjapE9QEXYu5Yul2');
          docRef.get().then(user=>{
            if(user.exists){
              var userData = user.data();
              // console.log("success, Welcome "+userData.username);
              this.user=userData;
              
              this.$store.commit('setCurrentUser',userData);
              console.log(this.$store.getters.getCurrentUser)

            }
            else{
              console.log("Document does not exist")
            }
          })
        },
       toggleActive(classname){
           if(classname==="textClass" && this.textClass==='active'){
               //donothing.
           } 
           else if(classname==="qrScannerClass" && this.qrScannerClass==='active'){
               //also do nothing
           }
           else{

               if(this.textClass=='active'){
                   this.textClass='';
                   this.qrScannerClass='active'
                   this.showForm=false;
                   this.showQrScanner=true
               }
               else{
                   this.textClass='active',
                   this.qrScannerClass = ''
                   this.showForm=true
                   this.showQrScanner=false
               }
           }
       },
             onDecode(content) {
          this.decodedContent = content
          var Encryption = new Encryption();
          var decrypted = Encryption.Decrypt(this.decodedContent);
          var userArray = this.decrypted.split(" ");
          this.email = userArray[0];
          this.password = userArray[1];
          this.submit();
          
        },

        onInit(promise) {
          promise.then(() => {
              console.log('Successfully initilized! Ready for scanning now!')
            })
            .catch(error => {
              if (error.name === 'NotAllowedError') {
                this.qrScannerError = 'Hey! I need access to your camera'
              } else if (error.name === 'NotFoundError') {
                this.qrScannerError = 'Do you even have a camera on your device?'
              } else if (error.name === 'NotSupportedError') {
                this.qrScannerError = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
              } else if (error.name === 'NotReadableError') {
                this.qrScannerError = 'Couldn\'t access your camera. Is it already in use?'
              } else if (error.name === 'OverconstrainedError') {
                this.qrScannerError = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
              } else {
                this.qrScannerError = 'UNKNOWN ERROR: ' + error.message
              }
            })
        }
       
},
       
}
</script>