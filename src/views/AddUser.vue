<template>
<v-container>
<h1 align="center" style="padding-bottom:40px;"> Add User</h1>
<v-btn @click="test">test</v-btn>
<v-card>
    <v-card-title>Add New User</v-card-title>
    <v-card-text>
        <v-form @submit.prevent="submit()">
            <v-row class="justify-space-between">
                <v-col cols="5.5">
                    <v-text-field v-model="firstName" placeholder="FirstName"></v-text-field>
                </v-col>
            <!-- <div class="mr-11"></div> -->
            <v-col cols="5.5">
                <v-text-field v-model="lastName" placeholder="LastName"></v-text-field>
            </v-col>
            </v-row>
            <v-text-field :error="isError" v-model="email" placeholder="*Email"></v-text-field>
            <v-text-field :error="isError" v-model="password" type="password" placeholder="*Password"></v-text-field>
            <v-text-field v-model="age" placeholder="Age"></v-text-field>

            <v-select :error="isError" placeholder="*Roles" :items="roles" v-model="role"></v-select>
            <v-col align="center" justify="center">
            <v-btn style="text-align:center;" type="submit">Add User</v-btn>

            </v-col>
        </v-form>
    </v-card-text>
</v-card>

<v-dialog
v-model="dbDialog"
width="500"
>
<v-card>
    <v-card-title style="background-color:light-gray">No login</v-card-title>
    <v-card-text>
        <p>Since no email and password put in this will end up as a database only. No login enabled.</p>
        <p>Would you like to continue?</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-btn @click="createDatabase()">Continue</v-btn>
        <v-btn>Cancel</v-btn>
    </v-card-actions>
</v-card>
</v-dialog>
</v-container>
</template>

<script>
import firebase from 'firebase'
import db from '../database'
export default {
    name:"AddUser",
    beforeMount(){
    
    this.getRoles();
    
    },
    data(){
        return{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            age:'',
            roles:[],
            role:'',
            isError:false,
            dbDialog:false
        }
    },
    methods:{
        test(){
            db.collection('Users').doc('WN4O7MugkE0PG2L3KbNM').get()
            .then(user=>{
                var use = user.data();
                console.log(use);
            })
        },
        getRoles(){
            var roleRef= db.collection("Users").doc('Roles');
            
            var RoleData=roleRef.get().then(roleArray=>{
                var Roles= roleArray.data();
                this.roles= Roles.roles;
                
            })
    
        },
        createDatabase(id){
            this.dbDialog=false;
            if(id==null){
                db.collection('Users').add({
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            roles: this.role,
                            age: this.age
                        }).then(_=>{
                                 this.$toasted.success(this.firstName+" added successfullly!", {duration:5000})
                            })
            }
            else{

                db.collection('Users').doc(id).set({
                                firstName: this.firstName,
                                lastName: this.lastName,
                                email: this.email,
                                roles: this.role,
                                age: this.age
                            }).then(_=>{
                                 this.$toasted.success(this.firstName+" added successfullly!", {duration:5000})
                            })
            }
        },
        submit(){
            
            if(this.firstName==='' || this.role===''){
                this.$toasted.error("Please fill out all necessary fields", {duration:5000})
                this.isError=true;
            }
           else if(this.email==='' && this.password===''){
                    this.dbDialog=true;
                    return;
            }
            else{
                try{
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(userCred=>{
                        createDatabase(userCred.user.uid)
                    });
                    this.$toasted.success("User "+this.email+" added successfullly!", {duration:5000})
                }
                catch(error){
                    this.$toasted.error(error);
                }
            }
        }
    }
}
</script>