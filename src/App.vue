<template>
  <ion-app>
 
       <!-- <ionMenus/> -->
    <div id="app1">
    <div>
      <ion-menu side="start"  contentId="my-content">
        <ion-header>
          <ion-toolbar color="secondary">
            <ion-title>{{$t('frontend.menu.menu')}}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding class="menu ion-page">  
          <ion-list>
            <ion-item> <img src="./frontend/views/logo.png" style="margin: 80px 0 30px 0"></ion-item>            
            
            <ion-item @click="closeStart">{{$t('frontend.menu.about')}}</ion-item> 
            <ion-item v-if="clientId !=''" @click="goHome">{{$t('frontend.menu.oferts')}}</ion-item>
            <ion-item v-if="clientId !=''" @click="clientUpdateHisData">{{$t('frontend.menu.edit')}}</ion-item>         
            <ion-item  @click="getOrderList">{{$t('frontend.menu.orders')}}</ion-item>  
            
             <Language />
          

          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-menu side="end" contentId="my-content">
        <ion-header>
          <ion-toolbar color="secondary">
             <ion-title>{{ $t('backoffice.options.menuTitle') }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content padding class="ion-page menu" >
          <ion-item> </ion-item>
          <div style="margin-top: 20px">
              <Language />
          </div>

          <ion-content v-if="!getAuthenticated">
              <Login />
          </ion-content>
           
           <!-- <ion-item v-if="!getAuthenticated" @click="closeEnd"><router-link to="/login" >{{ $t('backoffice.options.login') }}</router-link></ion-item> -->
           <ion-item v-else @click="logOut"><router-link to="/login" >{{ $t('backoffice.options.logout') }}</router-link></ion-item>

           <ion-item v-if="accessToControlPanel()"><router-link to="/controlPanel" >{{ $t('backoffice.options.controlPanel') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewMenu')"><router-link to="/menu" >{{ $t('backoffice.options.manageMenus') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewOrder')"><router-link to="/order" >{{ $t('backoffice.options.viewOrders') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewCategory')"><router-link to="/category" >{{ $t('backoffice.options.manageCategories') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewProduct')"><router-link to="/product" >{{ $t('backoffice.options.manageProducts') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewCustomer')"><router-link to="/customer" >{{ $t('backoffice.options.manageCustomers') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewTable')"><router-link to="/table" >{{ $t('backoffice.options.manageTables') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewTax')"><router-link to="/tax" >{{ $t('backoffice.options.manageTaxes') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewShipping')"><router-link to="/shipping" >{{ $t('backoffice.options.manageShippings') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewOtherCharge')"><router-link to="/otherCharge" >{{ $t('backoffice.options.manageOtherCharges') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewUser')"><router-link to="/user" >{{ $t('backoffice.options.manageUsers') }}</router-link></ion-item>
           <ion-item v-if="hasPermission('canViewRole')"><router-link to="/role" >{{ $t('backoffice.options.manageRoles') }}</router-link></ion-item>
        </ion-content>
      </ion-menu>

      <div  main id="my-content">
        <ion-header>
          <ion-toolbar color="primary">             
            <ion-icon @click="openStart" name="menu" class="menu-col-2" style="float: left;font-size: 30px;"></ion-icon> 
            <ion-title class="menu-col-8" style="float: left">Restaurant</ion-title>          
            <ion-icon @click="openEnd" name="settings" class="menu-col-2" style="float: right;font-size: 30px;"></ion-icon>
          </ion-toolbar>
        </ion-header>
        <ion-content></ion-content>
      </div>

    </div>
    <ion-menu-controller></ion-menu-controller>
  </div>

     
      
      <v-breakpoint v-if="clientId ==='' && !getAuthenticated" style="padding: 20px;">
      <div slot-scope="scope">

        <span v-if="scope.isSmall || scope.isMedium || scope.noMatch" > 
          <div >
              <h3>{{$t('frontend.app.selectOrder')}}</h3>
              <ion-button style="margin: 12px 0;" expand="block" size="large" strong color="secondary" @click="selectOrder('Delivery', '')">{{$t('frontend.app.deliver')}}</ion-button>
              <ion-button style="margin: 12px 0;" expand="block" size="large" strong color="secondary" @click="selectOrder('PickUp', '')">{{$t('frontend.app.pickup')}}</ion-button>
              <ion-button style="margin: 12px 0;" expand="block" size="large" strong color="secondary" @click="show">{{$t('frontend.app.table')}}</ion-button>   
          </div>

          <modal name="my-first-modal" width="80%" height="80%">
            <ion-header>
              <ion-toolbar>
                <p>{{ $t('frontend.home.tableQr') }}</p>
              </ion-toolbar>
            </ion-header>

            <div class="ion-padding" style="height: 90%">            
              <qrcode-stream @decode="onDecode" @init="onInit" />
            </div>    
          </modal>
          
        </span>
        <span v-if="scope.isLarge || scope.isXlarge"> 
           <div >
              <h3>{{$t('frontend.app.selectOrder')}}</h3>
              <ion-button style="margin: 12px;" size="large" round strong color="secondary" @click="selectOrder('Delivery', '')">{{$t('frontend.app.deliver')}}</ion-button>
              <ion-button style="margin: 12px;" size="large" strong color="secondary" @click="selectOrder('PickUp', '')">{{$t('frontend.app.pickup')}}</ion-button>
              <ion-button style="margin: 12px;" size="large" strong color="secondary" @click="show">{{$t('frontend.app.table')}}</ion-button>   
          </div>  

          <modal name="my-first-modal" :width="'50%'" height="50%">
            <ion-header>
              <ion-toolbar>
                <p>{{ $t('frontend.home.tableQr') }}</p>
              </ion-toolbar>
            </ion-header>

            <div class="ion-padding" style="height: 90%">            
              <qrcode-stream @decode="onDecode" @init="onInit" />
            </div>    
          </modal>
            

        </span>
      </div>
    </v-breakpoint>
    
    


      <div v-if="spinner">
        <ion-spinner  name="lines" class="spinner"></ion-spinner>
      </div>

    <ion-content v-if="!spinner">
      <router-view/>
           

    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-title>Solution For Success</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>


<script>

import Language from './backoffice/views/Locale.vue'
import Login from './backoffice/views/Login.vue'

import { settings } from "ionicons/icons";
import { menu } from "ionicons/icons";
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "ios-add": add.ios,
  "md-add": add.md,
  "ios-menu": menu.ios,
  "md-menu": menu.md,
  "ios-settings": settings.ios,
  "md-settings": settings.md,
});

import { Api } from './backoffice/api/api.js';
import orderType from './frontend/components/selectOrderType'
import { EventBus } from './frontend/event-bus';
import { VBreakpoint } from 'vue-breakpoint-component'
import { QrcodeStream } from 'vue-qrcode-reader'
import ProductDetail from './frontend/components/ProductDetail'


export default {
  name: "HomePage",
  props: {
    msg: String
  },
  mounted: function(){

    if (this.$route.query.share)
   {
    console.log('share');
    this.productDetail(this.$route.query.share)
   }

  EventBus.$on('updateCart', (value) => {
      this.cart = value;     
    });

    EventBus.$on('clientHasOrder', (value) => {
      this.clientHasOrder = value;      
    });

     EventBus.$on('clientHasId', (value) => {
      this.clientId = value;      
    });

    EventBus.$on('clientHasName', (value) => {
      this.CustomerName = value;      
    });

    EventBus.$on('addressToDeliver', (value) => {
     this.addressToDeliver = value;      
    });

    EventBus.$on('HourToPick', (value) => {
     this.hourToPick = value;      
    });

    EventBus.$on('updateOrder', (value) => {
      this.order = value;      
    });

    EventBus.$on('openHome', (value) => {
      if(value === true){  
        return  this.$router.push({name: 'Home', params: {cart: this.cart, order: this.order  }})
      }            
        
    });

     EventBus.$on('orderType', (value) => {
       this.orderType = value
       
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
        
    });

    EventBus.$on('clientHasOrderSelected', (value) => {
      this.orderSelected = value;           
    });

    EventBus.$on('updateTable', (value) => {
      this.spinner = true
      Api.fetchById("Table", value).then(response => {  
        this.spinner = false     
        this.tableService = response.data.Name
        if(this.clientId === '' )      
          return this.selectOrder('On Table', this.tableService)
      })
      .catch(e => {
        console.log(e)
        this.spinner = false
        return this.notValidQr();      
        
      });
    });
  },
 
  data () {
    return {
      modelName: 'Customer',
      orderType:'',
      isDelivery: false,
      isPick: false,
      isTable: false,
      orderSelected: false,
      clientId:'',
      CustomerName :'',
      addressToDeliver:'',
      hourToPick: '',
      tableService:'',     
      prod: [],
      cart: [],
      order:{},
      clientHasOrder: false,  
      spinner: false,
      phone:'',
      email:'',    
    }
  }, 
  components:{
    Language,
    Login,
    VBreakpoint: VBreakpoint,
    QrcodeStream: QrcodeStream
  },  
  computed:{
    getAuthenticated: function(){
      return this.$store.state.authenticated;
    },
  },
  watch: {
    
  },
  methods: {    
    
    hasPermission(permission){
        
        let res = false;
        if (this.$store.state.authenticated)
        {
            let roles = this.$store.state.roles;
            for (let index = 0; index < roles.length; index++) {
                switch(permission){                        
                      case 'canViewMenu':
                          res = roles[index].canViewMenu;
                          break;
                      case 'canViewCategory':
                          res = roles[index].canViewCategory;
                          break;
                      case 'canViewProduct':
                          res = roles[index].canViewProduct;
                          break;
                      case 'canViewCustomer':
                          res = roles[index].canViewCustomer;
                          break;
                      case 'canViewTable':
                          res = roles[index].canViewTable;
                          break;
                      case 'canViewTax':
                          res = roles[index].canViewTax;
                          break;
                      case 'canViewShipping':
                          res = roles[index].canViewShipping;
                          break;
                      case 'canViewOtherCharge':
                          res = roles[index].canViewOtherCharge;
                          break;
                      case 'canViewUser':
                          res = roles[index].canViewUser;
                          break;
                      case 'canViewRole':
                          res = roles[index].canViewRole;
                          break;
                      case 'canViewOrder':
                          res = roles[index].canViewOrder;
                          break;
                      default:
                          break;
                }
                if (res)
                { 
                    return res;
                }              
            }
        }
        return res;
    },

    accessToControlPanel(){
        return (this.hasPermission('canViewMenu') || this.hasPermission('canViewOrder') || this.hasPermission('canViewCategory')
              || this.hasPermission('canViewProduct') || this.hasPermission('canViewCustomer') || this.hasPermission('canViewTable')
                || this.hasPermission('canViewTax') || this.hasPermission('canViewShipping') || this.hasPermission('canViewOtherCharge')
                  || this.hasPermission('canViewUser') || this.hasPermission('canViewRole'))
    },

    openStart () {
        document.querySelector('ion-menu-controller').open('start')     
      },
    
    openEnd () {
        document.querySelector('ion-menu-controller').open('end')
      },
      
    closeEnd () {

        document.querySelector('ion-menu-controller').close('end')
      },
      
    closeStart () {
        document.querySelector('ion-menu-controller').close('start')
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

    logOut: function(){
      this.$store.commit("setAuthentication", false);
      this.$store.commit("setUser", null);
      this.$store.commit("setRoles", []);

      this.$router.push({path: '/' })   
    },
    
    clientUpdateHisData: function(){
      this.closeStart();
      this.spinner =true
      Api.fetchById(this.modelName, this.clientId)
        .then(response => {
          this.spinner =false
          console.log( "CLiente a editar"+ JSON.stringify(response.data))   
          return this.$ionic.alertController
          .create({
            cssClass: 'my-custom-class',
            header:  this.$t('frontend.app.editTitle'),
            inputs: [ 
              { type:'email',name: 'email',id: 'email-id',placeholder:this.$t('frontend.orderType.email'), value:response.data.EmailAddress},
              { type:'text', name: 'name', placeholder:this.$t('frontend.orderType.name'), value:response.data.Name  },
              { type:'text', name: 'phone', id: 'phone-id', placeholder:this.$t('frontend.orderType.phone') ,value:response.data.Phone},
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
                  if(data.email ==='' || data.name ==='' || data.phone ==='')
                  return this.alertRequiredDatas();
                 
                  var client = {"_id":this.clientId,'EmailAddress': data.email,'Name':data.name,'Phone':data.phone}
                  return this.marketingAction(client);
                   
                },
              },
            ],
      })
      .then(a => a.present())                 
        })
        .catch(e => {
          console.log(e);
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
        })

    },
 
    tableAction(value) {
      this.spinner = true
      Api.fetchById("Table", value).then(response => {  
        this.spinner = false     
        this.tableService = response.data.Name
        if(this.clientId === '' )      
          return this.selectOrder('On Table', this.tableService)
      })
      .catch(e => {
        console.log(e)
        this.spinner = false
        return this.notValidQr();      
        
      });
    },

    selectOrder: function(type, table) {
       return this.$ionic.modalController
        .create({
          component: orderType,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: 'New Content',              
            },
            propsData: {
              title: this.$t('frontend.app.selectDetail'),
              selected: type,
              table: table,
              buttonAcept:this.$t('frontend.home.acept'),
              buttonCancel:this.$t('frontend.home.cancel'),
              placeholderEmail: this.$t('frontend.orderType.email'),
              placeholderName: this.$t('frontend.orderType.name'),
              placeholderPhone: this.$t('frontend.orderType.phone'),
              placeholderAddress: this.$t('frontend.orderType.address'),
              placeholderPickUp: this.$t('frontend.orderType.pickOut'),
              requiredData: this.$t('frontend.home.errorRequired'),
              contactedBy: this.$t('frontend.orderType.contactedBy')
            },
          },
        })
        .then(
          m => m.present(),
          )
          
          
    },

    goHome: function(){
      this.closeStart();
      return this.$router.push({ name: 'Home', params: {cart:this.cart, order: this.order, clientId: this.clientId } })
    },

    getOrderList: function(){  
      this.closeStart();   
      
      if(this.ClientId !='' && this.CustomerName !=''){        
        return this.$router.push({ name: 'ListOrder', params: {customerId:this.clientId, CustomerName: this.CustomerName} })
      }
      else{
        return this.$ionic.alertController
      .create({
        cssClass: 'my-custom-class',
        header: this.$t('frontend.app.getOrder'),
        inputs: [
          { type:'email',name: 'email',id: 'email-id',placeholder: this.$t('frontend.orderType.email'),},
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
              if(data.email ==='')
                  return this.alertRequiredDatas();
              
              this.spinner = true            
              Api.findCustomerByEmail(data.email)
              .then(response => {  
                this.spinner = false
                console.log(response.data)   
                if(response.data.length == 0 ) {
                    return  this.$ionic.alertController
                    .create({
                        cssClass: 'my-custom-class',
                        header: 'Error',
                        message: this.$t('frontend.app.notClient'),
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
                else{                  
                  this.clientId = response.data[0]._id  
                  this.CustomerName = response.data[0].Name  
                  return this.$router.push({ name: 'ListOrder', params: {customerId:this.clientId, CustomerName: this.CustomerName} })
                 
                }                      
              })
              .catch(e => {
                console.log(e);
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
                  })  
            },
          },
        ],
      })
      .then(a => a.present())
      }

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
                  
    },
  
    productDetail: function(productId){

      this.spinner = true
      Api.fetchById("Product", productId).then(response => {  

        this.spinner = false;
        console.log(response)
        if(response.status === 200){
          var Name= response.data.Name;
          var SalePrice = response.data.SalePrice; 
          var Description =response.data.Description;
          var ImageUrl  =response.data.ImageUrl;  

          console.log(response.SalePrice)
          
            return this.$ionic.modalController
              .create({
                component: ProductDetail,
                cssClass: 'my-custom-class',
                componentProps: {
                  data: {
                    content: 'New Content',
                  },
                  propsData: {
                    title: this.$t('frontend.product.productDetail'),
                    Name: Name,
                    SalePrice: SalePrice,
                    Description: Description,
                    ImageUrl: ImageUrl,
                  },
                },
              })
              .then(m => m.present())              
        }      
        
      })
      .catch(e => {
        console.log(e)
        this.spinner = false
        
      });

    }
   
  
  },
};

</script>


<style>

@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

ion-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.alert-input.sc-ion-alert-md, .alert-input.sc-ion-alert-ios{
border-bottom: 1px solid #da0f0f;
}
.alert-input-wrapper:before{
    content: "*";
    color: red;
    float: left;
    margin-bottom: -15px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3880ff;
}
.spinner {
    margin-top: 50%;
    display: inline-block;
    position: relative;
    width: 70px;
    height: 70px;
    color: var(--color);
    user-select: none;
}
#app1 {   
     z-index: 20;   
         margin-bottom: 40px; 
}
  .menu-col-8{
    flex: 0 0 calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(8 / var(--ion-grid-columns, 12)) * 100%);
}
.menu-col-2{
    flex: 0 0 calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
}

</style>
