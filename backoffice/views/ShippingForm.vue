<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/shipping"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToShippingsList')}}</ion-button></router-link>

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
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.price')}}</ion-label>
          <ion-input type="number" name="price"
          @input="price = $event.target.value" 
          v-bind:value="price">
          </ion-input>
        </ion-item>
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.available')}}</ion-label>
           <ion-checkbox slot="end" name="available" 
                @ionChange="available = $event.target.checked"
                :checked="available">    
          </ion-checkbox>
        </ion-item>
      <!-- </ion-card>  -->

      <br/>
      <ion-button expand="full" color="primary" @click="saveShipping()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'shippingForm',
   
  data () {
    return {
      modelName: 'Shipping',
      /****** Form Data ******/
      id: null,
      name: '',
      price: 0,
      available: false,
    }
  },
  created: function(){
    
    this.id = this.$route.params.shippingId;
    if (this.id){
      this.title = 'Edit shipping';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.price = response.data.Price;
               this.available = response.data.Available;
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
            return this.id ? this.$t('backoffice.form.titles.shippingEditTitle') :  this.$t('backoffice.form.titles.shippingNewTitle');
        }
  },
  methods: {
      isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (isNaN(this.price))
        {
            errors.push(this.$t('backoffice.form.validate.price'));
        }
        if (this.price == 0)
        {
            errors.push(this.$t('backoffice.form.validate.priceGreater'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), message,
                                       this.$t('backoffice.form.validate.validateShipping'));
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
    //Create or edit a new category
    saveShipping: function(){
        if (this.isValidForm())
        {

          let item = {
          "Name": this.name,
          "Price": this.price,
          "Available": this.available,
          }
          //If I am editing
          if (this.id){
            item['_id'] = this.id;
            Api.putIn(this.modelName, item)
                .then(response => {
                      // alert("Success edited");
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessShipping'), 
                                this.$t('backoffice.list.messages.titleEditShipping'));
                      this.name = '';
                      this.price = 0;
                      this.available = false;
                      this.id = null;
                      this.$router.push({
                        name: 'Shipping', 
                      });
                      return response;
                })
                .catch(e => {
                      console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditShipping'));
                })
          }
          else{
            //Else, I am created a new category
            Api.postIn(this.modelName, item)
                .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessShipping'), 
                                this.$t('backoffice.list.messages.titleCreateShipping'));
                    this.name = '';
                    this.price = 0;
                    this.available = null;
                    this.$router.push({
                      name: 'Shipping', 
                    });
                    return response;
                })
                .catch(e => {
                    console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateShipping'));
                })
          }

        }
    },
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