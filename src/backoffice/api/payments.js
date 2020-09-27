import axios from 'axios';

export var payAuthorizeNet = {

    endPointURL: "https://apitest.authorize.net/xml/v1/request.api",
    apiLoginId: "28gw3VWb",
    transactionKey: "9d5Ubw5L6J7P7cGn",

    pay: async function(payDatas){

        /**** Este es el diccionario que debe venir del frontend *****/
        //  payDatas = {
        //     "transactionRequest":{
        //         "amount": "401.98", //Total amount of the transaction, include tax, shipping, other charges...
        //         "payment": {
        //             "creditCard": {
        //                 "cardNumber": "5424000000000015",
        //                 "expirationDate": "2020-12" //format YYYY-MM
        //             },
        //         },    
        //         "lineItems": { //Listados de productos - Hasta, como máximo, 30 productos (lineItem)
        //             "lineItem": { //Un producto determinado
        //                 "itemId": "5f413b51d8734a38c8777cc3", //Id del producto
        //                 "name": "Flan de calabaza", //Nombre del producto
        //                 "description": "Flan de calabaza", //Descripción del producto
        //                 "quantity": "20", //Cantidad del producto
        //                 "unitPrice": "18.5" //Precio unitario del producto
        //             },
        //         },
        //         "tax": { //Opcional
        //             "amount": "5.4",
        //             "name": "TAxes 6",
        //         },
        //         "shipping": { //Opcional
        //             "amount": "12.00",
        //             "name": "Shipping 5",
        //             },
        //         "poNumber": "5f52a566b853b10008c8f293", //Id de la orden
        //         "customer": { //opcional
        //             "id": "5f46b33fa6f3d50008eef499", //Id del cliente
        //             "email": "dzorrilla88@gmail.com" //email del cliente
        //         }
        //     }	
        // }
        /********* Fin de esto que se debe quitar despues de probarlo ********/

        let datas = {}

        if (payDatas.transactionRequest.shipping){

            datas = {
                "createTransactionRequest": {
                    "merchantAuthentication": {
                        "name": this.apiLoginId,
                        "transactionKey": this.transactionKey
                    },
                    // "refId": "123456",
                    "transactionRequest": {
                        "transactionType": "authCaptureTransaction",
                        "amount": payDatas.transactionRequest.amount, //Total amount of the transaction, include tax, shipping, other charges...
                        "payment": {
                            "creditCard": {
                                "cardNumber": payDatas.transactionRequest.payment.creditCard.cardNumber,
                                "expirationDate": payDatas.transactionRequest.payment.creditCard.expirationDate, //format YYYY-MM
                                 "cardCode":  payDatas.transactionRequest.payment.creditCard.cardCode
                            }
                        },
                        "lineItems": payDatas.transactionRequest.lineitems,
                        "tax": { //Opcional
                            "amount": payDatas.transactionRequest.tax.amount,
                            "name": payDatas.transactionRequest.tax.name
                            // "description": "level2 tax"
                        },
                        // "duty": {
                        //     "amount": "8.55",
                        //     "name": "duty name",
                        //     "description": "duty description"
                        // },
                        "shipping": {
                            "amount": payDatas.transactionRequest.shipping.amount,
                            "name": payDatas.transactionRequest.shipping.name
                            // "description": "level2 tax"
                        },
                        "poNumber": payDatas.transactionRequest.poNumber, //Id de la orden
                        "customer": {
                            "id": payDatas.transactionRequest.customer.id,
                            "email": payDatas.transactionRequest.customer.email
                        }
                        // "billTo": {
                        //     "firstName": "Ellen",
                        //     "lastName": "Johnson",
                        //     "company": "Souveniropolis",
                        //     "address": "14 Main Street",
                        //     "city": "Pecan Springs",
                        //     "state": "TX",
                        //     "zip": "44628",
                        //     "country": "USA"
                        // },
                        // "shipTo": {
                        //     "firstName": "China",
                        //     "lastName": "Bayles",
                        //     "company": "Thyme for Tea",
                        //     "address": "12 Main Street",
                        //     "city": "Pecan Springs",
                        //     "state": "TX",
                        //     "zip": "44628",
                        //     "country": "USA"
                        // },
                        // "customerIP": "192.168.1.1",
                        // "transactionSettings": {
                        //     "setting": {
                        //         "settingName": "testRequest",
                        //         "settingValue": "false"
                        //     }
                        // },
                        // "userFields": {
                        //     "userField": [
                        //         {
                        //             "name": "MerchantDefinedFieldName1",
                        //             "value": "MerchantDefinedFieldValue1"
                        //         },
                        //         {
                        //             "name": "favorite_color",
                        //             "value": "blue"
                        //         }
                        //     ]
                        // }
                    }
                }
            }

        }
        else{

            datas = {
                "createTransactionRequest": {
                    "merchantAuthentication": {
                        "name": this.apiLoginId,
                        "transactionKey": this.transactionKey
                    },
                    "transactionRequest": {
                        "transactionType": "authCaptureTransaction",
                        "amount": payDatas.transactionRequest.amount, //Total amount of the transaction, include tax, shipping, other charges...
                        "payment": {
                            "creditCard": {
                                "cardNumber": payDatas.transactionRequest.payment.creditCard.cardNumber,
                                "expirationDate": payDatas.transactionRequest.payment.creditCard.expirationDate //format YYYY-MM
                            }
                        },
                        "lineItems": payDatas.transactionRequest.lineitems,
                        "tax": { 
                            "amount": payDatas.transactionRequest.tax.amount,
                            "name": payDatas.transactionRequest.tax.name
                        },
                        "poNumber": payDatas.transactionRequest.poNumber, //Id de la orden
                        "customer": {
                            "id": payDatas.transactionRequest.customer.id,
                            "email": payDatas.transactionRequest.customer.email
                        }
                    }
                }
            }

        }

        console.log("Data obj:");
        console.log(datas);
        return await axios.post(this.endPointURL, datas, {headers: {'Content-Type': 'application/json'}})
    },
    
}