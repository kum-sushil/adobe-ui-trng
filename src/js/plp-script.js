



async function getProductListByCategory(category) {
  let response = await fetch(
    "https://fakestoreapi.com/products/category/"+category
  );
  const productresult = await response.json();
  const product_lists = $(".product-list-page-wrapper .products-list");
  $(productresult).each(function (i, element) {
    let image,
      id,
      title,
      price,
      rating,
      total_rating,
      product,
      product_info = "";
    image = element.image;
    id = element.id;
    title = element.title;
    price = element.price;
    rating = element.rating.rate;
    total_rating = element.rating.count;
    let img = new Image();
    img.src = '../src/images/heart.png';
    let product_div_updated =
    `<div class="product">
          <div class="product-image">
            <a href="product-detail-page.html?id=${id}">
            <img src="${image}" alt="${title}"></img></a>
          </div>
          <div class="product-info">
            <span class="title regular-body-s-14-">${title}</span>
            <span class="price regular-body-s-14-">$ ${price}</span>
            <span class="image-wishlist"><img src="${img.src}" alt="add to wishlist"></span>
          </div>
      </div>`
  product_lists.append(product_div_updated);
  });
}

async function getProducts() {
  // read our JSON
  let response = await fetch("https://fakestoreapi.com/products?limit=10");
  const productJson = await response.json();
  const product_lists = $(".product-list-page-wrapper .products-list");
  $(productJson).each(function (i, element) {
    let image,
      id,
      title,
      price,
      rating,
      total_rating,
      product,
      description,
      product_info = "";
    image = element.image;
    id = element.id;
    title = element.title;
    price = element.price;
    rating = element.rating.rate;
    total_rating = element.rating.count;
    description = element.description;
    let img = new Image();
    img.src = '../src/images/heart.png';
    let product_details = {
      id: id,
      image: image,
      price: price,
      description: description,
      rating: rating,
      rating_count: total_rating,
    };
    let product_element =
      `<div class="product">
          <div class="product-image">
            <a href="product-detail-page.html?id=${id}">
            <img src="${image}" alt="${title}"></img></a>
          </div>
          <div class="product-info">
            <span class="title regular-body-s-14-">${title}</span>
            <span class="price regular-body-s-14-">$ ${price}</span>
            <span class="image-wishlist"><img src="${img.src}" alt="add to wishlist"></span>
          </div>
        </div>`
    product_lists.append(product_element);
  });
}

async function getAllCategories() {
  let response = await fetch("https://fakestoreapi.com/products/categories");
  const categoryJson = await response.json();
  const product_categories = $(".pagemain .product-list-page-wrapper .product-categories");  
  let temp = '';
  $(categoryJson).each(function (index, element) {
    product_categories.append(
      `<div class="category_element">
        <input type="checkbox" value="${element}" name="product_category"></input>
        <label for="${element}">${element}</label>
      </div>`
    );
  });

  if($(product_categories).find(".category_element").length > 0){
    $(".pagemain .product-list-page-wrapper .product-categories").find(".category_element input").each(function(){
      let that = $(this);
      that.on("click", function(){
          getProductListByCategory(that.val());
        });
    });
}


}

$( document ).ready(function() {
  getAllCategories();
  const urlParams = new URLSearchParams(window.location.search);
  let category = urlParams.get('category');
  if(category && category.length>0){
    getProductListByCategory(category);
  }else{
    getProducts();
  }
});