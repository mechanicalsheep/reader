var diction={
test: 'hello',
    LearningDictionary: '',
    ElementaryDictionary: '',
    GetLearnersJson(word){
        var learners= "a916a8cd-5495-4f7b-a32b-deca3eb203e2"
        var learnersUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${learners}`
        this.LearningDictionary = fetch(learnersUrl).then((response)=>{
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



GetMeaning(word){
console.log(this.test);
var meaning= this.GetLearnersJson(word).then((myJson) =>{
    var answer=myJson[0].shortdef[0];
    console.log(answer);
    var meaning= answer;
return meaning
  });
  return meaning
},


}
export default diction
