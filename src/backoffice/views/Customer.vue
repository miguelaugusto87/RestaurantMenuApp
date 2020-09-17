<template>
  <ion-content id="customer" class="customer">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/customer-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.customer')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="customer in customers" v-bind:key="customer._id">
          <ion-item>
            <ion-label>
                <h2>{{ customer.Name }}</h2>
            </ion-label>
            <ion-label>
                <h3>{{ customer.Phone }}</h3>
                <h3>{{ customer.EmailAddress }}</h3>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editCustomer(customer._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteCustomer(customer._id)">
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

  name: 'customer',
  created: function(){
   this.fetchCustomers();
  },
  data () {
    return {
      modelName: 'Customer',
      customers: [],
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
    fetchCustomers: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.customers = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editCustomer: function(id){
        this.$router.push({
        name: 'CustomerForm',
        params: { customerId: id }
      });
    },
    deleteCustomer: function(id){

      return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteCustomer'),
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
                                       this.$t('backoffice.list.messages.messageDeleteSuccessCustomer'),
                                                this.$t('backoffice.list.messages.deleteSubtitleCustomer'));
                this.fetchCustomers();
                return response;
              })
              .catch(e => {
                console.log(e);
                this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                    this.$t('backoffice.list.messages.errorMessage'),
                                        this.$t('backoffice.list.messages.deleteSubtitleCustomer'));
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