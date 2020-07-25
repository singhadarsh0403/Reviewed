const Form = document.querySelector('form')
//const search = document.querySelector('input')
const search =  document.querySelector('#company')
const regNum = document.querySelector('#reNum')
const locationComp = document.querySelector('#location')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'lorem10'
Form.addEventListener('submit',(e)=>{
   e.preventDefault()

 
    const regNumValue = regNum.value
    const locationValue = locationComp.value

    const companyValue = search.value
    messageOne.innerHTML = 'loading...'
    messageTwo.innerHTML = 'yo'

    if(companyValue==null){
        console.log('input a value')
    }else{
        fetch('/app?company='+companyValue+'&regNum='+regNumValue+'&location='+locationValue+'&indeed=4&glassdoor=5').then((response)=>{
                response.json().then((data)=>{
                if(data.error){
                    // messageOne.textContent = data.error
                    // messageTwo.textContent = '' 
                    console.log(data.error)
                }else{
                    // messageOne.innerHTML = data.company + ' ' + data.location + ''+data.indeed+' '+data.health
                    // messageTwo.innerHTML = data.regNum +' '+data.health
                    
                    
                    console.log(data.company+' '+data.regNum+' '+data.location+' '+data.health)
                    console.log('Success');
                }
            })
        })
    }


    //console.log('testing')
})