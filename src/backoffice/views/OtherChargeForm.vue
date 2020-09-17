<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/otherCharge"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToOtherChargesList')}}</ion-button></router-link>

    <br/>
    <ion-label><h1>{{title}}</h1></ion-label>

    <!-- <ion-card> -->
            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.name')}}</ion-label>
            <ion-input type="text" name="name"
            @input="name = $event.target.value" 
            v-bind:value="name">
            </ion-input>
            </ion-item>

            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.productMin')}}</ion-label>
            <ion-input type="number" name="productMin"
            @input="productMin = $event.target.value" 
            v-bind:value="productMin">
            </ion-input>
            </ion-item>

            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.productMax')}}</ion-label>
            <ion-input type="number" name="productMax"
            @input="productMax = $event.target.value" 
            v-bind:value="productMax">
            </ion-input>
            </ion-item>

            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.price')}}</ion-label>
            <ion-input type="number" name="price"
            @input="price = $event.target.value" 
            v-bind:value="price">
            </ion-input>
            </ion-item>

            <ion-list>
                <ion-list-header>
                <ion-label>
                    <span style="color: red">*</span>{{$t('backoffice.form.fields.product')}}
                </ion-label>
                </ion-list-header>

                <ion-item>
                <ion-label>{{$t('backoffice.form.titles.selectAProduct')}}</ion-label>
                <ion-select  :ok-text="$t('backoffice.form.messages.buttons.ok')" :cancel-text="$t('backoffice.form.messages.buttons.dismiss')"
                @ionChange="productId = $event.target.value" v-bind:value="productId">
                    <ion-select-option v-for="product in products" v-bind:key="product.Id" v-bind:value="product._id" >{{product.Name}}</ion-select-option>
                </ion-select>
                </ion-item>

            </ion-list>

            <ion-item>
            <ion-label>{{$t('backoffice.form.fields.available')}}</ion-label>
            <ion-checkbox slot="end" name="available" 
                @ionChange="available = $event.target.checked"
                :checked="available"  >    
            </ion-checkbox>
            </ion-item>

        <!-- </ion-card>  -->

          <br/>
          <ion-button expand="full" color="primary" @click="saveOtherCharge()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'otherChargeForm',
   
  data () {
    return {
      modelName: 'OtherCharges',
       /****** Form Data ******/
      id: null,
      name: '',
      productMin: 0,
      productMax: 0,
      price: 0,
      productId: null,
      products: [],
      available: false,
    }
  },
  created: function(){

    this.fetchProducts(); 
    
    this.id = this.$route.params.otherChargeId;
    if (this.id){
      this.title = 'Edit other charge';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.productMax = response.data.ProductMax;
               this.productMin = response.data.ProductMin;
               this.price = response.data.Price
               this.productId = response.data.ProductId;
               this.available = response.data.Available;
               return response;
            })
            .catch(e => {
              console.log(e);
            })   
    }

    console.log(this.$route.params);
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.otherChargeEditTitle') :  this.$t('backoffice.form.titles.otherChargeNewTitle');
        }
  },
  methods: {
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (isNaN(this.productMin))
        {
            errors.push(this.$t('backoffice.form.validate.productMinNumber'));
        }
        if (isNaN(this.productMax))
        {
            errors.push(this.$t('backoffice.form.validate.productMaxNumber'));
        }
        if (this.productMin == 0)
        {
            errors.push(this.$t('backoffice.form.validate.productMinGreater'));
        }
        if (this.productMax < 2)
        {
            errors.push(this.$t('backoffice.form.validate.productMaxGreater'));
        }
        if (isNaN(this.price))
        {
            errors.push(this.$t('backoffice.form.validate.price'));
        }
        if (this.price == 0)
        {
            errors.push(this.$t('backoffice.form.validate.priceGreater'));
        }
        if (this.productId == null)
        {
            errors.push(this.$t('backoffice.form.validate.product'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), 
                                message, this.$t('backoffice.form.validate.validateMenu'));
            return false;
        }
        else
        {
            return true;
        }
    },
    ShowMessage(type, message, topic='') {
        return this.$ionic.alertController
          .create({
            cssClass: 'my-custom-class',
            header: type,
            subHeader: topic,
            message: message,
            buttons: [this.$t('backoffice.form.messages.buttons.ok')],
          })
        .then(a => a.present())
    },
    fetchProducts: function(){
        Api.fetchAll('Product').then(response => {
          // console.log(response.data)
          this.products = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    //Create or edit a new product
    saveOtherCharge: function(){

      if (this.isValidForm()){

            let item = {
            "Name": this.name,
            "ProductMin": this.productMin,
            "ProductMax": this.productMax,
            "Price": this.price,
            "ProductId": this.productId,
            "Available": this.available,
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessOtherCharges'), 
                                this.$t('backoffice.list.messages.titleEditOtherCharges'));
                        this.name = '';
                        this.productMax = 0;
                        this.productMin = 0;
                        this.price = 0;
                        this.productId = null;
                        this.available = false;
                        this.$router.push({
                          name: 'OtherCharge', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditOtherCharges'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessOtherCharges'), 
                                this.$t('backoffice.list.messages.titleCreateOtherCharges'));
                      this.name = '';
                      this.productMax = 0;
                      this.productMin = 0;
                      this.price = 0;
                      this.productId = null;
                      this.available = false;
                      this.$router.push({
                        name: 'OtherCharge', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateOtherCharges'));
                  })
        }

    }

        
    },
  },

}
    
</script>