let burgerButton = document.querySelector(".header__burger--open")
let burgerIcon = document.querySelector(".fa-bars")
let menu = document.querySelector(".header__nav")
let burgerClose = document.querySelector(".header__burger--close")

burgerButton.addEventListener("click",function(event){
    menu.classList.toggle("open")
   burgerIcon.classList.toggle("fa-xmark")
   
})

document.addEventListener("click", function(event)
{
    if (!menu.contains(event.target) && !burgerButton.contains(event.target)) {
        menu.classList.remove("open")
      }
})
