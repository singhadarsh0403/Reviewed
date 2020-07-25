
const Form = document.querySelector('form')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const valCargo = document.querySelector('#company')
const disInKm = document.querySelector('#distance')
const vechile = document.querySelector('#vechile')
const package = document.querySelector('#package')


Form.addEventListener('submit',(e)=>{

    e.preventDefault()


    const valCargoValue = valCargo.value
    const disInKmValue = disInKm.value
    //const locationValue = location.value


    // const vechileValue = vechile.value
    // const packageVlaue = package.value
    const vechileValue = 'low'
    const packageVlaue = 'high'

    // const companyValue = search.value
    messageOne.innerHTML = 'loading...'
    messageTwo.innerHTML = 'yo'

    if(disInKm==null){
        console.log('input a distance')
    }else{
        fetch('/insurace?&CargoValue='+valCargoValue+'&dis='+disInKmValue+'&vehicle='+vechileValue+'&package='+packageVlaue).then((response)=>{
                response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                }else{
                    messageOne.innerHTML = data.CargoValue
                    messageTwo.innerHTML = data.dis + ' ' + data.vehicle +' '+ data.package
                    
                   
                    console.log(data.dis + ' ' + data.vehicle +' '+ data.package)
                    


                }
            })
        })
    }

})