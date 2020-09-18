<template>
    <ion-content id="product" class="product">
        
        <div v-if="spinner">
            <ion-spinner  name="lines" class="spinner"></ion-spinner>
        </div>

        <v-breakpoint  v-if="!spinner">
            <div slot-scope="scope">

                <span v-if="scope.isSmall || scope.isMedium || scope.noMatch" >

                   

                        <ion-card>

                            <ion-card-title 
                                style="padding: 10px;text-align: center;text-transform: uppercase;font-weight: bolder;">
                                {{$t('frontend.order.orderDetail')}} 
                            </ion-card-title>
                            
                                    
                            <ion-card>                    
                                <ion-label class="subtitles-order menu-col-4" style=" padding: 5px 10px; margin: 0;float: left;"> {{$t('frontend.order.client')}}: </ion-label>                   
                                <h3 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left;">  {{CustomerName}}</h3>

                                <h3 class="subtitles-order menu-col-4" style=" padding: 10px; margin: 0; float: left;"> {{order.OrderType}}: </h3>
                                <ion-datetime v-if="order.OrderType=='PickUp'" display-format="HH:mm" :value="orderInfo" @ionChange="changeOrderInfo( $event.target.value)" class="subtitles-order menu-col-8" style="width: 70%; float: left;text-align: left;"></ion-datetime>
                                <ion-input :value="orderInfo" v-if="order.OrderType=='Delivery'"   @change="changeOrderInfo( $event.target.value)" style="float: left;text-align: left;" class="subtitles-order menu-col-8" ></ion-input>
                                <ion-label v-if="order.OrderType=='On Table'" style=" float: left;text-align: left;" class="subtitles-order menu-col-4">{{ orderInfo}}</ion-label>
                            </ion-card>

                                    

                            <!-- <ion-card > -->

                                <ion-label class="ion-text-wrap">
                                    <h2 class="titles-order" style="width: 50%;float: left;">{{$t('frontend.order.products')}}</h2>
                                    <ion-button fill="outline"  style="float: right; margin-right: 10px;" @click="addProductsToCart"> + </ion-button>
                                </ion-label>

                                <ion-item-sliding>
                                    <ion-item >
                                        <!-- <ion-label class="ion-text-wrap menu-col-6"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.name')}}</h2> </ion-label> -->
                                        <ion-label class="ion-text-wrap menu-col-4"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.cant')}}</h3></ion-label>
                                        <ion-label class="ion-text-wrap menu-col-4"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.price')}}</h3></ion-label>
                                        <ion-label class="ion-text-wrap menu-col-4"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                                    </ion-item>
                                </ion-item-sliding>
                                <ion-item-sliding v-for="product in cart" v-bind:key="product.ProductId">
                                    <ion-item>
                                         <div class="ion-text-wrap menu-col-12" >
                                            <p>{{product.Name }}</p> 
                                        </div>   
                                    </ion-item>

                                    <ion-item>
                                       

                                        <div class="ion-text-wrap menu-col-4" style="    padding-right: 10px;" >
                                            <ion-input type="number"  style="border: 1px solid grey; text-align:center" 
                                            :value="product.Cant" 
                                            @input="product.Cant = $event.target.value" 
                                            @change="getOtherCharges"
                                            ></ion-input>
                                        </div>
                                            
                                        <ion-label class="ion-text-wrap menu-col-4" >
                                            <h3>$ {{ product.Price.toFixed(2)  }}</h3>
                                        </ion-label>
                                        <ion-label class="ion-text-wrap menu-col-4" >
                                            <h3>$ {{ (product.Cant * product.Price).toFixed(2)  }}</h3>
                                        </ion-label>
                                    </ion-item>
                            
                                    <ion-item-options side="end">                        
                                        <ion-item-option color="danger" @click="removeProductFromCart(product.ProductId)">
                                            <ion-icon slot="icon-only" name="trash" ></ion-icon>
                                        </ion-item-option>
                                    </ion-item-options>
                                    
                                </ion-item-sliding>

                                <ion-item-sliding>
                                    <ion-label class="ion-text-wrap" v-if="otherCharges != []">
                                        <h2 class="titles-order">{{$t('frontend.order.otherCharges')}}</h2> 
                                    </ion-label>
                                    <ion-spinner  name="lines" v-if="spinnerCharge" color="primary"></ion-spinner>
                                    <ion-item-sliding v-for="charge in otherCharges" v-bind:key="charge.Id">
                                        <ion-item>

                                            <div class="menu-col-8">
                                                <p>{{ charge.Name }}</p>
                                            </div>
                                            <ion-label  class="menu-col-4" >
                                                <h2>$ {{ charge.Price.toFixed(2) }}</h2>
                                            </ion-label>
                                            
                                        </ion-item>
                                    </ion-item-sliding>

                                </ion-item-sliding>

                                <ion-item-slidin style="border-top: 1px solid grey;" >
                                    <ion-item style="font-size: 16px;font-weight: bold;">
                                        <ion-label class="menu-col-4"></ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title">{{$t('frontend.order.subtotal')}}  </div></ion-label>
                                        <ion-label class="menu-col-4" >$ {{subTotal}}</ion-label>                    
                                    </ion-item>
                                    <ion-item style="font-size: 16px;font-weight: bold;"> 
                                        <ion-label class="menu-col-4"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right" ><div class="menu-bold-title"> {{$t('frontend.order.taxe')}}</div></ion-label>
                                        <ion-label class="menu-col-4">{{taxes}} %</ion-label>                    
                                    </ion-item>
                                    <ion-item v-if="order.OrderType=='Delivery'" style="font-size: 16px;font-weight: bold;" > 
                                        <ion-label class="menu-col-4"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right"> <div class="menu-bold-title">{{$t('frontend.order.deliver')}}  </div></ion-label>
                                        <ion-label class="menu-col-4">$ {{shipping}}</ion-label>                    
                                    </ion-item>
                                    <hr>
                                    <ion-item style="    color: red;    font-size: 16px;    font-weight: bold;    text-transform: uppercase;"> 
                                        <ion-label class="menu-col-4"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right" ><div class="menu-bold-title" style="color:red"> {{$t('frontend.order.total')}}  </div></ion-label>
                                        <ion-label class="menu-col-4"><div class="menu-bold-title" style=" color:red">$ {{total}}  </div></ion-label>                    
                                    </ion-item>
                                </ion-item-slidin>

                                <ion-item-slidin  >
                                    <ion-item style="padding:15px 0" >
                                        <ion-label class="ion-text-wrap" >
                                            <h2 class="titles-order"> {{$t('frontend.order.notes')}}</h2> 
                                        </ion-label>
                                
                                        <ion-textarea class="menu-textarea" @input="note = $event.target.value"></ion-textarea>
                                
                                    </ion-item>  
                                </ion-item-slidin>

                            <!-- </ion-card> -->
                            

                            <ion-card style="padding: 0 10px">

                                <ion-label class="ion-text-wrap" >
                                        <h2 class="titles-order">{{$t('frontend.order.payment')}}: </h2> 
                                </ion-label>

                                <ion-item>
                                    <div class="menu-col-6" ><p>{{$t('frontend.order.ccard')}}</p></div> 
                                    <ion-input type="number" required=true autocomplete="cc-number" class="menu-col-6"
                                    :value="cardNumber" @input="cardNumber = $event.target.value"
                                    @change="validateCard($event.target.value)" ></ion-input>
                                </ion-item>

                                <ion-item>
                                    <div class="menu-col-8" ><p>{{$t('frontend.order.expcard')}}</p></div>  
                                    <ion-datetime class="menu-col-4" display-format="YYYY-MM" :max="dateTodaymax + 4 " 
                                    :min="dateTodaymin" required=true @ionChange="expirationCard = $event.target.value"> </ion-datetime>
                                </ion-item>
                                                
                            </ion-card>
                        
                            <div style="padding: 20px 0; text-align: center">

                                <ion-button  fill="outline" @click="goHome">{{$t('frontend.home.cancel')}}</ion-button>
                                <ion-button  fill="outline"  @click="sendOrder">{{$t('frontend.order.pay')}}</ion-button>

                            </div>

                        </ion-card>
                </span>


                <span v-if="scope.isLarge || scope.isXlarge" > 

                     <div style="width: 80%; margin: 0 auto;">

                        <ion-card>

                            <ion-card-title 
                                style="padding: 10px;text-align: center;text-transform: uppercase;font-weight: bolder;">
                                {{$t('frontend.order.orderDetail')}} 
                            </ion-card-title>
                            
                                    
                            <ion-card>                    
                                <ion-label class="subtitles-order menu-col-4" style=" padding: 5px 10px; margin: 0;float: left;"> {{$t('frontend.order.client')}}: </ion-label>                   
                                <h3 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left;">  {{CustomerName}}</h3>

                                <h3 class="subtitles-order menu-col-4" style=" padding: 10px; margin: 0; float: left;"> {{order.OrderType}}: </h3>
                                <ion-datetime v-if="order.OrderType=='PickUp'" display-format="HH:mm" :value="orderInfo" @ionChange="changeOrderInfo( $event.target.value)" class="subtitles-order menu-col-8" style="width: 70%; float: left;text-align: left;"></ion-datetime>
                                <ion-input :value="orderInfo" v-if="order.OrderType=='Delivery'"   @change="changeOrderInfo( $event.target.value)" style="float: left;text-align: left;" class="subtitles-order menu-col-4" ></ion-input>
                                <ion-label v-if="order.OrderType=='On Table'" style=" float: left;text-align: left;" class="subtitles-order menu-col-4">{{ orderInfo}}</ion-label>
                            </ion-card>

                                    

                            <ion-card >

                                <ion-label class="ion-text-wrap">
                                    <h2 class="titles-order" style="width: 50%;float: left;">{{$t('frontend.order.products')}}</h2>
                                    <ion-button fill="outline"  style="float: right; margin-right: 10px;" @click="addProductsToCart"> + </ion-button>
                                </ion-label>

                                <ion-item-sliding>
                                    <ion-item >
                                        <ion-label class="ion-text-wrap menu-col-6"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.name')}}</h2> </ion-label>
                                        <ion-label class="ion-text-wrap menu-col-2"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.cant')}}</h3></ion-label>
                                        <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.price')}}</h3></ion-label>
                                        <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                                    </ion-item>
                                </ion-item-sliding>
                                <ion-item-sliding v-for="product in cart" v-bind:key="product.ProductId">
                                    <ion-item>
                                        <ion-label class="ion-text-wrap menu-col-6" >
                                            <h2>{{ product.Name }}</h2> 
                                        </ion-label>   

                                        <div class="ion-text-wrap menu-col-2" style="    padding-right: 10px;" >
                                            <ion-input type="number"  style="border: 1px solid grey; text-align:center" 
                                            :value="product.Cant" 
                                            @input="product.Cant = $event.target.value" 
                                            @change="getOtherCharges"
                                            ></ion-input>
                                        </div>
                                            
                                        <ion-label class="ion-text-wrap menu-col-2" >
                                            <h3>$ {{ product.Price.toFixed(2)  }}</h3>
                                        </ion-label>
                                        <ion-label class="ion-text-wrap menu-col-2" >
                                            <h3>$ {{ (product.Cant * product.Price).toFixed(2)  }}</h3>
                                        </ion-label>
                                    </ion-item>
                            
                                    <ion-item-options side="end">                        
                                        <ion-item-option color="danger" @click="removeProductFromCart(product.ProductId)">
                                            <ion-icon slot="icon-only" name="trash" ></ion-icon>
                                        </ion-item-option>
                                    </ion-item-options>
                                    
                                </ion-item-sliding>

                                <ion-item-sliding>
                                    <ion-label class="ion-text-wrap" v-if="otherCharges != []">
                                        <h2 class="titles-order">{{$t('frontend.order.otherCharges')}}</h2> 
                                    </ion-label>
                                    <ion-spinner  name="lines" v-if="spinnerCharge" color="primary"></ion-spinner>
                                    <ion-item-sliding v-for="charge in otherCharges" v-bind:key="charge.Id">
                                        <ion-item>

                                            <ion-label class="menu-col-6">
                                                <h2>{{ charge.Name }}</h2>
                                            </ion-label>
                                            <ion-label  class="menu-col-2"> </ion-label>
                                            <ion-label  class="menu-col-2"> </ion-label>
                                            <ion-label  class="menu-col-2" >
                                                <h2>$ {{ charge.Price.toFixed(2) }}</h2>
                                            </ion-label>
                                            
                                        </ion-item>
                                    </ion-item-sliding>

                                </ion-item-sliding>

                                <ion-item-slidin style="border-top: 1px solid grey;" >
                                    <ion-item style="font-size: 16px;font-weight: bold;">
                                        <ion-label class="menu-col-6"></ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title">{{$t('frontend.order.subtotal')}}  </div></ion-label>
                                        <ion-label class="menu-col-2" >$ {{subTotal}}</ion-label>                    
                                    </ion-item>
                                    <ion-item style="font-size: 16px;font-weight: bold;"> 
                                        <ion-label class="menu-col-6"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right" ><div class="menu-bold-title"> {{$t('frontend.order.taxe')}}</div></ion-label>
                                        <ion-label class="menu-col-2">{{taxes}} %</ion-label>                    
                                    </ion-item>
                                    <ion-item v-if="order.OrderType=='Delivery'" style="font-size: 16px;font-weight: bold;" > 
                                        <ion-label class="menu-col-6"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right"> <div class="menu-bold-title">{{$t('frontend.order.deliver')}}  </div></ion-label>
                                        <ion-label class="menu-col-2">$ {{shipping}}</ion-label>                    
                                    </ion-item>
                                    <hr>
                                    <ion-item style="    color: red;    font-size: 16px;    font-weight: bold;    text-transform: uppercase;"> 
                                        <ion-label class="menu-col-6"> </ion-label>
                                        <ion-label class="menu-col-4" style="text-align:right" ><div class="menu-bold-title" style="color:red"> {{$t('frontend.order.total')}}  </div></ion-label>
                                        <ion-label class="menu-col-2"><div class="menu-bold-title" style=" color:red">$ {{total}}  </div></ion-label>                    
                                    </ion-item>
                                </ion-item-slidin>

                                <ion-item-slidin  >
                                    <ion-item style="padding:15px 0" >
                                        <ion-label class="ion-text-wrap" >
                                            <h2 class="titles-order"> {{$t('frontend.order.notes')}}</h2> 
                                        </ion-label>
                                
                                        <ion-textarea class="menu-textarea" @input="note = $event.target.value"></ion-textarea>
                                
                                    </ion-item>  
                                </ion-item-slidin>

                            </ion-card>
                            

                            <ion-card style="padding: 0 10px">

                                <ion-label class="ion-text-wrap" >
                                        <h2 class="titles-order">{{$t('frontend.order.payment')}}: </h2> 
                                </ion-label>

                                <ion-item>
                                    <ion-label class="menu-col-6" >{{$t('frontend.order.ccard')}}</ion-label> 
                                    <ion-input type="number" required=true autocomplete="cc-number" class="menu-col-6"
                                    :value="cardNumber" @input="cardNumber = $event.target.value"
                                    @change="validateCard($event.target.value)" ></ion-input>
                                </ion-item>

                                <ion-item>
                                    <ion-label class="menu-col-6" >{{$t('frontend.order.expcard')}}</ion-label>  
                                    <ion-datetime class="menu-col-6" display-format="YYYY-MM" :max="dateTodaymax + 4 " 
                                    :min="dateTodaymin" required=true @ionChange="expirationCard = $event.target.value"> </ion-datetime>
                                </ion-item>
                                                
                            </ion-card>
                        
                            <div style="padding: 20px 0; text-align: center">

                                <ion-button  fill="outline" @click="goHome">{{$t('frontend.home.cancel')}}</ion-button>
                                <ion-button  fill="outline"  @click="sendOrder">{{$t('frontend.order.pay')}}</ion-button>

                            </div>

                        </ion-card>

                    </div>
                    
                </span>
            </div>
        </v-breakpoint>

       

    </ion-content>
