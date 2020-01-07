
var Dictionary = require("oxford-dictionary");
var config={

  app_id : "316755de",
  app_key : "e9c4dd3d901920a483b9dac73e6b7579",
  source_lang: "en-us"
};
var dict = new Dictionary(config);
// dict.find("ace",function(error,data){if(error) return console.log(error); console.log(data); });

export default dict;
