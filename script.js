document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = button.parentElement;
            const productName = productElement.querySelector("p").innerText;
            const productPrice = parseFloat(productElement.querySelectorAll("p")[1].innerText.replace("RM", ""));
            const productImage = productElement.querySelector("img").src; // ✅ 获取图片路径

            addToCart(productName, productPrice, productImage);
        });
    });
});

// ✅ **修改 addToCart，让它存储商品图片**
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 }); // ✅ 添加图片信息
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车！");
}
