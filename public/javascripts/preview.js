
let zIndex = -100
const builder = document.getElementById('builder')
const base = document.createElement('img')
base.style = `z-index:${zIndex};`
base.classList.add(`crust-area`)
base.src = '/crust/regular.png'

document.getElementById('builder').appendChild(base);

const crusts = []
const meats =  []
const veggies =  []

prepopulatePizza()


function changeCrust(ingredient) {
  document.getElementById('builder').removeChild(base);
  base.src = `/crust/${ingredient.toLowerCase()}.png`
  document.getElementById('builder').appendChild(base);
}

function changeTopping(topping, addTopping) {
  if (addTopping) {
    const newTopping = document.createElement('img')
    zIndex += 1
    newTopping.style = `z-index:${zIndex};`
    newTopping.src = `/idle-toppings/${topping.toLowerCase()}.png`
    newTopping.classList.add(`${topping}`, `topping-area`)
    document.getElementById('builder').appendChild(newTopping);
  } else {
    newTopping = document.querySelector(`.${topping}`)
    zIndex -= 1
    document.getElementById('builder').removeChild(newTopping);
  }
}

function prepopulatePizza(){
  for (let i = 0; i < crusts.length; i++) {
    if(crusts[i].checked){
      changeCrust(crusts[i].value)
    }
  }
  for (let i = 0; i < meats.length; i++) {
    if(meats[i].checked){
      changeTopping(meats[i].value.replace(/\s/g, ''),true)
    }
  }for (let i = 0; i < veggies.length; i++) {
    if(veggies[i].checked){
      changeTopping(veggies[i].value.replace(/\s/g, ''),true)
    }
  }
}