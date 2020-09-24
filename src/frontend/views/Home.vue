<template>

    <ion-content padding >  
      <div v-if="spinner">
        <ion-spinner  name="lines" class="spinner"></ion-spinner>
      </div>

      <div v-if="!spinner && clientId !=''">        
          <ion-button :disabled="isDelivery" :color="isDelivery ? 'primary' : 'light'" @click="deliveryAction">{{$t('frontend.app.deliver')}}</ion-button>
          <ion-button :disabled="isPick" :color="isPick ? 'primary' : 'light'" v-if="selectPickHour" @click="pickAction">{{$t('frontend.app.pickup')}}</ion-button>
          <ion-button :disabled="isPick" :color="isPick ? 'primary' : 'light'" v-if="!selectPickHour" @click=" sinPickAction ">{{$t('frontend.app.pickup')}}</ion-button>
          <ion-button :disabled="isTable" :color="isTable ? 'primary' : 'light'" @click="show">{{$t('frontend.app.table')}}</ion-button> 
          <ion-button color="primary"  @click="productDetails">{{cart.length}}<ion-icon name="cart"></ion-icon></ion-button>
      </div>
     

      <modal name="my-first-modal" width="80%" height="80%">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ $t('frontend.home.tableQr') }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <div class="ion-padding" style="height: 90%">            
          <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>

    
      </modal>
       
      <div  v-if="!showProduct && !spinner && clientId !=''">
        <h1>{{$t('frontend.home.selectCategory')}}</h1>

      <v-breakpoint>
         <div slot-scope="scope">
              <span v-if="scope.isSmall || scope.noMatch" > 
                <div  v-for="category in categories" :key="category.Id" class="menu-col-12 card-category">
                  <ion-card  >
                
                    <ion-item @click="productsByCategory(category._id, category.Name)">
                      <ion-label class="ion-text-wrap menu-col-6" >
                          <img :src="category.ImageUrl">
                      </ion-label>
                      <ion-label class="ion-text-wrap menu-col-6" >
                          <h1>{{category.Name}}</h1>
                          <p> {{category.Description}}</p>
                      </ion-label>  
                    </ion-item>
                    
                  </ion-card>
                </div>
            
             </span>
          <span v-if="scope.isMedium" > 
            <div  v-for="category in categories" :key="category.Id" class="menu-col-6 card-category">
              <ion-card  >
             
                <ion-item @click="productsByCategory(category._id, category.Name)">
                  <ion-label class="ion-text-wrap menu-col-6" >
                      <img :src="category.ImageUrl">
                  </ion-label>
                  <ion-label class="ion-text-wrap menu-col-6" >
                      <h1>{{category.Name}}</h1>
                      <p> {{category.Description}}</p>
                  </ion-label>  
                </ion-item>
                 
              </ion-card>
            </div> 
          </span>
          <span v-if="scope.isLarge || scope.isXlarge" > 
            <div  v-for="category in categories" :key="category.Id" class="menu-col-4 card-category">
              <ion-card  >
            
                <ion-item @click="productsByCategory(category._id, category.Name)">
                  <ion-label class="ion-text-wrap menu-col-6" >
                      <img :src="category.ImageUrl">
                  </ion-label>
                  <ion-label class="ion-text-wrap menu-col-6" >
                      <h1>{{category.Name}}</h1>
                      <p> {{category.Description}}</p>
                  </ion-label>  
                </ion-item>
                
              </ion-card>
            </div>
          </span>
        </div>
      </v-breakpoint>

        
        
      </div>


      <vue-product  v-if="showProduct && !spinner"
       :cart="cart" :prod="this.prod" :category="this.categoryName"></vue-product>

      

    </ion-content>
</template>

<script>

import { add } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "ios-add": add.ios,
  "md-add": add.md,
  
});

import { Api } from '../../backoffice/api/api.js';
import { EventBus } from '../event-bus';
 import Products from './Products'
 import { QrcodeStream } from 'vue-qrcode-reader'
 import { VBreakpoint } from 'vue-breakpoint-component'
 import Moment from 'moment'

