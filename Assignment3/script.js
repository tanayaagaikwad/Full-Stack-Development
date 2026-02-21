const products = [
    {
        id: 1,
        name: "Hydrating Face Wash",
        price: 299,
        skinType: "Dry",
        image: "https://via.placeholder.com/200"
    },
    {
        id: 2,
        name: "Oil Control Cleanser",
        price: 349,
        skinType: "Oily",
        image: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "Vitamin C Serum",
        price: 599,
        skinType: "Combination",
        image: "https://via.placeholder.com/200"
    },
    {
        id: 4,
        name: "Moisturizing Cream",
        price: 499,
        skinType: "Dry",
        image: "https://via.placeholder.com/200"
    },
    {
        id: 5,
        name: "Sunscreen SPF 50",
        price: 399,
        skinType: "Oily",
        image: "https://via.placeholder.com/200"
    }
];

let cartCount = 0;

function displayProducts(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card p-3 text-center shadow-sm">
                    <img src="${product.image}" class="card-img-top mb-3" alt="${product.name}">
                    <h5>${product.name}</h5>
                    <p>Skin Type: ${product.skinType}</p>
                    <p class="price">₹${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart()">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
}

function filterProducts(type) {
    if (type === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.skinType === type);
        displayProducts(filtered);
    }
}

// Initial load
displayProducts(products);
