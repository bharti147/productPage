
//Sample Product Data
const products = [
  
    {
      id: 1,  // Unique ID
        name: "Kumkumadi Face Oil",
        description: "With Saffron & Sandalwood | Fades Pigmentation & Spots",
        price: 699,
        image: "https://theayurvedaco.com/cdn/shop/files/705514810809-1.jpg?v=1709358780&width=823",
      },
      {
        id: 2,  // Unique ID
        name: "Bakuchiol Under Eye Gel",
        description: "for Removing Dark Circles and Collagen Boosting with Potato Starch",
        price: 549,
        image: "https://theayurvedaco.com/cdn/shop/files/724049782290-1.jpg?v=1711554113&width=823",
      },
      {
        id: 3,  // Unique ID
        name: "Eladi Sunscreen SPF 50",
        description: "With Eladi & Neem | Reduces Tan & Combats Acne",
        price: 499,
        image: "https://theayurvedaco.com/cdn/shop/files/724049782283-1.jpg?v=1709359001&width=823",
      },
]

//Function to render products dynamically
function renderProducts(){
   const productContainer = document.getElementById('productContainer');

   productContainer.innerHTML = ''; // Clear existing products
  
   products.forEach((product)=>{
    const productHTML = `
    <div class="product">
  
        <img
         src="${product.image}" alt ="${product.name}"
        />
        <div class="product-details">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
           <div class="star-rating" data-product-id="${product.id}">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
          <h2>₹ ${product.price}</h2>
          

          <div class="product-price">
          <div>
           <label for="quantity">Quantity: </label>
           <input type="number" id="quantity${product.id}" min="0" value="0"/>
           </div>
            <button id="addToCart${product.id}" data-tooltip="Click to add item in the cart">Add to Cart</button>
          </div>
         
        </div>
      </div>
    `;

    productContainer.innerHTML += productHTML;

   
   })
   // Ensure event listeners are added after DOM update
  products.forEach((product) => {
    let button = document.getElementById(`addToCart${product.id}`);
    button.addEventListener('click', () => {
      console.log(`Adding product: ${product.name} with id ${product.id}`);
      addProductToCart(product);
    });
  });
  // Add event listeners for star ratings
 document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    const productId = star.parentElement.getAttribute('data-product-id');
    const rating = star.getAttribute('data-value');
    rateProduct(productId, rating);

    // Update the UI to show selected rating
    star.parentElement.querySelectorAll('.star').forEach(s => {
      s.classList.remove('selected');
    });
    for (let i = 0; i < rating; i++) {
      star.parentElement.children[i].classList.add('selected');
    }
  });
});

// Function to handle star click
function rateProduct(productId, rating) {
  // Here, you could update the rating of the product in your product data
  console.log(`Product ID: ${productId} rated with ${rating} stars.`);
}

}

 
//Cart management
let cart = [];


function addProductToCart(product) {
  const quantity = parseInt(document.getElementById(`quantity${product.id}`).value);
  
  console.log(`Adding product: ${product.name} with quantity: ${quantity}`); // Debugging log

  if (quantity < 1) {
      alert("Please select a quantity of 1 or more.");
      return;
  }

  // Check if the product exists already
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  console.log(`Existing product index: ${existingProductIndex}`); // Debugging log

  if (existingProductIndex !== -1) {
      // If the product exists already, update its quantity and total price
      cart[existingProductIndex].quantity += quantity;
      cart[existingProductIndex].total = cart[existingProductIndex].price * cart[existingProductIndex].quantity;
      console.log(`Updated existing product: ${cart[existingProductIndex]}`); // Debugging log
  } else {
      // If the product is new to the cart, add it as a new entry
      const cartItem = {
        id: product.id,  // Include the id
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          total: product.price * quantity,
      };

      cart.push(cartItem);
      console.log(`Added new product to cart: ${cartItem}`); // Debugging log
  }

  updateCart(); // Ensure this function displays the updated cart correctly
  document.getElementById(`quantity${product.id}`).value=0;
}



function updateCart(){
  const cartEmpty = document.getElementById('cartEmpty');
  const cartNotEmpty = document.getElementById('cartNotEmpty');
  const cartDetails = document.getElementById('cartDetails');
  const totalPriceElement = document.getElementById('totalPrice');


  cartDetails.innerHTML = ""; //Clear existing cart details
  let total = 0;

  cart.forEach(item => {
    console.log(item)
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
     <img src = "${item.image}" />
     <div class="cartItemDetails">
          <h2>${item.name}  </h2>
          <h4>₹${item.price} x ${item.quantity} = ₹${item.total}</h4>
            <button onclick="removeFromCart(${item.id})" data-tooltip="Click to remove item from the cart">Remove</button>
            </div>
          
    `
   cartDetails.appendChild(itemDiv);
   total+=item.total;
  })

  totalPriceElement.innerHTML = `Total: ₹${total}`;
  console.log(total)

  cartEmpty.style.display = cart.length? "none":"block";
  cartNotEmpty.style.display = cart.length? "block":"none";
}


function removeFromCart(productId){
    cart = cart.filter(product => product.id !== productId)
    console.log(cart)
    console.log(productId, "is removed")
    updateCart();
}


const deleteCartBtn = document.getElementById('deleteCartBtn');
  // deleteCartBtn.addEventListener('click', deleteCart) 

function deleteCart(){
  cart = [];
  updateCart();
  console.log("cart is deleted")
}



//Initial rendering of products
renderProducts();

// Initial update of cart to set correct visibility
updateCart();