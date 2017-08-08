var http = require('http');
var express = require('express');
var months = ['January', 'Feb', 'Mar', 'April', 'May', 'jun', 'July','Aug', 'Sep', 'Oct','Nov','Dec'];
var reply = {"unixTime": null,"normalTIme":null};

var app = express();

var server = app.listen(process.env.PORT || 3000);

app.use(express.static('views'));

app.use('',function(err,req,res,next){
  res.sendFile('views/index.html', {root: __dirname });
});

app.use('/:ts',function(err,req,res,next){
    var timeStamp = decodeURIComponent(req.params.ts);
    next();
});

app.get('/:ts',function(req,res){
    
     var reply;
     var timeStamp = req.params.ts;
     if(timeStamp){
        
         if(Number(timeStamp)){
             timeStamp = timeStamp * 1000;
             var d = new Date(Number(timeStamp));
             reply = {
                 "unixTime": timeStamp,
                 "noramTime": d.getDate() + " " + months[d.getMonth()] + ", " +d.getFullYear()
             }
         }
         else{
             try{
                 timeStamp = decodeURIComponent(timeStamp);

                 if(timeStamp){
                     var d = new Date(timeStamp).getTime();
                  
                     if(!isNaN(d)){
                         reply = {
                             "unixTime": d/1000,
                             "noramTime": timeStamp
                         }
                     }else{
                         reply = {
                             "unixTime": null,
                             "noramTime": null
                         }
                     }
                 }else{
                     reply = {
                             "unixTime": null,
                             "noramTime": null
                        }
                }
            }catch(e){
                res.sendStatus(400);
            }
            
            
           
        }
    }else{
        reply = {
            "unixTime": null,
            "noramTime": null
        }
    }
    res.end(JSON.stringify(reply));
    
});