// ✅ 读取购物车数据并更新 UI
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsDiv = document.getElementById("cart-items");
    let totalPrice = 0;
    let gameContainer = document.getElementById("game-container");
    
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>购物车为空</p>";
        gameContainer.style.display = "block"; // 显示小游戏
        startGame();
    } else {
        gameContainer.style.display = "none"; // 隐藏小游戏
        
        cart.forEach((item, index) => {
            let itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img"> 
                <p>${item.name} - RM${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button onclick="updateQuantity(${index}, -1)">-</button> 
                    ${item.quantity} 
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </p>
                <button onclick="removeItem(${index})">REMOVE</button>
            `;

            cartItemsDiv.appendChild(itemDiv);
            totalPrice += item.price * item.quantity;
        });
    }
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

// ✅ 更新商品数量
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index]) return;

    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ✅ 从购物车移除商品
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ✅ 结算按钮逻辑
document.getElementById("checkout-btn").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        localStorage.setItem("total-price", document.getElementById("total-price").innerText);
        window.location.href = "checkout.html";
    }
});

// ✅ 确保购物车 UI 在页面加载时更新
window.onload = loadCart;
