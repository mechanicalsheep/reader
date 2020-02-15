<template>
<v-container>
    <!-- <v-flex> -->

<v-card height="80vh" style="overflow-y:auto;" max-width="300px">
<v-card-title>Book Viewer <v-btn v-on:click="update">Save</v-btn></v-card-title>
<v-card-text  >
   
   <span v-for="(content, name) in bookContent" :key=content+name>
       <v-btn v-on:click="testUpdate(name,content)">upd</v-btn>
<span v-if="name!='pages'">

       <v-row>

       <v-col cols="4"  >

<span>{{name}}</span> 
       </v-col>
       <v-col cols="4">
          <input  type="text" style="width:100%;" :id="name+content" :value="content" />
       </v-col>
       <!-- <v-col cols="3" style="padding:0;">
           <v-btn text icon v-on:click="isDisabled=!isDisabled"><v-icon size="medium">mdi-pencil-outline</v-icon></v-btn>
       </v-col> -->
       </v-row>
   </span>

</span>
<v-expansion-panels flat>
    

<v-expansion-panel v-for="pages in bookContent.pages" :key=pages+bookContent >
<v-expansion-panel-header style="padding:0;">Page {{pages.page}}</v-expansion-panel-header>
<v-expansion-panel-content> stuff</v-expansion-panel-content>
<!-- <span v-for="pages in bookContent.pages">
    <v-expansion-panel-header>Page: {{page.page}}</v-expansion-panel-header>
    <v-expansion-panel-content>

    <span v-for="(page,name) in pages">
        <p>{{name}}: {{page}}</p>
    </span>
    </v-expansion-panel-content>
    <p>hahaha</p>
</span> -->
</v-expansion-panel>
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
        }
    },
  
    methods:{
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
