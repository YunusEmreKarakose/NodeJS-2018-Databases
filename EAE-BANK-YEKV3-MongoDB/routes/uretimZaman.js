var Member=require("../models/Members.js");
var exports=module.exports={

diffMin:function (dt1, dt2) 
{    
 var diff =(dt2.getTime()-dt1.getTime()) / 1000;
 diff /= 60;
 return Math.abs(Math.round(diff));
 //getttime(zaman) 1970den zaman'a kadar olan süreyi milisaniye olarak verir
},


//üretim fonkları
//time dk cinsinden
cowMilk:function (time){//inek dakikada 1lt süt üretsin
    return time/1;
},
chickenEgg:function (time){//tavuk dakikada 1 yumurta üretsin
return time/1;
},
beeHoney:function (time){//arı dakikada 1br bal üretsin
return time/1;
},

//satış fonkları
sellMilk:function(quantity){//1lt süt 5coin
    return quantity*5;
},
sellEgg:function(quantity){//1 yumurta 2 coin
    return quantity*2;
},
sellHoney:function(quantity){//1br bal 1coin
    return quantity*1;
},
sellSeed:function(quantity){//1br yem 1coin
    return quantity*1;
},
//hayvanların yem tüketimi

eatSeedCow:function(time){//inek dkda 5 yem
    return time*5;
},
eatSeedChicken:function(time){//tavuk dkda 2 yem
    return time*2;
},
eatSeedBee:function(time){//arı dkda 1 yem
    return time*1;
},
requireAuthentication: function (req, res, next) {
    if (req.session.account) {

        var varmi = false;
        //console.log(req.session.account.userName);
        Member.findOne({userName:req.session.account.userName},function(err,data){
            if(err){res.send(err); throw err;}
            else{
               // console.log(data);
                req.session.account = data;
                res.locals.account = req.session.account;
                next();
            }
        });
    } else {
       res.redirect('/login');
       // res.send("uretimzaman");
    }
  }


};
