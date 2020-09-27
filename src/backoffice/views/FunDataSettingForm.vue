<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>

    <br/>
    <ion-label><h1>{{title}}</h1></ion-label>

      <!-- <ion-card> -->
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.SelectPickHour')}}</ion-label>
           <ion-checkbox slot="end" name="selectPickHour" 
                @ionChange="selectPickHour=$event.target.checked" 
                :checked="selectPickHour">
          </ion-checkbox>
        </ion-item>
        <div v-if="selectPickHour">
            <ion-item>
                <ion-label>{{$t('backoffice.form.fields.PickFrom')}}(HH:mm)</ion-label>
                <ion-datetime name="pickFrom" @ionChange="pickFrom = $event.target.value" 
                                v-bind:value="pickFrom"
                                :placeholder="$t('backoffice.form.titles.pickFromSelect')" display-format="HH:mm">
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label>{{$t('backoffice.form.fields.PickTo')}}(HH:mm)</ion-label>
                <ion-datetime name="pickTo" @ionChange="pickTo = $event.target.value" 
                                v-bind:value="pickTo"
                                :placeholder="$t('backoffice.form.titles.pickToSelect')" display-format="HH:mm">
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{$t('backoffice.form.fields.MinTimeToCook')}}</ion-label>
                <ion-input type="number" name="minTimeToCook"
                @input="minTimeToCook = $event.target.value" 
                v-bind:value="minTimeToCook">
                </ion-input>
            </ion-item>
        </div>
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.ShowCooker')}}</ion-label>
           <ion-checkbox slot="end" name="showCooker" 
                @ionChange="showCooker=$event.target.checked" 
                :checked="showCooker">
          </ion-checkbox>
        </ion-item>

        <ion-list>
            <ion-item>
                <ion-label>{{$t('backoffice.form.fields.zipCodes')}}</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Type a new zip code</ion-label>
              <ion-input type="number" @input="newCode = $event.target.value"></ion-input>
              <ion-button expand="full" color="primary" @click="addCode(newCode)"><ion-icon slot="icon-only" name="add"></ion-icon></ion-button>
            </ion-item>
            <ion-item v-for="zipCode in zipCodes" v-bind:key="zipCode._id">
               <ion-label>{{zipCode}}</ion-label>
               <ion-button expand="full" color="danger" @click="delCode(zipCode)"><ion-icon slot="icon-only" name="trash"></ion-icon></ion-button>
            </ion-item>
        </ion-list>

        <ion-item>
          <ion-label position="floating">{{$t('backoffice.form.fields.deliveryZone')}}</ion-label>
          <ion-textarea name="deliveryZone" 
          @input="deliveryZone = $event.target.value" 
          v-bind:value="deliveryZone">
          </ion-textarea>
        </ion-item>

      <br/>
      <ion-button expand="full" color="primary" @click="saveSetting()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'funDataSettingForm',
   
  data () {
    return {
      modelName: 'Setting',
      /****** Form Data ******/
      newCode: 0,
      id: null,
      selectPickHour: false,
      minTimeToCook: 0,
      pickFrom: '00:00',
      pickTo: '23:59',
      showCooker: false,
      zipCodes: [],
      deliveryZone: "",
      /***** Is editing  *****/
    }
  },
  created: function(){
    
    this.id = this.$route.params.settingId;
    if (this.id){
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.selectPickHour = response.data.SelectPickHour;
               this.minTimeToCook = response.data.MinTimeToCook;
               this.pickFrom = response.data.PickFrom;
               this.pickTo = response.data.PickTo;
               this.showCooker = response.data.ShowCooker;
               this.zipCodes = response.data.ZipCodes;
               this.deliveryZone = response.data.DeliveryZone;

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
    addCode(newVal){
        if (newVal < 100 || newVal > 999)
        {
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), this.$t('backoffice.form.validate.zipCode'), this.$t('backoffice.form.validate.validateSetting'));
            return;
        }
        if (this.zipCodes.includes(newVal))
        {
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), this.$t('backoffice.form.validate.duplicateZipCode'), this.$t('backoffice.form.validate.validateSetting'));
        }
        else
        {
           this.zipCodes.push(newVal);
        }
        console.log(this.zipCodes);
    },
    delCode(val){
       this.zipCodes.splice(this.zipCodes.indexOf(val), 1);
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
    saveSetting: function(){

        if (this.isValidForm()){

            console.log(this.pickFrom);
            let item = {
              "SelectPickHour": this.selectPickHour,
              "MinTimeToCook": this.minTimeToCook,
              "PickFrom": this.pickFrom,
              "PickTo": this.pickTo,
              "ShowCooker": this.showCooker,
              "ZipCodes": this.zipCodes,
              "DeliveryZone": this.deliveryZone,
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