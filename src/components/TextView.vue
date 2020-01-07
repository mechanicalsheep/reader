<template>
<v-container grid-list-xs,sm,md,lg,xl style="border: 1px solid green;  height:20vh;">
  <!-- <vue-typer :text=this.text :repeat='0' :type-delay="100" /> -->
  <!-- {{splitter()}} -->
  <span v-for="msg in textArray">
    <span v-html="msg"> </span>
  </span>
<v-dialog
  v-model="dialog"
  scrollable
  persistent :overlay="false"
  max-width="100px;"
  transition="dialog-transition"
>
<template v-slot:activator="{ on }">
       <v-btn
         color="red lighten-2"
         dark
         v-on="on"
       >
         Click Me
       </v-btn>
     </template>

     <v-card style="width:50vh; height:50vh;">
       <v-card-title
         class="headline grey lighten-2"
         primary-title
       >
         Privacy Policy
       </v-card-title>

       <v-card-text>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </v-card-text>

       <v-divider></v-divider>

       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="primary"
           text
           @click="dialog = false"
         >
           I accept
         </v-btn>
       </v-card-actions>
     </v-card>
</v-dialog>

</v-container>

</template>

<script>
// import {VueTyper} from 'vue-typer';
import tester from './../scripts/test';
import diction from './../scripts/merdic';
// import dict from './../scripts/dictionary';
export default{
  name:'TextView',
  components: {
    // VueTyper
  },
  mounted(){
    this.splitter();
    this.formatter();
    this.linker();
    tester.test();
    diction.find("f");


    // var word = dict.definitions("awesome");
    // console.log(word);

  },
  data(){

    return({

      text:"hello, is <b>this</b> working?",
      textArray:'',
      dialog:''

    }
    )
  },
  methods:{
    //splits each word seperately this will be used to work on each word seperately..

    splitter(){
      this.textArray = this.text.replace(","," ,").replace("?"," ?").replace("."," .").replace("!"," !").split(" ");
    },

    formatter(){

      var count = this.textArray.length;
      console.log("Count starts as "+ count);
      for(var i=0; i<count; i++){
        if(this.textArray[i+1]===","
        || this.textArray[i+1]===" "
        || this.textArray[i+1]==="?"
        || this.textArray[i+1]==="."
        || this.textArray[i+1]==="!"
        || this.textArray[i+1]===undefined ){

        }
        else{
          this.textArray.splice(i+1,0," ");
          console.log("add space after "+this.textArray[i]);
          count=this.textArray.length;
          i=i+1;
          console.log("count now is: "+count);
        }
      }
        this.textArray.forEach(msg => {
          console.log(msg);
        })
        console.log("Array size now: "+this.textArray.length);
    },
//link each word in the array with the dictionary.
    linker(){
      this.textArray[0]="<a href='www.google.com'>"+this.textArray[0]+"</a>"
    }
  }
}
</script>
