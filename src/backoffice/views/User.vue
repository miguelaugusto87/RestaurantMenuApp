<template>
  <ion-content id="user" class="user">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/user-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.user')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="user in users" v-bind:key="user._id">
          <ion-item>
            <!-- <ion-thumbnail slot="start">
              <ion-img :src="category.ImageUrl"></ion-img>
           </ion-thumbnail> -->
            <ion-label>
                <h2>{{ user.Email }}</h2>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editUser(user._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteUser(user._id)">
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

  name: 'user',
  created: function(){
   this.fetchUsers();
  },
  data () {
    return {
      modelName: 'User',
      users: [],
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
    fetchUsers: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.users = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editUser: function(id){
        this.$router.push({
        name: 'UserForm', 
        params: { userId: id }
      });
    },
    deleteUser: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteUser'),
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
                      this.$t('backoffice.list.messages.messageDeleteSuccessUser'),
                          this.$t('backoffice.list.messages.deleteSubtitleUser'));
                  this.fetchUsers();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleUser'));
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