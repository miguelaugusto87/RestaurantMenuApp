<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

       <div v-if="spinner">
        <ion-spinner  name="lines" class="spinner"></ion-spinner>
      </div>
      
    <ion-card  v-if="!spinner">
        <ion-item>
          <ion-input type="email" name="email" :placeholder="placeholderEmail"
          @input="email = $event.target.value" 
          v-bind:value="email" @change="getClient($event.target.value)">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="text" name="name" :placeholder="placeholderName"
          @input="CustomerName = $event.target.value" 
          v-bind:value="CustomerName">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="text" name="phone" :placeholder="placeholderPhone"
          @input="phone = $event.target.value" 
          v-bind:value="phone" @change="validatePhone($event.target.value)">
          </ion-input>
        </ion-item>

        <ion-item v-if="selected=='Delivery'">
          <ion-input type="text" name="address" :placeholder="placeholderAddress"
          @input="address = $event.target.value" required 
          v-bind:value="address">
          </ion-input>
        </ion-item>
        <ion-item v-if="selected=='Delivery'">
          <ion-input type="text" name="code" :placeholder="placeholderCode"
          @input="code = $event.target.value" required @change="ValidateCode($event.target.value)"
          v-bind:value="code">
          </ion-input>
        </ion-item>

        

        <ion-item v-if="selected=='PickUp' && selectPickHour">         
          <ion-datetime display-format="HH:mm" name="pickup" :max="maxHour" 
         :min="minHour" required=true 
          @input="hourPick = $event.target.value" 
          v-bind:value="minHour"> </ion-datetime>
        </ion-item>

        <ion-item>
          <ion-button color="primary" class="menu-col-6" size="large" @click="close">{{buttonCancel}}</ion-button>
          <ion-button color="primary" class="menu-col-6" size="large" @click="deliveryAction">{{buttonAcept}}</ion-button>
        </ion-item>
       
    </ion-card>      

       
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
import { Api } from '../../backoffice/api/api'
import { parsePhoneNumber } from 'libphonenumber-js'
import Moment from 'moment'


export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
    selected: { type: String },
    table: { type: String },
    buttonAcept: { type: String },
    buttonCancel: { type: String },
    placeholderEmail: { type: String },
    placeholderName: { type: String },
    placeholderPhone: { type: String },
    placeholderAddress: { type: String },
    placeholderCode: { type: String },
    placeholderPickUp: { type: String },
    requiredData: { type: String },
    zipCodeNotValid: { type: String },
    contactedBy: { type: String },
  },
  created: function(){
    this.getConfig();
  },
  data() {
    return {
      content: 'Content',

      CustomerName: '',
      email:'',
      phone:'' ,
      address:'',
      code:'',
      clientId:'',
      hourPick:new Date().getHours()+':' +new Date().getMinutes(),
      spinner: false,
      order:{},
      selectPickHour: false,
      minHour: '12:00',
      maxHour: '23:59',
      minTimeToCook: 0,      
      deliveryZone:'',
      zipCodes: [],
    }
  },
components:{  
  
  },
