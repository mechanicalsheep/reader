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
    </v-col>
</v-row>

   
    </v-container>    
</template>
<script>
export default {
    name:'AdminDashboard'
}
</script>