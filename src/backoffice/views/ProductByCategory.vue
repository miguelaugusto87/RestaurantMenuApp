<template>
    <ion-content id="productbycategory" class="productbycategory">

        <ion-button expand="full" color="tertiary" @click="backToMenu()"><ion-icon name="back"></ion-icon>{{$t('backoffice.form.buttons.backToMenu')}}</ion-button>

        <h1>{{$t('backoffice.form.titles.allProducts')}} {{categoryName}}</h1>
        <ion-list>
            <ion-item-sliding v-for="product in products" v-bind:key="product._id">
                <ion-item>
                    <ion-thumbnail slot="start">
                        <ion-img :src="product.ImageUrl"></ion-img>
                    </ion-thumbnail>
                    <ion-label class="ion-text-wrap">
                        <h2>{{ product.Name }}</h2>
                        <!-- <h3>{{ product.BarCode }}</h3> -->
                    </ion-label>
                          
                    <ion-checkbox v-if="product.Available" checked="true" slot="end" @click="availableProduct(product, false)"></ion-checkbox>
                    <ion-checkbox v-else checked="false" slot="end" @click="availableProduct(product, true)"></ion-checkbox>
           
                </ion-item>

                <ion-item-options side="end">
                    <ion-item-option color="primary" @click="editProduct(product._id)">
                        <ion-icon slot="icon-only" name="create"></ion-icon>
                    </ion-item-option>
                    <ion-item-option color="danger" @click="deleteProduct(product._id)">
                        <ion-icon slot="icon-only" name="trash"></ion-icon>
                    </ion-item-option>
                </ion-item-options>
            </ion-item-sliding>
        </ion-list>

        <!-- <ion-infinite-scroll @ionInfinite="loadMore" threshold="100px" position="bottom">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll> -->

        <ion-infinite-scroll>
            <ion-infinite-scroll-content
                loadingSpinner="bubbles"
                loadingText="Loading more data…">
            </ion-infinite-scroll-content>
        </ion-infinite-scroll>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {
   name: 'product',
   created: function(){
       this.categoryId = this.$route.params.categoryId;
       this.sourceMenuId = this.$route.params.menuId;
       this.fetchProductsByCategory();
       this.getCategoryName();
   },
   data () {
    return {
      modelName: 'Product',
      /****** Form Data ******/
      categoryId: null,
      sourceMenuId: null,
      categoryName: "",
      products: [],
    }
  },
   methods: {
    ShowMessage(type, message, topic='') {
        return this.$ionic.alertController
          .create({
            cssClass: 'my-custom-class',
            header: type,
            subHeader: topic,
            message: message,
            buttons: ['OK'],
          })
        .then(a => a.present())
    },
    loadMore: function(event) {
        // this.$store.dispatch('loadMore')
        event.target.complete();    
    },
    /****** CRUD category methods ******/
    fetchProductsByCategory: function(){
        Api.getProductsByCategory(this.categoryId).then(response => {
          // console.log(response.data)
          this.products = response.data
        })
        .catch(e => {
            console.log(e);
            this.ShowMessage('Error', 'Error', 'Fetch products');
        });
    },
    getCategoryName: function(){
        Api.fetchById('Category', this.categoryId).then(response => {
          // console.log(response.data)
          this.categoryName = response.data.Name
        })
        .catch(e => {
            console.log(e);
            this.ShowMessage('Error', 'Error', 'Fetch category');
        });
    },
    backToMenu: function(){
        this.$router.push({
            name: 'MenuForm', 
            params: {
                     "menuId": this.sourceMenuId,
                    }
          });
    },
    // fetchCategoryById: function(id) {
    //     let categoryName = '';
    //     this.categories.forEach(category => {
    //         if (category._id == id){
    //             categoryName = category.Name;
    //             return categoryName;
    //         }
    //     }
    //     );

    //     return categoryName;
    // },
    availableProduct(product, state){

        let item = {
            "_id": product._id,
            "Name": product.Name,
            "Description": product.Description,
            "CostPrice": product.CostPrice,
            "SalePrice": product.SalePrice,
            "CategoryId": product.CategoryId,
            "ImageUrl": product.ImageUrl,
            "Available": state,
            "BarCode": product.BarCode,
        }
        Api.putIn(this.modelName, item)
              .then(response => {
                    this.ShowMessage('Info', 'Product state was successfully change', 'Available product');
                    this.fetchProductsByCategory(this.categoryId);
                    return response;
              })
              .catch(e => {
                    console.log(e);
                    this.fetchProductsByCategory(this.categoryId);
                    this.ShowMessage('Error', 'Error', 'Available product');

              })

    },
    editProduct: function(id){
        this.$router.push({
        name: 'ProductForm', 
        params: { 
                    productId: id, 
                    categoryId: this.categoryId,
                    menuId: this.sourceMenuId,
                }
      });
    },
    deleteProduct: function(id){


        return this.$ionic.alertController.create({
        title: 'Confirm delete',
        message: 'Do you want to delete this product?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Delete',
            handler: () => {
              
                Api.deleteById(this.modelName, id)
                .then(response => {
                    this.ShowMessage('Info', 'Product was successfully deleted', 'Delete product');
                    this.fetchProducts();
                return response;
                })
                .catch(e => {
                    console.log(e);
                    this.ShowMessage('Error', 'Erro', 'Delete product');
                })

            }
          }
        ]
      })
      .then(a => a.present());  

     },
   } 
}
</script>