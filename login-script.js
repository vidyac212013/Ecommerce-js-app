document.addEventListener("DOMContentLoaded",function(){
    if(window.location.pathname ==="/login.html"){
    document.getElementById("btn-login").setAttribute('class',"active")
     cartCount();
    }
    if(window.location.pathname ==="/register.html"){
        document.getElementById("btn-reg").setAttribute('class',"active")
        cartCount();
    }
   
})
function buttonAction(value,event){
    window.location.href=`${value}.html`;
   
}
function cartCount(){
    const getCartItem=JSON.parse(localStorage.getItem("cartItem"))
    const cartcount= getCartItem ? getCartItem.reduce((acc,crrVal)=> acc+crrVal.qty, 0) :0;
    document.getElementById("cart-count").innerHTML=`(${cartcount})` 
    
}