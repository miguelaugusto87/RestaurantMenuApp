<template>
    <ion-content padding>

        <ion-label style="padding: 20px 100px;">
          <h1>{{$t('frontend.product.title')}} {{category}}</h1>            
        </ion-label>



        <div v-if="prod.length > 0">
          <ion-button expand="block" color="secondary" @click="done()">{{$t('frontend.product.back')}}</ion-button>

          <v-breakpoint>
            <div slot-scope="scope">
              <span v-if="scope.isSmall || scope.noMatch" > 

                <div  v-for="pr in prod" :key="pr._id" class="menu-col-6 card-category">
                    <ion-card  >

                      <ion-item>
                        <img class="menu-col-12" :src="pr.ImageUrl"> 
                        
                      </ion-item>

                      <ion-card-content>

                        <ion-card-header>
                          <ion-card-title style="padding: 0;">{{pr.Name}}</ion-card-title>
                        </ion-card-header>

                        <ion-item>
                          <ion-input class="menu-col-6"  type="number" min=1 :value="pr.count || 1" @input="pr.count = $event.target.value" style="border: 1px solid grey;text-align: center;" ></ion-input>                
                          <ion-label class="menu-col-6"   color="danger" style="font-size: 14pt;font-weight: bold;text-align: center;">${{ pr.SalePrice.toFixed(2)}}</ion-label>                   
                        </ion-item>

                        <ion-item>
                          <div class="menu-col-6" style="text-align: right">
                            <ion-button size="default" fill="outline"  @click="addToCart(pr._id, pr.Name, pr.SalePrice, pr.count || 1 )"> <ion-icon name="cart"></ion-icon></ion-button>
                          </div>
                          <div class="menu-col-6">
                            <ion-button size="default" fill="outline" @click="productDetail(pr.Name, pr.SalePrice, pr.Description, pr.ImageUrl)"> <ion-icon name="eye"></ion-icon></ion-button>
                          </div>

                        </ion-item>

                        
                      
                      </ion-card-content>
                
                  
                  </ion-card>
                </div>
                
              </span>

              <span v-if="scope.isMedium" > 

                  <div  v-for="pr in prod" :key="pr._id" class="menu-col-4 card-category">
                    <ion-card  >

                      <ion-item>
                        <img class="menu-col-12" :src="pr.ImageUrl"> 
                        
                      </ion-item>

                      <ion-card-content>

                        <ion-card-header>
                          <ion-card-title style="padding: 0;">{{pr.Name}}</ion-card-title>
                        </ion-card-header>

                        <ion-item>
                          <ion-input class="menu-col-6"  type="number" min=1 :value="pr.count || 1" @input="pr.count = $event.target.value" style="border: 1px solid grey;text-align: center;" ></ion-input>                
                          <ion-label class="menu-col-6"   color="danger" style="font-size: 14pt;font-weight: bold;text-align: center;">${{ pr.SalePrice.toFixed(2)}}</ion-label>                   
                        </ion-item>

                        <ion-item>
                          <div class="menu-col-6" style="text-align: right">
                            <ion-button size="default" fill="outline"  @click="addToCart(pr._id, pr.Name, pr.SalePrice, pr.count || 1 )"> <ion-icon name="cart"></ion-icon></ion-button>
                          </div>
                          <div class="menu-col-6">
                            <ion-button size="default" fill="outline" @click="productDetail(pr.Name, pr.SalePrice, pr.Description, pr.ImageUrl)"> <ion-icon name="eye"></ion-icon></ion-button>
                          </div>

                        </ion-item>

                        
                      
                      </ion-card-content>
                
                  
                  </ion-card>
                </div>
                
              </span>
              <span v-if="scope.isLarge || scope.isXlarge" > 

                <div  v-for="pr in prod" :key="pr._id" class="menu-col-3 card-category">
                    <ion-card  >

                      <ion-item>
                        <img class="menu-col-12" :src="pr.ImageUrl"> 
                        
                      </ion-item>

                      <ion-card-content>

                        <ion-card-header>
                          <ion-card-title style="padding: 0;">{{pr.Name}}</ion-card-title>
                        </ion-card-header>

                        <ion-item>
                          <ion-input class="menu-col-6"  type="number" min=1 :value="pr.count || 1" @input="pr.count = $event.target.value" style="border: 1px solid grey;text-align: center;" ></ion-input>                
                          <ion-label class="menu-col-6"   color="danger" style="font-size: 14pt;font-weight: bold;text-align: center;">${{ pr.SalePrice.toFixed(2)}}</ion-label>                   
                        </ion-item>

                        <ion-item>
                          <div class="menu-col-6" style="text-align: right">
                            <ion-button size="default" fill="outline"  @click="addToCart(pr._id, pr.Name, pr.SalePrice, pr.count || 1 )"> <ion-icon name="cart"></ion-icon></ion-button>
                          </div>
                          <div class="menu-col-6">
                            <ion-button size="default" fill="outline" @click="productDetail(pr.Name, pr.SalePrice, pr.Description, pr.ImageUrl)"> <ion-icon name="eye"></ion-icon></ion-button>
                          </div>

                        </ion-item>

                        
                      
                      </ion-card-content>
                
                  
                  </ion-card>
                </div>
                
              </span>
            </div>
          </v-breakpoint>

        


            <ion-button expand="block" color="secondary" @click="done()">{{$t('frontend.product.back')}}</ion-button>
        </div>
        <div v-else>
            <ion-card>
              <ion-card-content>
                <ion-label>
                    {{$t('frontend.product.noProducts')}} 
                </ion-label>
              
              </ion-card-content>
            </ion-card>

            <br><br>
            <ion-button expand="block" color="secondary" @click="done()">{{$t('frontend.product.back')}}</ion-button>

        </div>

    </ion-content>
</template>

<script>

import { EventBus } from '../event-bus';
import { VBreakpoint } from 'vue-breakpoint-component'
import ProductDetail from '../components/ProductDetail'

export default {
 name: "Products",
 data () {
    return { }
  }, 
    props: {
    cart: {type: Array, default: () => [] },
    prod: {type: Array, default: () => [] },
    categoryId: {type: String, default: "" } , 
    category: {type: String, default: "" },  
  },
   components:{
    VBreakpoint: VBreakpoint
  },
  methods: {
      addToCart: function(id, name, price, count){
         let p = {
            "ProductId": id,
            "Name": name,
            "Price": price,
            "Cant": count,
         }
       
         if (!this.cart.includes(p.Id)){
           this.cart.push(p);
           console.log(p)
            EventBus.$emit('updateCart', this.cart );
         }            
         else
            alert("Ya el producto se encuentra en el carrito");
         console.log(this.cart);
      },
     
     done: function(){
        //this.$router.push({ name: 'Home', params: {cart: this.cart } })
      EventBus.$emit('showProduct', false );
      },

      productDetail: function(Name, SalePrice, Description, ImageUrl){
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
     

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

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
    .menu-col-3{
    flex: 0 0 calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(3 / var(--ion-grid-columns, 12)) * 100%);
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
      /* height: 150px; */
      padding: 10px 2px;
    }

</style>