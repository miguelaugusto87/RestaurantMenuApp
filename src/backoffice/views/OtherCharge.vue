<template>
    <ion-content id="otherCharge" class="otherCharge">

        <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
        <router-link to="/otherCharge-form"><ion-button v-if="hasPermission('canCreateOtherCharge')" expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.otherCharge')}}</ion-button></router-link>

        <ion-list>
            <ion-item-sliding v-for="otherCharge in otherCharges" v-bind:key="otherCharge._id">
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <h2>{{ otherCharge.Name }}</h2>
                        <h3>{{ otherCharge.ProductMin }}-{{ otherCharge.ProductMax }}...{{$t('backoffice.form.fields.price')}}:{{otherCharge.Price}}</h3>
                    </ion-label>
                    <ion-checkbox v-if="otherCharge.Available" checked="true" slot="end" @click="availableOtherCharge(otherCharge, false)"></ion-checkbox>
                    <ion-checkbox v-else checked="false" slot="end" @click="availableOtherCharge(otherCharge, true)"></ion-checkbox>
                </ion-item>
                <ion-item-options side="end">
                    <ion-item-option v-if="hasPermission('canEditOtherCharge')" color="primary" @click="editOtherCharge(otherCharge._id)">
                        <ion-icon slot="icon-only" name="create"></ion-icon>
                    </ion-item-option>
                    <ion-item-option v-if="hasPermission('canDeleteOtherCharge')" color="danger" @click="deleteOtherCharge(otherCharge._id)">
                        <ion-icon slot="icon-only" name="trash"></ion-icon>
                    </ion-item-option>
                </ion-item-options>
            </ion-item-sliding>
        </ion-list>

        <!-- <ion-infinite-scroll @ionInfinite="loadMore" threshold="100px" position="bottom">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll> -->

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {
   name: 'product',
   created: function(){
       this.fetchOtherCharges();
       this.fetchProducts();
   },
   data () {
    return {
      modelName: 'OtherCharges',
      /****** Form Data ******/
    //   categoryId: null,
      otherCharges: [],
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
                      case 'canCreateOtherCharge':
                          res = roles[index].canCreateOtherCharge;
                          break;
                      case 'canEditOtherCharge':
                          res = roles[index].canEditOtherCharge;
                          break;
                      case 'canDeleteOtherCharge':
                          res = roles[index].canDeleteOtherCharge;
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
    /****** CRUD category methods ******/
    fetchOtherCharges: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.otherCharges = response.data
        })
        .catch(e => {
            console.log(e);
            // this.ShowMessage('Error', 'Error', 'Fetch other charges');
        });
    },
    fetchProducts: function(){
        Api.fetchAll('Product').then(response => {
          // console.log(response.data)
          this.products = response.data
        })
        .catch(e => {
            // this.ShowMessage('Error', 'Error', 'Fetch product');
            console.log(e);
        });
    },
    // getCategoryNameById: function(id){
    //     var categ = '';
    //     this.categories.forEach(category => {
    //         if (category._id == id) {
    //             categ = category.Name;                
    //         }
    //     });
    //     return categ;
    // },
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
    availableOtherCharge: function(otherCharge, state){
      let item = {
            "_id": otherCharge._id,
            "Name": otherCharge.Name,
            "ProductMin": otherCharge.ProductMin,
            "ProductMax": otherCharge.ProductMax,
            "Price": otherCharge.Price,
            "ProductId": otherCharge.ProductId,
            "Available": state,
        }
        Api.putIn(this.modelName, item)
              .then(response => {
                    this.ShowMessage(this.$t('backoffice.list.messages.activeOtherCharge'), 
                          this.$t('backoffice.list.messages.otherChargeChangeState'),
                        this.$t('backoffice.list.messages.activeOtherCharge'));
                    this.fetchOtherCharges();
                    return response;
              })
              .catch(e => {
                    console.log(e);
                    this.fetchOtherCharges();
                    this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                        this.$t('backoffice.list.messages.errorMessage'),
                                           this.$t('backoffice.list.messages.activeOtherCharge'));

              })
    },
    editOtherCharge: function(id){
        this.$router.push({
        name: 'OtherChargeForm', 
        params: { otherChargeId: id }
      });
    },
    deleteOtherCharge: function(id){


        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteOtherCharge'),
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
                      this.$t('backoffice.list.messages.messageDeleteSuccessOtherCharges'),
                          this.$t('backoffice.list.messages.deleteSubtitleOtherCharges'));
                    this.fetchOtherCharges();
                return response;
                })
                .catch(e => {
                    console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleOtherCharges'));
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