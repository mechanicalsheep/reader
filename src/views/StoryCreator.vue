<template>
    <v-container style="border:1px solid black;">
     
     <v-layout row>
        <v-flex d-flex xs12 sm6 md4>

            <v-col>
                <BookContentViewer @go-to="function(index){GoTo(index)}" :book-content="book" @update-book="function(name, value){updateBook(name, value)}"></BookContentViewer>
            </v-col>
        </v-flex>
<v-flex d-flex xs12 sm6 md6>

<v-layout column wrap>

            <v-flex >
                 <v-btn v-if="!isEditting" @click="isEditting=!isEditting">Edit</v-btn>
                 <v-btn v-else @click="isEditting=!isEditting"> Save</v-btn>

            </v-flex>
             <v-flex d-flex wrap>
                <v-textarea :disabled="!isEditting" style="min-width:65vh; max-width:65vh;" solo :value="book.pages[currentPage].text" >{{book.pages[currentPage].text}}</v-textarea>
            </v-flex>
                    <v-flex d-flex >
                    <Uploader @update-url="(url)=>{UpdateURL(url)}"  :book-id="book.id"></Uploader>
                    </v-flex>
  
            
</v-layout>
</v-flex>
     </v-layout>
      
    </v-container>
</template>
<style>
.v-text-field__details{
    display:none;
}
</style>
<script>
import TextView from '../components/TextView'
import SceneView from '../components/SceneView'
import BookContentViewer from '../components/BookContentViewer'
import Uploader from '../components/Uploader'
import db from '../database'


export default{
    name:"StoryCreator",
    components:{
        TextView,
        SceneView,
        BookContentViewer,
        Uploader
    },
    props:
        ['book'],
     
    
    created(){

if(this.book!=null){

    this.book.pageSize=Object.keys(this.book.pages).length;
}
        // console.log(this.book.pageSize);
    },
    mounted(){
        },
    beforeMount(){
       if(this.book==null){
           db.collection('Books').doc('Ii9JvoX8gF90zyNtB2E6').get().then(booksnapshot=>{
               var book = booksnapshot.data();
               this.book=book;
               this.book.pageSize=Object.keys(this.book.pages).length;
               console.log("loaded book from db")
           })
       }
        
    },
    data(){
        return{
           
        
            preview:null,
            currentPage:0,
            isEditting:false
            

        }
        },
            methods:{
                UpdateURL(url){
                    // console.log("updateing urls")
                    this.book.pages[this.currentPage].img=url;
                    console.log("URL of page "+this.currentPage+" is: "+this.book.pages[this.currentPage].img)
                },
             GoTo(index){
                 this.currentPage=index;
console.log("Will go to "+index);
    },
                getPageSize(){
                    this.book.pageSize=this.book.pages.length;
              
                   console.log(this.book.pageSize)
                },
                updateTitle(newTitle){
                    console.log("updating title")
                    // this.title=newTitle;
                },
                updateBook(name, value){
                    // getPageSize();
                   this.book[name]= value;
                //    db.collection('Books').
                   console.log("Changed "+ name+ " to " + value);
                   console.log(this.book)

                },
                // updateBook(updatedBook){
                //     db.collection('Books').doc(this.book.id).set({
                //         updatedBook,
                        
                //     }, {merge:true})
                    

                // },
                addPage(page){
                    this.book.pages.push(page);
                }
            }
    
}
</script>