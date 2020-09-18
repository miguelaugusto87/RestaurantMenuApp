<template>
    <ion-content>

    <router-link to="/controlPanel"><ion-button expand="full" color="tertiary"><ion-icon name="hammer"></ion-icon>{{$t('backoffice.list.buttons.goToControlPanel')}}</ion-button></router-link>
    <router-link to="/role"><ion-button expand="full" color="tertiary"><ion-icon name="arrow-round-back"></ion-icon>{{$t('backoffice.form.buttons.backToRolesList')}}</ion-button></router-link>

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
          <ion-label position="floating">{{$t('backoffice.form.fields.description')}}</ion-label>
          <ion-textarea name="description" 
          @input="description = $event.target.value" 
          v-bind:value="description">
          </ion-textarea>
        </ion-item>
        <ion-item>
            <p>{{$t('backoffice.form.fields.permissions')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectAll($event.target.checked)"></ion-checkbox>
        </ion-item>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionMenu')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectMenu($event.target.checked)"
                :checked="menu"></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in menuPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionCategory')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectCategory($event.target.checked)"
                :checked="category"></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in categoryPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionProduct')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectProduct($event.target.checked)"
                :checked="product"></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in productPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionCustomer')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectCustomer($event.target.checked)"
                :checked="customer"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in customerPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked"
                >
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionTable')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectTable($event.target.checked)"
                :checked="table"></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in tablePermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked"
                >
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionTax')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectTax($event.target.checked)"
                :checked="tax"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in taxPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked"
                >
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionShipping')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectShipping($event.target.checked)"
                :checked="shipping"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in shippingPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionOtherCharge')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectOtherCharge($event.target.checked)"
                :checked="otherCharge"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in otherChargePermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionUser')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectUser($event.target.checked)"
                :checked="user"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in userPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked">
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionRole')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectRole($event.target.checked)"
                :checked="role"
                ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in rolePermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked"
                >
            </ion-checkbox>
            </ion-item>
        </ion-list>

        <ion-item>
            <p>{{$t('backoffice.form.permissionsGroup.permissionOrder')}}</p>
            <ion-checkbox slot="end" @ionChange="selectDeselectOrder($event.target.checked)"
                :checked="order"
            ></ion-checkbox>
        </ion-item>
        <ion-list>
            <ion-item v-for="permission in orderPermissions" v-bind:key="permission.val">
            <ion-label>{{permission.val}}</ion-label>
            <ion-checkbox
                slot="end"
                @ionChange="permission.isChecked=$event.target.checked"
                :checked="permission.isChecked"
                >
            </ion-checkbox>
            </ion-item>
        </ion-list>

      <br/>
      <ion-button expand="full" color="primary" @click="saveRole()">{{ title }}</ion-button>

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'roleForm',
   
  data () {
    return {
      modelName: 'Rol',
      /****** Form Data ******/
      id: null,
      name: '',
      description: '',

      menuPermissions: [
        { id: 'canCreateMenu', val: this.$t('backoffice.form.permissionsGroup.canCreateMenu'), isChecked: false },
        { id: 'canEditMenu', val: this.$t('backoffice.form.permissionsGroup.canEditMenu'), isChecked: false },
        { id: 'canDeleteMenu', val: this.$t('backoffice.form.permissionsGroup.canDeleteMenu'), isChecked: false },
      ],
      categoryPermissions: [
        { id: 'canCreateCategory', val: this.$t('backoffice.form.permissionsGroup.canCreateCategory'), isChecked: false },
        { id: 'canEditCategory', val: this.$t('backoffice.form.permissionsGroup.canEditCategory'), isChecked: false },
        { id: 'canDeleteCategory', val: this.$t('backoffice.form.permissionsGroup.canDeleteCategory'), isChecked: false },
      ],
      productPermissions: [
        { id: 'canCreateProduct', val: this.$t('backoffice.form.permissionsGroup.canCreateProduct'), isChecked: false },
        { id: 'canEditProduct', val: this.$t('backoffice.form.permissionsGroup.canEditProduct'), isChecked: false },
        { id: 'canDeleteProduct', val: this.$t('backoffice.form.permissionsGroup.canDeleteProduct'), isChecked: false },
      ],
      customerPermissions: [
        { id: 'canCreateCustomer', val: this.$t('backoffice.form.permissionsGroup.canCreateCustomer'), isChecked: false },
        { id: 'canEditCustomer', val: this.$t('backoffice.form.permissionsGroup.canEditCustomer'), isChecked: false },
        { id: 'canDeleteCustomer', val: this.$t('backoffice.form.permissionsGroup.canDeleteCustomer'), isChecked: false },
      ],
      tablePermissions: [
        { id: 'canCreateTable', val: this.$t('backoffice.form.permissionsGroup.canCreateTable'), isChecked: false },
        { id: 'canEditTable', val: this.$t('backoffice.form.permissionsGroup.canEditTable'), isChecked: false },
        { id: 'canDeleteTable', val: this.$t('backoffice.form.permissionsGroup.canDeleteTable'), isChecked: false },
      ],
      taxPermissions: [
        { id: 'canCreateTax', val: this.$t('backoffice.form.permissionsGroup.canCreateTax'), isChecked: false },
        { id: 'canEditTax', val: this.$t('backoffice.form.permissionsGroup.canEditTax'), isChecked: false },
        { id: 'canDeleteTax', val: this.$t('backoffice.form.permissionsGroup.canDeleteTax'), isChecked: false },
      ],
      shippingPermissions: [
        { id: 'canCreateShipping', val: this.$t('backoffice.form.permissionsGroup.canCreateShipping'), isChecked: false },
        { id: 'canEditShipping', val: this.$t('backoffice.form.permissionsGroup.canEditShipping'), isChecked: false },
        { id: 'canDeleteShipping', val: this.$t('backoffice.form.permissionsGroup.canDeleteShipping'), isChecked: false },
      ],
      otherChargePermissions: [
        { id: 'canCreateOtherCharge', val: this.$t('backoffice.form.permissionsGroup.canCreateOtherCharge'), isChecked: false },
        { id: 'canEditOtherCharge', val: this.$t('backoffice.form.permissionsGroup.canEditOtherCharge'), isChecked: false },
        { id: 'canDeleteOtherCharge', val: this.$t('backoffice.form.permissionsGroup.canDeleteOtherCharge'), isChecked: false },
      ],
      userPermissions: [
        { id: 'canCreateUser', val: this.$t('backoffice.form.permissionsGroup.canCreateUser'), isChecked: false },
        { id: 'canEditUser', val: this.$t('backoffice.form.permissionsGroup.canEditUser'), isChecked: false },
        { id: 'canDeleteUser', val: this.$t('backoffice.form.permissionsGroup.canDeleteUser'), isChecked: false },
      ],
      rolePermissions: [
        { id: 'canCreateRole', val: this.$t('backoffice.form.permissionsGroup.canCreateRole'), isChecked: false },
        { id: 'canEditRole', val: this.$t('backoffice.form.permissionsGroup.canEditRole'), isChecked: false },
        { id: 'canDeleteRole', val: this.$t('backoffice.form.permissionsGroup.canDeleteRole'), isChecked: false },
      ],
      orderPermissions: [
        { id: 'canEditOrder', val: this.$t('backoffice.form.permissionsGroup.canEditOrder'), isChecked: false },
      ],

    }
  },
  created: function(){
    
    this.id = this.$route.params.roleId;
    if (this.id){
      this.title = 'Edit role';
      Api.fetchById(this.modelName, this.id)
            .then(response => {
               this.name = response.data.Name;
               this.description = response.data.Description;

               this.menuPermissions[0].isChecked = response.data.canCreateMenu;
               this.menuPermissions[1].isChecked = response.data.canEditMenu;
               this.menuPermissions[2].isChecked = response.data.canDeleteMenu;

               this.categoryPermissions[0].isChecked = response.data.canCreateCategory;
               this.categoryPermissions[1].isChecked = response.data.canEditCategory;
               this.categoryPermissions[2].isChecked = response.data.canDeleteCategory;

               this.productPermissions[0].isChecked = response.data.canCreateProduct;
               this.productPermissions[1].isChecked = response.data.canEditProduct;
               this.productPermissions[2].isChecked = response.data.canDeleteProduct;

               this.customerPermissions[0].isChecked = response.data.canCreateCustomer;
               this.customerPermissions[1].isChecked = response.data.canEditCustomer;
               this.customerPermissions[2].isChecked = response.data.canDeleteCustomer;
               
               this.tablePermissions[0].isChecked = response.data.canCreateTable;
               this.tablePermissions[1].isChecked = response.data.canEditTable;
               this.tablePermissions[2].isChecked = response.data.canDeleteTable;
               
               this.taxPermissions[0].isChecked = response.data.canCreateTax;
               this.taxPermissions[1].isChecked = response.data.canEditTax;
               this.taxPermissions[2].isChecked = response.data.canDeleteTax;
               
               this.shippingPermissions[0].isChecked = response.data.canCreateShipping;
               this.shippingPermissions[1].isChecked = response.data.canEditShipping;
               this.shippingPermissions[2].isChecked = response.data.canDeleteShipping;
               
               this.otherChargePermissions[0].isChecked = response.data.canCreateOtherCharge;
               this.otherChargePermissions[1].isChecked = response.data.canEditOtherCharge;
               this.otherChargePermissions[2].isChecked = response.data.canDeleteOtherCharge;

               this.userPermissions[0].isChecked = response.data.canCreateUser;
               this.userPermissions[1].isChecked = response.data.canEditUser;
               this.userPermissions[2].isChecked = response.data.canDeleteUser;

               this.rolePermissions[0].isChecked = response.data.canCreateRole;
               this.rolePermissions[1].isChecked = response.data.canEditRole;
               this.rolePermissions[2].isChecked = response.data.canDeleteRole;

               this.orderPermissions[0].isChecked = response.data.canEditOrder;

            //    this.file = response.data.ImageUrl;
                console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            })   
    }

    console.log(this.$route.params);
  },
  computed: {
        title() {
            return this.id ? this.$t('backoffice.form.titles.roleEditTitle') :  this.$t('backoffice.form.titles.roleNewTitle');
        },
        menu(){
            for (let index = 0; index < this.menuPermissions.length; index++) {
                if (!this.menuPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        category(){
            for (let index = 0; index < this.categoryPermissions.length; index++) {
                if (!this.categoryPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        product(){
            for (let index = 0; index < this.productPermissions.length; index++) {
                if (!this.productPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        customer(){
            for (let index = 0; index < this.customerPermissions.length; index++) {
                if (!this.customerPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        table(){
            for (let index = 0; index < this.tablePermissions.length; index++) {
                if (!this.tablePermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        tax(){
            for (let index = 0; index < this.taxPermissions.length; index++) {
                if (!this.taxPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        shipping(){
            for (let index = 0; index < this.shippingPermissions.length; index++) {
                if (!this.shippingPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        otherCharge(){
            for (let index = 0; index < this.otherChargePermissions.length; index++) {
                if (!this.otherChargePermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        user(){
            for (let index = 0; index < this.userPermissions.length; index++) {
                if (!this.userPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
        order(){
            for (let index = 0; index < this.orderPermissions.length; index++) {
                if (!this.orderPermissions[index].isChecked){
                    return false
                }
            }
            return true;
        },
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

    selectDeselectMenu(isChecked){
        this.menuPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectCategory(isChecked){
        this.categoryPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectProduct(isChecked){
        this.productPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectCustomer(isChecked){
        this.customerPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectTable(isChecked){
        this.tablePermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
        console.log(this.tablePermissions);
    },
    selectDeselectTax(isChecked){
        this.taxPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectShipping(isChecked){
        this.shippingPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectOtherCharge(isChecked){
        this.otherChargePermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectUser(isChecked){
        this.userPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectRole(isChecked){
        this.rolePermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectOrder(isChecked){
        this.orderPermissions.forEach(permission => {
            if (isChecked)
                permission.isChecked = true;
            else
                permission.isChecked = false;
        });
    },
    selectDeselectAll(isChecked){
        this.selectDeselectMenu(isChecked);
        this.selectDeselectCategory(isChecked);
        this.selectDeselectProduct(isChecked);
        this.selectDeselectCustomer(isChecked);
        this.selectDeselectTable(isChecked);
        this.selectDeselectTax(isChecked);
        this.selectDeselectShipping(isChecked);
        this.selectDeselectOtherCharge(isChecked);
        this.selectDeselectUser(isChecked);
        this.selectDeselectRole(isChecked);
        this.selectDeselectOrder(isChecked);
    },
    isValidForm(){
        let errors = [];

        if (this.name == "")
        {
            errors.push(this.$t('backoffice.form.validate.name'));
        }

        if (errors.length > 0)
        {
            let message = "";
            for (let i = 0; i < errors.length; i++) {
                 message += (i + 1) + "- " + errors[i] + "<br/>";
            }
            this.ShowMessage(this.$t('backoffice.form.validate.validate'), message,
                                      this.$t('backoffice.form.validate.validateRole'));
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
    saveRole: function(){

        if (this.isValidForm())
        {

            let item = {
                "Name": this.name,
                "Description": this.description,
                "canCreateMenu": this.menuPermissions[0].isChecked,
                "canEditMenu": this.menuPermissions[1].isChecked,
                "canDeleteMenu": this.menuPermissions[2].isChecked,
                "canCreateCategory": this.categoryPermissions[0].isChecked,
                "canEditCategory": this.categoryPermissions[1].isChecked,
                "canDeleteCategory": this.categoryPermissions[2].isChecked,
                "canCreateProduct": this.productPermissions[0].isChecked,
                "canEditProduct": this.productPermissions[1].isChecked,
                "canDeleteProduct": this.productPermissions[2].isChecked,
                "canCreateCustomer": this.customerPermissions[0].isChecked,
                "canEditCustomer": this.customerPermissions[1].isChecked,
                "canDeleteCustomer": this.customerPermissions[2].isChecked,
                "canCreateTable": this.tablePermissions[0].isChecked,
                "canEditTable": this.tablePermissions[1].isChecked,
                "canDeleteTable": this.tablePermissions[2].isChecked,
                "canCreateTax": this.taxPermissions[0].isChecked,
                "canEditTax": this.taxPermissions[1].isChecked,
                "canDeleteTax": this.taxPermissions[2].isChecked,
                "canCreateShipping": this.shippingPermissions[0].isChecked,
                "canEditShipping": this.shippingPermissions[1].isChecked,
                "canDeleteShipping": this.shippingPermissions[2].isChecked,
                "canCreateOtherCharge": this.otherChargePermissions[0].isChecked,
                "canEditOtherCharge": this.otherChargePermissions[1].isChecked,
                "canDeleteOtherCharge": this.otherChargePermissions[2].isChecked,
                "canCreateUser": this.userPermissions[0].isChecked,
                "canEditUser": this.userPermissions[1].isChecked,
                "canDeleteUser": this.userPermissions[2].isChecked,
                "canCreateRole": this.rolePermissions[0].isChecked,
                "canEditRole": this.rolePermissions[1].isChecked,
                "canDeleteRole": this.rolePermissions[2].isChecked,
                "canEditOrder": this.orderPermissions[0].isChecked,
            }
            //If I am editing
            if (this.id){
              item['_id'] = this.id;
              Api.putIn(this.modelName, item)
                  .then(response => {
                        // alert("Success edited");
                        this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageEditSuccesRole'), 
                                this.$t('backoffice.list.messages.titleEditRole'));
                        this.$router.push({
                          name: 'Role', 
                        });
                        return response;
                  })
                  .catch(e => {
                        console.log(e);
                        this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                               this.$t('backoffice.list.messages.errorMessage'),
                                   this.$t('backoffice.list.messages.titleEditRole'));
                  })
            }
            else{
              //Else, I am created a new category
              Api.postIn(this.modelName, item)
                  .then(response => {
                      this.ShowMessage(this.$t('backoffice.list.messages.infoDeleteSuccess'),
                             this.$t('backoffice.list.messages.messageCreateSuccessRole'), 
                                this.$t('backoffice.list.messages.titleCreateRole'));
                      this.$router.push({
                        name: 'Role', 
                      });
                    return response;
                  })
                  .catch(e => {
                      console.log(e);
                      this.ShowMessage(this.$t('backoffice.list.messages.errorTitle'),
                          this.$t('backoffice.list.messages.errorMessage'),
                              this.$t('backoffice.list.messages.titleCreateRole'));
                  })
            }

        }
        
    },
  },

}
    
</script>