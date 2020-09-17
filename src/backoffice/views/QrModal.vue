<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item></ion-item>
        <ion-item>
            <qrcode-vue :value="content" :size=320 level="H"></qrcode-vue>
        </ion-item>
        <ion-item></ion-item>
        <ion-button expand="full" color="primary" @click="dismissModal()">{{ button }}</ion-button>
    </ion-content>
  </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue';

export default {
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
    button: { type: String, default: 'Close'}
  },
  components: {
      QrcodeVue,
  },
  data() {
    return {
      content: 'Content',
    }
  },
  methods:{
    dismissModal() { 
        this.$ionic.modalController.dismiss(null);
    }
  },
}
</script>