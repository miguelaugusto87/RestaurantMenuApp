<template>
    <ion-content>
        <div style="padding: 20px;">
            <h3>{{$t('backoffice.titles.controlPanel')}}</h3>

            <router-link to="/menu"><ion-button v-if="hasPermission('canViewMenu')" expand="full" round strong color="tertiary">{{ $t('backoffice.options.manageMenus') }}</ion-button></router-link>
            <router-link to="/order"><ion-button v-if="hasPermission('canViewOrder')" expand="full" round strong color="tertiary">{{ $t('backoffice.options.viewOrders') }}</ion-button></router-link>
            <router-link to="/category"><ion-button v-if="hasPermission('canViewCategory')" expand="full" round strong color="tertiary">{{ $t('backoffice.options.manageCategories') }}</ion-button></router-link>
            <router-link to="/product"><ion-button v-if="hasPermission('canViewProduct')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageProducts') }}</ion-button></router-link>
            <router-link to="/customer"><ion-button v-if="hasPermission('canViewCustomer')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageCustomers') }}</ion-button></router-link>
            <router-link to="/table"><ion-button v-if="hasPermission('canViewTable')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageTables') }}</ion-button></router-link>
            <router-link to="/tax"><ion-button v-if="hasPermission('canViewTax')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageTaxes') }}</ion-button></router-link>
            <router-link to="/shipping"><ion-button v-if="hasPermission('canViewShipping')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageShippings') }}</ion-button></router-link>
            <router-link to="/otherCharge"><ion-button v-if="hasPermission('canViewOtherCharge')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageOtherCharges') }}</ion-button></router-link>
            <router-link to="/user"><ion-button v-if="hasPermission('canViewUser')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageUsers') }}</ion-button></router-link>
            <router-link to="/role"><ion-button v-if="hasPermission('canViewRole')" expand="full" strong color="tertiary">{{ $t('backoffice.options.manageRoles') }}</ion-button></router-link>
        </div>
    </ion-content>
</template>

<script>
export default {
    
    methods: {    
    
        hasPermission(permission){
            
            let res = false;
            if (this.$store.state.authenticated)
            {
                let roles = this.$store.state.roles;
                for (let index = 0; index < roles.length; index++) {
                    switch(permission){                        
                        case 'canViewMenu':
                            res = roles[index].canViewMenu;
                            break;
                        case 'canViewCategory':
                            res = roles[index].canViewCategory;
                            break;
                        case 'canViewProduct':
                            res = roles[index].canViewProduct;
                            break;
                        case 'canViewCustomer':
                            res = roles[index].canViewCustomer;
                            break;
                        case 'canViewTable':
                            res = roles[index].canViewTable;
                            break;
                        case 'canViewTax':
                            res = roles[index].canViewTax;
                            break;
                        case 'canViewShipping':
                            res = roles[index].canViewShipping;
                            break;
                        case 'canViewOtherCharge':
                            res = roles[index].canViewOtherCharge;
                            break;
                        case 'canViewUser':
                            res = roles[index].canViewUser;
                            break;
                        case 'canViewRole':
                            res = roles[index].canViewRole;
                            break;
                        case 'canViewOrder':
                            res = roles[index].canViewOrder;
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
}

}
</script>