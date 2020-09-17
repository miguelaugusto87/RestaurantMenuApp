<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/tax"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToTaxesList')}}</ion-button></router-link>

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
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.percent')}}</ion-label>
          <ion-input type="number" name="percent"
          @input="percent = $event.target.value" 
          v-bind:value="percent">
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
      <ion-button expand="full" color="primary" @click="saveTax()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'taxForm',
   
  data () {
    return {
      modelName: 'Tax',
      /****** Form Data ******/
      id: null,
      name: '',
      percent: 0,
      available: false,
    }
  },
  created: function(){
    
    this.id = this.$route.params.taxId;
    if (this.id){
      this.title = 'Edit tax';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.percent = response.data.Percent;
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
            return this.id ? this.$t('backoffice.form.titles.taxEditTitle') :  this.$t('backoffice.form.titles.taxNewTitle');
        }
  },
  methods: {
        isValidForm(){
            let errors = [];
            if (this.name == "")
            {
                errors.push(this.$t('backoffice.form.validate.name'));
            }
            if (isNaN(this.percent))
            {
                errors.push(this.$t('backoffice.form.validate.percent'));
            }
            if (this.percent == 0)
            {
                errors.push(this.$t('backoffice.form.validate.percentGreater'));
            }

            if (errors.length > 0)
            {
                let message = "";
                for (let i = 0; i < errors.length; i++) {
                    message += (i + 1) + "- " + errors[i] + "<br/>";
                }
                this.ShowMessage(this.$t('backoffice.form.validate.validate'),
                         message, this.$t('backoffice.form.validate.validateTax'));
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
    saveTax: function(){

        if (this.isValidForm()){

            let item = {
              "Name": this.name,
              "Percent": this.percent,
              "Available": this.available,
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        // alert("Success edited");
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessTax'), 
                                this.$t('backoffice.list.messages.titleEditTax'));
                        this.name = '';
                        this.percent = 0;
                        this.available = false;
                        this.id = null;
                        this.$router.push({
                          name: 'Tax', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditTax'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessTax'), 
                                this.$t('backoffice.list.messages.titleCreateTax'));
                      this.name = '';
                      this.percent = 0;
                      this.available = null;
                      this.$router.push({
                        name: 'Tax', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateTax'));
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