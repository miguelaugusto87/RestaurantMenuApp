<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>

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
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.address')}}</ion-label>
          <ion-textarea name="address" 
          @input="address = $event.target.value" 
          v-bind:value="address">
          </ion-textarea>
        </ion-item>
        <ion-item>
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.email')}}</ion-label>
          <ion-input type="email" name="email"
          @input="email = $event.target.value" 
          v-bind:value="email">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.phone')}}</ion-label>
          <ion-input type="tel" name="phone"
          @input="phone = $event.target.value" 
          v-bind:value="phone">
          </ion-input>
        </ion-item>
          <ion-card v-if="checkImage()" >
              <ion-img :src="file"></ion-img>
          </ion-card>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.image')}}</ion-label>
          <ion-input type="file" accept=".jpg,.png,.gif" name="file"
          @change="handleImage">
          </ion-input>
        </ion-item>
      <!-- </ion-card>  -->

      <br/>
      <ion-button expand="full" color="primary" @click="saveSetting()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'basicDataSettingForm',
   
  data () {
    return {
      modelName: 'Restaurant',
      /****** Form Data ******/
      id: null,
      name: '',
      address: '',
      email: '',
      phone: '',
      file: null,
      fileName: '',
      /***** Is editing  *****/
    }
  },
  created: function(){
    
    this.id = this.$route.params.settingId;
    if (this.id){
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.address = response.data.Address;
               this.email = response.data.Email;
               this.phone = response.data.Phone;
               this.file = response.data.ImageUrl;
               return response;
            })
            .catch(e => {
              console.log(e);
            })   
    }

    console.log(this.$route.params);
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.settingEditTitle') :  this.$t('backoffice.form.titles.settingNewTitle');
        }
  },
  methods: {
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (this.address == "")
        {
            errors.push(this.$t('backoffice.form.validate.address'));
        }
        if (this.email == "")
        {
            errors.push(this.$t('backoffice.form.validate.email'));
        }
        if (this.phone == "")
        {
            errors.push(this.$t('backoffice.form.validate.phone'));
        }
        if (this.file == null)
        {
            errors.push(this.$t('backoffice.form.validate.image'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'),
                               message, this.$t('backoffice.form.validate.validateSetting'));
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
    /****** Load image use base64 encode esto debería ir en un componente******/
    checkImage: function(){
      return this.file != null;
    },
    handleImage: function(event)
    {
        const selectedImage = event.target.files[0];
        this.fileName = selectedImage.name;
        this.createBase64Img(selectedImage);
    },
    createBase64Img: function(fileObject){
        const reader = new FileReader();

        reader.onload = (e) => {
            this.file = e.target.result;
            console.log(this.file);
        };
        reader.readAsDataURL(fileObject);
    },
    /*******                              Fin                              *******/
    //Create or edit a new category
    saveSetting: function(){

        if (this.isValidForm()){

            let item = {
              "Name": this.name,
              "Address": this.address,
              "Email": this.email,
              "Phone": this.phone,
            }
            if (this.file != null)
            {
              item["ImageUrl"] = this.file;
              item["ImageName"] = this.fileName;
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        // alert("Success edited");
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessSetting'), 
                                this.$t('backoffice.list.messages.titleEditSetting'));
                        this.name = '';
                        this.description = '';
                        this.isEditing = false;
                        this.id = null;
                        this.file = null;
                        this.$router.push({
                          name: 'ControlPanel', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditSetting'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessSetting'), 
                                this.$t('backoffice.list.messages.titleCreateSetting'));
                      this.$router.push({
                        name: 'ControlPanel', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateCategory'));
                  })
            }

        }
    },
  },

}
    
</script>