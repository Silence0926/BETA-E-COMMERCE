// 读取购物车数据并更新 UI
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>购物车为空</p>";
    } else {
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <p>${item.name} - RM${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button onclick="updateQuantity(${index}, -1)">-</button> 
                    ${item.quantity} 
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </p>
                <button onclick="removeFromCart(${index})">❌ 移除</button>
            `;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
    }
    
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

// 添加商品到购物车
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车！");
}

// 更新商品数量
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// 从购物车移除商品
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// 页面加载时更新购物车
document.addEventListener("DOMContentLoaded", updateCartUI);
