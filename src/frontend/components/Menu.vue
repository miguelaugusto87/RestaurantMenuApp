<template>
  <div id="app1">
    <div>
      <ion-menu side="start"  contentId="my-content">
        <ion-header>
          <ion-toolbar color="secondary">
            <ion-title>Left Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding class="menu ion-page">  
          <ion-list>
            <ion-item> <img src="../views/logo.png" style="margin: 80px 0 30px 0"></ion-item>
            <ion-item @click="closeStart">About Us</ion-item> 
            <ion-item @click="closeStart"><router-link to="/">Home</router-link> </ion-item>
            <ion-item @click="getOrders">Your Orders</ion-item>         
              
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-menu side="end" contentId="my-content">
        <ion-header>
          <ion-toolbar color="secondary">
             <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content padding class="ion-page menu" >
          <ion-item>Menu Item</ion-item>
           <ion-label>BACKOFFICE MENU</ion-label>
         
           <ion-item @click="closeEnd"><router-link to="/login" >Login</router-link></ion-item>
         
        </ion-content>
      </ion-menu>

      <div  main id="my-content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title class="menu-col-10">Menu - Basic</ion-title>
            <ion-icon @click="openStart" name="menu" class="menu-col-2"></ion-icon>
            <ion-icon @click="openEnd" name="menu" class="menu-col-2"></ion-icon>
          </ion-toolbar>
        </ion-header>
        <ion-content>
                                  
         
         
        </ion-content>
      </div>

    </div>
    <ion-menu-controller></ion-menu-controller>
  </div>
</template>
<script>
import { menu } from "ionicons/icons";
import { addIcons } from "ionicons";
import App from '../../App'

addIcons({
  "ios-add": menu.ios,
  "md-add": menu.md
});
export default {
  name: 'App',
  data () {
    return {
      items: [{id: 0, name: 'Ahmed'}, {id: 1, name: 'Naima'}]
    }
  },
  methods: {
    openStart () {
      document.querySelector('ion-menu-controller').open('start')     
    },
    openEnd () {
      document.querySelector('ion-menu-controller').open('end')
    },
     closeEnd () {
      document.querySelector('ion-menu-controller').close('end')
    },
    closeStart () {
      document.querySelector('ion-menu-controller').close('start')
    },
    getOrders(){
      App.getOrderList();
    }
  }
}
</script>

<style scoped>
  .menu-col-10{
    flex: 0 0 calc(calc(10 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(10 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(10 / var(--ion-grid-columns, 12)) * 100%);
}
.menu-col-2{
    flex: 0 0 calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
    width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
    max-width: calc(calc(2 / var(--ion-grid-columns, 12)) * 100%);
}
#app1 {   
     z-index: 20;
    
}
</style>