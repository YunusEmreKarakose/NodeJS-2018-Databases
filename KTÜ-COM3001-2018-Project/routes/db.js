var mysql=require('mysql');
/*
//localhost
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'veri_odev_2018'
  });*/
  //clever-cloud
  const db=mysql.createConnection({
    host:'bxyjbjvqgzoyhxt-mysql.services.clever-cloud.com',
    user:'umjmjkusxsfn7iknqevt',
    password:'JukJY6nwyVDv6cYd6ODp',
    database:'bxyjbjvqgzoyhxt'
  });
  //bağlanma
  db.connect(function(err){
    if(err){    console.log("db connect hata"+err); throw err;}
    else{console.log("mysql baglandı");}
  });

module.exports=db;