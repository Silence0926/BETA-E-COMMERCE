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
                <p>${item.name} - RM${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">❌ 移除</button>
            `;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
    }
    
    document.getElementById("total-price").innerText = `总价: RM${totalPrice.toFixed(2)}`;
}

// 从购物车移除商品
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// 清空购物车
function clearCart() {
    localStorage.removeItem("cart");
    updateCartUI();
}

// 页面加载时更新购物车
document.addEventListener("DOMContentLoaded", updateCartUI);
