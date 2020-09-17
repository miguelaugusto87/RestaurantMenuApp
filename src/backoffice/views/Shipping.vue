<template>
  <ion-content id="shipping" class="shipping">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/shipping-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.shipping')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="shipping in shippings" v-bind:key="shipping._id">
          <ion-item>
            <ion-label>
                <h2>{{ shipping.Name }}</h2>
                <h3>{{$t('backoffice.form.fields.price')}}: {{ shipping.Price }}</h3>
            </ion-label>
            <ion-checkbox v-if="shipping.Available" checked="true" slot="end" @click="availableShipping(shipping, false)"></ion-checkbox>
            <ion-checkbox v-else checked="false" slot="end" @click="availableShipping(shipping, true)"></ion-checkbox>
            <!-- <ion-label>
                <ion-checkbox v-if="tax.Available" disabled="true" checked="true"></ion-checkbox>
                <ion-checkbox v-else disabled="true" checked="false"></ion-checkbox>
            </ion-label> -->
          </ion-item>
          
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editShipping(shipping._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteShipping(shipping._id)">
               <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
    </ion-list>

  </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'tax',
  created: function(){
   this.fetchShipping();
  },
  data () {
    return {
      modelName: 'Shipping',
      shippings: [],
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
            buttons: [this.$t('backoffice.form.messages.buttons.ok')],
          })
        .then(a => a.present())
    },
    /****** CRUD category methods ******/
    fetchShipping: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.shippings = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    availableShipping: function(shipping, state){
      let item = {
            "_id": shipping._id,
            "Name": shipping.Name,
            "Available": state,
            "Price": shipping.Price,
        }
        Api.putIn(this.modelName, item)
              .then(response => {
                    this.ShowMessage(this.$t('backoffice.list.messages.activeShipping'), 
                      this.$t('backoffice.list.messages.shippingChangeState'),
                        this.$t('backoffice.list.messages.activeShipping'));
                    this.fetchShipping();
                    return response;
              })
              .catch(e => {
                    console.log(e);
                    this.fetchShipping();
                    this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                        this.$t('backoffice.list.messages.errorMessage'),
                                           this.$t('backoffice.list.messages.activeShipping'));

              })
    },
    editShipping: function(id){
        console.log(id);
        this.$router.push({
        name: 'ShippingForm', 
        params: { shippingId: id }
      });
    },
    deleteShipping: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteShipping'),
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
                  this.fetchShipping();
                    this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                      this.$t('backoffice.list.messages.messageDeleteSuccessShipping'),
                          this.$t('backoffice.list.messages.deleteSubtitleShipping'));
                  return response;
                })
                .catch(e => {
                  console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleShipping'));
                })

            }
          }
        ]
      })
      .then(a => a.present());

      },
  },

}

</script>

<style>

</style>