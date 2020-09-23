<template>
  <ion-content id="category" class="category">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link v-if="abouts.length < 3" to="/aboutDataSettingsForm"><ion-button v-if="hasPermission('canChangeSetting')" expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.about')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="about in abouts" v-bind:key="about._id">
          <ion-item>
            <ion-label>
                <h2>{{ about.Title }}</h2>
                <h3>{{ about.Subtitle }}</h3>
                <h3><div style="word-wrap: break-word">{{ about.Description }}</div></h3>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option v-if="hasPermission('canChangeSetting')" color="primary" @click="editAbout(about._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option v-if="hasPermission('canChangeSetting')" color="danger" @click="deleteAbout(about._id)">
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

  name: 'about',
  created: function(){
   this.fetchAbouts();
  },
  data () {
    return {
      modelName: 'About',
      abouts: [],
    }
  }, 
  methods: {
    hasPermission(permission){
        
        let res = false;
        if (this.$store.state.authenticated)
        {
            let roles = this.$store.state.roles;
            for (let index = 0; index < roles.length; index++) {
                switch(permission){                        
                      case 'canChangeSetting':
                          res = roles[index].canChangeSetting;
                          break;
                      default:
                          break;
                }
                if (res)
                { 
                    return res;
                }              
            }
        }
        return res;
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
    /****** CRUD category methods ******/
    fetchAbouts: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.abouts = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editAbout: function(id){
        this.$router.push({
        name: 'AboutForm', 
        params: { aboutId: id }
      });
    },
    deleteAbout: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteAbout'),
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
                                        this.$t('backoffice.list.messages.messageDeleteSuccessAbout'), 
                                                this.$t('backoffice.list.messages.deleteSubtitleAbout'));
                  this.fetchAbouts();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                  this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                         this.$t('backoffice.list.messages.errorMessage'),
                             this.$t('backoffice.list.messages.deleteSubtitleAbout'));
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