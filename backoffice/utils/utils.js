

export var Utils={

    getFormatedDate: function(date){
        var d = new Date(date);
        var day = d.getUTCDate();
        var month = d.getUTCMonth() + 1;
        var year = d.getUTCFullYear();
        return year + "-" + month + "-" + day;
      },

}

