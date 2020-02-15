<template>
    <v-container style="border:1px solid black;">
     
        <v-row>
            
            <v-col cols="4">
                <BookContentViewer :book-content="book" @update-book="function(name, value){updateBook(name, value)}"></BookContentViewer>
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
    created(){

        this.book.pageSize=this.book.pages.length;
        console.log(this.book.pageSize);
    },
    mounted(){
        },
    beforeMount(){
        
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

                }
            }
    
}
</script>