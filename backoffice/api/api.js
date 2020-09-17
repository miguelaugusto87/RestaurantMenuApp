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

}