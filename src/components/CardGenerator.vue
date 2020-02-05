<template>
    <div>
        <div>
            <v-text-field :v-model="message" placeholder="Enter Text"></v-text-field>
            <v-btn v-on:click="encrypt()">Generate QR Code</v-btn>
        </div>
        <div v-show="showQr">
            <!-- {{encrypted}} -->
            <qrcode-vue style="margin-top: 20px; margin-left: 20px;" :value="encrypted"> </qrcode-vue>
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
            message:'hello',
            encrypted:'',
            showQr:false,
            CryptoJS:'',
            Encryption: ''
        }
    },
    methods:{
        initialize(){
            this.Encryption = new Encryption();
            // this.Encryption.test();
        },
   
        encrypt(){
        //    var CryptoJS=require("crypto-js");
            var e = this.Encryption.Encrypt(this.message);
            this.encrypted=e;
           
            this.showQr=true;
        },
        decrypt(encryptedVar){
            
        }
    }
}
</script>