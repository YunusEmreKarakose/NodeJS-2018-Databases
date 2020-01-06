const mysql=require('mysql');
var exports=module.exports={

dbcon:function(){
     var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'eaebank'
    });
    //bağlanma
    db.connect(function(err){
        if(err){    console.log("db connect hata"); throw err;}
        else{console.log("mysql baglandı");}
    });
    return db;
}
  
}


