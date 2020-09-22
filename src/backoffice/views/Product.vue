<template>
    <ion-content id="product" class="product">

        <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
        <router-link to="/product-form"><ion-button v-if="hasPermission('canCreateProduct')" expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.product')}}</ion-button></router-link>

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
                    <ion-label >
                        <p>{{ getCategoryNameById(product.CategoryId) }}</p>
                        <p>{{$t('backoffice.form.fields.costPrice')}}: ${{ product.CostPrice }}</p>
                        <p>{{$t('backoffice.form.fields.salePrice')}}: ${{ product.SalePrice }}</p>
                     </ion-label>
                </ion-item>
               <!--  <ion-item>
                <ion-item>  
                <ion-label>
                    <h2>{{ product.Name }}</h2>
                    <h3>{{ product.Description }}</h3>
                    <ion-label>{{ fetchCategoryById(product.CategoryId) }}</ion-label> 
                </ion-label> 
                </ion-item>-->
                <ion-item-options side="end">
                    <ion-item-option v-if="hasPermission('canEditProduct')" color="primary" @click="editProduct(product._id, product.Name, product.Description,
                    product.CostPrice, product.SalePrice, product.CategoryId)">
                        <ion-icon slot="icon-only" name="create"></ion-icon>
                    </ion-item-option>
                    <ion-item-option v-if="hasPermission('canDeleteProduct')" color="danger" @click="deleteProduct(product._id)">
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
       this.fetchProducts();
       this.fetchCategories();
   },
   data () {
    return {
      modelName: 'Product',
      /****** Form Data ******/
    //   categoryId: null,
      categories: [],
      products: [],
    }
  },
   methods: {
    hasPermission(permission){
        
        let res = false;
        if (this.$store.state.authenticated)
        {
            let roles = this.$store.state.roles;
            for (let index = 0; index < roles.length; index++) {
                switch(permission){                        
                      case 'canCreateProduct':
                          res = roles[index].canCreateProduct;
                          break;
                      case 'canEditProduct':
                          res = roles[index].canEditProduct;
                          break;
                      case 'canDeleteProduct':
                          res = roles[index].canDeleteProduct;
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
    loadMore: function(event) {
        // this.$store.dispatch('loadMore')
        event.target.complete();    
    },
    /****** CRUD category methods ******/
    fetchCategories: function(){
        Api.fetchAll('Category').then(response => {
          // console.log(response.data)
          this.categories = response.data
        })
        .catch(e => {
            console.log(e);
            // this.ShowMessage('Error', 'Error', 'Fetch category');
        });
    },
    fetchProducts: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.products = response.data
        })
        .catch(e => {
            // this.ShowMessage('Error', 'Error', 'Fetch product');
            console.log(e);
        });
    },
    getCategoryNameById: function(id){
        var categ = '';
        this.categories.forEach(category => {
            if (category._id == id) {
                categ = category.Name;                
            }
        });
        return categ;
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
    editProduct: function(id){
        this.$router.push({
        name: 'ProductForm', 
        params: { productId: id }
      });
    },
    deleteProduct: function(id){


        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteProduct'),
        buttons: [
          {
            text: this.$t('backoffice.list.messages.buttons.cancel'),
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: this.$t('backoffice.list.messages.buttons.delete'),
            handler: () => {
              
                Api.deleteById(this.modelName, id)
                .then(response => {
                    this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                      this.$t('backoffice.list.messages.messageDeleteSuccessProduct'),
                          this.$t('backoffice.list.messages.deleteSubtitleProduct'));
                    this.fetchProducts();
                return response;
                })
                .catch(e => {
                    console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleProduct'));
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