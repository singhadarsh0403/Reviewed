var finalPre = (base,health)=>{
    var final = base *(1+(health)/100);
    console.log(final);
    return final;
}

finalPre(58250,-0.74)
