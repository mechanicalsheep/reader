<template>
<div>
    <!-- <h1>Status: {{item.status}}</h1> -->
    <v-text-field v-model="item.student" placeholder="Enter student's name"></v-text-field>
    <v-select :items="quarter" v-model="item.quarter" label="Select Quarter"></v-select>
    <v-select :items="criteria" v-model="item.criteria" label="Select Criteria"></v-select>
    <v-select :items="status" item-text="name" item-value="level" v-model="item.status" label="Select Status" return-object></v-select>
<v-btn v-on:click="submit">Submit</v-btn>


    <v-data-table
    :headers="headers"
    :items="dataItems">
        
    </v-data-table>

<v-select :items="studentNames" v-model="currentStudent"></v-select>
    <v-btn v-on:click="analyze">Analyze</v-btn>
    <p v-for="v in analysis" :key="v">{{v}}</p>
</div>

</template>

<script>
import Encryption from '../scripts/encrypt'

export default {

    name: 'Dev',
data(){
    return{
        item:{
            student:'',
            quarter:'',
            criteria:'',
            status:''

        },
        headers: [
            {
                text:"Student",
                align: 'left',
                sortable: true,
                value: 'student'
            },
            { text: 'Quarter', value: 'quarter' },
            { text: 'Criteria', value: 'criteria' },
            { text: 'Status', value: 'status.name' },
        ],
        quarter:[1,2,3,4],
        criteria: [
         "Washes hands",
           "Writes name",
           "Goes to bathroom",
           "Sits down quietly"

        ],
        status: [
            {level:0, name:"needs work"},
            {level:1, name: "improved"},
            {level:2, name:"manages successfully"}
        ],
        dataItems:[
            // {student:"abdullah", quarter:2, criteria:"anything",status:"ok"}
            {student:"abdullah", quarter:1, criteria:"Sits down quietly",status:{level:0, name: "needs work"}},
            {student:"abdullah", quarter:2, criteria:"Sits down quietly",status:{level:2, name: "manages successfully"}},
             {student:"abdullah", quarter:1, criteria:"Goes to bathroom",status:{level:0, name: "needs work"}},
            {student:"abdullah", quarter:2, criteria:"Goes to bathroom",status:{level:0, name: "needs work"}},
        ],
        studentNames:[
            "abdullah"
        ],
        studentData:'',
        analysis:[],
        currentStudent:''
    }
},

    methods:{
        submit(){
            // console.log(this.item);
            this.dataItems.push({
                student:this.item.student,
                quarter:this.item.quarter, 
                criteria:this.item.criteria, 
                status:this.item.status
                });
                this.studentNames.push(this.item.student);
                console.log(this.item.status);
//                 console.log(this.item.student)
// console.log(this.studentNames)

        },
        analyze(){
            this.analysis=[];
          var collection= this.getData(this.currentStudent)
          var quarter1=collection.filter(s=>{return s.quarter==1});
          var quarter2 = collection.filter(s=>{return s.quarter==2});
          

          for(var i=0; i<quarter1.length; i++){
              var currentCriteria=quarter1[i].criteria
            for(var j=0; j<quarter2.length; j++){
                if(quarter2[j].criteria==currentCriteria){
                    if(quarter1[i].status.level < quarter2[j].status.level){
                        this.analysis.push("Student: "+ quarter1[0].student + " has improved in "+currentCriteria); 
                    }
                    else{
                        this.analysis.push("Student: "+ quarter1[0].student + " did not improved in "+currentCriteria); 
                    }
                }
            }
          }
          console.log(quarter1);
        },
        getData(studentName){
            var collection= [];
          this.dataItems.forEach(student => {
              if(student.student==studentName){
                  collection.push(student)
              }
              
          });
          return collection;
        }
    }
    // data(){
    //     return{
    //         Encryption:''
    //     }
    // },
    // beforeMount(){
    //     this.initialize()
    //     this.encrypt("meow")
    // },
    // methods:{
    //     initialize(){
    //         this.Encryption= new Encryption();
    //     },
    //     encrypt(word){
    //         this.Encryption.Encrypt(word);
    //         console.log(this.Encryption.encryptionString);
    //     }
    // }
}
</script>