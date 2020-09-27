<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>

    <br/>
    <ion-label><h1>{{title}}</h1></ion-label>

      <!-- <ion-card> -->
        <ion-item>
            <ion-label>Primary color</ion-label>
            <ion-label><div class="preView" :style="[getPrimaryStyles()]">Primary</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="primaryBackground = $event" 
            v-bind:value="primaryBackground" />
        </ion-item>
        <ion-item>
        </ion-item>
        <ion-item><ion-label>Primary text</ion-label></ion-item>
        <ion-item>
            <slider-picker
            @input="primaryContrast = $event" 
            v-bind:value="primaryContrast" />
        </ion-item>
        <ion-item>
        </ion-item>

        <ion-item>
            <ion-label>Secondary color</ion-label>
            <ion-label><div class="preView" :style="[getSecondaryStyles()]">Secondary</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="secondaryBackground = $event" 
            v-bind:value="secondaryBackground" />
        </ion-item>
        <ion-item>
        </ion-item>
        <ion-item><ion-label>Secondary text</ion-label></ion-item>
        <ion-item>
            <slider-picker
            @input="secondaryContrast = $event" 
            v-bind:value="secondaryContrast" />
        </ion-item>
        <ion-item>
        </ion-item>

        <ion-item>
            <ion-label>Tetiary color</ion-label>
            <ion-label><div class="preView" :style="[getTertiaryStyles()]">Tertiary</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="tertiaryBackground = $event" 
            v-bind:value="tertiaryBackground" />
        </ion-item>
        <ion-item>
        </ion-item>
        <ion-item><ion-label>Tertiry text</ion-label></ion-item>
        <ion-item>
            <slider-picker
            @input="tertiaryContrast = $event" 
            v-bind:value="tertiaryContrast" />
        </ion-item>
        <ion-item>
        </ion-item>

        <ion-item>
            <ion-label>Success color</ion-label>
            <ion-label><div class="preView" :style="[getSuccessStyles()]">Success</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="successBackground = $event" 
            v-bind:value="successBackground" />
        </ion-item>
        <ion-item>
        </ion-item>
        <ion-item><ion-label>Success text</ion-label></ion-item>
        <ion-item>
            <slider-picker
            @input="successContrast = $event" 
            v-bind:value="successContrast" />
        </ion-item>
        <ion-item>
        </ion-item>

        <ion-item>
            <ion-label>Danger color</ion-label>
            <ion-label><div class="preView" :style="[getDangerStyles()]">Danger</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="dangerBackground = $event" 
            v-bind:value="dangerBackground" />
        </ion-item>
        <ion-item>
        </ion-item>
        <ion-item><ion-label>Danger text</ion-label></ion-item>
        <ion-item>
            <slider-picker
            @input="dangerContrast = $event" 
            v-bind:value="dangerContrast" />
        </ion-item>
        <ion-item>
        </ion-item>

        <ion-item>
            <ion-label>Background color</ion-label>
            <ion-label><div class="preView" :style="[getTertiaryStyles()]">Backgrond</div></ion-label>
        </ion-item>
        <ion-item>
            <slider-picker
            @input="backgroundColor = $event" 
            v-bind:value="backgroundColor" />
        </ion-item>
        <ion-item>
        </ion-item>
        
      <br/>
      <ion-button expand="full" color="primary" @click="saveSetting()">{{ title }}</ion-button>
      <ion-button expand="full" color="secondary" @click="setDefault()">Set default config</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

import { Slider } from "vue-color";

