'use strict';

const azurestorage = require('azure-storage');
azurestorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=storagemenusuccess;AccountKey=NBixxy7OkGtfZ9fTNRGSy8KLDkDAIa6BWwDI23ISBFPY9nB2m8yxqvIcveiNkRMvU1USaWJ0MGjQ1T4JoVvzag==;EndpointSuffix=core.windows.net");

module.exports = {
 
   uploadCategoryImg: function(imageType, dataBuffer){
    azurestorage.createBlockBlobFromLocalFile('category-images', imageType, dataBuffer, function(error) {
        if (!error) {
          // file uploaded
          console.log("Not error to upload")
        }
        else{
            console.log("Error to upload")
        }
      } )

    },

    uploadProductImg: function(imageType, dataBuffer){
        azurestorage.createBlockBlobFromLocalFile('product-image', imageType, dataBuffer, function(error) {
            if (!error) {
              // file uploaded
              console.log("Not error to upload")
            }
            else{
                console.log("Error to upload")
            }
          } )
    
    }

};