<template>
  <ion-content id="menu" class="menu">

    <ion-card-title>
      {{$t('frontend.order.yourOrders')}}
        <ion-label class="ion-text-wrap">           
            <ion-button fill="outline" v-if="!spinner" style="float: right; margin-right: 10px;" @click="addOrder"> + </ion-button>
        </ion-label>
      </ion-card-title>
    
     <ion-item-divider/>

     <div v-if="spinner">
        <ion-spinner  name="lines" class="spinner"></ion-spinner>
      </div>

      <v-breakpoint v-if="!spinner">
        <div slot-scope="scope">

          <span v-if="scope.isSmall || scope.isMedium || scope.noMatch" > 

            <div >
              <ion-item-sliding>
                <ion-item >
                    <ion-label class="ion-text-wrap menu-col-3"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.type')}}</h2> </ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.state')}}</h3></ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"></ion-label>
                </ion-item>
              </ion-item-sliding>     

              <ion-list>
                <ion-item-sliding v-for="order in orders" v-bind:key="order._id">
                  <ion-item style="width: 100%;">

                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.OrderType }}</h2>               
                    </ion-label>
                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.State }}</h2>               
                    </ion-label >
                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.Total }}</h2>               
                    </ion-label>
                  
                    <a style="font-size: 30px" @click="seeDetail(order)" class="ion-text-wrap menu-col-3"> <ion-icon name="eye"></ion-icon> </a>
                  </ion-item>

                </ion-item-sliding>
              </ion-list>
            </div>

          </span>


          <span v-if="scope.isLarge || scope.isXlarge"> 

            <div style="width: 80%; margin: 0 auto;">
              <ion-item-sliding>
                <ion-item >
                    <ion-label class="ion-text-wrap menu-col-3"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.type')}}</h2> </ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.state')}}</h3></ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                    <ion-label class="ion-text-wrap menu-col-3"></ion-label>
                </ion-item>
              </ion-item-sliding>     

              <ion-list>
                <ion-item-sliding v-for="order in orders" v-bind:key="order._id">
                  <ion-item style="width: 100%;">

                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.OrderType }}</h2>               
                    </ion-label>
                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.State }}</h2>               
                    </ion-label >
                    <ion-label class="ion-text-wrap menu-col-3">
                        <h2>{{ order.Total }}</h2>               
                    </ion-label>
                  
                    <a style="font-size: 30px" @click="seeDetail(order)" class="ion-text-wrap menu-col-3"> <ion-icon name="eye"></ion-icon> </a>
                  </ion-item>

                </ion-item-sliding>
              </ion-list>
            </div>
            
          </span>
        </div>
      </v-breakpoint>

     

  </ion-content>
</template>

<script>

import { Api } from '../../backoffice/api/api.js';
import { EventBus } from '../event-bus';
import { VBreakpoint } from 'vue-breakpoint-component'

export default {

  name: 'ListOrder',

  created: function(){  
    this.clientId = this.$route.params.customerId; 
    this.name = this.$route.params.CustomerName; 

    this.getOrders();   
  },
   components:{
    VBreakpoint: VBreakpoint
  },
  data () {
    return {
      clientId: '',  
      orders: [],
      name: '',
      spinner: false
    }
  }, 

  methods: {

    getOrders: function(){
      this.spinner = true
        Api.getCustomerOrders(this.clientId)
        .then(response => {
            this.orders = response.data  
            this.spinner = false          
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
                      text: this.$t('frontend.home.acept'),
                      handler: () => {                                 
                                    
                      },
                  },
                  ],
              })
              .then(a => a.present())
        })   
    },
    seeDetail: function(order){
        let orderInfo = '';
        if(order.OrderType == 'Delivery')
            orderInfo = order.AddressToDeliver
        if(order.OrderType == 'PickUp')
            orderInfo = order.HourToPick
        if(order.OrderType == 'On Table')
            orderInfo = order.tableService
        
        return this.$router.push({ name: 'OrderState', params: {order: order, CustomerName: this.name, orderInfo: orderInfo } })

    },

    addOrder: function(){
      EventBus.$emit('clientHasOrder', false );
      EventBus.$emit('clientHasOrderSelected', false );
      EventBus.$emit('updateCart', [] );
      // return this.$router.push({ name: 'Home'})
      return this.$router.push({ name: 'Home', params: {clientId: this.clientId } })

    },
   
  },

}

</script>

<style>

    .menu-col-3{
        flex: 0 0 calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }

</style>