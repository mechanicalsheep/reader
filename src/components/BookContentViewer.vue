<template>
<v-container>
    <!-- <v-flex> -->

<v-card height="80vh" style="overflow-y:auto;" max-width="300px">
<v-card-title>Book Viewer <v-btn v-on:click="update">Save</v-btn></v-card-title>
<v-card-text  >
   
   <span v-for="(content, name) in bookContent" :key=content+name>
       <!-- <v-btn v-on:click="testUpdate(name,content)">upd</v-btn> -->
<span v-if="name!='pages'">

       <!-- <v-row>

       <v-col cols="4"  > -->
<v-layout row>
<v-flex d-flex>

<span>{{name}}:</span> 
</v-flex>
       <!-- </v-col> -->
       <!-- <v-col cols="4"> -->
           <v-flex d-flex>

           <template v-if="name==='pageSize'">
            <v-flex d-flex xs4 md6>

               <p class="font-weight-bold">{{content}}</p>
            </v-flex>
           </template>
           <template v-else>
               <v-flex d-inline-flex>

                <input  type="text" :id="name+content" :value="content" style="width:152px" />
               </v-flex>
               <v-flex d-flex>
        <v-spacer></v-spacer>
                <v-icon @click="testUpdate(name,content)">mdi-pencil-outline</v-icon>
               </v-flex>
           </template>
           </v-flex>
       <!-- </v-col> -->
</v-layout>
    
       <!-- </v-row> -->
   </span>

</span>
<v-expansion-panels flat>
    
<v-list>
    <v-list-item v-for="(pages, index) in bookContent.pages" :key=index>
        <v-list-item @click="Goto(index)" fill-width active-class="">Page {{index}}</v-list-item>
    </v-list-item>
</v-list>

</v-expansion-panels>    
</v-card-text>
</v-card>
    <!-- </v-row> -->
</v-container>
</template>

<script>
export default {
    name:'BookContentViewer',
    props: ['bookContent'],
    computed:{
        getStyle(){

            if(this.style===''){
    
            }
        }
    },
    data(){
        return{
            editValue:'',
            isDisabled:true,
            headers:[{text:' name'}],
            style:'',
            book:this.bookContent,
            currentPage:0
        }
    },
  
    methods:{
        Goto(index){
        // console.log("will go to page "+ index)
        this.currentPage=index;
        this.$emit('go-to',this.currentPage);
        },
        update(){
            // console.log("attempting to emit update-"+name)
            // this.$emit("update-book", this.bookContent )
            console.log(this.book)
        },
        testUpdate(name, content){
            //TODOS you were checking out how to edit the object programatically.
            // this.book[prop]
             var inputVal = document.getElementById(name+content).value;
             console.log("got this from element: "+inputVal)
            this.$emit('update-book',name, inputVal);
            // console.log(this.book[prop]);
        },
        printBook(){
            this.bookContent.title="CHANGEDTITLE";
            console.log(this.bookContent);
        }
    }
}
</script>
