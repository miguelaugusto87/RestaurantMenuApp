<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

        <ion-button @click="dismissQr" expand="full">
            <ion-icon slot="icon-only"  name="close"></ion-icon>
        </ion-button>

        <ion-card  >

            <div>
                <img class="menu-col-12" :src="ImageUrl">
                 <div class="menu-col-12" style="text-align: center;">
                  <vue-goodshare-facebook 
                    :page_url= staticUrl+productId
                    :page_title="Title" 
                    has_icon
                    title_social=""
                    ></vue-goodshare-facebook>
                    <vue-goodshare-whatsapp 
                    :page_url= staticUrl+productId
                    :page_title="Title" 
                    has_icon
                    title_social=""
                    ></vue-goodshare-whatsapp>
                  <vue-goodshare-linked 
                    :page_url= staticUrl+productId
                    :page_title="Title"  
                    has_icon
                    title_social=""
                    ></vue-goodshare-linked>
                  <vue-goodshare-email
                    :page_url= staticUrl+productId
                    :page_title="Title" 
                    has_icon
                    ></vue-goodshare-email>
                </div>
            </div>

            <ion-card-content>

                <ion-card-header>
                    <ion-card-title style="padding: 0;">{{Name}}</ion-card-title>
                </ion-card-header>

                 <ion-item>
                    <ion-label class="menu-col-12"   color="danger" style="font-size: 14pt;font-weight: bold;text-align: center;">${{ SalePrice}}</ion-label>                   
                </ion-item>

                <ion-card-header>
                    <ion-card-title style="padding: 0;">{{Description}}</ion-card-title>
                </ion-card-header>              

                            
            </ion-card-content>
        
        
        </ion-card>

       
    </ion-content>
  </div>
</template>

<script>
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue"
import VueGoodshareEmail from "vue-goodshare/src/providers/Email.vue" 
import VueGoodshareLinked from "vue-goodshare/src/providers/LinkedIn.vue" 
import VueGoodshareWhatsapp from "vue-goodshare/src/providers/WhatsApp"

export default {
  name: 'ProductDetail',
  props: {
    title: { type: String, default: '' },
    productId: { type: String, default: '' },
    ImageUrl: { type: String, default: '' },
    Name: { type: String, default: '' },
    Description: { type: String, default: '' },
    SalePrice: { type: Number, default: 0 },
  },
  data() {
    return {
      content: 'Content',
      result: '',
      error: ''  ,
      staticUrl:"https://miguelaugusto87.github.io/RestaurantMenuApp/?share=",
    }
  },
   components:{
    VueGoodshareFacebook: VueGoodshareFacebook,
    VueGoodshareEmail: VueGoodshareEmail,
    VueGoodshareLinked: VueGoodshareLinked,
    VueGoodshareWhatsapp: VueGoodshareWhatsapp
  },
methods: {

    dismissQr(){
       return this.$ionic.modalController.dismiss()
    }
 


}
 

}
</script>