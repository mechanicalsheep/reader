class Encryption{
      

   
  Encrypt(message){
    let CryptoJS=require("crypto-js");

        let encryption =CryptoJS.AES.encrypt(message, "foxtrotlittlecat");
        console.log(encryption.toString());
        return encryption.toString();
    }

    Decrypt(encryptionString){
        let CryptoJS=require("crypto-js");
        
        
        let decryption = CryptoJS.AES.decrypt(encryptionString,"foxtrotlittlecat");
        console.log(decryption.toString());
        return decryption.toString();
    }

    test(){
        console.log("test succeeded from encryption.");
    }

}
export default Encryption;
// class something  {
//     meow(){
//         console.log("meow");
//     }
// };
// export default something;
