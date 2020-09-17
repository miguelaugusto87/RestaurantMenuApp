<template>
  <ion-content id="tax" class="tax">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/tax-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.tax')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="tax in taxes" v-bind:key="tax._id">
          <ion-item>
            <ion-label>
                <h2>{{ tax.Name }}</h2>
                <h3>Tax percent: {{ tax.Percent }}%</h3>
            </ion-label>
            <ion-checkbox v-if="tax.Available" checked="true" slot="end" @click="activeTax(tax, false)"></ion-checkbox>
            <ion-checkbox v-else checked="false" slot="end" @click="activeTax(tax, true)"></ion-checkbox>
            <!-- <ion-label>
                <ion-checkbox v-if="tax.Available" disabled="true" checked="true"></ion-checkbox>
                <ion-checkbox v-else disabled="true" checked="false"></ion-checkbox>
            </ion-label> -->
          </ion-item>
          
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editTax(tax._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteTax(tax._id)">
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
   this.fetchTaxes();
  },
  data () {
    return {
      modelName: 'Tax',
      taxes: [],
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
    fetchTaxes: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.taxes = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    activeTax: function(tax, state){
      let item = {
            "_id": tax._id,
            "Name": tax.Name,
            "Available": state,
            "Percent": tax.Percent,
        }
        Api.putIn(this.modelName, item)
              .then(response => {
                    this.ShowMessage(this.$t('backoffice.list.messages.activeTax'), 
                      this.$t('backoffice.list.messages.taxChangeState'),
                        this.$t('backoffice.list.messages.activeTax'));
                    this.fetchTaxes();
                    return response;
              })
              .catch(e => {
                    console.log(e);
                    this.fetchTaxes();
                    this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                        this.$t('backoffice.list.messages.errorMessage'),
                                           this.$t('backoffice.list.messages.activeTax'));

              })
    },
    editTax: function(id){
        this.$router.push({
        name: 'TaxForm', 
        params: { taxId: id }
      });
    },
    deleteTax: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteTax'),
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
                      this.$t('backoffice.list.messages.messageDeleteSuccessTax'),
                          this.$t('backoffice.list.messages.deleteSubtitleTax'));
                  this.fetchTaxes();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleTax'));
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