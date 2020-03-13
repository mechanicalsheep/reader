var dateTimeManager={
    getDayOfTheWeek(date){
 var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var x = new Date(date);
    return week[x.getDay()];
},
getDateFromString(dayString, startDate){
    
    var date = startDate;
    console.log(startDate)
    console.log("date: "+date)

for(var i=0; i<6; i++){
    if(this.getDayOfTheWeek(date)==dayString){
        return date;
    }
    date= this.addDays(date,1);
}
},
addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  formatDate(date){
      var x = new Date(date);
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }
}

export default dateTimeManager;