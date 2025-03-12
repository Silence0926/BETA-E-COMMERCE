document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name} - RM${item.price.toFixed(2)}</span>
                <button class="decrease" data-index="${index}">-</button>
                <span>Qty: ${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        totalPriceElement.innerText = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", function (event) {
        const index = event.target.dataset.index;
        if (event.target.classList.contains("remove-item")) {
            cart.splice(index, 1);
        } else if (event.target.classList.contains("increase")) {
            cart[index].quantity += 1;
        } else if (event.target.classList.contains("decrease") && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        updateCartDisplay();
    });

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("购物车为空！");
            return;
        }
        alert("结账成功！");
        localStorage.removeItem("cart");
        updateCartDisplay();
    });

    updateCartDisplay();
});
