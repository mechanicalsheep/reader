<template>
<v-container grid-list-xs,sm,md,lg,xl style="border: 1px solid green;  height:20vh;">
  <!-- <vue-typer :text=this.text :repeat='0' :type-delay="100" /> -->
  <!-- {{splitter()}} -->
  <span v-for="msg in textArray">
<!-- <span v-if="msg===','">


&nbsp;
</span>
<span v-else>
  &nbsp;
  </span> -->
  <!-- {{msg===','? '': '&nbsp;'}} -->

<span v-html="msg"> </span>
  </span>
</v-container>

</template>

<script>
import {VueTyper} from 'vue-typer';
import tester from './../scripts/test';
import dict from './../scripts/dictionary';
export default{
  name:'TextView',
  components: {
    VueTyper
  },
  mounted(){
    this.splitter();
    this.formatter();
    this.linker();
    tester.test();
    dict.find("ace",function(error,data){if(error) return console.log(error); console.log(data); });
    // this.something.test();
  },
  data(){

    return({

      text:"hello, is <b>this</b> working?",
      textArray:''

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
