<template>
    <ion-content id="menu" class="menu">

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/menu"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToMenusList')}}</ion-button></router-link>

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
          <ion-label position="floating"><span style="color: red">*</span>{{$t('backoffice.form.fields.date')}}</ion-label>
          <ion-datetime name="date" 
          @ionChange="date = $event.target.value" 
          v-bind:value="date"
          placeholder="Select Date">
          </ion-datetime>
        </ion-item>

        <ion-item>
           <ion-label>{{$t('backoffice.form.fields.active')}}</ion-label>
           <ion-checkbox slot="end" name="active" 
            @ionChange="active = $event.target.checked"
            :checked="active"  >    
          </ion-checkbox>
        </ion-item>

        <!-- <ion-item v-for="entry in form" v-bind:key="entry.val">
          <ion-label>{{entry.val}}</ion-label>
          <ion-checkbox
            slot="end"
            @input="entry.checked = $event.target.value"
            :value="entry.isChecked">
          </ion-checkbox>
        </ion-item> -->

        <ion-item>
            <ion-label>
                {{$t('backoffice.form.fields.availableCategories')}}
            </ion-label>
        </ion-item>
        <ion-list>
            <ion-item-sliding v-for="category in availableCategories" v-bind:key="category._id">
            <ion-item>
                <ion-thumbnail slot="start">
                <ion-img :src="category.ImageUrl"></ion-img>
            </ion-thumbnail>
                <ion-label>
                    <!-- <h2>{{ product.CategoryId }}</h2> -->
                    <h2><div style="word-wrap: break-word">{{ category.Name }}</div></h2>
                </ion-label>
            </ion-item>
            <ion-item-options side="end">
                <ion-item-option color="primary" >
                <ion-icon slot="icon-only" name="add" @click="addCategory(category._id)"></ion-icon>
                </ion-item-option>
                <ion-item-option color="success" >
                <ion-icon slot="icon-only" name="list" @click="productsByCategory(category._id)"></ion-icon>
                </ion-item-option>
            </ion-item-options>
            </ion-item-sliding>
        </ion-list>


        <ion-item>
            <ion-label>
                <span style="color: red">*</span>{{$t('backoffice.form.fields.selectedCategories')}}
            </ion-label>
        </ion-item>
        <ion-list>
            <ion-item-sliding v-for="category in selectedCategories" v-bind:key="category._id">
            <ion-item>
                <ion-thumbnail slot="start">
                <ion-img :src="category.ImageUrl"></ion-img>
            </ion-thumbnail>
                <ion-label>
                    <!-- <h2>{{ product.CategoryId }}</h2> -->
                    <h2><div style="word-wrap: break-word">{{ category.Name }}</div></h2>
                </ion-label>
            </ion-item>
            <ion-item-options side="end">
                <ion-item-option color="danger" >
                <ion-icon slot="icon-only" name="trash" @click="deleteCategory(category._id)"></ion-icon>
                </ion-item-option>
                <ion-item-option color="success" >
                <ion-icon slot="icon-only" name="list" @click="productsByCategory(category._id)"></ion-icon>
                </ion-item-option>
            </ion-item-options>
            </ion-item-sliding>
        </ion-list>

      <!-- </ion-card>  -->
        <br/>
        <ion-button expand="full" color="primary" @click="saveMenu()">{{ title }}</ion-button>

    </ion-content>
</template>
<script>

import { Api } from '../api/api.js';

