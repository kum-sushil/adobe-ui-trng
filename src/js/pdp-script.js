$(document).ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const pid = urlParams.get('id');
  if(pid && pid.length>0){
    getProductsDetail(pid);
  }
  


async function getProductsDetail(pid) {  
    let response = await fetch('https://fakestoreapi.com/products/'+pid);
    const productJson = await response.json();
    const product_detail = $('.product-detail-page-wrapper .product-detail');
    const product_variation_image = $('.product-detail-page-wrapper .product-detail .product-varitions ul');
    const product_image = $('.product-detail-page-wrapper .product-detail .product-image>img');
    const product_info_title = $('.product-detail-page-wrapper .product-detail .product-info .product-title');
    const product_info_price = $('.product-detail-page-wrapper .product-detail .product-info .product-price');
    const product_info_rating = $('.product-detail-page-wrapper .product-detail .product-info .product-rating');
    const product_info_description = $('.product-detail-page-wrapper .product-detail .product-info .product-description');
    const product_detail_description_title = $('.product-detail-page-wrapper .product-detail-description .title');
    const product_detail_description = $('.product-detail-page-wrapper .product-detail-description .product_description');
    const add_quantity_button_id = $('.product-detail-page-wrapper .product-info .increment-cart-quantity-btn');
    const remove_quantity_button_id = $('.product-detail-page-wrapper .product-info .decrement-cart-quantity-btn');
    const add_to_cart_button = $(".product-detail-page-wrapper .product-detail .product-info .add-to-cart");
    
    $(productJson).each(function(i, element){
            let image,id,title,price,rating,total_rating,description='';
            image = element.image;     
            id = element.id;
            title = element.title;
            price = element.price;
            rating = element.rating.rate;
            total_rating = element.rating.count;
            description = element.description;
            let ratingsBycount= rating+" ( "+total_rating +" )";
            let shortDescription = '';
            if(description && description.length>0){
                shortDescription = description.substring(0,200);
            }            
            let liList = product_variation_image[0].getElementsByTagName("li");
            for(let i=0;i<=liList.length-1;i++){
              let imageVariationAnchor = liList[i].querySelectorAll("a");
              $(imageVariationAnchor[0]).attr("href","product-detail-page.html?id="+id);
              let imageTag = liList[i].querySelectorAll("a img");
              $(imageTag[0]).attr("src",image);
              $(imageTag[0]).attr("alt",title);
            }
            product_image.attr("src",image);
            product_image.attr("alt",title);
            product_info_title.text(title);
            product_info_price.text("$"+price);
            product_info_rating.text(ratingsBycount);
            product_info_description.text(shortDescription);

            product_detail_description_title.text(title);
            product_detail_description.text(description);
            product_detail_description.attr("id","product-detail-description");
            add_to_cart_button.attr("data-productid",id);

    });
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  }

  document.querySelectorAll(".product-detail-page-wrapper .product-detail .product-info .add-to-cart")[0].addEventListener("click",function () {
    let productId =  $(this).data('productid');
    updateCart(productId);
  });
  
  

  function updateCart(pid){
    let productQty =  document.querySelector('.product-detail-page-wrapper .product-detail .product-info input[name="cart-quantity"]').value;
    sessionStorage.setItem("uid",1);
  }

  const handleCartIncrement = () => {
    let cartQuantityDiv = $(".product-cart .stepper #cart-quantity");
    let count = $(".product-cart .stepper #cart-quantity").value;
    count++;
    cartQuantityDiv.innerHTML = count;
  };
  
  // Function to decrement count
  const handleCartDecrement = () => {
    let cartQuantityDiv = $(".product-cart .stepper #cart-quantity");
    let count = $(".product-cart .stepper #cart-quantity").value;
    count--;
    cartQuantityDiv.innerHTML = count;
  };

 
  $(".product-cart .stepper .increment-cart-quantity-btn").on("click",function(){
    handleCartIncrement();
  })

  $(".product-cart .stepper .decrement-cart-quantity-btn").on("click",function(){
    handleCartDecrement();
  })

});
  