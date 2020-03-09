<template>
<v-container fluid>

<v-row>
    <v-col cols="12">
        <v-row  justify="center" style="padding-bottom:40px;"> 
            <h1> Admin Dashboard</h1>
        </v-row>
        <v-row justify="center" >
           <router-link to="AddUser" style="text-decoration:none"> <v-btn class="mr-3" >Add User</v-btn></router-link>
            <router-link to="StoryCreator" style="text-decoration:none;"> <v-btn class="mr-3">Story creator</v-btn></router-link>
            <router-link to="MyLibrary" style="text-decoration:none;"> <v-btn class="mr-3">My Library</v-btn></router-link>
        </v-row>
        <v-row>
            <v-col cols="12">

            <v-card  >
                <v-card-title class="justify-center align-center">Dashboards</v-card-title>
                <router-link to="ParentDashboard" style="text-decoration:none;"><v-btn class="mr-3">Parent Dashboard</v-btn></router-link>
                <!-- <router-link :to="StudentDashboard" style="text-decoration:none;"><v-btn class="mr-3">Student Dashboard</v-btn></router-link> -->
                <v-btn v-on:click="gotoStudent()">Student Dashboard</v-btn>
            </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>

   
    </v-container>    
</template>
<script>
import firebase from "firebase"
import db from "../database"
export default {
    name:'AdminDashboard',
    data(){
        return{
            // student:Object
        }
    },
 
    methods:{
        gotoStudent(){
            //test user for now.
            
                this.$router.push({name:'StudentDashboard', params:{studentId:'dDq45X6MRsT1wR5yPG3fqmgQJ4u2'}});
           
        }
    }
}
</script>