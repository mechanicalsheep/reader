<template>
    <div>
        <div>
            <div>
                <v-text-field :v-model="message" placeholder="Enter Text"></v-text-field>
                <v-btn v-on:click="test()">Generate QR Code</v-btn>

            </div>
            <div>
                 <v-text-field :v-model="decrypted" placeholder="Enter encryption"></v-text-field>
                <v-btn v-on:click="decrypt()">Generate QR Code</v-btn>
            </div>

        </div>
        <div v-show="showQr">
            <!-- {{encrypted}} -->
            <qrcode-vue style="margin-top: 20px; margin-left: 20px;" :value="encryptedString"> </qrcode-vue>
        </div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import Encryption from '../scripts/encrypt'

// import something from '../scripts/encrypt'

export default{
    name: 'CardGenerator',
    components:{
        QrcodeVue
    },
    beforeMount(){
this.initialize();
    },
    mounted(){
        // this.CryptoJS=require("crypto-js")
        // this.initialize();
    },
    data(){
        return{
            QRValue:'',
            name:'',
            picture:'',
            message:'',
            encrypted:'',
            encryptedString:'',
            showQr:false,
            CryptoJS:'',
            Encryption: '',
            decrypted:''
        }
    },
    methods:{
        test(){
            this.Encryption.change();
        this.Encryption.test();
        },
        initialize(){
            this.Encryption = new Encryption();
            // this.Encryption.test();
        },
   
        encrypt(){
        //    var CryptoJS=require("crypto-js");
        
        var CryptoJS=require("crypto-js");
        var e = CryptoJS.AES.encrypt(this.message, "foxtrotlittlecat");
        
        // this.encrypted = e;
        // this.encryptedString = e.toString();
        // this.encrypted = e;
       
        // console.log("encryption "+e.toString());
        var d = CryptoJS.AES.decrypt(e,"foxtrotlittlecat");
        console.log(CryptoJS.AES.decrypt(e,"foxtrotlittlecat").toString(CryptoJS.enc.Utf8));
        // console.log(this.Encryption.GetEncryptString(this.encrypted));
        // this.encryptedString=this.encrypted.toString();
            // this.encrypted = crypted.toString();
            // this.encrypted=e.toString();
           
            // this.showQr=true;
        },
        decrypt(){
            console.log("decrypting: "+ this.encrypted.toString())
            var d = this.Encryption.Decrypt(this.encrypted);
            console.log(d);
        }
    }
}
</script>