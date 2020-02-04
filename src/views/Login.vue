<template>
<div id="login" class="login">
<h1> Login Page</h1>

<p>
        Last result: <b>{{ decodedContent }}</b>
      </p>

      <p class="error">
        {{ errorMessage }}
      </p>

      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
<v-form @submit.prevent="submit">
    
<v-text-field type="email" v-model="email" placeholder="Email"></v-text-field>
<v-text-field type="password" v-model="password" placeholder="Password"></v-text-field>
<v-btn type="submit">Submit</v-btn>
</v-form>
</div>
</template>

<script>
import firebase from "firebase"
import {QrcodeStream} from 'vue-qrcode-reader'
export default{
    name: 'Login',
    data(){
        return{
        email:"asd@asd.com",
        password:"123456",
        error: null,
        decodedContent:'',
        errorMessage:''

        }
    },
    components:{
        QrcodeStream
    },
    methods:{
        submit(){
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data=>{
                // this.$router.replace({name:"ReaderScreen"});
                console.log("Success");
            })
            .catch(err=>{
                this.error=err.message;
                console.log(this.error);
            });
        },

         onDecode(content) {
          this.decodedContent = content
        },

        onInit(promise) {
          promise.then(() => {
              console.log('Successfully initilized! Ready for scanning now!')
            })
            .catch(error => {
              if (error.name === 'NotAllowedError') {
                this.errorMessage = 'Hey! I need access to your camera'
              } else if (error.name === 'NotFoundError') {
                this.errorMessage = 'Do you even have a camera on your device?'
              } else if (error.name === 'NotSupportedError') {
                this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
              } else if (error.name === 'NotReadableError') {
                this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
              } else if (error.name === 'OverconstrainedError') {
                this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
              } else {
                this.errorMessage = 'UNKNOWN ERROR: ' + error.message
              }
            })
        }
    }
}
</script>

