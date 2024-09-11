// cart open and closing

const cart=document.querySelector(".cart");
const icon=document.querySelector(".cart-icon")
const cartClose =document.querySelector("#cart-close");
icon.addEventListener("click", function(){
    cart.classList.toggle('open')
});
cartClose.addEventListener("click", function(){
  cart.classList.remove('open')
});

// add-cart click add to count

let orderCount = 0;
let btns = document.querySelectorAll("#order-now");
btns.forEach(button =>{
    button.addEventListener("click",()=>{
    orderCount++;
    let order =document.getElementById("order");
    order.textContent=orderCount;
    order.style.display="block";
});
});

document.addEventListener('DOMContentLoaded',loadFood);
function loadFood(){
  loadContent();
}
function loadContent(){
  // remove food item from food cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener("click",removeItem);
  });
  // product item changed
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener("change",changeQty);
  });
  // product cart
  let cartBtns=document.querySelectorAll('.add-to-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener("click",addcart);
  });

  updateTotal()
}
// remove item
function removeItem(){
  if(confirm('Are Your Sure to Remove ')){
    let title= this.parentElement.querySelector('.food-title').innerHTML;
    itemlist=itemlist.filter(el=>el.title!=title)
    this.parentElement.remove();
    loadContent();
  }
}
// change quantity
function changeQty(){
  if(isNaN(this.value)||this.value<1){
    this.value=1; 
  }
  loadContent();
}
let itemlist=[];

// add cart
function addcart(){
   let food=this.parentElement;
   let imgSrc=food.querySelector('img').src;
   let title =food.querySelector('h2').innerHTML;
   let price=food.querySelector('p').innerHTML;
   console.log("food")

   let newProduct={imgSrc,title,price}
// check the food already exist in cart
if(itemlist.find((el)=> el.title==newProduct.title))
{
  alert("The food is already added in cart");
  return;
}else{
  itemlist.push(newProduct)
}

   let newProductElement=createCartProduct(imgSrc,title,price);
   let cartBasket=document.querySelector('.cart-content');
   let element=document.createElement('div');
   element.innerHTML=newProductElement;

   cartBasket.append(element);
   loadContent();
}

function createCartProduct(img,h2,p){
  return`
       <div class="food-box">
                        <img src="${img}" alt="">
                        <div class="detail-box">
                            <div class="food-title">${h2}</div>
                            <div class="price-box">
                                <div class="cart-price">${p}</div>
                                <div class="cart-amt">${p}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <div class="cart-remove">
                        <i class="fa-solid fa-trash" name="trash" ></i>
                        </div>
                    </div>
  `;
}

function updateTotal(){
  const cartItems=document.querySelectorAll(".food-box");
  const totalValue=document.querySelector(".total-price");

  let total=0;
  cartItems.forEach(product=>{
    let priceElement=product.querySelector(".cart-price")
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector(".cart-quantity").value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
  });
  totalValue.innerHTML='Rs.'+total;
}

