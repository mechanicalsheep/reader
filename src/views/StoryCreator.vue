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

             <v-flex d-flex wrap>
                <v-textarea style="min-width:65vh; max-width:65vh;" solo :value="book.pages[currentPage].text" >{{book.pages[currentPage].text}}</v-textarea>
            </v-flex>
                    <v-flex d-flex >
                    <Uploader></Uploader>
                    </v-flex>
  
            
</v-layout>
</v-flex>
     </v-layout>
      
    </v-container>
</template>

<script>
import TextView from '../components/TextView'
import SceneView from '../components/SceneView'
import BookContentViewer from '../components/BookContentViewer'
import Uploader from '../components/Uploader'


export default{
    name:"StoryCreator",
    components:{
        TextView,
        SceneView,
        BookContentViewer,
        Uploader
    },
    
    created(){

        this.book.pageSize=Object.keys(this.book.pages).length;
        console.log(this.book.pageSize);
    },
    mounted(){
        },
    beforeMount(){
        
    },
    data(){
        return{
           
        
            preview:null,
            currentPage:0,
            book:{
                title:'hello',
                author:'',
                pageSize:0,
                pages:
                  {
                      0:{

                          text:"the testing testers",
                          img:"image"
                      },
                      1:{

                          text:"Second Page",
                          img:"image"
                      }
                        
                    }

                
            }

        }
        },
            methods:{
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
                    getPageSize();
                   this.book[name]= value;
                   console.log("Changed "+ name+ " to " + value);
                   console.log(this.book)

                },
                addPage(page){
                    this.book.pages.push(page);
                }
            }
    
}
</script>