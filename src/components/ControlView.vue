<template>
<v-container class="shady">
<v-btn  v-on:click="previousPage" style="float:left;">Previous Page</v-btn>
  <v-btn v-on:click="nextPage" style="float:right;">Next Page</v-btn>


  </v-container>
</template>
<style>
.shady{
  background-color:var(--main-bg-color);
  border: 1px solid black;
  height:10vh;
}
</style>


<script>
import * as Book from '../database/InvisibleAlligators';
export default{
  name: 'ControlView',
    beforeMount(){

    },
data(){
      return({
          page:0,

     });
},
    methods:{
        nextPage(){
            console.log(Object.keys(Book.pages).length);
            if(this.page+1<Object.keys(Book.pages).length){

            this.page++;
            console.log("page is now: "+this.page)
            this.$store.commit("setCurrentPage",this.page);
            }
        },
        previousPage(){
            if(this.page-1>=0){
            this.page--;
            this.$store.commit("setCurrentPage",this.page);
            }
        }
    }
}
</script>
