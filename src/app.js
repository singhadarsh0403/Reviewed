const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require("fs")
const { fetchcomparably, fetchindeed, fetchinher, fetchkununu } = require('../all-add')
const healthCalc = require('../healthCalc')
const premium = require('../premium')
const finalPremium = require('../finalPremium')
const tweeter = require('../tweeter')

const app = express()
const port = process.env.PORT || 3000

const dir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(dir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'App',
        name: 'Albatross'
    })
})


app.get('/home',(req,res)=>{
    res.render('home',{
        message:'home',
        title:'home',
        name:'Albatross_Rangers'
    })
})
app.get('/login',(req,res)=>{
    res.render('login',{
        message:'login',
        title:'login',
        name:'Albatross_Rangers'
    })
})

var fun = (data, response)=>{
    if(response){
        console.log(data);
     fs.appendFile("all.json",JSON.stringify({"rate":parseFloat(data)}),function(err){
        if(err){
            console.log('error')
        }else{
            console.log('exported')
        }
     });
     return data;
    }
    
    if(!response){
        data.catagories.push({rating:0});
        console.log(data);
    }
    
}

app.get('/app',(req,res)=>{
    if(!req.query.company){
        res.send({
            error:'please provide comapny'
        })
    }
     fetchcomparably(req.query.company, fun);
     fetchindeed(req.query.company, fun);
    fetchinher(req.query.company, fun);
    fetchkununu(req.query.company, fun);
    tweeter(req.query.company);
    
    //takes values form the tweet and other scores from the website
    //var health = healthCalc(3.8, 3.2, 4, 3.6, 3.5);
    var health = averageHeatlh(tweeterRating,comparablyRating,indeeRating,inherRating,kununuRating);
    
    var compData = {
        regNumValue : req.query.regNum,
        locationValue : req.query.location,
        companyValue : req.query.company,
        health : health
    }
    
    fs.writeFile('compData.json',JSON.stringify(compData), function (err) {
        if (err) throw err;
        console.log('Saved!');})

   res.send({
            company:req.query.company,
            regNum:req.query.regNum,
            location:req.query.location,
            indeed:req.query.indeed
    })
    console.log(req.query.company+' '+req.query.regNum+' '+req.query.location)
    
})

app.get('/insurace',(req,res)=>{
    if(!req.query.dis){
        res.send({
            error:'please provide dis'
        })
    }

    var compData = {
        regNumValue : req.query.regNum,
        locationValue : req.query.location,
        companyValue : req.query.company
    }
    
    fs.writeFile('compData.json',JSON.stringify(compData), function (err) {
        if (err) throw err;
        console.log('Saved!');})
    var pre = premium(10,10,10,10);

    //taking the premium amount in the format of 
    // preminum(valueOfCargo,totalDistance,typeOfVehicle ,typeOfPackageCost)
    //var pre = preminum(1000000,3500,'low' ,10);
    var pre = preminum(req.query.CargoValue,req.query.dis,req.query.vehicle ,10);
    var final =  finalPremium(pre, health);
   res.send({
            CargoValue:req.query.CargoValue,
            dis:req.query.dis,
            vehicle:req.query.vehicle,
            package:req.query.package,
            finalPre : final
    })
    console.log(req.query.CargoValue+' '+req.query.dis+' '+req.query.vehicle+' '+req.query.package)
    
})

app.get('/report', (req,res)=>{
    res.render('report',{
        title:'App',
        name: 'Albatross_Rangers'
    })
})




app.get('*',(req,res)=>{
    res.render('404',{
        message404:'page not found',
        title:'help',
        name:'Albatross_Rangers'
    })
})



app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})