methods: {

  getConfig: function(){
    Api.fetchAll("Setting").then(response => {
        if(response.status === 200){
            console.log('Setting Data: ' + JSON.stringify(response.data[0]))
            this.selectPickHour = response.data[0].SelectPickHour;           
            this.minTimeToCook = response.data[0].MinTimeToCook;

            this.deliveryZone = response.data[0].DeliveryZone
            this.zipCodes = response.data[0].ZipCodes
           
            let min = Moment(response.data[0].PickFrom ,'kk:mm')       
            let max = Moment(response.data[0].PickTo ,'kk:mm')
            let now = Moment().add(this.minTimeToCook, 'minutes'); 
            
            max = max.subtract(1, 'minutes'); 

            this.minHour =  min.format('kk:mm');
            this.maxHour = max.format('kk:mm');
                   
            console.log(this.minHour + ' now: ' + now.format('kk:mm') + ' min: ' + min.format('kk:mm') + 'max: ' + max.format('kk:mm'))
                       
            if(now > min && now < max)
             this.minHour = now.format('kk:mm')
        }
    })
    .catch(e => {
        console.log(e)                
    });
  },
  
  close() {
    return this.$ionic.modalController.dismiss()
  },

  deliveryAction(){

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.email) == false)
            return this.alertEmailNotValid();


    if(this.email ==='' || this.name ==='' || this.phone ==='')
      return this.alertRequiredDatas();
    if(this.selected === 'Delivery' && ( this.address === '' || this.code===''))
      return this.alertRequiredDatas();
    if(this.selected === 'PickUp' && this.selectPickHour && this.pickup === '')
      return this.alertRequiredDatas();
            
    var client = {'EmailAddress': this.email,'Name':this.name,'Phone':this.phone}
    if(this.clientId === '')
      this.createCustomer(client);

    if(!this.selectPickHour )
      this.hourPick = '';

    this.order = {
      "OrderType":this.selected,
      "State":"Pending payment",
      "ClientId" : this.clientId,
      "AddressToDeliver": this.address +' ZipCode: '+ this.code,      
      "HourToPick": this.hourPick,
      "tableService": this.table,
    }       

    if(this.selected === 'Delivery'){     
      EventBus.$emit('addressToDeliver', this.address );      
      EventBus.$emit('orderType', 'Delivery' ); 
    }
    if(this.selected === 'PickUp'){
      EventBus.$emit('HourToPick', this.hourPick );      
      EventBus.$emit('orderType', 'PickUp' ); 
    }
    if(this.selected === 'On Table'){      
      EventBus.$emit('orderType', 'On Table' ); 
    }

    EventBus.$emit('updateOrder', this.order );  
    EventBus.$emit('clientHasOrderSelected', true );
    EventBus.$emit('openHome', true );      
    this.$ionic.modalController.dismiss()  
  },

  alertRequiredDatas(){
    return  this.$ionic.alertController
    .create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: this.requiredData,
        buttons: [                   
        {
          text: this.buttonAcept,
          handler: () => {                                 
                        
          },
        },
        ],
    })
    .then(a => a.present())
                
  },

  getClient(email){

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(email) == false)
            return this.alertEmailNotValid();

    this.spinner = true;

    Api.findCustomerByEmail(email)
      .then(response => { 
        this.spinner = false; 
        console.log(response.data)   
        if(response.data.length == 0 ) {
            console.log("cliente no existe")            
        }     
        else{           
          this.clientId = response.data[0]._id            
          this.CustomerName = response.data[0].Name  
          this.phone = response.data[0].Phone  
          this.email = response.data[0].EmailAddress 
          EventBus.$emit('clientHasId', this.clientId );
          EventBus.$emit('clientHasName', this.CustomerName );
          
        }                      
      })
      .catch(e => {
        console.log(e);
        this.spinner = false;
        return  this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Error',
                message: e,
                buttons: [                   
                {
                    text: this.buttonAcept,
                    handler: () => {                                 
                                  
                    },
                },
                ],
            })
            .then(a => a.present())
      })

    },

  createCustomer: function(client){
    this.spinner = true
    Api.postIn('Customer', client)
      .then(response => {
        this.spinner = false
        console.log("Success creted with _id" + response.data._id);
        console.log(response.data);
        this.clientId = response.data._id;
        this.CustomerName = response.data.Name;
        EventBus.$emit('clientHasId', this.clientId );  
        EventBus.$emit('clientHasName', this.CustomerName );        
        this.order.ClientId = this.clientId
        return this.marketingAction(response.data);             
      })
      .catch(e => {
        console.log(e);
        this.spinner = false
        return  this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Error',
                message: e,
                buttons: [                   
                {
                    text: this.buttonAcept,
                    handler: () => {                                 
                                  
                    },
                },
                ],
            })
            .then(a => a.present())
      })
  },

  marketingAction(client) {
    return this.$ionic.alertController
    .create({
      cssClass: 'my-custom-class',
      header: this.contactedBy,
      inputs: [ 
        {value: 'Email',  type: 'checkbox',  label: this.placeholderEmail, checked: true, },
        {value: 'Phone',  type: 'checkbox',  label: this.placeholderPhone, checked: false, },
      ],
      buttons: [
        {
          text: this.buttonCancel, role: 'cancel', cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          },
        },
        {
          text: this.buttonAcept,
          handler: (inputs) => {
            client.MarketingConsent = { 'Email': inputs.indexOf('Email') !== -1,
                                      'Phone': inputs.indexOf('Phone') !== -1}             
            this.updateCustomer(client)
          },
        },
      ],
    })
    .then(a => a.present())
  },

  updateCustomer: function(client){
    this.spinner = true
    Api.putIn('Customer', client)
      .then(response => {
        this.spinner = false
        return response;
      })
      .catch(e => {
        console.log(e);
        this.spinner = false
        return  this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Error',
                message: e,
                buttons: [                   
                {
                    text: this.buttonAcept,
                    handler: () => {                                 
                                  
                    },
                },
                ],
            })
            .then(a => a.present())
      })
  },

  validatePhone(phone){     
    if (!phone) {
      return true;
    }
    try {
       const number = parsePhoneNumber(`+1${phone}`);
      //const number = parsePhoneNumberFromString(`+1${phone}`);
     
      if (!number.isValid()) {       
        return false;         
      }   
      console.log(parsePhoneNumber(`+1${phone}`).formatNational())  
      this.phone = parsePhoneNumber(`+1${phone}`).formatNational();
      return true;
    } 
    catch (err) {     
      return false;
    }

 
  },

  ValidateCode(event){
    if(this.zipCodes.length > 0){
      const zip = this.zipCodes.filter(zc => zc === event);
      if(!zip.length >0)
        return this.alertCodeNotValid();     
    }
  },

  alertCodeNotValid(){
    return  this.$ionic.alertController
    .create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: this.zipCodeNotValid + ' << ' + this.deliveryZone + ' >>',
        buttons: [                   
        {
          text: this.buttonAcept,
          handler: () => {                                 
                        
          },
        },
        ],
    })
    .then(a => a.present())
                
  },

  alertEmailNotValid(){
    return  this.$ionic.alertController
    .create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: 'Not valid email',
        buttons: [                   
        {
          text: this.buttonAcept,
          handler: () => {                                 
                        
          },
        },
        ],
    })
    .then(a => a.present())
                
  },
}
 

}
</script>

<style>
  

  .menu-col-6{
    flex: 0 0 calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
}

</style>