</template>

<script>

import { eye } from "ionicons/icons";
import { addIcons } from "ionicons";
// const valid = require("card-validator");

addIcons({
  "ios-eye": eye.ios,
  "md-eye": eye.md,
});

import { Api } from '../../backoffice/api/api.js';
import { payAuthorizeNet } from '../../backoffice/api/payments.js';
import { EventBus } from '../event-bus';
import { VBreakpoint } from 'vue-breakpoint-component'

//import {moment} from 'moment'


export default {
   name: 'product',
   created: function(){
       this.cart = this.$route.params.cart;      
       this.order = this.$route.params.order; 
       
      this.getOrderInfo();
      this.getOtherCharges();
      this.getTax();
      this.getShipping();
      
   },
   data () {
    return {
     barcode:'',
      modelName: 'Order',
      cart: [],
      order:{},
      categories: [],
      products: [],
      note:'',
      orderInfo:"",
      CustomerName:"",
      CustomerEmail:"",
      otherCharges:[],
      taxes: 1,
      taxesName: '',
      shipping: 0,
      shippingName: '',
      spinner: false ,  
      spinnerCharge: false,    
      dateTodaymin: new Date().toISOString().substr(0, 7),
      dateTodaymax:  new Date().getFullYear(),
      cardNumber:'',
      expirationCard:''
    }
  }, 
  computed: {
   
    subTotal(){
          let total = 0;
          for (const obj of this.cart){
              total += obj.Price * obj.Cant;
          }
           for (const obj of this.otherCharges){
              total += obj.Price ;
          }
          return total.toFixed(2);
      },
   
   total(){
        let percent = ( (this.subTotal * this.taxes) / 100) ;        
        let t= parseFloat(this.subTotal) + parseFloat(percent) + parseFloat(this.shipping);       
        return t.toFixed(2);
      }
  },
   components:{
    VBreakpoint: VBreakpoint
  }, 
   methods: {
    
    totalByProduct(cant, price){
        return cant * price;
    } ,
    
    sendOrder:  function(){
        if(this.cardNumber ==='' || this.expirationCard === '')
                  return this.alertRequiredDatas();

        this.spinner = true

        this.order.Products = this.cart;
        if(this.note !='')
            this.order.Note = this.note;
        if(this.otherCharges !=[])
            this.order.OtherCharges = this.otherCharges;
        if(this.total !='')
            this.order.Total = this.total;
        if(this.subTotal !='')
            this.order.SubTotal = this.subTotal;
        if(this.taxes !='')
            this.order.Taxe = this.taxes;
        if(this.shipping !=0)
            this.order.Shipping = this.shipping;

        console.log(this.order)
        
        Api.postIn(this.modelName, this.order)
        .then(response => {
            this.spinner = false
            this.order = response.data;
              
             return this.sendPayment(response.data._id, response.data.ClientId);          
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
                          text:  this.$t('frontend.home.acept'),
                          handler: () => {                                 
                                        
                          },
                      },
                      ],
                  })
                  .then(a => a.present())
        })        
    },

    sendPayment: function(orderId, ClientId){

        this.spinner = true

        let listItems= {}
        for(var i=0; i< this.order.Products.length; i++){
             listItems[`lineItem${i+1}`] = { //Un producto determinado
                        "itemId":this.order.Products[i].ProductId,
                        "name": this.order.Products[i].Name,
                        "description": this.order.Products[i].Name,
                        "quantity": this.order.Products[i].Cant,
                        "unitPrice": this.order.Products[i].Price.toString(),
                    }     
        }
       
       var payDatas = {
            "transactionRequest":{
                "amount": this.order.Total.toString(), //Total amount of the transaction, include tax, shipping, other charges...
                "payment": {
                    "creditCard": {
                        "cardNumber": this.cardNumber,
                        "expirationDate": this.expirationCard.substr(0, 7),
                    },
                },    
                "lineItems": listItems,
                "tax": { //Opcional
                    "amount": this.taxes.toString(),
                    "name": this.taxesName,
                },
                "shipping": { //Opcional
                    "amount": this.shipping.toString(),
                    "name": this.shippingName,
                    },
                "poNumber": orderId, //Id de la orden
                "customer": { //opcional
                    // "id": "", //Id del cliente ClientId
                    "email": this.CustomerEmail //email del cliente
                }
            }  
        };
        console.log('pay data' + payDatas)

        payAuthorizeNet.pay(payDatas)
          .then(response => {

            this.spinner = false
             console.log(response);
              if(response.status===200 && response.data.messages.resultCode==='Ok'  ){

                this.order.State = "Started";
                Api.putIn('Order', this.order).then(response => {                
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                });                 

                return  this.$ionic.alertController
                .create({
                    cssClass: 'my-custom-class',
                    header: this.$t('frontend.order.transictionTitle'),
                    message: this.$t('frontend.order.transictionOk'),
                    buttons: [                   
                    {
                        text:  this.$t('frontend.home.acept'),
                        handler: () => {  
                               
                            this.cart = [];       
                            EventBus.$emit('updateCart', this.cart ); 
                            EventBus.$emit('clientHasOrder', true ); 
                            EventBus.$emit('clientHasOrderSelected', false );                                        
                            return this.$router.push({ name: 'ListOrder', params: {customerId: ClientId, CustomerName: this.CustomerName} })                   
                                      
                        },
                    },
                    ],
                })
                .then(a => a.present())
              }
              else{

                return  this.$ionic.alertController
                    .create({
                        cssClass: 'my-custom-class',
                        header: this.$t('frontend.order.transictionTitle'),
                        message: response.data.messages.message[0].text,
                        buttons: [                   
                        {
                            text: this.$t('frontend.home.acept'),
                            handler: () => {                                 
                                          
                            },
                        },
                        ],
                    })
                    .then(a => a.present())
              }
        })
        .catch(e => {
         this.spinner = false
          console.log(e)
                return  this.$ionic.alertController
                    .create({
                        cssClass: 'my-custom-class',
                        header: this.$t('frontend.order.transictionTitle'),
                        message: this.$t('frontend.order.transictionError'),
                        buttons: [                   
                        {
                            text: this.$t('frontend.home.acept'),
                            handler: () => {                                 
                                          
                            },
                        },
                        ],
                    })
                    .then(a => a.present())

        });


    },

    getOrderInfo: function(){
        if(this.order.OrderType == 'Delivery')
            this.orderInfo = this.order.AddressToDeliver;
        if(this.order.OrderType == 'PickUp')
            this.orderInfo = this.order.HourToPick;
        if(this.order.OrderType == 'On Table')
            this.orderInfo = this.order.tableService;

            this.spinner = true

         Api.fetchById('Customer', this.order.ClientId)
        .then(response => {   
             this.spinner = false
            this.CustomerEmail = response.data.EmailAddress;                   
            return this.CustomerName = response.data.Name;
        })
        .catch(e => {
             this.spinner = false
            console.log(e);
            return  this.$ionic.alertController
                  .create({
                      cssClass: 'my-custom-class',
                      header: 'Error',
                      message: e,
                      buttons: [                   
                      {
                          text:  this.$t('frontend.home.acept'),
                          handler: () => {                                 
                                        
                          },
                      },
                      ],
                  })
                  .then(a => a.present())
        })         
    },

    getOtherCharges: function(){

        this.spinnerCharge = true;

        this.otherCharges = []
        for (const obj of this.cart){
            Api.findProductCharges(obj.ProductId, obj.Cant).then(response => {
                this.otherCharges = this.otherCharges.concat( response.data)
                console.log(JSON.stringify(this.otherCharges))
                this.spinnerCharge = false;
                })
                .catch(e => {
                    console.log(e)
                });  
         }
    },

    getShipping: function(){
        if(this.order.OrderType=='Delivery' ){

        Api.getAvailbleShipping().then(response => {            
                this.shippingName = response.data.Name
                this.shipping = response.data.Price
                this.shipping =  this.shipping.toFixed(2) 
            console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            }); 
        }  
   },

    getTax: function(){
       Api.getAvailbleTax().then(response => {
            this.taxesName = response.data.Name
            this.taxes = response.data.Percent
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        });   
   },
   
    goHome: function(){
       this.cart = [];
       this.order = {};
       EventBus.$emit('updateCart', this.cart );
       console.log(this.cart.length)
       return this.$router.push({ name: 'Home', params: {cart:this.cart, order:this.order } })
    },

    removeProductFromCart: function(id){
        const element = (elem) => elem.ProductId == id;
        var index =this.cart.findIndex(element)
        this.cart.splice(index, 1)
        EventBus.$emit('updateCart', this.cart );
        this.getOtherCharges();
        if(this.cart.length == 0){
            return this.$router.push({ name: 'Home', params: {cart:this.cart } })
        }
    },
    
    addProductsToCart: function(){   
        return this.$router.push({ name: 'Home', params: {cart: this.cart, order: this.order, clientId:this.order.ClientId } })
    },

    changeOrderInfo: function(event){
         if(this.order.OrderType == 'Delivery')
          this.order.AddressToDeliver = event;
         if(this.order.OrderType == 'PickUp')
          this.order.HourToPick = event;
        if(this.order.OrderType == 'On Table')
          this.order.tableService = event;
         
         this.orderInfo = event;
         console.log(this.orderInfo)
            
    },

    alertRequiredDatas(){
      return  this.$ionic.alertController
      .create({
          cssClass: 'my-custom-class',
          header: 'Error',
          message: this.$t('frontend.home.errorRequired'),
          buttons: [                   
          {
              text: this.$t('frontend.home.acept'),
              handler: () => {                                 
                            
              },
          },
          ],
      })
      .then(a => a.present())
                  
    },

    validateCard(event){
        var valid = require("card-validator");
 
        var numberValidation = valid.number(event);
 
        if (!numberValidation.isValid) {
            this.cardNumber = ""
            return  this.$ionic.alertController
                .create({
                    cssClass: 'my-custom-class',
                    header: 'Error',
                    message: this.$t('frontend.order.notValidCC'),
                    buttons: [                   
                    {
                        text: this.$t('frontend.home.acept'),
                        handler: () => {                                 
                                        
                        },
                    },
                    ],
                })
                .then(a => a.present())
                    }
 
        else {
         this.cardNumber = event;
        }   
        
    },

   }

}
</script>

