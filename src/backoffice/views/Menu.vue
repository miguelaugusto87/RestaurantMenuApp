<template>
  <ion-content id="menu" class="menu">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/menu-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.menu')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="menu in menus" v-bind:key="menu._id">
          <ion-item style="width: 100%;">
            <ion-label>
                <h2>{{ menu.Name }}</h2>
                <h3>{{ getFormatedDate(menu.Date) }}</h3>
            </ion-label>
            <ion-checkbox v-if="menu.Active" checked="true" slot="end" @click="activeMenu(menu, false)"></ion-checkbox>
            <ion-checkbox v-else checked="false" slot="end" @click="activeMenu(menu, true)"></ion-checkbox>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editMenu(menu._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteMenu(menu._id)">
               <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
    </ion-list>

  </ion-content>
</template>

<script>

import { Api } from '../api/api.js';
import { Utils } from '../utils/utils.js'

export default {

  name: 'menu',
  created: function(){
   this.fetchMenus();
  },
  data () {
    return {
      modelName: 'Menu',
      menus: [],
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
    fetchMenus: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.menus = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    // updateActiveStateMenus: function(){
    //     Api.fetchAll('Menu')
    //       .then( response =>{
    //           let menus = response.data;
    //           menus.forEach( menu=> {
    //             if (menu._id != this.id)
    //             {
    //                 let item = {
    //                     "_id": menu._id,
    //                     "Name": menu.Name,
    //                     "Active": false,
    //                     "Categories": menu.Categories,
    //                     "Date": menu.Date,
    //                 }
    //                 Api.putIn('Menu', item)
    //                     .catch(e => {
    //                           console.log(e);
    //                           this.ShowMessage('Error', 'Error', 'Fetch Menu');
    //                     })
    //             }
    //           });
    //       })
    //       .catch(e => {
    //           console.log(e);
    //           this.ShowMessage('Error', 'Error', 'Fetch Menu');
    //       }) 
    //   },
    getFormatedDate: function(date){
        return Utils.getFormatedDate(date);         
    },
    activeMenu: function(menu, state){
      let item = {
            "_id": menu._id,
            "Name": menu.Name,
            "Active": state,
            "Categories": menu.Categories,
            "Date": menu.Date,
        }
        Api.putIn(this.modelName, item)
              .then(response => {
                    this.ShowMessage(this.$t('backoffice.list.messages.activeMenu'), 
                                        this.$t('backoffice.list.messages.menuChangeState'),
                                            this.$t('backoffice.list.messages.activeMenu'));
                    this.fetchMenus();
                    return response;
              })
              .catch(e => {
                    console.log(e);
                    this.fetchMenus();
                    this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                        this.$t('backoffice.list.messages.errorMessage'),
                                           this.$t('backoffice.list.messages.activeMenu'));

              })
    },
    editMenu: function(id){
        this.$router.push({
        name: 'MenuForm', 
        params: { menuId: id }
      });
    },
    deleteMenu: function(id){

      return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteMenu'),
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
                                        this.$t('backoffice.list.messages.messageDeleteSuccessMenu'),
                                              this.$t('backoffice.list.messages.deleteSubtitleMenu'));
                  this.fetchMenus();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                  this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                                       this.$t('backoffice.list.messages.errorMessage'),
                                            this.$t('backoffice.list.messages.deleteSubtitleCustomer'));
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