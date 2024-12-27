let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = {
  data: [
    {
      productName: "Beef Burger",
      category: "FastFood",
      price: "30",
      image: "beef-burger.png",
      product_id: 1,
    },
    {
      productName: "Bff Fries",
      category: "FastFood",
      price: "30",
      image: "fries.png",
      product_id: 2,
    },
    {
      productName: "Fried Chicken",
      category: "FastFood",
      price: "30",
      image: "fried-chicken.png",
      product_id: 3,
    },
    {
      productName: "Salad 1",
      category: "Salad",
      price: "49",
      image: "salad.png",
      product_id: 4,
    },
    {
      productName: "Salad 2",
      category: "Salad",
      price: "49",
      image: "salad2.png",
      product_id: 5,
    },
    {
      productName: "Salad 3",
      category: "Salad",
      price: "49",
      image: "salad3.png",
      product_id: 6,
    },
    {
      productName: "Noodles 1",
      category: "Noodles",
      price: "59",
      image: "noodles.png",
      product_id: 7,
    },
    {
      productName: "Noodles 2",
      category: "Noodles",
      price: "59",
      image: "noodles2.png",
      product_id: 8,
    },
    {
      productName: "Noodles 3",
      category: "Noodles",
      price: "59",
      image: "noodles3.png",
      product_id: 9,
    },
    {
      productName: "Ice Tea 1",
      category: "Drinks",
      price: "69",
      image: "ice-tea1.png",
      product_id: 10,
    },
    {
      productName: "Ice Tea 2",
      category: "Drinks",
      price: "69",
      image: "ice-tea2.png",
      product_id: 11,
    },
    {
      productName: "Ice Tea 3",
      category: "Drinks",
      price: "69",
      image: "ice-tea3.png",
      product_id: 12,
    },
  ],
};

let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

for (let i of products.data) {
  // Create Card
  let card = document.createElement("div");
  // Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");

  // Image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  // Img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  // Container
  let container = document.createElement("div");
  container.classList.add("container");
  // Product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  // Price
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);

  // Add to Cart button
  let addToCartBtn = document.createElement("button");
  addToCartBtn.innerText = "Add to Cart";
  addToCartBtn.classList.add("add-to-cart-btn");
  addToCartBtn.dataset.id = i.product_id; // Set product_id as a data attribute
  addToCartBtn.addEventListener('click', () => {
    addToCart(i.product_id); // Call addToCart function with the product_id
  });
  container.appendChild(addToCartBtn);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    cart[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
}

const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
      let positionProduct = products.data.findIndex((value) => value.product_id == item.product_id);
      let info = products.data[positionProduct]; // Use products.data
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.dataset.id = item.product_id;

      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
          <div class="image">
              <img src="${info.image}">
          </div>
          <div class="name">
              ${info.productName}
          </div>
          <div class="totalPrice">$${info.price * item.quantity}</div>
          <div class="quantity">
              <span class="minus" onclick="changeQuantityCart(${item.product_id}, 'minus')"><</span>
              <span>${item.quantity}</span>
              <span class="plus" onclick="changeQuantityCart(${item.product_id}, 'plus')">></span>
          </div>
      `;
    })
  }
  iconCartSpan.innerText = totalQuantity;
}

const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        cart[positionItemInCart].quantity += 1;
        break;
      default:
        cart[positionItemInCart].quantity -= 1;
        if (cart[positionItemInCart].quantity <= 0) {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
}



//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};



