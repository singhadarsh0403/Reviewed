//var heathscore = require('./healthCalc')

var valueOfCargo = 4;
var totalDistance = 4;
var typeOfVehicleCost = 4;
var typeOfPackageCost = 4;
var typeOfVehicle = 'Low'
var typeOfVehicleCostRate =0;
var RiskFactor = 'BaseCover'||'LowRisk'||'AllRisk'
var RiskFactorCost =0


var preminum = (valueOfCargo,totalDistance,typeOfVehicle ,typeOfPackageCost) =>{
    var declaredValue = 0.55*(valueOfCargo/100);
    
    if(typeOfVehicle=='Low'){
         var typeOfVehicleCostRate = 12;
    }else{
        var typeOfVehicleCostRate = 15;
    }

    typeOfVehicleCost = totalDistance* typeOfVehicleCostRate;

    if(RiskFactor=='')
    {
        RiskFactorCost = 150
    }else if(RiskFactor==''){
        RiskFactorCost = 200
    }else{
        RiskFactorCost = 250
    }

    var BasePremiumCharge = declaredValue+typeOfVehicleCost+RiskFactorCost
    console.log(BasePremiumCharge)
    return BasePremiumCharge;

}



preminum(1000000,3500,'low' ,10);

module.exports = preminum