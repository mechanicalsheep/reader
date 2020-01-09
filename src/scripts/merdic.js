var diction={

getFullJson(word){
  var searchWord=word
  var learners= "a916a8cd-5495-4f7b-a32b-deca3eb203e2"
  var elementary = "58049fe9-2591-44c4-b4ae-ea66de60e41f"
  var learnersUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord}?key=${learners}`

  var elementaryUrl =`https://www.dictionaryapi.com/api/v3/references/sd2/json/${searchWord}?key=${elementary}`
  var meaning="fetching...";
  var self=this;
  var x = fetch(elementaryUrl).then((response)=>{
    return response.json();
  })

return x
},


getMeaning(word){
  // this.test();
  // var myJson
var meaning= this.getFullJson(word).then((myJson) =>{
    var answer=myJson[0].shortdef[0];
    console.log(answer);
    var meaning= answer;
return meaning
  });
  return meaning
},


}
export default diction
