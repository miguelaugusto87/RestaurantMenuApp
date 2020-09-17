<template>

    <ion-content padding >  
      <div v-if="spinner">
        <ion-spinner  name="lines" class="spinner"></ion-spinner>
      </div>

      <div v-if="!spinner">        
          <ion-button :disabled="isDelivery" :color="isDelivery ? 'primary' : 'light'" @click="deliveryAction">{{$t('frontend.app.deliver')}}</ion-button>
          <ion-button :disabled="isPick" :color="isPick ? 'primary' : 'light'" @click="pickAction">{{$t('frontend.app.pickup')}}</ion-button>
          <ion-button :disabled="isTable" :color="isTable ? 'primary' : 'light'" @click="openModal">{{$t('frontend.app.table')}}</ion-button> 
          <ion-button color="primary"  @click="productDetails">{{cart.length}}<ion-icon name="cart"></ion-icon></ion-button>
      </div>
      {{isDelivery}} |  {{isPick}} | {{isTable}} 


       
      <div  v-if="!showProduct && !spinner">
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
 import QrCode from '../components/QrCode'
 import { VBreakpoint } from 'vue-breakpoint-component'

export default {
  name: "HomePage",
  props: {
    msg: String
  },
  mounted: function(){

  },
  created: function(){

    // this.devWidth = this.platform.width();

    

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
  

  if (this.$route.params.clientId)
   {
     this.clientId = this.$route.params.clientId;
   }
  

  if (this.$route.params.order)
   {
     this.order = this.$route.params.order;
      this.orderType = this.order.OrderType;
      this.clientId = this.order.ClientId;
       
       if(this.order.OrderType === 'Delivery'){
         
        this.isDelivery = true;
        this.isPick = false;
        this.isTable = false;   
       }
      if(this.order.OrderType === 'PickUp'){
        this.isDelivery = false;
        this.isPick = true;
        this.isTable = false;   
       }
       if(this.order.OrderType === 'On Table'){
        this.isDelivery = false;
        this.isPick = false;
        this.isTable = true;   
       }
   }
  

    EventBus.$on('updateTable', (value) => {
      return this.tableAction(value);    
  });

   this.fetchProducts();   
   this.fetchCategories();
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
      
      orderType:'',     
      CustomerName :'',     
      tableService:'',
      order:{},
      clientHasOrder: false,  

      showProduct: false,
      categoryName: '',
      devWidth: '',
    }
  }, 
  components:{
    vueProduct: Products,
    VBreakpoint: VBreakpoint
  },  
  methods: {

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
      this.categoryName = categoryName;
      Api.getProductsByCategory(categoryId).then(response => {
          this.prod = response.data
           this.showProduct = true;
        })
        .catch(e => {
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
              this.isDelivery = true;
              this.isPick = false;
              this.isTable = false;  
              this.order.OrderType = "Delivery";
              this.order.AddressToDeliver = this.address; 
              this.order.ClientId = this.clientId,  
             
              EventBus.$emit('addressToDeliver', this.address );      
              EventBus.$emit('orderType', 'Delivery' ); 

              this.showProduct = false; 
              
              console.log(JSON.stringify(this.order))
            },
          },
        ],
      })
      .then(a => a.present())
    },

    pickAction() {
      return this.$ionic.alertController
      .create({
        cssClass: 'my-custom-class',
        header: this.$t('frontend.home.pickupDetail'),
        inputs: [         
          {name: 'hourPick',  type: 'time',  placeholder: this.$t('frontend.home.pickTime'), },
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


              this.orderType = "PickUp"
              this.hourToPick = data.hourPick
              this.isDelivery = false;
              this.isPick = true;
              this.isTable = false; 
              this.order.OrderType = "PickUp";
              this.order.HourToPick = this.hourToPick;   
              
              EventBus.$emit('HourToPick', this.hourToPick );      
              EventBus.$emit('orderType', 'PickUp' ); 

              this.showProduct = false;  
              console.log(JSON.stringify(this.order))
          
            },
          },
        ],
      })
      .then(a => a.present())
    },

    tableAction: async function(value) {

     this.spinner = true

     try {
        const response = await Api.fetchById("Table", value);
        if(response){
          this.spinner = false     
          this.tableService = response.data.Name
          this.orderType = "On Table"
          this.isDelivery = false;
          this.isPick = false;
          this.isTable = true;    
          this.order.OrderType = "On Table";
          this.order.tableService = this.tableService;        
          EventBus.$emit('orderType', 'On Table' );
          this.showProduct = false;  
          console.log(JSON.stringify(this.order))
        }
        
     } catch (error) {
       console.log(error)
      this.spinner = false
      return this.notValidQr();
     }   

   },

    openModal() {
    return this.$ionic.modalController
      .create({
        component: QrCode,
        cssClass: 'my-custom-class',
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: {
            title: this.$t('frontend.home.tableQr'),
          },
        },
      })
      .then(m => m.present())
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

     notValidQr(){
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