export default{

  name: 'menuForm',
   
  data () {
    return {
      modelName: 'Menu',
      /****** Form Data ******/
      id: null,
      name: '',
      date: '',
      active: false,

      categories: [],
      selectedCategories: [],
      availableCategories: [],
    }
  },
  created: function(){
    this.fetchAllCategories();
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.menuEditTitle') :  this.$t('backoffice.form.titles.menuNewTitle');
        }
  },
  methods:{
    isValidForm(){
        let errors = [];
        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }
        if (this.date == "")
        {
            errors.push(this.$t('backoffice.form.validate.date'));
        }
        if (this.selectedCategories.length == 0)
        {
            errors.push(this.$t('backoffice.form.validate.category'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), 
                              message, this.$t('backoffice.form.validate.validateMenu'));
            return false;
        }
        else
        {
            return true;
        }
    },
      ShowMessage: function(type, message, topic='') {
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
      productsByCategory: function(id){
          this.$router.push({
            name: 'ProductByCategory', 
            params: {
                     "categoryId": id,
                     "menuId": this.id,
                    }
          });
      },
      fetchAllCategories: function(){
          Api.fetchAll('Category')
            .then(response => {
                
                this.categories = response.data;
                this.id = this.$route.params.menuId;
                  if (this.id){
                      this.title = 'Edit menu';
                      Api.fetchById(this.modelName, this.id)
                          .then(responseMenu => {
                            this.initData(responseMenu.data);
                            return responseMenu;
                          })
                          .catch(e => {
                            console.log(e);
                          })   
                  }
                  else{
                    this.initAvailableCategories();
                  }



              })
              .catch(e => {
                console.log(e);
              })  
      },
      initData: function(data){
        // this.createSelectedProductList(data.Categories);
        this.name = data.Name;
        this.date = data.Date;
        this.active = data.Active;
        // this.$refs.active.checked = this.active;
        let categoriesIds = data.Categories;

        this.selectedCategories = this.mapCategory(categoriesIds);
        this.initAvailableCategories();
      },
      mapCategory: function(categoriesIds){
         let selCategories = [];
         
         categoriesIds.forEach(categoryId => {

            let selCategory = null;
            this.categories.forEach(category => {
                if (categoryId == category._id)
                    selCategory = category;
            });

            selCategories.push(selCategory);

         });

        // console.log("SelectedCateg");
        // console.log(selCategories);

         return selCategories;
         
      },
      ///aqui
      initAvailableCategories: function(){
          if (this.id)
          {
              let availableCateg = [];
              this.categories.forEach(category => {
                  let found = false;
                  this.selectedCategories.forEach(selectCateg => {
                    //  console.log(category);
                    //  console.log(selectCateg);
                     if (selectCateg._id == category._id)
                        found = true;
                  });
                  if (!found)
                    availableCateg.push(category);
              });

             this.availableCategories = availableCateg;

          //     this.categories.forEach(category => {
          //     let found = false;
          //     this.selectedCategories.forEach(categorySelected => {
          //         if (category._id == categorySelected)
          //         {
          //            found = true;
          //         }
          //     });
          //     if (found == false)
          //         this.availableCategories.push(category);
          //     });
          }
          else
          {

                //               console.log('CATEGORIESSSS');
                // console.log(this.categories);
              this.availableCategories = this.categories;
              // console.log("AVAILABLE CATEGORY");
              // console.log(this.availableCategories);
              // console.log("CATEGORIES");
              // console.log(this.categories);
          } 
      },
      // selActive(event){
      //   if (event) event.preventDefault()
      //     this.active = !this.active;
      // },
      clearData: function(){
          this.name = '';
          this.date = Date.now();
          this.active = false;
          this.categories = [];
          this.selectedCategories = [];
          this.availableCategories = [];
      },
      addCategory: function(id){
          let categ = this.availableCategories.find(category => category._id == id);
          this.selectedCategories.push(categ);

          var categoryIndex = this.availableCategories.indexOf(categ); // get index
          this.availableCategories.splice(categoryIndex, 1);
      },
      deleteCategory: function(id){
          let categ = this.selectedCategories.find(category => category._id == id);
          this.availableCategories.push(categ);

          var categoryIndex = this.selectedCategories.indexOf(categ);
          this.selectedCategories.splice(categoryIndex, 1);
      },
      //The category name must be unique.
      // searchCategoryIdByName: function(name){
      //    let categ =  this.categories.filter(categ => name == categ.Name);
      //   //  console.log(categ[0]);
      //    return categ[0]._id;
      // },
      // Create or edit a new menu
    createCategoriesObject: function(){

        let sCategories = [];
        // let productItem = null;
        this.selectedCategories.forEach(categorySelected => {
            sCategories.push(categorySelected._id);
        });
         return sCategories;
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
      saveMenu: function(){

        if (this.isValidForm())
        {
          
            console.log(this.active);
            let categories = this.createCategoriesObject();
            let item = {
                "Name": this.name,
                "Active": this.active,
                "Categories": categories,
                "Date": this.date,
            }
            // if (this.active)
            // {
            //    this.updateActiveStateMenus();
            // }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccessMenu'), 
                                this.$t('backoffice.list.messages.titleEditMenu'));
                        this.clearData();
                        this.$router.push({
                          name: 'Menu', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditMenu'));
                  })
            }
            else{
              //Else, I am created a new menu
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessMenu'), 
                                this.$t('backoffice.list.messages.titleCreateMenu'));
                      this.clearData();
                      this.$router.push({
                        name: 'Menu', 
                      });
                      return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateMenu'));
                  })
            }

        }
        
      },
  },

}
</script>