document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = button.parentElement;
            const productName = productElement.querySelector("p:nth-of-type(1)").innerText;  // 第一个 <p> 是商品名称
            const productPrice = parseFloat(productElement.querySelector("p:nth-of-type(2)").innerText.replace("RM", "")); // 第二个 <p> 是价格
            const productImage = productElement.querySelector("img").src;
            
            addToCart(productName, productPrice, productImage);
        });
    });
});

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车！");
}