export default {
  name: "HomePage",
  props: {
    msg: String
  },
  created: function(){
 
    EventBus.$on('clientHasOrderSelected', (value) => {    
        this.orderSelected = value; 
    });

    EventBus.$on('showProduct', (value) => {
      this.showProduct = value;           
    });

    if (this.$route.params.cart)
   {
     this.cart = this.$route.params.cart;
   }

 
  
    if (this.$route.params.clientId) {
     this.clientId = this.$route.params.clientId;
   }
    
    if (this.$route.params.order) {
        this.order = this.$route.params.order;
        this.orderType = this.order.OrderType;
        this.clientId = this.order.ClientId;

        this.changeOrderButton()

      }
 
   this.fetchProducts();   

   this.fetchCategories();

   this.getConfig();

  },
  data () {
    return {
      modelName: 'Customer',
      isDelivery: false,
      isPick: false,
      isTable: false,
      orderSelected: true,
      clientId:'',
      addressToDeliver:'',
      hourToPick: '',
      tabeService:'',
      products: [],      
      categories: [],
      prod: [],
      cart: [],
      spinner: false,
      timeToPick: true,
      rangeToPick: '',
      rangeToCook: '',
      rangeMssg: '',
      minHour: '12:00',
      maxHour:'20:00',
      
      orderType:'',     
      CustomerName :'',     
      tableService:'',
      order:{},
      clientHasOrder: false,  

      showProduct: false,
      categoryName: '',
      selectPickHour: false,
    }
  }, 
  components:{
    vueProduct: Products,
    VBreakpoint: VBreakpoint,
    QrcodeStream: QrcodeStream
  },  
  methods: {

    getConfig: function(){
      this.spinner = true;
      Api.fetchAll("Setting").then(response => {
        this.spinner = false;
          if(response.status === 200){
              console.log('Setting Data: ' + JSON.stringify(response.data[0]))
              this.selectPickHour = response.data[0].SelectPickHour;

              let minTimeToCook = response.data[0].MinTimeToCook;            
              let now = Moment().add(minTimeToCook, 'minutes');  
              let min = Moment(response.data[0].PickFrom ,'kk:mm')                  
              let max = Moment(response.data[0].PickTo ,'kk:mm')
              max = max.subtract(1, 'minutes'); 

              this.minHour =  min.format('kk:mm');
              this.maxHour = max.format('kk:mm');

              this.rangeToPick = response.data[0].PickFrom + ' - ' + response.data[0].PickTo;
              this.rangeToCook = response.data[0].MinTimeToCook
            
              if(now > max)
                this.timeToPick = false;
              if(now > min && now < max)
                this.minHour = now.format('kk:mm')

              this.rangeMssg = this.minHour + ' - ' + this.maxHour;
          }
      })
      .catch(e => {
        this.spinner = false;
          console.log(e)                
      });
    },

    show () {
      this.$modal.show('my-first-modal');
        },
    
    hide () {
      this.$modal.hide('my-first-modal');
        },

    onDecode (result) {
        this.result = result      
        this.tableAction(result)
        this.hide();
      },

    onInit (promise) {
      promise.then(() => {
        console.log('Successfully initilized! Ready for scanning now!')
      })
       .catch (error => {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      })
    },

    fetchProducts: function(){
      this.spinner = true
      Api.fetchAll("Product").then(response => {
        this.products = response.data
        this.spinner = false
      })
      .catch(e => {
        this.spinner = false
        console.log(e)
         return  this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Error',
                message: e,
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

    fetchCategories: function(){
      this.spinner =true
      console.log(this.spinner)
      Api.fetchAll("Category").then(response => {
        this.categories = response.data
        this.spinner =false
      })
      .catch(e => {
        console.log(e)
        this.spinner =false
        return  this.$ionic.alertController
              .create({
                  cssClass: 'my-custom-class',
                  header: 'Error',
                  message: e,
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
     
    productsByCategory(categoryId, categoryName){       
      if(this.orderType === '')
      {
         return this.alertSelectOrderType();
      }
       this.spinner = true;
      this.categoryName = categoryName;
      Api.getProductsByCategory(categoryId).then(response => {
          this.prod = response.data
           this.showProduct = true;
           this.spinner = false;
        })
        .catch(e => {
           this.spinner = false;
          console.log(e)
           return  this.$ionic.alertController
                    .create({
                        cssClass: 'my-custom-class',
                        header: 'Error',
                        message: e,
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

    productDetails: function(){
      var mess = "";
      this.cart.forEach(p =>   
      
      mess += `<ion-row>  <ion-col size="6">`+`${p.Name}`+ `  </ion-col> <ion-col size="3">` + `${p.Cant}`
      +`  </ion-col>` +`  </ion-col> <ion-col size="3">`  + `${p.Price}` + `  </ion-col>`   + `  </ion-row> `
       
      );
      console.log(mess);
      return this.$ionic.alertController
      .create({
        header: this.$t('frontend.home.cardTitle') ,
        subHeader: this.$t('frontend.home.cardheader') +": "+ this.cart.length,
        message: mess,
        buttons: [
          {text: this.$t('frontend.home.cancel'),role: 'cancel', cssClass: 'secondary',
            handler: () => {                
              console.log('Confirm Cancel')
            },
          },
          {
            text: this.$t('frontend.home.checkout'),
            handler: () => {   
              console.log('Order in Home' + JSON.stringify(this.order)     )
              if(this.cart.length > 0) 
                this.$router.push({ name: 'Order', params: {cart: this.cart, order: this.order  } })
            },
          },
        ],
      })
      .then(a => a.present())
    },
    
    checkCart: function(){
        return this.cart.length > 0;
    },

    deliveryAction() {              
      return this.$ionic.alertController
      .create({
        cssClass: 'my-custom-class',
        header: this.$t('frontend.home.deliverDetail') ,         
        inputs: [  
          { type:'text', name: 'address',id:'address-id',placeholder: this.$t('frontend.home.address') },         
        ],        
        buttons: [
          {text: this.$t('frontend.home.cancel'),role: 'cancel', cssClass: 'secondary',
            handler: () => {                
              console.log('Confirm Cancel')
            },
          },
          {
            text: this.$t('frontend.home.acept'),
            handler: (data) => {
                if(data.address==='')
                  return this.alertRequiredDatas();              
              
              this.orderType = "Delivery"
              this.address = data.address
              this.changeOrderButton();  
              this.order.OrderType = "Delivery";
              this.order.AddressToDeliver = this.address; 
              this.order.ClientId = this.clientId,  
             
              EventBus.$emit('addressToDeliver', this.address );      
              EventBus.$emit('orderType', 'Delivery' ); 
              EventBus.$emit('updateOrder', this.order );

              this.showProduct = false; 
              
              console.log(JSON.stringify(this.order))
            },
          },
        ],
      })
      .then(a => a.present())
    },

    pickAction() {
      this.getConfig(); 

       if(!this.timeToPick )
        return this.alertNoTimeToPick();

      return this.$ionic.alertController
      .create({
        cssClass: 'my-custom-class',
        header: this.$t('frontend.home.pickupDetail'),
        message: "Horario de recogida disponible: " + this.rangeMssg,
        inputs: [         
          {name: 'hourPick',  type: 'time', value:this.minHour, min: "14:00", max: '15:18' },
        ],
        buttons: [
          {
            text: this.$t('frontend.home.cancel'),  role: 'cancel', cssClass: 'secondary',
            handler: () => {                
              console.log('Confirm Cancel')
            },
          },
          {
            text: this.$t('frontend.home.acept'),
            handler: (data) => {
               if(data.hourPick==='')
                  return this.alertRequiredDatas();

              let now = Moment(data.hourPick ,'kk:mm')
              let min = Moment(this.minHour,'kk:mm')                  
              let max = Moment(this.maxHour ,'kk:mm')
              if(now < min || now > max)
                return this.alertNoTimeToPick()

              this.orderType = "PickUp"
              this.hourToPick = data.hourPick
              this.changeOrderButton(); 
              this.order.OrderType = "PickUp";
              this.order.HourToPick = this.hourToPick;   
              
              EventBus.$emit('HourToPick', this.hourToPick );      
              EventBus.$emit('orderType', 'PickUp' ); 
              EventBus.$emit('updateOrder', this.order );

              this.showProduct = false;  
              console.log(JSON.stringify(this.order))
          
            },
          },
        ],
      })
      .then(a => a.present())
    },

    sinPickAction() {
        this.orderType = "PickUp"
        this.hourToPick = ''
        this.changeOrderButton(); 
        this.order.OrderType = "PickUp";
        this.order.HourToPick = this.hourToPick;         
        EventBus.$emit('HourToPick', this.hourToPick );      
        EventBus.$emit('orderType', 'PickUp' ); 
        EventBus.$emit('updateOrder', this.order );
        this.showProduct = false;
    },

    tableAction: async function(value) {

      this.spinner = true

      Api.fetchById("Table", value).then(response => {        
      this.spinner = false
        if(response.status === 200){
          
          this.tableService = response.data.Name
          this.orderType = "On Table" 
          this.showProduct = false;
          this.isDelivery = false;
          this.isPick = false;
          this.isTable = true;             
          this.order.OrderType = "On Table";
          this.order.tableService = this.tableService;        
          EventBus.$emit('orderType', 'On Table' );
          EventBus.$emit('updateOrder', this.order );
          this.changeOrderButton();                  
          console.log(JSON.stringify(this.order))
          this.spinner = false             
        }
      })
      .catch(e => {
        this.spinner = false
        console.log(e)
        return this.notValidQr();
      });
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

    alertNoTimeToPick(){
      return  this.$ionic.alertController
      .create({
          cssClass: 'my-custom-class',
          header: 'Info',
          message: this.$t('frontend.home.notTimeToPick') + this.rangeToPick + this.$t('frontend.home.cookTime') + this.rangeToCook + this.$t('frontend.home.minuts'),
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
     alertSelectOrderType(){
      return  this.$ionic.alertController
      .create({
          cssClass: 'my-custom-class',
          header: 'Error',
          message: this.$t('frontend.home.selectOrderType'),
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

     notValidQr(){
      this.changeOrderButton(); 
      return  this.$ionic.alertController
      .create({
          cssClass: 'my-custom-class',
          header: 'Error',
          message: this.$t('frontend.home.notValidQr'),
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

    changeOrderButton: function(){
      console.log('order type: '+ this.orderType)
       if(this.orderType === 'Delivery'){         
        this.isDelivery = true;
        this.isPick = false;
        this.isTable = false;   
       }
      if(this.orderType === 'PickUp'){
        this.isDelivery = false;
        this.isPick = true;
        this.isTable = false;   
       }
       if(this.orderType === 'On Table'){
        this.isDelivery = false;
        this.isPick = false;
        this.isTable = true; 
         
       }
       console.log('on table: ' + this.isTable)
         console.log('pick: ' + this.isPick)
         console.log('delivery: ' + this.isDelivery)
    }

  },
};

</script>


<style scoped>

  .menu-col-2{
        flex: 0 0 calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
    }
      .menu-col-5{
        flex: 0 0 calc(calc(5 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(5 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(5 / var(--ion-grid-columns, 12)) * 100%);
        padding: 0 5px;
    }
    .menu-col-6{
        flex: 0 0 calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        padding: 0 5px;
    }
    .menu-col-4{
    flex: 0 0 calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(4 / var(--ion-grid-columns, 12)) * 100%);
    padding: 0 5px;
    }
    .menu-col-12{
        flex: 0 0 calc(calc(12 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(12 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(12 / var(--ion-grid-columns, 12)) * 100%);
        padding: 0 5px;
    }
    .card-category{
      float: left;
      margin: 0;
      height: 150px;
      padding: 10px 2px;
    }
    .card-category .sc-ion-card-md-s img {
    height: 120px;
    }
    .card-category .sc-ion-card-md-h:hover{
      box-shadow: 0 4px 1px 6px rgba(0,0,0,.2), 0 2px 2px 0 rgb(61 58 55 / 14%), 0 1px 5px 0 rgba(0,0,0,.12);
    }
</style>