const builderForm = document.getElementById('form-builder')
let zIndex = -100
const builder = document.getElementById('builder')
builder.style = `position: absolute`
const base = document.createElement('img')
base.style = `z-index:${zIndex};`
base.classList.add(`build-area`)
base.src = '/crust/regular.png'

document.getElementById('builder').appendChild(base);

builderForm.addEventListener('click', (e => {
  // console.log(e.target)
  const ingredient = e.target.value
  const addIngredient = e.target.checked
  console.log(ingredient)
  if (e.target.type === 'radio' && e.target.name === 'crust') {
    console.log(e.target.type)

    changeCrust(ingredient)
  }

  if (e.target.type === 'checkbox') {
    changeTopping(ingredient.replace(/\s/g, ''), addIngredient)
  }
}))

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
    newTopping.classList.add(`${topping}`, `build-area`)
    document.getElementById('builder').appendChild(newTopping);
    console.log(newTopping)
  } else {
    newTopping = document.querySelector(`.${topping}`)
    zIndex -= 1
    document.getElementById('builder').removeChild(newTopping);
    console.log(`removing ${topping} from pizza ${addTopping}`)
  }
}
