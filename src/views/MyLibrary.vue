<template>
<v-container>
    <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-overlay :value="overlay" opacity="6">
           <!-- <v-progress-circular indeterminate size="64"></v-progress-circular> -->
           <v-dialog width="50vh" v-model="overlay" class="align-center justify-center">
               <v-card width="50vh" class="justify-center align-center">
                   <v-card-title primary-title  class="justify-center">
                    All Set Up!
                   </v-card-title>
                   <v-card-text style="text-align:center;">
                       <v-img src="../assets/greencheck.png" height="125" contain></v-img>
                       Let's Begin...
                   </v-card-text>
                   <!-- <v-divider></v-divider> -->
                   <v-card-actions class="justify-center">
                      <router-link :to="{ name: 'StoryCreator' , params:{book:book}}" style="text-decoration:none;"> <v-btn outlined>Continue</v-btn></router-link>
                   </v-card-actions>
               </v-card>

           </v-dialog>
      </v-overlay>
    <h1 style="text-align:center"> My Library</h1>

    <br/>
    <v-btn @click="createStoryModal">Create a New Story</v-btn>

    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title primary-title class="green lighten-4">Starting a new story?</v-card-title>
            <v-card-text>
                <h4 > Sounds Awesome.</h4>
                <h4 v-show="showError" class="error"> {{submessage}}</h4>
                <v-form>
                <v-text-field :rules="rules" hide-details="auto" label="What will the title be?" v-model="title"></v-text-field>
                <v-text-field :rules="rules" placeholder="Who is/are the author(s)?" v-model="author"></v-text-field>
                <v-text-field :rules="rules" placeholder="What is it about?" v-model="summary"></v-text-field>

                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn :loading="isLoading" :class="btnColor" :disabled="btnDisable" @click="createStory" outlined>{{btnText}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import db from '../database'
import firebase from 'firebase'
export default{
    name:"MyLibrary",
    data(){
        return{
            //UI Stuff
            overlay:false,
            isLoading:false,
            btnText:"Let's Start!",
            btnColor:null,
            btnDisable:false,
            showError:false,
            dialog:false,
            errorClass:'',
            submessage:'',
            loadingCompleted:false,

            //Actual Data
            book:null,
            user:'6qIkrVtiHgYlpjapE9QEXYu5Yul2',
            title:null,
            createdBy:'',
            author:'',
            subscribers:'',
            summary:null,
            rules:[
                // value=>value==='' ||'Required'
            ]
        }
    },
    computed: {
            form () {
            return {
                title:this.title,
                //   author:this.author,
                summary:this.summary
            }
        },
            getPages(){
                if(this.book.pages!==null){
                return Object.keys(this.book.pages).length;

                }
                else{
                    return 0;
                }
        }
    },
    methods:{
        loadingState(){
            this.isLoading=true;
            this.btnDisable=true;
            this.dialog=false;
            
        },
        loadingComplete(error){
          this.isLoading=false;
            this.loadingCompleted=true;
            
            if (error==null){
                this.overlay=true;
                console.log("error is null")
                this.btnDisable=true;
                this.showError=false;

            }
            else{
                console.log("error is not null")
                this.btnDisable=false;
                this.showError=true;
                this.submessage=error;
                this.dialog=true;
                this.loadingCompleted=false

            }
        },
        createStoryModal(){
            
            if (this.loadingCompleted==true){
                console.log("Done loading")
                this.dialog=false;
                this.overlay=true;
            }
            else{
                console.log("loadin")
                this.dialog=true;
                this.overlay=false;
            }


        },
        createStory(){
            this.loadingState();
            if(this.validate()){
               
                console.log("create the story");
                var book = {
                    title:this.title,
                    createdBy: this.user,
                    author:this.author,
                    summary:this.summary,
                    pageSize:1,
                    subscribers:[this.user],
                    pages:{
                        0:{
                            text:'',
                            image:''
                        }
                    }
                }
                this.book=book;
                console.log(this.book);
               var bookRef= db.collection('Books').add(book).then(bookSnapshot=>{
                   console.log("Document created successfully");
                   firebase.storage().ref(`${bookSnapshot.id}`).child('snaps').putString("initial.shady");
                   this.loadingComplete();
               });
               

                }
                else{
                    this.loadingComplete("There was a problem creating your story. Please try again.")
                    // this.isLoading=false;
                    // this.btnDisable=false;
                    // this.btnText="Try Again"
                    // this.btnColor="error"
                    // this.showError=true;
                    // this.submessage="There was a problem creating your story. Please try again."
                    console.log("don't create the story")
                }
        },
        validate(){
           
           
                if(this.title!=="" && this.summary!==null){
                    return true;
                    }
                    else{

                        this.errorClass="error";
                        this.showError=true;
                        this.submessage="Please fill all the fields"
                        return false;
                    }
            
            // if(this.title!='' && this.author!='' && this.summary!=''){
            //     console.log("all fields completed.");
            //     return true;
            // }
            
            //     this.$toasted.error("please fill out all necessary fields", {duration:5000});
            // return false;
        }
    }
}
</script>