<template>
  <ion-content id="category" class="category">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/category-form"><ion-button expand="full" color="primary"><ion-icon name="add"></ion-icon>{{$t('backoffice.list.actions.addANew')}} {{$t('backoffice.list.entitiesName.category')}}</ion-button></router-link>

      <ion-list>
        <ion-item-sliding v-for="category in categories" v-bind:key="category._id">
          <ion-item>
            <ion-thumbnail slot="start">
              <ion-img :src="category.ImageUrl"></ion-img>
           </ion-thumbnail>
            <ion-label>
                <h2>{{ category.Name }}</h2>
                <h3><div style="word-wrap: break-word">{{ category.Description }}</div></h3>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary" @click="editCategory(category._id)">
               <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" @click="deleteCategory(category._id)">
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

  name: 'category',
  created: function(){
   this.fetchCategories();
  },
  data () {
    return {
      modelName: 'Category',
      categories: [],
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
    fetchCategories: function(){
        Api.fetchAll(this.modelName).then(response => {
          // console.log(response.data)
          this.categories = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    editCategory: function(id){
        this.$router.push({
        name: 'CategoryForm', 
        params: { categoryId: id }
      });
    },
    deleteCategory: function(id){

        return this.$ionic.alertController.create({
        title: this.$t('backoffice.list.messages.confirmDelete'),
        message: this.$t('backoffice.list.messages.deleteCategory'),
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
                                        this.$t('backoffice.list.messages.messageDeleteSuccessCategory'), 
                                                this.$t('backoffice.list.messages.deleteSubtitleCategory'));
                  this.fetchCategories();
                  return response;
                })
                .catch(e => {
                  console.log(e);
                  this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                         this.$t('backoffice.list.messages.errorMessage'),
                             this.$t('backoffice.list.messages.deleteSubtitleCategory'));
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