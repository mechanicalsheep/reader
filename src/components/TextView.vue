<template>
<v-container grid-list-xs,sm,md,lg,xl style="border: 1px solid green;  height:20vh; position:relative;">
{{changeText}}
  <span v-for="msg in textArray">
    <span v-html="msg" v-on:click="dictionaryModal(msg)" :id="removeTagsByWord(msg)" :class="'word'+removeTagsByWord(msg)"> </span>
  </span>

<v-dialog
  v-model="dialog"
  scrollable
  :overlay="false"
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

       <v-card-text style="text-align:center; margin-top:18px;" v-if="wordMeaning!=null">
         {{wordMeaning}}
         <!-- <v-progress-circular indeterminate align="center"></v-progress-circular> -->
       </v-card-text>

              <v-card-text v-else style="text-align:center;">
                <v-progress-circular indeterminate align="center"></v-progress-circular>
              </v-card-text>

       <v-divider></v-divider>

       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="primary"
           text
           @click="dialog = false"
         >
           Ok!
         </v-btn>
       </v-card-actions>
     </v-card>
</v-dialog>

<!--<v-layout align-end fill-height >-->
  <!--<v-text-field  v-model="$store.getters.getCurrentPage" placeholder="Enter text here." @keydown.enter="processText" >-->
  <!--</v-text-field>-->
<!--</v-layout>-->
</v-container>
</template>

<script>


import diction from './../scripts/merdic';
import * as book from '../database/InvisibleAlligators';
export default{
  name:'TextView',
  components: {

  },
  mounted(){
      this.getBook(),
    this.splitter();
    this.formatter();


  },
    computed:{
      changeText: function(){
      this.text=book.pages[this.$store.getters.getCurrentPage].text;
        }
    },
beforeUpdate(){
this.processText();
console.log("processed");

},
  data(){

    return({

      text:'load data...',
      textArray:'',
      dialog:'',
      // searchWord:'',
      modalTitle:'',
      wordMeaning:'',
            Book:book,


    }
    )
  },
  methods:{
processText(){
  this.splitter();
  this.formatter();
},
    //splits each word seperately this will be used to work on each word seperately..
getBook(){
  // console.log(book.pages["0"]);
},
    splitter(){
    var currentPageText=book.pages[this.$store.getters.getCurrentPage].text;
      this.textArray = currentPageText.toString().replace(","," ,").replace("?"," ?").replace("."," .").replace("!"," !").split(" ");
    },
bold(index){
  this.textArray[index] = "<b>"+this.textArray[index]+"</b>";
},
removeTagsByIndex(index){
  var untagged=this.textArray[index].replace( /(<([^>]+)>)/ig, '')
  // console.log("untagged: "+ untagged);
  return untagged;

},
removeTagsByWord(word){
  var untagged=word.replace( /(<([^>]+)>)/ig, '');
  // console.log("untagged: "+ untagged);
  return untagged;

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
          // console.log("add space after "+this.textArray[i]);
          count=this.textArray.length;
          i=i+1;
          // console.log("count now is: "+count);
        }
      }
        this.textArray.forEach(msg => {
          // console.log(msg);
        })
        // console.log("Array size now: "+this.textArray.length);
    },

      dictionaryModal(word)
      {
        var wordToProcess = this.removeTagsByWord(word);
        this.modalTitle=wordToProcess
        this.wordMeaning=null
this.dialog=true;
      diction.GetMeaning(wordToProcess)
      .then(meaning=>{
        this.wordMeaning=meaning;

      });



      }
    }
  }

</script>