<style >
    .menu-bold-title{
        font-size: 16px;font-weight: bold;text-align: left;
    }
    .titles-order{
    font-size: 20px !important;
    font-weight: bold !important;
    text-align: left;
    padding: 10px;
    position: inherit;
    color: black;    
    }
    .subtitles-order{
    font-size: 16px !important;
    font-weight: bold !important;
    text-align: left;
    padding: 10px;
    position: inherit;
    color: black;    
    }
    .menu-textarea {
        border: 1px solid #80808073;
        margin-bottom: 20px;
    }
 .menu-col-3{
        flex: 0 0 calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }
    .menu-col-8{
        flex: 0 0 calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }
    .menu-col-4{
        flex: 0 0 calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }
    .menu-col-6{
        flex: 0 0 calc(calc(6 / var(--ion-grid-columns, 12)) * 100%) !important;
        width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%) !important;
        max-width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%) !important;
        text-align: left;
    }
    .menu-col-2{
        flex: 0 0 calc(calc(2 / var(--ion-grid-columns, 12)) * 100%) !important;
        width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%) !important;
        max-width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%) !important;
        text-align: left;
    }
    .menu-bold-title{
        padding-right: 15px;
    }

    .modalH {
        height: 40%;
        width: 70%;
        border-radius:10px;
        border: 1px solid  grey;
        top: 20%;
        margin: 0 auto;
    }
  
</style>