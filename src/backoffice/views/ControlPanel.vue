<template>
    <ion-content>
        <div style="padding: 20px;">
            <h3>{{$t('backoffice.titles.controlPanel')}}</h3>

            <router-link to="/menu"><ion-button expand="full" round strong color="tertiary">{{ $t('backoffice.options.manageMenus') }}</ion-button></router-link>
            <router-link to="/order"><ion-button expand="full" round strong color="tertiary">{{ $t('backoffice.options.viewOrders') }}</ion-button></router-link>
            <router-link to="/category"><ion-button expand="full" round strong color="tertiary">{{ $t('backoffice.options.manageCategories') }}</ion-button></router-link>
            <router-link to="/product"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageProducts') }}</ion-button></router-link>
            <router-link to="/customer"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageCustomers') }}</ion-button></router-link>
            <router-link to="/table"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageTables') }}</ion-button></router-link>
            <router-link to="/tax"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageTaxes') }}</ion-button></router-link>
            <router-link to="/shipping"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageShippings') }}</ion-button></router-link>
            <router-link to="/otherCharge"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageOtherCharges') }}</ion-button></router-link>
            <router-link to="/user"><ion-button expand="full" strong color="tertiary">{{ $t('backoffice.options.manageUsers') }}</ion-button></router-link>
        </div>
    </ion-content>
</template>>