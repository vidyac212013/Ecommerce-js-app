document.addEventListener('DOMContentLoaded',function(){
    loadProd();
    cartCount();
    
})
function cartCount(){
    const getCartItem=JSON.parse(localStorage.getItem("cartItem"))
    const cartcount= getCartItem ? getCartItem.reduce((acc,crrVal)=> acc+crrVal.qty, 0) :0;
    document.getElementById("cart-count").innerHTML=`(${cartcount})` 
    
}
function loadProd(){
    cartCount()
    let products='';
    fetch("https://fakestoreapi.com/products").then((response)=>response.json()).then((data)=>{
        data.forEach((ele)=>{
        // console.log(ele)
            products+=`<div class='product-items'>`;
            products+=`<div class='product-image'>`;
            products+=`<img src="${ele.image}"></img>`;
            products+=`</div>`;
            products+=`<div class='product-img-title'>`;
            products+=`<p>${ele.title}</p>`;
            products+=`</div>`;
            products+=`<div class='img-description'>`;
            products+=`<p>${ele.description}</p>`;
            products+=`</div>`;
            products+=`<div class='product-price'><i class="fa-regular fa-dollar-sign"></i> ${ele.price}</div>`;
            products+=`<div class='product-buttons'>`;
            products+=`<button>Details</button>`;
            products+=`<button onclick='handleAddToCart(${(ele.id)})' >Add to cart</button>`;
            products+=`</div>`;

            products+=`</div>`;
            // console.log(products);
            products && (document.getElementsByClassName('latest-products-cart')[0].innerHTML=products);

        }) 

    }).catch((err)=>{
        console.log(err)
    })
}
const apiGetProdById=async (apiurl)=>{
    const apiresponse=await fetch(apiurl);
    const apiresult=await apiresponse.json();
    // console.log(apiresult)

    return apiresult
}

function loadProducts(prodArr){
    const getCartItem=JSON.parse(localStorage.getItem("cartItem"))
    const cartcount=getCartItem ? getCartItem.length:0;
    document.getElementById("cart-count").innerHTML=`(${cartcount})`
    // console.log(prodArr)
        let filterProd="";
        for(let i=0; i<prodArr.length; i++){
            filterProd+=`<div class='product-items'>`;
            filterProd+=`<div class='product-image'>`;
            filterProd+=`<img src="${prodArr[i].image}"></img>`;
            filterProd+=`</div>`;
            filterProd+=`<div class='product-img-title'>`;
            filterProd+=`<p>${prodArr[i].title}</p>`;
            filterProd+=`</div>`;
            filterProd+=`<div class='img-description'>`;
            filterProd+=`<p>${prodArr[i].description}</p>`;
            filterProd+=`</div>`;
            filterProd+=`<div class='product-price'><i class="fa-regular fa-dollar-sign"></i> ${prodArr[i].price}</div>`;
            filterProd+=`<div class='product-buttons'>`;
            filterProd+=`<button>Details</button>`;
            filterProd+=`<button onclick="handleAddToCart(${prodArr[i].id})">Add to cart</button>`;
            filterProd+=`</div>`;

            filterProd+=`</div>`;
            document.getElementsByClassName('latest-products-cart')[0].innerHTML=filterProd;
    
        }

}

function handleAddToCart(prodId){
          
        let prod=apiGetProdById(`https://fakestoreapi.com/products/${prodId}`).then((data)=>{ 
            const cartArr=JSON.parse(localStorage.getItem("cartItem"))
            let cartProd=cartArr ? cartArr : [];
            
            if(cartProd.length===0){
                cartProd=[{...data, qty:1}]
                localStorage.setItem("cartItem", JSON.stringify(cartProd))
                cartCount()
            }
            else{
                const existItemCheck=cartProd.findIndex((cartItems)=>cartItems.id==data.id)
                let carts=[];
                
                if(existItemCheck !== -1 ){
                    cartProd[existItemCheck].qty+=1
                    cartCount()
                }
                else{
                    cartProd=[...cartProd,{...data,qty:1}]
                cartCount()
                }
                localStorage.setItem("cartItem",JSON.stringify(cartProd))
                cartCount()               
            }            
    })
    
}
function buttonFilter(val,event){
console.log(event)
    const apiservice=async (apiurl)=>{
        const apiresponse=await fetch(apiurl);
        const apiresult=await apiresponse.json();
        loadProducts(apiresult);    
    }

    let btnele=document.querySelectorAll('.latest-products-btn button');
    btnele.forEach((el)=>{
        el.getAttribute('class') && el.setAttribute('class','')
    });
    event.currentTarget.className='active';
   
    if(val === 'All'){
        apiservice(`https://fakestoreapi.com/products`);
    }
    else{
        apiservice(`https://fakestoreapi.com/products/category/${val}`);
    }
}
   