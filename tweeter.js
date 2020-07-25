const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')
var fs = require('fs')

const apikey = 'DZUDSQCg0Wk253TQGmqZA1sCh'
const apiSecretKey = 'rOP5yna8tbkgmRs97ggszj1pPESWrW2OmP0E88CAVWvqfjXVYo'
const accessToken = '859807567098380289-UMBLh9HQ2hxLIHJGslliKwFDc0i3DHU'
const accessTokenSecret = '6fAHAWyi4LDczB5RugfNIKwM8YraWzz5yBaRX8QkP3bdG'

// const apikey = (process.env.APIKEY)
// const apiSecretKey = (process.env.APISECRETKEY)
// const accessToken = (process.env.ACCESSTOKEN)
// const accessTokenSecret = (process.env.ACCESSTOKENSECRET)

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

tweeter = (async (company) => {

    // //1. GET RECENT TWEETS

T.get('search/tweets', { q: '#India #'+company+' since:2019-04-15', count:200 }, function(err, data, response) {
//
      const tweets = data.statuses
      // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
      .map(tweet => tweet.text)
      .filter(tweet => tweet.toLowerCase().includes(company));

      //const csv = tweets.toString();
      //console.log(tweets);
        const csv = tweets;
      fs.appendFile("all.csv",csv,function(err){
        if(err){
            console.log('error')
        }else{
            console.log('exported')
        }
    });

      console.log(csv);
      return csv;
    })
    var India =  ['6.5546079', '35.6745457', '68.1113787', '97.395561']
    T.get('search/tweets', { q: '#India #'+company+' since:2019-04-15', count:200, locations: India }, function(err, data, response) {

        const tweets = data.statuses
        // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
        .map(tweet => tweet.text)
        .filter(tweet => tweet.toLowerCase().includes(company));
  
        //const csv = tweets.toString();
        //console.log(tweets);
          const csv = tweets;
        fs.appendFile("all.csv",csv,function(err){
          if(err){
              console.log('error')
          }else{
              console.log('exported')
          }
      });
  
        //console.log(csv);
        return csv;
      })
});


module.exports = tweeter;