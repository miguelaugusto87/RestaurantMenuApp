<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <ion-button expand="full" color="tertiary" @click="backToProductList()"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToProductsList')}}</ion-button>

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
            <ion-label position="floating">{{$t('backoffice.form.fields.description')}}</ion-label>
            <ion-textarea name="description" 
            @input="description = $event.target.value" 
            v-bind:value="description"></ion-textarea>
            </ion-item>

            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.costPrice')}}</ion-label>
            <ion-input type="number" name="costPrice"
            @input="costPrice = $event.target.value" 
            v-bind:value="costPrice">
            </ion-input>
            </ion-item>

            <ion-item>
            <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.salePrice')}}</ion-label>
            <ion-input type="number" name="salePrice"
            @input="salePrice = $event.target.value" 
            v-bind:value="salePrice">
            </ion-input>
            </ion-item>

            <ion-item>
              <ion-card v-if="checkImage()" >
                  <ion-img :src="file"></ion-img>
              </ion-card>
              <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.image')}}</ion-label>
              <ion-input type="file" accept=".jpg,.png,.gif" name="file"
              @change="handleImage">
              </ion-input>
            </ion-item>

            <ion-list>
                <ion-list-header>
                <ion-label>
                    <span style="color: red">*</span>{{$t('backoffice.form.fields.category')}}
                </ion-label>
                </ion-list-header>

                <ion-item>
                <ion-label>{{$t('backoffice.form.titles.selectACategory')}}</ion-label>
                <ion-select  :ok-text="$t('backoffice.form.messages.buttons.ok')" :cancel-text="$t('backoffice.form.messages.buttons.dismiss')"
                @ionChange="categoryId = $event.target.value" v-bind:value="categoryId">
                    <ion-select-option v-for="category in categories" v-bind:key="category.Id" v-bind:value="category._id" >{{category.Name}}</ion-select-option>
                </ion-select>
            </ion-item>

            </ion-list>

            <ion-item>
                <ion-label>{{$t('backoffice.form.fields.qrCode')}}</ion-label>
                <qrcode-vue :value="qr" :size=250 level="H"></qrcode-vue>
            </ion-item>

            <!-- <ion-item>
              <ion-label position="floating">Barcode</ion-label>
              <ion-input type="text" name="name"
              @input="barCode = $event.target.value" 
              v-bind:value="barCode">
              </ion-input>
            </ion-item> -->

            <ion-item>
              <ion-label>{{$t('backoffice.form.fields.available')}}</ion-label>
              <ion-checkbox slot="end" name="available" 
                @ionChange="available = $event.target.checked"
                :checked="available"  >    
              </ion-checkbox>
            </ion-item>

            <br/>

            <ion-button expand="full" color="primary" @click="saveProduct()">{{ title }}</ion-button>
        <!-- </ion-card>  -->

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';
import QrcodeVue from 'qrcode.vue';

export default {

  name: 'pruductForm',
   
  data () {
    return {
      modelName: 'Product',
       /****** Form Data ******/
      id: null,
      name: '',
      description: '',
      barCode: "",
      costPrice: 0,
      salePrice: 0,
      available: false,
      categoryId: null,
      categories: [],

      sourceCategoryId: null,
      sourceMenuId: null,

      file: null,
      qr: '',
    }
  },
  components: {
      QrcodeVue,
  },
  created: function(){

    this.fetchCategories();  
    
    this.id = this.$route.params.productId;
    this.sourceCategoryId = this.$route.params.categoryId;
    this.sourceMenuId = this.$route.params.menuId;

    if (this.id){
      this.title = 'Edit product';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.description = response.data.Description;
               this.costPrice = response.data.CostPrice;
               this.salePrice = response.data.SalePrice
               this.categoryId = response.data.CategoryId;
               this.barCode = response.data.BarCode;
               this.file = response.data.ImageUrl;
               this.available = response.data.Available;
               this.qr = response.data._id;
               return response;
            })
            .catch(e => {
              console.log(e);
              alert("Error");
            })   
    }

    console.log(this.$route.params);
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.productEditTitle') :  this.$t('backoffice.form.titles.productNewTitle');
        }
  },
  methods: {
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (isNaN(this.costPrice))
        {
            errors.push(this.$t('backoffice.form.validate.costPriceNumber'));
        }
        if (isNaN(this.salePrice))
        {
            errors.push(this.$t('backoffice.form.validate.salePriceNumber'));
        }
        if (this.costPrice == 0)
        {
            errors.push(this.$t('backoffice.form.validate.costPriceGreater'));
        }
        if (this.salePrice == 0)
        {
            errors.push(this.$t('backoffice.form.validate.salePriceGreater'));
        }
        if (this.categoryId == null)
        {
            errors.push(this.$t('backoffice.form.validate.category'));
        }
        if (this.file == null)
        {
            errors.push(this.$t('backoffice.form.validate.image'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), message,
                               this.$t('backoffice.form.validate.validateProduct'));
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
    /****** Load image use base64 encode esto debería ir en un componente******/
    checkImage: function(){
      return this.file != null;
    },
    handleImage: function(event)
    {
        const selectedImage = event.target.files[0];
        this.createBase64Img(selectedImage);
    },
    createBase64Img: function(fileObject){
        const reader = new FileReader();

        reader.onload = (e) => {
            this.file = e.target.result;
            console.log(this.file);
        };
        reader.readAsDataURL(fileObject);
    },
    /*******          Fin           *******/
    fetchCategories: function(){
        Api.fetchAll('Category').then(response => {
          // console.log(response.data)
          this.categories = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    //Create or edit a new product
    saveProduct: function(){


        if (this.isValidForm())
        {
              let item = {
            "Name": this.name,
            "Description": this.description,
            "CostPrice": this.costPrice,
            "SalePrice": this.salePrice,
            "CategoryId": this.categoryId,
            "ImageUrl": "",
            "Available": this.available,
            "BarCode": "",
            }
            if (this.file != null)
            {
              item["ImageUrl"] = this.file;
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              item['BarCode'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessProduct'), 
                                this.$t('backoffice.list.messages.titleEditProduct'));
                        this.name = '';
                        this.description = '';
                        this.salePrice = 0;
                        this.costPrice = 0;
                        this.categoryId = null;
                        this.file = null;
                        this.barCode = '';
                        this.available = false;
                        this.$router.push({
                          name: 'Product', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditProduct'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessProduct'), 
                                this.$t('backoffice.list.messages.titleCreateProduct'));
                      this.name = '';
                      this.description = '';
                      this.salePrice = 0;
                      this.costPrice = 0;
                      this.categoryId = null;
                      this.file = null;
                      this.barCode = '';
                      this.available = false;
                      this.$router.push({
                        name: 'Product', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateProduct'));
                  })
            }
        }
        
    },
    backToProductList: function(){
        if (this.sourceCategoryId && this.sourceMenuId)
        {
            this.$router.push({
                name: 'ProductByCategory', 
                params: {
                          categoryId: this.sourceCategoryId,
                          menuId: this.sourceMenuId,
                        }
            });
        }
        else{
            this.$router.push({
              name: 'Product', 
            });
        }
    }
    /**************** Support Methods ****************/
    //  editCategory: function(id, name, description){
    //     this.isEditing = true;
    //     this.editingId = id;
    //     this.name = name;
    //     this.description = description;
    //     this.file = null;
    //  },
    //  clearCategory: function(){
    //     this.isEditing = false;
    //     this.editingId = null;
    //     this.name = '';
    //     this.description = '';
    //     this.file = null;
    //  },
  },

}
    
</script>
<style>

</style>