document.addEventListener("DOMContentLoaded",function(){
    if(window.location.pathname ==="/cart.html"){
    document.getElementById("btn-cart").setAttribute('class',"active")
    
    }

    let cartProd="";
    const getCartItem=JSON.parse(localStorage.getItem("cartItem")) ;
    const totalProd=getCartItem.reduce((acc,crrVal)=> acc+crrVal.qty,0)
// console.log(getCartItem.length)
    if(getCartItem.length>0){
        let totalPrice=0;
        let ShippingAmt=30;
        cartProd+=`<div class="cart-wraper">`
        cartProd+=`<div class="cart-summary">`

        cartProd+=`<div class="cart-summary-head">` 
         cartProd+=`<h2>Item List</h2>`
        cartProd+=`</div>`//cart-summary-head
        cartProd+=`<div class="summary-items">`
        for(let i=0;i<getCartItem.length;i++){

            totalPrice+=getCartItem[i].price*getCartItem[i].qty
            cartProd+=`<div class="cart-item-details">`

            cartProd+=`<div class="cart-item-img">`;
            cartProd+=`<img src="${getCartItem[i].image}" class="cart-img">`
            cartProd+=`</div>`

            cartProd+=`<div class="cart-item-title">`
            cartProd+=`<p>${getCartItem[i].title}</p>`
           
            cartProd+=`</div>` 

            cartProd+=`<div class="cart-item-btn">`
            cartProd+=`<button onclick="handleRemovevProd(${i})"><i class="fa-solid fa-minus"></i></button>`
            cartProd+=`<span class="item-count"> ${getCartItem[i].qty} </span>`
            cartProd+=`<button onclick="handleAddProd(${getCartItem[i].id})"><i class="fa-solid fa-plus"></i></button>`
             cartProd+=`<h3 class="cart-product-price"><i class="fa-solid fa-dollar-sign"></i>${getCartItem[i].price}*${getCartItem[i].qty}</h3>`
            cartProd+=`</div>`

            cartProd+=`</div>`//itemdetails
        }
    
        cartProd+=`</div>`//summaryitems-end
        cartProd+=`</div>`//cart-summary

        cartProd+=`<div class="cart-price-summary">`

        // cartProd+=`<div class="cart-sub2">`

        cartProd+=`<div class="cart-sub2-head">`
        cartProd+=`<h2>Order Summary</h2>`
        cartProd+=`</div>` //cart2-head

        cartProd+=`<div class="cart-order-summary">`


        cartProd+=`<div>`
        cartProd+=`<p>Product <span id="summary-count">(${totalProd})</span></p>`
        cartProd+=`<p>Shipping</p>`
        cartProd+=`<p>Total</p>`
        cartProd+=`</div>`

        const totalAmt=ShippingAmt+totalPrice;
        cartProd+=`<div>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i><spn id="summary-price">${totalPrice}</span></p>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i>30</p>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i><span id="summary-total">${totalAmt}</span></p>`
        cartProd+=`</div>`
        cartProd+=`</div>`//order-summary

        cartProd+=`<div>`
        cartProd+=`<button class="btn-chek-out">Go To CheckOut</button>`            
        cartProd+=`</div>`
        
        cartProd+=`</div>` //price-summary
        cartProd+=`</div>`//wraper
       
        cartProd && (document.getElementById("cart-container").innerHTML= cartProd);
        document.getElementById("cart-count").innerHTML=`(${getCartItem.length})`

    }
    else{
        cartProd+=`<div class="empty-cart">`
        cartProd+=`<p class="cart-para">Your Cart is Empty</p>`
        cartProd+=`<button class="btn-shopping" onclick="handleShoppingCart()"><i class="fa-solid fa-arrow-left"></i> Continue Shopping</button>`
        cartProd+=`</div>`
        document.getElementById("cart-container").innerHTML=cartProd;
    } 
    
    
})
function handleShoppingCart (){
    window.location.href="product.html";
}
function handleAddProd(id){
    const product=JSON.parse(localStorage.getItem("cartItem")) 
    const productIndex=product.findIndex((items)=> items.id===id)
    product[productIndex].qty+=1;
    localStorage.setItem("cartItem",JSON.stringify(product))
    const totalQty=product.reduce((acc,crrVal)=>acc+crrVal.qty,0)
    const totalAmt=product.reduce((acc1,crrVal1)=>
        acc1+crrVal1.price*crrVal1.qty ,0
     )
        
    document.getElementById("cart-count").innerHTML=totalQty;    
    document.getElementsByClassName("item-count")[productIndex].innerHTML=`    ${product[productIndex].qty}` 
    document.getElementsByClassName("cart-product-price")[productIndex].innerHTML=`${product[productIndex].price}*${product[productIndex].qty}`
    document.getElementById("summary-count").innerHTML=` (${totalQty})`;
    document.getElementById("summary-price").innerHTML=totalAmt;
    document.getElementById("summary-total").innerHTML=totalAmt+30;
}
function handleRemovevProd(index){
    // console.log(index)
    const product=JSON.parse(localStorage.getItem("cartItem"))
        product[index].qty-=1
        console.log(product[index].qty)
    if(product[index].qty<1){
        // delete product[index]
        product.splice(index,1)

    }
    localStorage.setItem("cartItem",JSON.stringify(product))

    

    const getProduct=JSON.parse(localStorage.getItem("cartItem")) || {};
    const totalProd=getProduct.reduce((acc,crrVal)=> acc+crrVal.qty,0)

    if(getProduct.length && getProduct.length>0){
        let totalPrice=0;
        let ShippingAmt=30;
        let cartProd='';
        cartProd+=`<div class="cart-wraper">`
        cartProd+=`<div class="cart-summary">`

        cartProd+=`<div class="cart-summary-head">` 
         cartProd+=`<h2>Item List</h2>`
        cartProd+=`</div>`//cart-summary-head
        cartProd+=`<div class="summary-items">`
        for(let i=0;i<getProduct.length;i++){

            totalPrice+=getProduct[i].price*getProduct[i].qty
            cartProd+=`<div class="cart-item-details">`

            cartProd+=`<div class="cart-item-img">`;
            cartProd+=`<img src="${getProduct[i].image}" class="cart-img">`
            cartProd+=`</div>`

            cartProd+=`<div class="cart-item-title">`
            cartProd+=`<p>${getProduct[i].title}</p>`
           
            cartProd+=`</div>` 

            cartProd+=`<div class="cart-item-btn">`
            cartProd+=`<button onclick="handleRemovevProd(${i})"><i class="fa-solid fa-minus"></i></button>`
            cartProd+=`<span class="item-count"> ${getProduct[i].qty} </span>`
            cartProd+=`<button onclick="handleAddProd(${getProduct[i].id})"><i class="fa-solid fa-plus"></i></button>`
             cartProd+=`<h3 class="cart-product-price"><i class="fa-solid fa-dollar-sign"></i>${getProduct[i].price}*${getProduct[i].qty}</h3>`
            cartProd+=`</div>`

            cartProd+=`</div>`//itemdetails
        }
    
        cartProd+=`</div>`//summaryitems-end
        cartProd+=`</div>`//cart-summary

        cartProd+=`<div class="cart-price-summary">`

        // cartProd+=`<div class="cart-sub2">`

        cartProd+=`<div class="cart-sub2-head">`
        cartProd+=`<h2>Order Summary</h2>`
        cartProd+=`</div>` //cart2-head

        cartProd+=`<div class="cart-order-summary">`


        cartProd+=`<div>`
        cartProd+=`<p>Product <span id="summary-count">(${totalProd})</span></p>`
        cartProd+=`<p>Shipping</p>`
        cartProd+=`<p>Total</p>`
        cartProd+=`</div>`

        const totalAmt=ShippingAmt+totalPrice;
        cartProd+=`<div>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i><spn id="summary-price">${totalPrice}</span></p>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i>30</p>`
        cartProd+=`<p><i class="fa-solid fa-dollar-sign"></i><span id="summary-total">${totalAmt}</span></p>`
        cartProd+=`</div>`
        cartProd+=`</div>`//order-summary

        cartProd+=`<div>`
        cartProd+=`<button class="btn-chek-out">Go To CheckOut</button>`            
        cartProd+=`</div>`
        
        cartProd+=`</div>` //price-summary
        cartProd+=`</div>`
       
        cartProd && (document.getElementById("cart-container").innerHTML= cartProd);
        document.getElementById("cart-count").innerHTML=`(${totalProd})`
    }
    else{
        let cartProd="";
        cartProd+=`<div class="empty-cart">`
        cartProd+=`<p class="cart-para">Your Cart is Empty</p>`
        cartProd+=`<button class="btn-shopping" onclick="handleShoppingCart()"><i class="fa-solid fa-arrow-left"></i> Continue Shopping</button>`
        cartProd+=`</div>`
        document.getElementById("cart-container").innerHTML=cartProd;
        document.getElementById("cart-count").innerHTML=`(${totalProd})`
        
    }
}