export default {

  name: 'basicDataSettingForm',
   
  data () {
    return {
      modelName: 'Setting',
      /****** Form Data ******/
      id: null,
      primaryBackground: {hex: '#3880ff', rgba: {a: 1, b: 255, g: 128, r: 56}},
      primaryContrast: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},

      secondaryBackground: {hex: '#3dc2ff', rgba: {a: 1, b: 255, g: 194, r: 61}},
      secondaryContrast: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},

      tertiaryBackground: {hex: '#5260ff', rgba: {a: 1, b: 255, g: 96, r: 82}},
      tertiaryContrast: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},

      successBackground: {hex: '#2dd36f', rgba: {a: 1, b: 111, g: 211, r: 45}},
      successContrast: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},

      dangerBackground: {hex: '#eb445a', rgba: {a: 1, b: 90, g: 68, r: 235}},
      dangerContrast: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},

      backgroundColor: {hex: '#ffffff', rgba: {a: 1, b: 255, g: 255, r: 255}},
      /***** Is editing  *****/
    }
  },
  created: function(){
    
    this.id = this.$route.params.settingId;
    if (this.id){
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.colour = response.data.Colour;
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
  components: {
    "slider-picker": Slider
  },
  methods: {
      getPrimaryStyles(){
          console.log(this.primaryBackground);
          return {
                    'color': this.primaryContrast.hex,
                    'background-color': this.primaryBackground.hex,
                }
      },
     getSecondaryStyles(){
          return {
                    'color': this.secondaryContrast.hex,
                    'background-color': this.secondaryBackground.hex,
                }
      },
      getTertiaryStyles(){
          return {
                    'color': this.tertiaryContrast.hex,
                    'background-color': this.tertiaryBackground.hex,
                }
      },
      getSuccessStyles(){
          return {
                    'color': this.successContrast.hex,
                    'background-color': this.successBackground.hex,
                }
      },
      getDangerStyles(){
          return {
                    'color': this.dangerContrast.hex,
                    'background-color': this.dangerBackground.hex,
                }
      },
      getBackgroundStyles(){
           return {
                    'background-color': this.backgroundColor.hex,
                }
      },
    isValidForm(){
        let errors = [];
        if (this.colour == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
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
    //Create or edit a new category
    saveSetting: function(){

        if (this.isValidForm()){

            let item = {
              "AllStyles": ":root { --ion-color-primary: "+ this.primaryBackground.hex +
                                "; --ion-color-primary-rgb: " + this.primaryBackground.rgba.r +", " + 
                                this.primaryBackground.rgba.g +" , " + this.primaryBackground.rgba.b + 
                                "; --ion-color-primary-contrast: " +  this.primaryContrast.hex + 
                                "; --ion-color-primary-contrast-rgb: " + this.primaryContrast.rgba.r + ", " + 
                                this.primaryContrast.rgba.g + ", " + this.primaryContrast.rgba.b + 
                                ";--ion-color-primary-shade: mix(#000, " + this.primaryBackground.hex + ", 12%)" + 
                                ";--ion-color-primary-tint: mix(#fff, " + this.primaryBackground.hex + ", 10%);" + 
                                
                                "--ion-color-secondary: "+ this.secondaryBackground.hex +
                                "; --ion-color-secondary-rgb: " + this.secondaryBackground.rgba.r +", " + 
                                this.secondaryBackground.rgba.g +" , " + this.secondaryBackground.rgba.b + 
                                "; --ion-color-secondary-contrast: " +  this.secondaryContrast.hex + 
                                "; --ion-color-secondary-contrast-rgb: " + this.secondaryContrast.rgba.r + ", " + 
                                this.secondaryContrast.rgba.g + ", " + this.secondaryContrast.rgba.b + 
                                ";--ion-color-secondary-shade: mix(#000, " + this.secondaryBackground.hex + ", 12%)" + 
                                ";--ion-color-secondary-tint: mix(#fff, " + this.secondaryBackground.hex + ", 10%);" +

                                "--ion-color-tertiary: "+ this.tertiaryBackground.hex +
                                "; --ion-color-tertiary-rgb: " + this.tertiaryBackground.rgba.r +", " + 
                                this.tertiaryBackground.rgba.g +" , " + this.tertiaryBackground.rgba.b + 
                                "; --ion-color-tertiary-contrast: " +  this.tertiaryContrast.hex + 
                                "; --ion-color-tertiary-contrast-rgb: " + this.tertiaryContrast.rgba.r + ", " + 
                                this.tertiaryContrast.rgba.g + ", " + this.tertiaryContrast.rgba.b + 
                                ";--ion-color-tertiary-shade: mix(#000, " + this.tertiaryBackground.hex + ", 12%)" + 
                                ";--ion-color-tertiary-tint:  mix(#fff, " + this.tertiaryBackground.hex + ", 10%);" +

                                "--ion-color-success: "+ this.successBackground.hex +
                                "; --ion-color-success-rgb: " + this.successBackground.rgba.r +", " + 
                                this.successBackground.rgba.g +" , " + this.successBackground.rgba.b + 
                                "; --ion-color-success-contrast: " +  this.successContrast.hex + 
                                "; --ion-color-success-contrast-rgb: " + this.successContrast.rgba.r + ", " + 
                                this.successContrast.rgba.g + ", " + this.successContrast.rgba.b + 
                                ";--ion-color-success-shade: mix(#000, " + this.successBackground.hex + ", 12%)" + 
                                ";--ion-color-success-tint: mix(#fff, " + this.successBackground.hex + ", 10%);" +

                                "--ion-color-danger: "+ this.dangerBackground.hex +
                                "; --ion-color-danger-rgb: " + this.dangerBackground.rgba.r +", " + 
                                this.dangerBackground.rgba.g +" , " + this.dangerBackground.rgba.b + 
                                "; --ion-color-danger-contrast: " +  this.dangerContrast.hex + 
                                "; --ion-color-danger-contrast-rgb: " + this.dangerContrast.rgba.r + ", " + 
                                this.dangerContrast.rgba.g + ", " + this.dangerContrast.rgba.b + 
                                ";--ion-color-danger-shade: mix(#000, " + this.dangerBackground.hex + ", 12%)" + 
                                ";--ion-color-danger-tint: mix(#fff, " + this.dangerBackground.hex + " , 10%);" +
                                
                                "--ion-background-color: " + this.backgroundColor.hex + ";}",
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
                        var allStyles= item['AllStyles'];
                            document.querySelector('style').innerHTML += allStyles;
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
    setDefault: function(){
        let item = {
              "_id": this.id,
              "AllStyles": ":root { -ion-color-primary: #3880ff; " +
                            "--ion-color-primary-rgb: 56,128,255; " +
                            "--ion-color-primary-contrast: #ffffff; " +
                            "--ion-color-primary-contrast-rgb: 255,255,255; " +
                            "--ion-color-primary-shade: #3171e0; " +
                            "--ion-color-primary-tint: #4c8dff; " +

                            "--ion-color-secondary: #3dc2ff; " +
                            "--ion-color-secondary-rgb: 61,194,255; " +
                            "--ion-color-secondary-contrast: #ffffff; " +
                            "--ion-color-secondary-contrast-rgb: 255,255,255; " +
                            "--ion-color-secondary-shade: #36abe0; " +
                            "--ion-color-secondary-tint: #50c8ff; " +

                            "--ion-color-tertiary: #5260ff; " +
                            "--ion-color-tertiary-rgb: 82,96,255; " + 
                            "--ion-color-tertiary-contrast: #ffffff; " +
                            "--ion-color-tertiary-contrast-rgb: 255,255,255; " +
                            "--ion-color-tertiary-shade: #4854e0; " + 
                            "--ion-color-tertiary-tint: #6370ff; " +

                            "--ion-color-success: #2dd36f; " +
                            "--ion-color-success-rgb: 45,211,111; " +
                            "--ion-color-success-contrast: #ffffff; " +
                            "--ion-color-success-contrast-rgb: 255,255,255; " +
                            "--ion-color-success-shade: #28ba62; " + 
                            "--ion-color-success-tint: #42d77d; " +

                            "--ion-color-danger: #eb445a; " +
                            "--ion-color-danger-rgb: 235,68,90; " +
                            "--ion-color-danger-contrast: #ffffff; " + 
                            "--ion-color-danger-contrast-rgb: 255,255,255; " +
                            "--ion-color-danger-shade: #cf3c4f; " +
                            "--ion-color-danger-tint: #ed576b; }",
            }
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
  },

}
    
</script>

<style>
    .preView{
        width: 60%;
        margin-left: 25%; 
        margin-right: 25%; 
        margin-top: 20px; 
        margin-bottom: 20px; 
        font-size: 20px; 
        text-align: center;
    }
</style>