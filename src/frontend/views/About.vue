<template>
    <ion-app>
        <ion-content >

            <ion-header>
                <ion-toolbar>
               
                <img :src="restaurantLogo" class="menu-col-4" style="padding: 7px;max-height: 50px;float:left;width: auto;">
                <h3 class="menu-col-8" style="float:left, text-align:left">{{$t('frontend.menu.about')}}</h3>
                </ion-toolbar>
            </ion-header>

            <div v-if="spinner">
                <ion-spinner  name="lines" class="spinner"></ion-spinner>
            </div>

                    
            <ion-slides pager="true"  :options="slideOpts" v-if="!spinner">

                <!-- <ion-slide v-for="i in ['a', 'b', 'c']" :key="i"> {{i}}</ion-slide> -->

                <ion-slide v-for="about in abouts" :key="about._id"  >
                    <ion-card   style="padding:10px">
                        <ion-card-header>
                            <img :src="about.ImageUrl" style="display: inline;">
                            <ion-card-title>{{about.Title}}</ion-card-title>
                            <ion-card-subtitle>{{about.Subtitle}}</ion-card-subtitle>
                        </ion-card-header>
                        <ion-card-content>
                            {{about.Description}}
                        </ion-card-content>
                    </ion-card> 
               
                </ion-slide>

            </ion-slides> 


        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-toolbar style="padding: 5px 0;">
           
                <div class="menu-col-4" style="float: left; text-align: center;" ><ion-icon name="call" color="primary"></ion-icon><div>{{restaurantPhone}}</div></div> 
                <div class="menu-col-4" style="float: left; text-align: center;"><ion-icon name="mail" color="primary"></ion-icon><div>{{restaurantEmail}}</div></div>          
                <div class="menu-col-4" style="float: left; text-align: center;"><ion-icon name="locate" color="primary"></ion-icon> <div>{{restaurantAddress}}</div></div>
            </ion-toolbar>
        </ion-footer>

    </ion-app>

    
</template>



<script>
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";


addIcons({
  "ios-add": add.ios,
  "md-add": add.md
});

import { Api } from '../../backoffice/api/api';

export default {
    name: 'About',
    created: function(){
        this.restaurantData();
        this.sliderstData()
        }, 
    data() {
        return {
            restaurantName: '',
            restaurantPhone: '',
            restaurantLogo: '',
            restaurantEmail: '',
            restaurantAddress: '', 
            slideOpts:{speed: 400, slideShadows: true, initialSlide: 1},
            abouts: [],
            spinner: false,
        }
    },
    methods:{
        sliderstData: function(){
            this.spinner =true

            Api.fetchAll("About").then(response => { 
                this.spinner = false         
                if(response.status === 200){                     
                     console.log("Sliders Data: " + JSON.stringify(response.data))
                     this.abouts = response.data;
                }  
            })
            .catch(e => {
                this.spinner = false
                console.log(e)        
            });

        },

        restaurantData: function(){
            this.spinner = true;
            Api.fetchAll("Restaurant").then(response => {  
                this.spinner = false;        
                if(response.status === 200){                    
                    this.restaurantName= response.data[0].Name;
                    this.restaurantPhone= response.data[0].Phone;
                    this.restaurantLogo= response.data[0].ImageUrl;
                    this.restaurantEmail= response.data[0].Email;
                    this.restaurantAddress= response.data[0].Address;
                } 
            })
            .catch(e => {
                this.spinner = false;
                console.log(e)        
            });
            },
        },

    
        
    }
    
    
   

</script>

<style scope="scoped" >
 /* #app1 {
    margin-bottom: 0 !important;
} */
.swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 12px !important;
}


</style>