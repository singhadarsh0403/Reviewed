var puppeteer = require('puppeteer');
var lodash = require('lodash')
const common = require('./useless/common')
const fs = require("fs")

// const data ={
//     catagories :[]
// }
const data = [];
fetchindeed = async (name,callback)=>{
    var url = 'https://www.indeed.co.in/cmp/'+name+'?from=cmp-search-autocomplete'
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.addScriptTag({url:'https://code.jquery.com/jquery-3.2.1.min.js'});
    const resut = await page.evaluate((data)=>{
        
        //var obj = {rating: $('.cmp-CompactHeaderCompanyRatings-value').text()}
        var obj = $('.cmp-CompactHeaderCompanyRatings-value').text()
        //data.catagories.push(parseFloat(obj));
        data.push({"rate":parseFloat(obj)});
        return parseFloat(obj);
        //return parseFloat(obj);
    },data)   
    await page.close();
    await browser.close();
    callback(resut,true);
}

fetchcomparably = async (name,callback)=>{
    var url = 'https://www.comparably.com/companies/'+name
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.addScriptTag({url:'https://code.jquery.com/jquery-3.2.1.min.js'});
    const resut = await page.evaluate((data)=>{
        //var obj = {rating: $('.numerator').text()}   
        var obj =    $('.numerator').text()
            //data.catagories.push(parseFloat(obj));
            data.push(parseFloat(obj));
            return parseFloat(obj);
            //return parseFloat(obj);
    },data)   
    await page.close();
    await browser.close();
    callback(resut,true);
   
}

fetchkununu = async (name,callback)=>{
    var url = 'https://www.kununu.com/us/'+name;
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.addScriptTag({url:'https://code.jquery.com/jquery-3.2.1.min.js'});
    const resut = await page.evaluate((data)=>{

         //var obj = {rating: $('.overview-value').text().trim().replace(/ /g,'').slice(0,3)}
        var obj = $('.overview-value').text().trim().replace(/ /g,'').slice(0,3)
            //data.catagories.push(parseFloat(obj));
            data.push(parseFloat(obj));
            return parseFloat(obj);
            //return parseFloat(obj);
    },data)   
    await page.close();
    await browser.close();
    callback(resut,true);
}

fetchinher = async (name,callback)=>{
    const url = 'https://www.inhersight.com/company/'+name+'?_n=115719818'
    const browser = await puppeteer.launch({headless:true})
    const fs = require('fs')
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.addScriptTag({url:'https://code.jquery.com/jquery-3.2.1.min.js'});
    const resut = await page.evaluate((data)=>{
         var obj =    $('.v7-margin-top-12.v7-margin-bottom-24.v7-color-grey div span').eq(2).text().trim().replace(/ /g,'').slice(0,3)
         
         data.push(parseFloat(obj));
         
         return parseFloat(obj);
    },data)   
    await page.close();
    await browser.close();
    callback(resut,true);
}



module.exports ={
    fetchcomparably,
    fetchindeed,
    fetchinher,
    fetchkununu
}