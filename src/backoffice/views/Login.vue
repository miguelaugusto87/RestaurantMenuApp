<template>
    <ion-content>
      <ion-card>
        <div v-if="basicSettings != null" class="logo">
           <!-- <img  src="../../frontend/views/logo.png" > -->
           <img  :src="basicSettings.ImageUrl" >
        </div>
        <ion-item>
          <ion-input type="email" name="email" :placeholder="$t('backoffice.form.fields.email')"
          @input="email = $event.target.value" 
          v-bind:value="email">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="password" name="password" :placeholder="$t('backoffice.form.fields.password')"
          @input="password = $event.target.value" 
          v-bind:value="password">
          </ion-input>
        </ion-item>
        <ion-button expand="full" color="primary" @click="login">{{$t('backoffice.form.login')}}</ion-button>
      </ion-card> 

    </ion-content>
</template>

<script>

import { Api } from '../api/api.js';

export default {

  name: 'userForm',
   
  data () {
    return {
      email: '',
      password: '',
      users: [],
      indexUserIsLogin: -1,
      basicSettings: null,
    }
  },
  created: function(){
     this.getConfig();
     this.fetchUsers();
  },
  methods: {
      ShowMessage(type, message, topic='') {
        return this.$ionic.alertController
          .create({
            cssClass: 'my-custom-class',
            header: type,
            subHeader: topic,
            message: message,
            buttons: ['OK'],
          })
        .then(a => a.present())
      },
      login(){
          if (this.email == "")
          {
              this.ShowMessage('Validate', 'Email cant be empty', 'Login');
              return;
          }
          if (this.password == "")
          {
              this.ShowMessage('Validate', 'Password cant be empty', 'Login');
              return;
          }
          if (this.isUser()){
              let user = this.users[this.indexUserIsLogin];
              this.$store.commit("setAuthentication", true);
              this.$store.commit("setUser", user);

              let roles = [];
              user.Roles.forEach(rol_id => {
                  Api.fetchById("rol", rol_id).then(response => {
                      roles.push(response.data);
                  })
              });
              this.$store.commit("setRoles", roles);

                this.$router.push({
                    name: '/'
                });
          }else{
              this.ShowMessage('Info', 'Email or password incorrect', 'Login');
          }
      },
      isUser(){
          for (let index = 0; index < this.users.length; index++) {
              if (this.users[index].Email == this.email &&
                     this.users[index].Password == this.password){
                  this.indexUserIsLogin = index;
                  return true;
              }
          }
          return false;
      },
      fetchUsers: function(){
        Api.fetchAll("User").then(response => {
          this.users = response.data
        })
        .catch(e => {
          console.log(e)
        });
      },
      getConfig: function(){
        Api.fetchAll("Restaurant").then(response=> {
            let basicSettings = [];
            basicSettings = response.data;
            if (basicSettings.length > 0)
            {
                this.basicSettings = basicSettings[basicSettings.length -1];
            }
        })
        .catch(e => {
          console.log(e)
        });
      },
  },

}
    
</script>

<style>

    div.logo{
      text-align: center;
      text-align: -webkit-center;
      margin: 30px 0px 30px 0px;
    }

    div.logo img{
      width:50%;
    }

</style>