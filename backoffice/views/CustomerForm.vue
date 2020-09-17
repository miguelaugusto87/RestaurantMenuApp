<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/customer"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToCustomersList')}}</ion-button></router-link>

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
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.phone')}}</ion-label>
          <ion-input type="tel" name="name"
          @input="phone = $event.target.value" 
          v-bind:value="phone">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.email')}}</ion-label>
          <ion-input type="email" name="emailAddress"
          @input="emailAddress = $event.target.value" 
          v-bind:value="emailAddress">
          </ion-input>
        </ion-item>
        <ion-item>
            <ion-label>{{$t('backoffice.form.fields.marketingConsent')}}</ion-label>
        </ion-item>
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.email')}}</ion-label>
           <ion-checkbox slot="end" name="mcemail" 
                @ionChange="mcemail = $event.target.checked"
                :checked="mcemail"  >
          </ion-checkbox>
        </ion-item>
        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.phone')}}</ion-label>
           <ion-checkbox slot="end" name="mcphone" 
                @ionChange="mcphone = $event.target.checked" 
                v-bind:checked="mcphone">
          </ion-checkbox>
        </ion-item>

      <!-- </ion-card>  -->
      <br/>
      <ion-button expand="full" color="primary" @click="saveCustomer()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'customerForm',
   
  data () {
    return {
      modelName: 'Customer',
      /****** Form Data ******/
      id: null,
      name: '',
      emailAddress: '',
      phone: '',
      mcemail: false,
      mcphone: false,
    }
  },
  created: function(){
    
    console.log("AQUI LLEGO");
    this.id = this.$route.params.customerId;
    if (this.id){
      this.title = 'Edit customer';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.phone = response.data.Phone;
               this.emailAddress = response.data.EmailAddress;

               if (response.data.MarketingConsent){
                    this.mcemail = response.data.MarketingConsent.Email;
                    this.mcphone = response.data.MarketingConsent.Phone;
               }
               return response;
            })
            .catch(e => {
              console.log(e);
              this.ShowMessage('Error', 'Error', 'Fetch customer');
            })   
    }

    console.log(this.$route.params);
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.customerEditTitle') :  this.$t('backoffice.form.titles.customerNewTitle');
        }
  },
  methods: {
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (this.emailAddress == "")
        {
            errors.push(this.$t('backoffice.form.validate.email'));
        }
        if (this.phone == "")
        {
            errors.push(this.$t('backoffice.form.validate.phone'));
        }

        if (this.emailAddress != ""){

            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(this.emailAddress) == false)
            {
                errors.push(this.$t('backoffice.form.validate.emailIncorrect'));
            }
            
        }
        
        // let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // if (phoneRegex.test(this.phone) == false)
        // {
        //     errors.push("Phone is incorrect");
        // }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'),
                                 message,
                                   this.$t('backoffice.form.validate.validateCustomer'));
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
    saveCustomer: function(){
      
        if (this.isValidForm())
        {
            let item = {
              "Name": this.name,
              "Phone": this.phone,
              "EmailAddress": this.emailAddress,
            };

            console.log(this.mcemail);
            console.log(this.mcphone);
            if (this.mcemail  || this.mcphone)
            {
                console.log("Entro")
                let MarketingConsent = {
                        "Email": this.mcemail,
                        "Phone": this.mcphone
                    }
                item["MarketingConsent"] = MarketingConsent;
            }

            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessCustomer'), 
                                this.$t('backoffice.list.messages.titleEditCustomer'));
                        this.name = '';
                        this.phone = '';
                        this.emailAddress = '';
                        this.mcemail = false;
                        this.mcphone = false;
                        this.$router.push({
                          name: 'Customer', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditCustomer'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessCustomer'), 
                                this.$t('backoffice.list.messages.titleCreateCustomer'));
                      this.name = '';
                      this.phone = '';
                      this.emailAddress = '';
                      this.mcemail = false;
                      this.mcphone = false;
                      this.$router.push({
                        name: 'Customer', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateCustomer'));
                  })
            }

      }

    },
  },

}
    
</script>