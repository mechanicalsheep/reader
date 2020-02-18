class Encryption{
      

  constructor(){
      this.word="bird";

      this.CryptoJS=require("crypto-js");
      this.encryption="";
      this.encryptionString="";
      this.decryption="";
  }
Encrypt(message){
    this.encryption=this.CryptoJS.AES.encrypt(message,this.word);
    console.log(this.encryption.toString());
    // this.encryptionString=this.encryption.toString();
}
//   Encrypt(message){
//     // let CryptoJS=require("crypto-js");

//         this.encryption =this.CryptoJS.AES.encrypt(message, "foxtrotlittlecat");
//         console.log(this.encryption.toString());
//         return this.encryption;
//     }
//     GetEncryptString(encryption){
//         console.log(encryption.toString());
//         // return encryption.toString();
//     }

//     Decrypt(encryption){
//         // let CryptoJS=require("crypto-js");
        
        
//         this.decryption = this.CryptoJS.AES.decrypt(encryption,"foxtrotlittlecat");
//         console.log(this.decryption.toString(this.CryptoJS.enc.Utf8));
//         return this.decryption.toString(this.CryptoJS.enc.Utf8);
//     }

    test(){
        console.log(this.word);
    }
    change(){
        this.word = "notBird";
    }

}
export default Encryption;
// class something  {
//     meow(){
//         console.log("meow");
//     }
// };
// export default something;
