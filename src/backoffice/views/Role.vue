<template>
  <ion-content id="user" class="user">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/role-form"><ion-button v-if="hasPermission('canCreateRole')" expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.role')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="role in roles" v-bind:key="role._id">
          <ion-item>
            <ion-label>
                <h2>{{ role.Name }}</h2>
                <h3>{{ role.Description }}</h3>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option v-if="hasPermission('canEditRole')" color="primary" @click="editRole(role._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option v-if="hasPermission('canDeleteRole')" color="danger" @click="deleteRole(role._id)">
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

  name: 'role',
  created: function(){
   this.fetchRoles();
  },
  data () {
    return {
      modelName: 'Rol',
      roles: [],
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
                      case 'canCreateRole':
                          res = roles[index].canCreateRole;
                          break;
                      case 'canEditRole':
                          res = roles[index].canEditRole;
                          break;
                      case 'canDeleteRole':
                          res = roles[index].canDeleteRole;
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
    fetchRoles: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.roles = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editRole: function(id){
        this.$router.push({
        name: 'RoleForm', 
        params: { roleId: id }
      });
    },
    deleteRole: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteRole'),
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
                      this.$t('backoffice.list.messages.messageDeleteSuccessRole'),
                          this.$t('backoffice.list.messages.deleteSubtitleRole'));
                  this.fetchRoles();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleRole'));
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