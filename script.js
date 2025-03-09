document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = button.parentElement;
            const productName = productElement.querySelector("p").innerText;
            const productPrice = parseFloat(productElement.querySelectorAll("p")[1].innerText.replace("RM", ""));

            addToCart(productName, productPrice);
        });
    });
});

// 添加商品到购物车
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车！");
}
