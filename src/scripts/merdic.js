var diction={

find(word){
  var searchWord=word
  var apiKey= "a916a8cd-5495-4f7b-a32b-deca3eb203e2"
  var url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${searchWord}?key=${apiKey}`
  var meaning="fetching...";
  var self=this;
  var x = fetch(url).then((response)=>{
    return response.json();
  })
  .then((myJson) =>{
    var answer=myJson[0].shortdef[0];
    console.log(answer);
    meaning= answer;
return meaning
  });
return x
}
}

export default diction
