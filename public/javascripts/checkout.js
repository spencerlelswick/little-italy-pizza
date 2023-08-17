
let pm = document.getElementsByName("paymentMethod")
let cardInfo = document.getElementsByClassName("cardInfo")
pm[0].addEventListener('click', clickhandler)
pm[1].addEventListener('click', clickhandler)
function clickhandler(e){
    if(e.target.value === "Cash"){
        for (let i = 0; i < cardInfo.length; i++) {
            cardInfo[i].setAttribute("disabled",true)
            cardInfo[i].setAttribute("hidden",true)
        }
    }
    if(e.target.value === "Card"){
        for (let i = 0; i < cardInfo.length; i++) {
            cardInfo[i].removeAttribute("disabled")
            cardInfo[i].removeAttribute("hidden")
        }
    }
}
