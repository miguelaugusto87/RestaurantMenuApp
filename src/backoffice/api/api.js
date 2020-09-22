import axios from 'axios';

export var Api = {

    token: 'M3nuSucc3ssAp1987456321M3nuSucc3ssAp1741258963M3nuSucc3ssAp1963258741',
  //  token: 'eposMiddl34PI',
    endPointURL: 'https://sls-eus-dev-serverless-succes-api.azurewebsites.net/api/',
  //  endPointURL: 'https://8akf11lds3.execute-api.us-east-1.amazonaws.com/',

    // token: 'Basic UDNQVUFONkw3QkZSSlNSWVE3Sk5NRzNDS1pVT1pSVVg6S0NBSFhUMUlWNFlITEw2Qjc5VDFWUkJDN0tET0VFMDQ=',
    // endPointURL: 'https://api.eposnowhq.com/api/v4/',

    //Azure token
    //token: 'M3nuSucc3ssAp1987456321M3nuSucc3ssAp1741258963M3nuSucc3ssAp1963258741',

    fetchAll: async function(entity){
        return await axios.get(this.endPointURL + entity, {headers: {'Authorization': this.token}})
    },

    fetchById: async function(entity, id){
        return await axios.get(this.endPointURL + entity + '?id=' + id, {headers: {'Authorization': this.token}})
    },

    fetchById_Sync: function(entity, id){
        return axios.get(this.endPointURL + entity + '?id=' + id, {headers: {'Authorization': this.token}})
    },

    postIn: async function(entity, items){
        return await axios.post(this.endPointURL + entity, items, {headers: {'Authorization':this.token, 'Content-Type': 'application/json'}})
    },

    putIn: async function(entity, items){
        return await axios.put(this.endPointURL + entity, items, {headers: {'Authorization':this.token, 'Content-Type': 'application/json'}})
    },

    // deleteById: async function(entity, id){
    //     return await axios.delete(this.endPointURL + entity, { data: [{ Id: id }], headers: { "Authorization": this.token } })
    // }

    deleteById: async function(entity, id){
        return await axios.delete(this.endPointURL + entity + '?id=' + id, {headers: { "Authorization": this.token }} )
    },

    getProductsByCategory: async function(categoryId){
        return await axios.get(this.endPointURL + 'Product?category=' + categoryId, {headers: {'Authorization': this.token}})
    },

    findCustomerByEmail: async function(email){
        return await axios.get(this.endPointURL + 'Customer?email=' + email, {headers: {'Authorization': this.token}})
    },

    findProductCharges: async function(id, cant){
        console.log('othercharges/product/' + id+'/'+ cant);
        return await axios.get(this.endPointURL + 'othercharges?product=' + id+'&cant='+ cant , {headers: {'Authorization': this.token}})
    },

    getAvailbleShipping: async function(){
        return await axios.get(this.endPointURL + 'shipping?available=1' , {headers: {'Authorization': this.token}})
    },

    getAvailbleTax: async function(){
        return await axios.get(this.endPointURL + 'tax?available=1' , {headers: {'Authorization': this.token}})
    },

    getAllCategoryActiveMenu: async function(){
        return await axios.get(this.endPointURL + 'menu?category=1' , {headers: {'Authorization': this.token}})
    },

    getCustomerOrders: async function(id){
        return await axios.get(this.endPointURL + 'order?customer=' + id , {headers: {'Authorization': this.token}})
    },

    hasPermission: function(user, permission){
        let res = false;
        for (let index = 0; index < user.Roles.length; index++) {
             this.fetchById_Sync("Rol", user.Roles[index])
                .then(response => {
                   switch(permission){                        
                        case 'canViewMenu':
                            console.log("LLEGO");
                            res = response.data.canViewMenu;
                            break;
                        case 'canCreateMenu':
                            res = response.data.canCreateMenu;
                            break;
                        case 'canEditMenu':
                            res = response.data.canEditMenu;
                            break;
                        case 'canDeleteMenu':
                            res = response.data.canDeleteMenu;
                            break;
                        case 'canCreateCategory':
                            res = response.data.canCreateCategory;
                            break;
                        case 'canEditCategory':
                            res = response.data.canEditCategory;
                            break;
                        case 'canDeleteCategory':
                            res = response.data.canDeleteCategory;
                            break;
                        case 'canCreateProduct':
                            res = response.data.canCreateProduct;
                            break;
                        case 'canEditProduct':
                            res = response.data.canEditProduct;
                            break;
                        case 'canDeleteProduct':
                            res = response.data.canDeleteProduct;
                            break;
                        case 'canCreateCustomer':
                            res = response.data.canCreateCustomer;
                            break;
                        case 'canEditCustomer':
                            res = response.data.canEditCustomer;
                            break;
                        case 'canDeleteCustomer':
                            res = response.data.canDeleteCustomer;
                            break;
                        case 'canCreateTable':
                            res = response.data.canCreateTable;
                            break;
                        case 'canEditTable':
                            res = response.data.canEditTable;
                            break;
                        case 'canDeleteTable':
                            res = response.data.canDeleteTable;
                            break;
                        case 'canCreateTax':
                            res = response.data.canCreateTax;
                            break;
                        case 'canEditTax':
                            res = response.data.canEditTax;
                            break;
                        case 'canDeleteTax':
                            res = response.data.canDeleteTax;
                            break;
                        case 'canCreateShipping':
                            res = response.data.canCreateShipping;
                            break;
                        case 'canEditShipping':
                            res = response.data.canEditShipping;
                            break;
                        case 'canDeleteShipping':
                            res = response.data.canDeleteShipping;
                            break;
                        case 'canCreateOtherCharge':
                            res = response.data.canCreateOtherCharge;
                            break;
                        case 'canEditOtherCharge':
                            res = response.data.canEditOtherCharge;
                            break;
                        case 'canDeleteOtherCharge':
                            res = response.data.canDeleteOtherCharge;
                            break;
                        case 'canCreateUser':
                            res = response.data.canCreateUser;
                            break;
                        case 'canEditUser':
                            res = response.data.canEditUser;
                            break;
                        case 'canDeleteUser':
                            res = response.data.canDeleteUser;
                            break;
                        case 'canCreateRole':
                            res = response.data.canCreateRole;
                            break;
                        case 'canEditRole':
                            res = response.data.canEditRole;
                            break;
                        case 'canDeleteRole':
                            res = response.data.canDeleteRole;
                            break;
                        case 'canEditOrder':
                            res = response.data.canEditOrder;
                            break;
                        default:
                            break;
                   }
                   if (res)
                   { 
                       console.log("Se ejecuta despues: " + res);
                        return res;
                   }
                        
                })
                .catch(e => {
                    console.log(e);
                })
        }
        return res;
    }

}