<template>
  <ion-content id="customer" class="customer">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/table-form"><ion-button v-if="hasPermission('canCreateTable')" expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.table')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="table in tables" v-bind:key="table._id">
          <ion-item>
            <ion-label>
                <h2>{{ table.Name }}</h2>
            </ion-label>
            <ion-label>
                <h3>{{ table.Description }}</h3>
                <h3>{{ table.Capacity }}</h3>
                <h3>{{ table.Barcode }}</h3>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option v-if="hasPermission('canEditTable')" color="primary" @click="editTable(table._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option v-if="hasPermission('canDeleteTable')" color="danger" @click="deleteTable(table._id)">
               <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
            <ion-item-option color="success" >
                <ion-icon slot="icon-only" name="list" @click="seeQrCode(table._id)"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
    </ion-list>
  </ion-content>
</template>

<script>

import { Api } from '../api/api.js';
import Modal from './QrModal.vue';

export default {

  name: 'table',
  created: function(){
   this.fetchTables();
  },
  data () {
    return {
      modelName: 'Table',
      tables: [],
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
                      case 'canCreateTable':
                          res = roles[index].canCreateTable;
                          break;
                      case 'canEditTable':
                          res = roles[index].canEditTable;
                          break;
                      case 'canDeleteTable':
                          res = roles[index].canDeleteTable;
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
    seeQrCode(id){
        console.log(id);
        return this.$ionic.modalController
        .create({
          component: Modal,
          cssClass: 'my-custom-class',
          componentProps: {
            data: {
              content: id,
            },
            propsData: {
              title: this.$t('backoffice.form.fields.qrCode'),
              button: this.$t('backoffice.list.messages.buttons.close')
            },
          },
        })
        .then(m => m.present())
    },
    /****** CRUD category methods ******/
    fetchTables: function(){
        Api.fetchAll(this.modelName).then(response => {
          this.tables = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editTable: function(id){
        this.$router.push({
        name: 'TableForm',
        params: { tableId: id }
      });
    },
    deleteTable: function(id){

      return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteTable'),
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
                      this.$t('backoffice.list.messages.messageDeleteSuccessTable'),
                          this.$t('backoffice.list.messages.deleteSubtitleTable'));
                    this.fetchTables();
                    return response;
                  })
                  .catch(e => {
                    console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                        this.$t('backoffice.list.messages.errorMessage'),
                            this.$t('backoffice.list.messages.deleteSubtitleTable'));
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