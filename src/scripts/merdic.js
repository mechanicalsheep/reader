var diction={

    callCount:'',
    LearningDictionary: '',
    ElementaryDictionary: '',
    // wordJson:'',
    GetLearnersJson(word){
        var learners= "a916a8cd-5495-4f7b-a32b-deca3eb203e2"
        var learnersUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${learners}`
        this.LearningDictionary = fetch(learnersUrl).then((response)=>{
          // this.wordJson=response.json();
          this.callCount++;
          console.log('callCount '+ this.callCount);
    return response.json();
  })
return this.LearningDictionary;
    },

GetElementaryJson(word){
  var elementary = "58049fe9-2591-44c4-b4ae-ea66de60e41f"

  var elementaryUrl =`https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${elementary}`
  this.ElementaryDictionary= fetch(learners).then((response)=>{
      return response.json();
  });

return this.ElementaryDictionary;
},

GetPOS(context){
  // console.log(context[0].fl);
  var answer=context[0].fl;
  if(answer==null){
    answer=context[1].fl;
  }
  return answer
},
GetMeaningFromJson(myJson){
  console.log(myJson);
  var answer=myJson[0].shortdef[0];
  if(answer==null){
    answer=myJson[1].shortdef[0];
  }
  return answer
},
GetMeaning(word){
// console.log(this.test);
var x=new Object();
var meaning= this.GetLearnersJson(word).then((myJson) =>{
    var answer=myJson[0].shortdef[0];
    if(answer==null){
      answer=myJson[1].shortdef[0];
    }
    // console.log(answer);
    // console.log(myJson[0].fl);
    var definition= answer;
x.definition=meaning;

x.pos=myJson[0].fl;
return definition;
  });
  // console.log(meaning);
  return meaning
},


}
export default diction
