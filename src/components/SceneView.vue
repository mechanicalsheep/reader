<template>
<v-container style="border: 1px solid red;  height:50vh;">
<!--<h1> Scene Container</h1>-->

    <v-img style="max-height: -webkit-fill-available;" contain v-bind:src="require(`../assets/${Book.replace(' ','')}/${$store.getters.getCurrentPage}.jpg`)"></v-img>
</v-container>
</template>

<script>
    import * as book from '../database/InvisibleAlligators';

export default{
  name: 'SceneView',
    beforeMount(){
        // this.image=this.getFullImageLocation();
    },
    computed: {
        imageSrc() {
            var image=this.getFullImageLocation();

            return image;
            // return require('@/assets/InvisibleAlligators/0.jpg');
        }
        },
    data(){
        return({
            imageLocation: "../assets/",
            test:'0.jpg',
            Book:book.title,
            // image: this.imageSrc,
        });
    },
    methods:{
        getFullImageLocation(){
            var currentPageCount=this.$store.getters.getCurrentPage
            var currentPage=book.pages[currentPageCount]
            var imageLoc=this.imageLocation;
            console.log("WHY?! "+imageLoc);
            var currentImageLocation=`${this.imageLocation}${book.title.replace(" ","")}/${currentPage.image}`
            console.log("currentLocation: "+currentImageLocation);
            return require(`${this.imageLocation}${book.title.replace(" ","")}/${currentPage.image}`);

        }
    }
}
</script>
