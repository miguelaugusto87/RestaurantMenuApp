<template>
    <ion-content id="product" class="product">

        <v-breakpoint v-if="!spinner">
            <div slot-scope="scope">

                <span v-if="scope.isSmall || scope.isMedium || scope.noMatch" > 
                    <ion-card>
                            
                        
                        <ion-card-title 
                                style="padding: 10px;text-align: center;text-transform: uppercase;font-weight: bolder;">
                                {{$t('frontend.order.orderDetail')}} 
                        </ion-card-title>

                        <ion-card>  
                            <h4 class="subtitles-order menu-col-4" style=" padding: 5px 10px; margin: 0;float: left;color:black;"> {{$t('frontend.order.client')}}: </h4>                
                            <h4 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left; ">  {{CustomerName}}</h4>

                        
                            <h4 class="subtitles-order menu-col-4" style=" padding: 10px; margin: 0; float: left;color:black;"> {{order.OrderType}}: </h4>
                            <h4 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left;"> {{ orderInfo}}</h4>
                        </ion-card>

                        <ion-item-divider/>

                        <ion-label class="ion-text-wrap">
                                <h2  style="width: 100%;float: left;font-size: 16px;font-weight: bold;
                                text-align: left; padding-left: 20px;color: black;">
                                {{$t('frontend.order.orderState')}}:  {{showStates}}</h2>
                        </ion-label>

                            <ion-range ref="rangeDualKnobs" dual-knobs="false" min="1" max="5" step="1"
                            snaps="true" value="1" color="success" disabled="true" ></ion-range>

                        <ion-item-divider/>        

                        <ion-list>
                            <ion-label class="ion-text-wrap">
                                <h2 class="titles-order" style="width: 50%;float: left;">{{$t('frontend.order.products')}}</h2>
                            </ion-label>
                            <ion-item-sliding>
                                <ion-item >
                                    <ion-label class="ion-text-wrap menu-col-6"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.name')}}</h2> </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.cant')}}</h3></ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.price')}}</h3></ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                                </ion-item>
                            </ion-item-sliding>
                            <ion-item-sliding v-for="product in order.Products" v-bind:key="product.ProductId">

                                <ion-item>
                                    <ion-label class="ion-text-wrap menu-col-6" >
                                        <h2>{{ product.Name }}</h2>
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2">                        
                                        <h3>{{ product.Cant }}</h3>                       
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2" >
                                        <h3>$ {{ product.Price.toFixed(2) }}</h3>
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2" >
                                        <h3>$ {{ (product.Price * product.Cant).toFixed(2) }}</h3>
                                    </ion-label>
                                </ion-item>
                                
                            </ion-item-sliding>

                            <ion-item-sliding>
                                <ion-label class="ion-text-wrap" v-if="order.OtherCharges.length >0">
                                    <h2 class="titles-order">{{$t('frontend.order.otherCharges')}}</h2> 
                                </ion-label>
                                <ion-item-sliding  v-for="charge in order.OtherCharges" v-bind:key="charge.Id">
                                    <ion-item>
                                        <ion-label class="menu-col-6">
                                            <h3>{{ charge.Name }} </h3>
                                        </ion-label>
                                        <ion-label  class="menu-col-2"> </ion-label>
                                        <ion-label  class="menu-col-2"> </ion-label>
                                        <ion-label  class="menu-col-2" >
                                            <h3> $ {{ charge.Price.toFixed(2) }} </h3>
                                        </ion-label>
                                        
                                    </ion-item>
                                </ion-item-sliding>
                            </ion-item-sliding>


                            <ion-item-slidin style="border-top: 1px solid grey;" >
                                <ion-item style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"></ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title">{{$t('frontend.order.subtotal')}} </div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.SubTotal}}</ion-label>                    
                                </ion-item>
                                <ion-item style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title"> {{$t('frontend.order.taxe')}}</div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.Taxe}} %</ion-label>                    
                                </ion-item>
                                <ion-item v-if="order.OrderType =='Delivery'" style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"> <div class="menu-bold-title">{{$t('frontend.order.deliver')}}  </div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.Shipping}}</ion-label>                    
                                </ion-item>
                                <hr>
                                <ion-item style="    color: red;    font-size: 16px;    font-weight: bold;    text-transform: uppercase;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title" >{{$t('frontend.order.total')}}  </div></ion-label>
                                    <ion-label class="menu-col-2" ><div class="menu-bold-title" >{{order.Total}}  </div></ion-label>                    
                                </ion-item>
                            </ion-item-slidin>

                        </ion-list>

                        <ion-card v-if="order.Note">
                            <ion-label class="ion-text-wrap" >
                                <h2 class="titles-order"> {{$t('frontend.order.notes')}}</h2> 
                            </ion-label>
                            <ion-card-content>{{order.Note}} </ion-card-content>
                        </ion-card>

                    </ion-card>
                    
                </span>

                <span v-if="scope.isLarge || scope.isXlarge"> 

                    
                    <ion-card style="width: 80%; margin: 0 auto;">                            
                        
                        <ion-card-title 
                                style="padding: 10px;text-align: center;text-transform: uppercase;font-weight: bolder;">
                                {{$t('frontend.order.orderDetail')}} 
                        </ion-card-title>

                        <ion-card>  
                            <h4 class="subtitles-order menu-col-4" style=" padding: 5px 10px; margin: 0;float: left;color:black;"> {{$t('frontend.order.client')}}: </h4>                
                            <h4 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left; ">  {{CustomerName}}</h4>

                        
                            <h4 class="subtitles-order menu-col-4" style=" padding: 10px; margin: 0; float: left;color:black;"> {{order.OrderType}}: </h4>
                            <h4 class="subtitles-order menu-col-8" style=" padding: 5px 10px; margin: 0;float: left;"> {{ orderInfo}}</h4>
                        </ion-card>

                        <ion-item-divider/>

                        <ion-label class="ion-text-wrap">
                                <h2  style="width: 100%;float: left;font-size: 16px;font-weight: bold;
                                text-align: left; padding-left: 20px;color: black;">
                                {{$t('frontend.order.orderState')}}:  {{showStates}}</h2>
                        </ion-label>

                            <ion-range ref="rangeDualKnobs" dual-knobs="false" min="1" max="5" step="1"
                            snaps="true" value="1" color="success" disabled="true" ></ion-range>

                        <ion-item-divider/>        

                        <ion-list>
                            <ion-label class="ion-text-wrap">
                                <h2 class="titles-order" style="width: 50%;float: left;">{{$t('frontend.order.products')}}</h2>
                            </ion-label>
                            <ion-item-sliding>
                                <ion-item >
                                    <ion-label class="ion-text-wrap menu-col-6"><h2 style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.name')}}</h2> </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"> <h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.cant')}}</h3></ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.price')}}</h3></ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2"><h3  style="font-size: 16px;font-weight: bold;">{{$t('frontend.order.total')}}</h3></ion-label>
                                </ion-item>
                            </ion-item-sliding>
                            <ion-item-sliding v-for="product in order.Products" v-bind:key="product.ProductId">

                                <ion-item>
                                    <ion-label class="ion-text-wrap menu-col-6" >
                                        <h2>{{ product.Name }}</h2>
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2">                        
                                        <h3>{{ product.Cant }}</h3>                       
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2" >
                                        <h3>$ {{ product.Price.toFixed(2) }}</h3>
                                    </ion-label>
                                    <ion-label class="ion-text-wrap menu-col-2" >
                                        <h3>$ {{ (product.Price * product.Cant).toFixed(2) }}</h3>
                                    </ion-label>
                                </ion-item>
                                
                            </ion-item-sliding>

                            <ion-item-sliding>
                                <ion-label class="ion-text-wrap" v-if="order.OtherCharges.length >0">
                                    <h2 class="titles-order">{{$t('frontend.order.otherCharges')}}</h2> 
                                </ion-label>
                                <ion-item-sliding  v-for="charge in order.OtherCharges" v-bind:key="charge.Id">
                                    <ion-item>
                                        <ion-label class="menu-col-6">
                                            <h3>{{ charge.Name }} </h3>
                                        </ion-label>
                                        <ion-label  class="menu-col-2"> </ion-label>
                                        <ion-label  class="menu-col-2"> </ion-label>
                                        <ion-label  class="menu-col-2" >
                                            <h3> $ {{ charge.Price.toFixed(2) }} </h3>
                                        </ion-label>
                                        
                                    </ion-item>
                                </ion-item-sliding>
                            </ion-item-sliding>


                            <ion-item-slidin style="border-top: 1px solid grey;" >
                                <ion-item style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"></ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title">{{$t('frontend.order.subtotal')}} </div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.SubTotal}}</ion-label>                    
                                </ion-item>
                                <ion-item style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title"> {{$t('frontend.order.taxe')}}</div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.Taxe}} %</ion-label>                    
                                </ion-item>
                                <ion-item v-if="order.OrderType =='Delivery'" style="font-size: 16px;font-weight: bold;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"> <div class="menu-bold-title">{{$t('frontend.order.deliver')}}  </div></ion-label>
                                    <ion-label class="menu-col-2" >{{order.Shipping}}</ion-label>                    
                                </ion-item>
                                <hr>
                                <ion-item style="    color: red;    font-size: 16px;    font-weight: bold;    text-transform: uppercase;"> 
                                    <ion-label class="menu-col-6"> </ion-label>
                                    <ion-label class="menu-col-4" style="text-align:right"><div class="menu-bold-title" >{{$t('frontend.order.total')}}  </div></ion-label>
                                    <ion-label class="menu-col-2" ><div class="menu-bold-title" >{{order.Total}}  </div></ion-label>                    
                                </ion-item>
                            </ion-item-slidin>

                        </ion-list>

                        <ion-card v-if="order.Note">
                            <ion-label class="ion-text-wrap" >
                                <h2 class="titles-order"> {{$t('frontend.order.notes')}}</h2> 
                            </ion-label>
                            <ion-card-content>{{order.Note}} </ion-card-content>
                        </ion-card>

                    </ion-card>
                    
                </span>
            </div>
        </v-breakpoint>

        

        <ion-button @click="allOrder" expand="block" color="primary">{{$t('frontend.order.seeAll')}}</ion-button>

    </ion-content>
