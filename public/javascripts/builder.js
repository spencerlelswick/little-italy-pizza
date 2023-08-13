
let zIndex = -100
const builder = document.getElementById('builder')
builder.style = `position: absolute`

console.log(builder)

// build base crust
const base = document.createElement('img')
base.style = `z-index:${zIndex};width: 500px; position: absolute;`
base.src = '/crust/crust.png'

document.getElementById('builder').appendChild(base);
const builderForm = document.getElementById('form-builder')

builderForm.addEventListener('click', (e => {
  // console.log(e.target)
  const topping = e.target.value
  const addTopping = e.target.checked
  if (e.target.type === 'checkbox') {
    changeTopping(topping.replace(/\s/g, ''), addTopping)
  }
}))

function changeTopping(topping, addTopping) {
  if (addTopping) {
    console.log(`adding ${topping} to pizza ${addTopping}`)
    const newTopping = document.createElement('img')
    zIndex += 1
    newTopping.style = `z-index:${zIndex}; width: 500px; right: -500px; bottom: -300px; position: absolute`
    newTopping.src = `/idle-toppings/${topping.toLowerCase()}.png`
    newTopping.classList.add(`${topping}`)
    document.getElementById('builder').appendChild(newTopping);
    console.log(newTopping)
  } else {
    newTopping = document.querySelector(`.${topping}`)
    zIndex -= 1
    document.getElementById('builder').removeChild(newTopping);
    console.log(`removing ${topping} from pizza ${addTopping}`)
  }
}
