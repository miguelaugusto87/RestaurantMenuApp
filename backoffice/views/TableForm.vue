<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/table"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToTablesList')}}</ion-button></router-link>

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
          v-bind:value="description">
          </ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.capacity')}}</ion-label>
          <ion-input type="number" name="capacity"
          @input="capacity = $event.target.value" 
          v-bind:value="capacity">
          </ion-input>
        </ion-item>
        <!-- <ion-item>
          <ion-label position="floating">Barcode</ion-label>
          <ion-input type="text" name="barcode"
          @input="barcode = $event.target.value" 
          v-bind:value="barcode">
          </ion-input>
        </ion-item> -->
        <ion-item>
            <ion-label>{{$t('backoffice.form.fields.qrCode')}}</ion-label>
            <qrcode-vue :value="qr" :size=200 level="H"></qrcode-vue>
        </ion-item>

        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.available')}}</ion-label>
           <ion-checkbox slot="end" name="available" 
                @ionChange="available=$event.target.checked" 
                :checked="available">
          </ion-checkbox>
        </ion-item>
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.active')}}</ion-label>
           <ion-checkbox slot="end" name="active" 
                @ionChange="active=$event.target.checked" 
                :checked="active">
          </ion-checkbox>
        </ion-item>
      <!-- </ion-card>  -->

      <br/>
      <ion-button expand="full" color="primary" @click="saveTable()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';
import QrcodeVue from 'qrcode.vue';

export default {

  name: 'tableForm',
   
  data () {
    return {
      modelName: 'Table',
      /****** Form Data ******/
      id: null,
      name: '',
      description: '',
      capacity: 0,
      barcode: '',
      active: false,
      available: false,
      qr: '',
    }
  },
  components: {
      QrcodeVue,
  },
  created: function(){
    
    this.id = this.$route.params.tableId;
    if (this.id){
      this.title = 'Edit table';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.description = response.data.Description;
               this.capacity = response.data.Capacity;
               this.barcode = response.data.Barcode;
               this.available = response.data.Available;
               this.active = response.data.Active;
               console.log("ACTIVE");
               console.log(response.data.Active);
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
            return this.id ? this.$t('backoffice.form.titles.tableEditTitle') :  this.$t('backoffice.form.titles.tableNewTitle');
        }
  },
  methods: {
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (isNaN(this.capacity))
        {
            errors.push(this.$t('backoffice.form.validate.capacity'));
        }
        if (this.capacity == 0)
        {
            errors.push(this.$t('backoffice.form.validate.capacityGreater'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), message, this.$t('backoffice.form.validate.validateTable'));
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
    saveTable: function(){

        if (this.isValidForm())
        {
              let item = {
              "Name": this.name,
              "Description": this.description,
              "Active": this.active,
              "Available": this.available,
              "Capacity": this.capacity,
              "Barcode": this.barcode,
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessTable'), 
                                this.$t('backoffice.list.messages.titleEditTable'));
                        this.name = '';
                        this.description = '';
                        this.capacity = 0;
                        this.barcode = '';
                        this.active = false;
                        this.available = false;
                        this.$router.push({
                          name: 'Table', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditTable'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessTable'), 
                                this.$t('backoffice.list.messages.titleCreateTable'));
                        this.name = '';
                        this.description = '';
                        this.capacity = 0;
                        this.barcode = '';
                        this.active = false;
                        this.available = false;
                        this.$router.push({
                          name: 'Table', 
                        });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateTable'));
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