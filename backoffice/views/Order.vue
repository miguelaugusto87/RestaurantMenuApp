<template>
  <ion-content id="order" class="order">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <ion-button expand="full" color="tertiary" @click="pay">PAY ORDER</ion-button>
    <!-- <router-link to="/order-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>Add a new order</ion-button></router-link> -->

      <ion-list>
        <ion-item-sliding v-for="order in orders" v-bind:key="order._id">
          <ion-item>
            <ion-label>
                <h2>{{ getCustomerNameById(order.ClientId) }}</h2>
                <h2>{{ getFormatedDate(order.Date) }}</h2>
            </ion-label>
            <ion-label position="fixed">
                <h3>{{ order.OrderType }}</h3>
                <h3>{{ order.State }}</h3>
            </ion-label>
          </ion-item>
          <!-- <ion-item-options side="end">
            <ion-item-option color="primary" @click="editCategory(category._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteCategory(category._id)">
               <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options> -->
        </ion-item-sliding>
    </ion-list>

  </ion-content>
</template>

<script>

import { Api } from '../api/api.js';
import { Utils } from '../utils/utils.js';
import { payAuthorizeNet } from '../api/payments.js';

export default {

  name: 'order',
  created: function(){
   this.fetchOrders();
   this.fetchCustomers();
  },
  data () {
    return {
      modelName: 'Order',
      orders: [],
      customers: [],
    }
  }, 
  methods: {
    pay: function(){
        payAuthorizeNet.pay({})
          .then(response => {
             console.log(response);
        })
        .catch(e => {
          console.log(e)
        });
    },
    getFormatedDate: function(date){
        return Utils.getFormatedDate(date);         
    },
    /****** CRUD category methods ******/
    fetchOrders: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.orders = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    fetchCustomers: function(){
        Api.fetchAll('Customer').then(response => {
          // console.log(response.data)
          this.customers = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    getCustomerNameById: function(id){
        var custom = '';
        this.customers.forEach(customer => {
            if (customer._id == id) {
                custom = customer.Name;                
            }
        });
        return custom;
    },

    // editCategory: function(id){
    //     this.$router.push({
    //     name: 'CategoryForm', 
    //     params: { categoryId: id }
    //   });
    // },
    // deleteCategory: function(id){
    //     Api.deleteById(this.modelName, id)
    //         .then(response => {
    //            alert("Success");
    //            this.fetchCategories();
    //            return response;
    //         })
    //         .catch(e => {
    //           console.log(e);
    //           alert("Error");
    //         })
    //  },
  },

}

</script>

<style>

</style>