<template>
    <v-container style="border:1px solid black;">
     
        <v-row>
            
            <v-col cols="4">
                <BookContentViewer :book-content="book" @update-book="updateBook"></BookContentViewer>
            </v-col>
            
            <v-col>
                <v-textarea solo placeholder="Enter story Text here." style="margin-bottom:50px;"></v-textarea>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import TextView from '../components/TextView'
import SceneView from '../components/SceneView'
import BookContentViewer from '../components/BookContentViewer'
export default{
    name:"StoryCreator",
    components:{
        TextView,
        SceneView,
        BookContentViewer
    },
    mounted(){
      this.getPageSize()
    },
    data(){
        return{
            book:{
                title:'hello',
                author:'',
                pageSize:0,
                pages:[
                    {
                        page:0,
                        text:"the testing testers",
                        img:"image"
                    }
                ]
            }

        }
        },
            methods:{
                getPageSize(){
                    this.pageSize=this.book.pages.length;
              
                   console.log(this.book.pages.length)
                },
                updateTitle(newTitle){
                    console.log("updating title")
                    // this.title=newTitle;
                },
                updateBook(payload){
                   this.book=payload;
                   console.log(this.book)

                }
            }
    
}
</script>