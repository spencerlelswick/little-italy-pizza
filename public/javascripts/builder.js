
const builder = document.getElementById('builder')
console.log(builder)

// build base crust
const base = document.createElement('img')
base.src = '/crust/crust.png'

document.getElementById('builder').appendChild(base);