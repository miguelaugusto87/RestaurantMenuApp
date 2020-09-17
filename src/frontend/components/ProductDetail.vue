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

            <ion-item>
                <img class="menu-col-12" :src="ImageUrl">
            </ion-item>

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

export default {
  name: 'ProductDetail',
  props: {
    title: { type: String, default: '' },
    ImageUrl: { type: String, default: '' },
    Name: { type: String, default: '' },
    Description: { type: String, default: '' },
    SalePrice: { type: Number, default: 0 },
  },
  data() {
    return {
      content: 'Content',
      result: '',
      error: ''  
    }
  },

methods: {

    dismissQr(){
       return this.$ionic.modalController.dismiss()
    }
 


}
 

}
</script>