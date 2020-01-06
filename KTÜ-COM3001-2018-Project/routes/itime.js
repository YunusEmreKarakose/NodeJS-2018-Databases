var express = require('express');
var router = express.Router();
var db=require("./db");

/* Mülakat saatleri ayarlanması */
router.get('/itpage', function(req, res, next) {
  res.render('itime', { title: 'Express' });
});

router.post('/iTime', function(req, res, next) {
    var day=req.body.day;
    var month=req.body.month;
    var year=req.body.year;
    var hour=req.body.hour;
    var minute=0;
    var aralik=req.body.minute;
    //js date metodları istenilen şekilde çalışmadığı için
    //örnek hata: tarih oluştururken verilen saat yerine -3 eksiği ile tarih oluşturuyor (new Date)
    minute=parseInt(minute);
    hour=parseInt(hour);
    month=parseInt(month);
    year=parseInt(year);
    day=parseInt(day);
    aralik=parseInt(aralik);

    
    let sqlstr='SELECT * FROM interndata WHERE isRate="0"';
    let query=db.query(sqlstr,function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{console.log("SONUC:::"+result); 
            result.forEach(element => {
                if(minute>=60){     hour++;minute=00;}
                if(hour>=17){       day++;hour=09;}                
                var d=day+"/"+month+"/"+year+"  "+hour+":"+minute;
                saveT(d,element.stuNum);
                minute+=aralik;
            })
            res.redirect('/');            
            }
    });
});

router.get('/getit',function(req,res,next){
    let sqlstr="SELECT stuNum,iDate,kurul FROM interndata WHERE isRate='0'";
    let query=db.query(sqlstr,function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{ 
            var table='';
            var i=0;
            result.forEach(element => {
                    table +='<tr><td>'+ result[i].stuNum  +'</td><td>'+ result[i].iDate +'</td><td>'+result[i].kurul+'</td></tr>';
                
              i++;
            });
            table ='<table border="1"></th><th>Öğrenci No</th><th>Tarih</th><th>Kurul</th></tr>'+ table +'</table>';
            res.send(table);}
    });
});


function saveT(date,stunum){
    let sqlstr='UPDATE interndata SET iDate=? WHERE stuNum=? AND isRate="0"';
    let query=db.query(sqlstr,[date,stunum],function(err,result){
        if(err){throw err;}
        else{console.log("SONUC:::"+result); 
            }
    });

}
module.exports = router;
