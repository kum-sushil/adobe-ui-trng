$(document).ready(function(){
    getCartItems(1);
})
async function getCartItems(pid) { 
      // read our JSON
      let response = await fetch('https://fakestoreapi.com/carts/'+pid);
      const productJson = await response.json();
      $(productJson).each(function(i, element){
        $(element.products).each(function(p, product){
            updateCartElement(product.productId,product.quantity);
        });       
      });
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
}

async function updateCartElement(productId,quantity){
  if(productId){
      let response = await fetch('https://fakestoreapi.com/products/'+ productId);
      const productJson = await response.json();
      if(productJson){
      let product_lists = $('.shopping-cart .products');
      let product =  `<div class="product">
                            <div class="product-image">
                            <img src="${productJson.image}">
                        </div>
                            <div class="product-details">
                            <div class="product-title">${productJson.title}</div>
                            <div class="product-price">$ ${productJson.price}</div>                        
                        </div>                        
                        <div class="stepper">
                       <button class="remove-quantity-btn"  role="button"></button>
                            <input id="cart-quantity" name="cart-quantity" type="number" step="1" min="1" value="${quantity}"/>
                       <button class="add-quantity-btn" role="button"></button>     
                       <button class="remove-product button_primary">Remove</button>                       
                       </div>
                                                                   
                       </div>`
                    product_lists.append(product);
     
    }
}
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
}