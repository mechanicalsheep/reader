<template>
<v-container>
<div v-if="student != null">

<h1 v-if="isBirthday">HAPPY BIRTHDAY!!</h1>
<!-- <h2>Welcome {{student.firstName}} {{student.lastName}}</h2> -->
<v-row>
    <v-col cols="3">
    <v-img :src="student.photoUrl" max-width="150"  ></v-img>
    </v-col>

    <v-col>
        <h3>Points: {{student.points}}</h3>
        <h3>Age: {{age}}</h3>
    </v-col>
</v-row>
<h4 style="text-align:center;">Schedule</h4>
</div>
<v-calendar title="Schedule"
:events="events"
:weekdays="weekdays"
>

</v-calendar>
</v-container>
</template>

<script>
import db from '../database'
import firebase from 'firebase'

export default{
    name:'StudentDashboard',
    created(){
        // this.student=this.$route.params.student;
        db.collection('Users').doc('dDq45X6MRsT1wR5yPG3fqmgQJ4u2').get()
        .then(userData=>{
            this.student = userData.data();
            this.name=this.student.firstName +" "+ this.student.lastName;
        })
        console.log(this.studentId);
        console.log(this.student);
        // console.log(this.student.photoUrl)
        this.getEvents();

    },
    computed:{
        getLast: function(){
        var arr=this.events[this.events.length-1].split('-');
        var addDays=parseInt(arr[2])+ 7
        console.log("days is now: "+addDays);
        arr[2]=addDays.toString();
        return arr.toString();
        },
        age: function(){
            try{

                var now = new Date();
                var dob= new Date(this.student.dob.toDate());
                console.log((now.getDay()+" "+ (dob.getDay())))
                // debugger;
                if(now.getMonth()+1 == dob.getMonth()+1 && now.getDay()+1 == dob.getDay()){
                    this.isBirthday=true;
                    console.log("it's your bday b!");
                }
                return now.getFullYear() - dob.getFullYear();
            }
            catch{
                //dont load yet.
            }
        }
    },
    data(){
        return{
        //    studentId:'',
           student:Object,
           name:String,
           isBirthday:false,
           weekdays:[0,1,2,3,4,5,6],
           events:[
        //    {name: 'test1', start:'2020-03-12', end:'2020-03-13', color:'blue'},
        //    {name: "test2", start:'2020-03-07 12:00'}
        ]
           

        }
    },
    props: ['studentId'],
    methods:{
        getEvents(day){
            var date = new Date('2020-03-09');
            console.log("starting at "+ date)
            // this.events.push({name: 'something', start:date});
            for(var i=0; i<100; i++){
                date=this.addDays(date,7);
                console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
                this.events.push({name: 'something', start:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`})
                
            }
        },
    addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
        
    }



}
</script>
