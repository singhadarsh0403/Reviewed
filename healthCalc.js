averageHeatlh = (tweeterRating,comparablyRating,indeeRating,inherRating,kununuRating) =>{
    var avgRating = ((tweeterRating+comparablyRating+indeeRating+inherRating+kununuRating)/5)*2
    console.log(avgRating);
    var NetHealthScore = 6.5-avgRating;
    console.log(NetHealthScore);

    return NetHealthScore;

}


averageHeatlh(3.8, 3.2, 4, 3.6, 3.5);
module.exports = averageHeatlh