</template>

<script>
// import Stepper from '../components/Stepper'
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import { VBreakpoint } from 'vue-breakpoint-component'


addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});

export default {
    name: 'OrderState', 
    mounted: function(){
        this.$refs.rangeDualKnobs.value = { lower: 1, upper: 2 };
    },
    created: function(){
    this.CustomerName = this.$route.params.CustomerName;      
    this.order = this.$route.params.order;
    this.orderInfo = this.$route.params.orderInfo;  
    this.showStates = this.order.State

        }, 
    data() {
        return {
            order: [],
            CustomerName: '',
            showStates: '',
            

        }
    },
    components:{
    VBreakpoint: VBreakpoint
  },
    methods:{
    allOrder: function(){
        return this.$router.push({ name: 'ListOrder', params: {customerId: this.order.ClientId, CustomerName: this.CustomerName} })
 
    }
  }, 


 



 

}
</script>

<style >
    .state-ship ion-chip{
        padding: 0 15px;
        border: 1px solid gray;
        margin: 0 10px;
    }

.titles-order{
    font-size: 20px !important;
    font-weight: bold !important;
    text-align: left;
    padding: 10px;
    position: inherit;
    color: black;    
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
        flex: 0 0 calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(6 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }
    .menu-col-2{
        flex: 0 0 calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
        width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
        max-width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
        text-align: left;
    }
    .menu-bold-title{
        padding-right: 15px;
    }

</style>