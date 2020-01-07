<template>
  <v-container>

<TextView></TextView>
<SceneView></SceneView>
<ControlView/>

</v-container>
</template>

<script>
import TextView from '../components/TextView';
import SceneView from '../components/SceneView';
import ControlView from '../components/ControlView';

export default{
  name:'ReaderScreen',
  components:{
    TextView,
    SceneView,
    ControlView
  }

}
</script>
