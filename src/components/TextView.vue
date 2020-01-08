<template>
<v-container grid-list-xs,sm,md,lg,xl style="border: 1px solid green;  height:20vh;">

  <span v-for="msg in textArray">
    <span v-html="msg" v-on:click="dictionaryModal(msg)"> </span>


  </span>


<v-dialog
  v-model="dialog"
  scrollable
  persistent :overlay="false"
  transition="dialog-transition"
  width="50vh"
>


     <v-card >
       <v-card-title
         class="headline grey lighten-2"
         primary-title
       >
         {{modalTitle}}
       </v-card-title>

       <v-card-text>
         {{wordMeaning}}
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
    // this.linker();
    tester.test();
    // diction.find("f");


    // var word = dict.definitions("awesome");
    // console.log(word);

  },

  data(){

    return({

      text:"I like my school. it is beautiful",
      textArray:'',
      dialog:'',
      searchWord:'',
      modalTitle:'',
      wordMeaning:'',


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
      // console.log("Count starts as "+ count);
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
      for(var i=0; i<this.textArray.length; i++){
        this.textArray[i]=`<v-btn v-on:click="dictionaryModal("${this.textArray[i]}")">`+this.textArray[i]+"</v-btn>";

      }
    },
      dictionaryModal(word)
      {
        this.modalTitle=word;
        this.searchWord=diction.find("search");
      diction.find(word)
      .then(meaning=>{
        this.wordMeaning=meaning;
        this.dialog=true;
      });



      }
    }
  }

</script>
