function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsDiv = document.getElementById("cart-items");
    let gameContainer = document.getElementById("game-container");
    let totalPrice = 0;

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>购物车为空</p>";
        gameContainer.style.display = "block"; // ✅ 显示游戏
        startGame(); // ✅ 运行游戏
    } else {
        gameContainer.style.display = "none"; // ✅ 隐藏游戏
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
