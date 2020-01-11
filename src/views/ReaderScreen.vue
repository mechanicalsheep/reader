<template>
  <v-container>
<!--<v-btn v-on:click="nextPage">Next Page</v-btn>-->
<TextView></TextView>
<SceneView></SceneView>
<ControlView/>

</v-container>
</template>

<script>
import TextView from '../components/TextView';
import SceneView from '../components/SceneView';
import ControlView from '../components/ControlView';
// import * as Book from '../database/InvisibleAlligators'

export default{
  name:'ReaderScreen',
  components:{
    TextView,
    SceneView,
    ControlView
  },
    data(){
      return({
         page:0,
         book: this.Book
      });
    },


}
</script>
