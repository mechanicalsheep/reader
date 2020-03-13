<template>
<v-container>
<div v-if="student != null">

<h1 v-if="isBirthday">HAPPY BIRTHDAY!!</h1>
<h1 style="text-align:center;">Welcome {{student.firstName}} {{student.lastName}}</h1>

<div style="text-align:-webkit-center">
<v-col cols="6">

<v-row align="center" justify="center">
    <v-col cols="12">
    <v-img :src="student.photoUrl" max-width="200px" style="border-radius:90%;"  ></v-img>
    </v-col>

    <v-col>
        <h3>Points: {{student.points}}</h3>
        <h3>Age: {{age}}</h3>
    </v-col>
</v-row>
</v-col>
</div>
<v-row>
<v-col cols="2">

<v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
</v-col>
        <v-col>

<h4 style="text-align:center;">Schedule</h4>
        </v-col>
<v-col cols="2">

<v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
</v-col>
</v-row>
</div>
<v-calendar title="Schedule"
:events="events"
:weekdays="weekdays"
v-model="start"
ref="calendar"
>

</v-calendar>
            
</v-container>
</template>

<script>
import db from '../database'
import firebase from 'firebase'
import dateTimeManager from '../scripts/dateTimeManager'

export default{
    name:'StudentDashboard',
    created(){
        var x = new Date();
        dateTimeManager.getDayOfTheWeek(x);
        // console.log(dateTimeManager.formatDate( dateTimeManager.getDateFromString("Wednesday")));
        // this.student=this.$route.params.student;
        db.collection('Users').doc('lG6qU3bLeRGILxiyBWKC').get()
        .then(userData=>{
            this.student = userData.data();
            // console.log(this.student.schedule);
            this.name=this.student.firstName +" "+ this.student.lastName;
            this.getEvents();
        })
        // console.log(this.studentId);
        // console.log(this.student);
        // console.log(this.student.photoUrl)
        

    },
     mounted () {
    this.$refs.calendar.checkChange()
     },
    computed:{
       
        age: function(){
            try{

                var now = new Date();
                var dob= new Date(this.student.dob.toDate());
                // console.log((now.getDay()+" "+ (dob.getDay())))
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
        ],
        start: "2020-03-13"
           

        }
    },
    props: ['studentId'],
    methods:{
        prev(){
            console.log("getting previous")
            this.$refs.calendar.prev()
        },
        next(){
            console.log("getting next")
            this.$refs.calendar.next();
        },
        getEvents(){
            console.log(this.$refs.calendar)
            var createdDate = this.student.createdAt.toDate()
            console.log("createdAt: "+createdDate)
           this.student.schedule.forEach(day=>{
               var dayTime= day.split(' ');
               var date = dateTimeManager.getDateFromString(dayTime[0], createdDate);
               this.insertRecurringEvents(date);
            //    console.log(date);
           })
            // var date = new Date('2020-03-09');
           
            
            
        },
        insertRecurringEvents(date){
                this.events.push({name: 'something', start:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`})
                for(var i=0; i<100; i++){
                    date=this.addDays(date,7);
                    // console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
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
