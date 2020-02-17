<template>
  <div>
    <div >
        <!-- <img class="preview" :src="picture"> -->
         <p v-show="uploadValue>0">Progress: {{uploadValue.toFixed()+"%"}}
      <progress v-show="uploadValue>0" id="progress" :value="uploadValue" max="100" ></progress>  </p>
        <!-- <br> -->
        
                <img :src="picture" style="width:65vh; height:60vh; border:1px solid black;"/>
           
    </div>
    <div >
      <input type="file" @change="previewImage" accept="image/*" >
    </div>
    <div>
     
    </div>
      <button @click="onUpload">Upload</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Uploader',
  data(){
	return{
      imageData: null,
      picture: null,
      uploadValue: 0
	}
  },
  methods:{
    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`test/${this.imageData.name}/`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.picture =url;
          this.$emit("update-url", url);
        });
      }
      );
    }

  }
}
</script>