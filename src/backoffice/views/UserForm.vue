<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/user"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToUsersList')}}</ion-button></router-link>

    <br/>
    <ion-label><h1>{{title}}</h1></ion-label>

      <!-- <ion-card> -->
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.email')}}</ion-label>
          <ion-input type="email" name="email"
          @input="email = $event.target.value" 
          v-bind:value="email">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.password')}}</ion-label>
          <ion-input type="password" name="password"
          @input="password = $event.target.value" 
          v-bind:value="password">
          </ion-input>
        </ion-item>

        <ion-item>
            <p>{{$t('backoffice.form.fields.roles')}}</p>
        </ion-item>
        <ion-list>
            <ion-item v-for="rol in allRoles" v-bind:key="rol._id">
            <ion-label>{{rol.Name}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="addDeleteRole($event.target.checked, rol._id)"
                :checked="hasUserRole(rol._id)">
            </ion-checkbox>
            </ion-item>
        </ion-list>
        <!-- <ion-item>
          <ion-card v-if="checkImage()" >
              <ion-thumbnail slot="start">
                  <ion-img :src="file"></ion-img>
              </ion-thumbnail>
          </ion-card>
          <ion-label position="floating">Image</ion-label>
          <ion-input type="file" accept=".jpg,.png,.gif" name="file"
          @change="handleImage">
          </ion-input>
        </ion-item> -->
      <!-- </ion-card>  -->
      <br/>
      <ion-button expand="full" color="primary" @click="saveUser()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'userForm',
   
  data () {
    return {
      modelName: 'User',
      /****** Form Data ******/
      id: null,
      email: '',
      password: '',
      allRoles: [],
      userRoles: [],
    //   file: null,
    }
  },
  created: function(){

    this.fetchRoles();
    this.id = this.$route.params.userId;
    if (this.id){
      this.title = 'Edit user';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.email = response.data.Email;
               this.password = response.data.Password;
               this.userRoles = response.data.Roles;
            //    this.file = response.data.ImageUrl;
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
            return this.id ? this.$t('backoffice.form.titles.userEditTitle') :  this.$t('backoffice.form.titles.userNewTitle');
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
    fetchRoles: function(){
        Api.fetchAll('Rol').then(response => {
          // console.log(response.data)
          this.allRoles = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    addDeleteRole(isChecked, rol_id){
        if (isChecked){
            if (!this.userRoles.includes(rol_id))
                this.userRoles.push(rol_id)
        }
        else
          this.userRoles.splice(this.userRoles.indexOf(rol_id), 1)
        console.log(this.userRoles)
    },
    hasUserRole(rol_id){
      return this.userRoles.includes(rol_id);
    },
    isValidForm(){
        let errors = [];

        if (this.email == "")
        {
            errors.push(this.$t('backoffice.form.validate.email'));
        }

        if (this.password == "")
        {
            errors.push(this.$t('backoffice.form.validate.password'));
        }

        if (this.email != "")
        {
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(this.email) == false)
            {
                errors.push(this.$t('backoffice.form.validate.emailIncorrect'));
            }
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), message,
                                      this.$t('backoffice.form.validate.validateUser'));
            return false;
        }
        else
        {
            return true;
        }
    },
    /****** Load image use base64 encode esto debería ir en un componente******/
    // checkImage: function(){
    //   return this.file != null;
    // },
    // handleImage: function(event)
    // {
    //     const selectedImage = event.target.files[0];
    //     this.createBase64Img(selectedImage);
    // },
    // createBase64Img: function(fileObject){
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //         this.file = e.target.result;
    //         console.log(this.file);
    //     };
    //     reader.readAsDataURL(fileObject);
    // },
    /*******                              Fin                              *******/
    //Create or edit a new category
    saveUser: function(){

        if (this.isValidForm())
        {

            let item = {
              "Email": this.email,
              "Password": this.password,
              "Roles": this.userRoles,
            //   "ImageUrl": "",
            }
            // if (this.file != null)
            // {
            //    item["ImageUrl"] = this.file;
            // }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        // alert("Success edited");
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessUser'), 
                                this.$t('backoffice.list.messages.titleEditUser'));
                        this.email = '';
                        this.password = '';
                        this.userRoles = [];
                        // this.file = null;
                        this.$router.push({
                          name: 'User', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditUser'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessUser'), 
                                this.$t('backoffice.list.messages.titleCreateUser'));
                      this.email = '';
                      this.password = '';
                      this.userRoles = [];
                    //   this.file = null;
                      this.$router.push({
                        name: 'User', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateUser'));
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