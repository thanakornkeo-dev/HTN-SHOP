// ==========================================
// ข้อมูลสินค้า
// ==========================================
const products = [

    {
        id: 1,
        name: "HTN Jersey",
        category: "fashion",
        categoryName: "เสื้อผ้า",
        price: 299,
        image: "htn jersey.jpg",
        description: "เสื้อJersey ดีไซน์สุดเฟี้ยว"
    },

    {
        id: 2,
        name: "HTN T-shirt",
        category: "fashion",
        categoryName: "เสื้อผ้า",
        price: 199,
        image: "htn t-shirt.jpg",
        description: "T-shirt ดีไซน์ทันสมัย"
    },

    {
        id: 3,
        name: "HTN Slides",
        category: "shoes",
        categoryName: "รองเท้า",
        price: 399,
        image: "htn slides.jpg",
        description: "รองเท้าสำหรับใส่ในชีวิตประจำวัน"
    },

    {
        id: 4,
        name: "HTN Running Shoes",
        category: "shoes",
        categoryName: "รองเท้า",
        price: 1290,
        image: "htn running shoes.jpg",
        description: "รองเท้ากีฬาน้ำหนักเบา"
    },

    {
        id: 5,
        name: "HTN Shoulder Bag",
        category: "bag",
        categoryName: "กระเป๋า",
        price: 499,
        image: "htn shoulder bag.jpg",
        description: "กระเป๋าสะพายสำหรับทุกวัน"
    },

    {
        id: 6,
        name: "HTN Watch",
        category: "accessory",
        categoryName: "อุปกรณ์เสริม",
        price: 1990,
        image: "htn-watch.jpg",
        description: "HTN Watch ดีไซน์เรียบหรู"
    },

    {
        id: 7,
        name: "HTN Shorts",
        category: "fashion",
        categoryName: "เสื้อผ้า",
        price: 399,
        image: "htn-shorts.jpg",
        description: "กางเกงขาสั้น แฟชั่นสำหรับทุกโอกาส"
    }

];


// ==========================================
// ตัวแปร
// ==========================================

let cart = [];


// ==========================================
// แสดงสินค้า
// ==========================================

const productGrid =
    document.getElementById("productGrid");


function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
            <p style="
                grid-column: 1 / -1;
                text-align:center;
                padding:50px;
            ">
                😢 ไม่พบสินค้าที่ค้นหา
            </p>
        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ฿${product.price.toLocaleString()}
                    </span>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });

}


// แสดงสินค้าครั้งแรก

displayProducts(products);


// ==========================================
// เพิ่มสินค้า
// ==========================================

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// ==========================================
// อัปเดตตะกร้า
// ==========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "฿" + totalPrice.toLocaleString();


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                🛒 ยังไม่มีสินค้าในตะกร้า
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <span class="cart-price">
                    ฿${item.price.toLocaleString()}
                </span>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            1
                        )"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(
                            ${item.id}
                        )"
                    >
                        🗑️
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(div);

    });

}


// ==========================================
// เพิ่ม / ลดจำนวน
// ==========================================

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item =>
                item.id !== id
            );

    }


    updateCart();

}


// ==========================================
// ลบสินค้า
// ==========================================

function removeFromCart(id) {

    cart =
        cart.filter(item =>
            item.id !== id
        );

    updateCart();

}


// ==========================================
// เปิดตะกร้า
// ==========================================

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");


function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


cartOverlay.addEventListener(
    "click",
    closeCart
);


// ==========================================
// ค้นหาสินค้า
// ==========================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const keyword =
                this.value.toLowerCase();


            const result =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(keyword)

                );


            displayProducts(result);

        }
    );


// ==========================================
// หมวดหมู่
// ==========================================

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                this.classList.add("active");


                const category =
                    this.dataset.category;


                if (category === "all") {

                    displayProducts(products);

                } else {

                    const result =
                        products.filter(product =>
                            product.category === category
                        );

                    displayProducts(result);

                }

            }
        );

    });


// ==========================================
// CHECKOUT
// ==========================================

const checkoutModal =
    document.getElementById(
        "checkoutModal"
    );


document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "กรุณาเพิ่มสินค้าลงตะกร้าก่อน"
                );

                return;
            }


            let total = 0;


            cart.forEach(item => {

                total +=
                    item.price *
                    item.quantity;

            });


            document
                .getElementById(
                    "checkoutTotal"
                )
                .textContent =
                "฿" +
                total.toLocaleString();


            checkoutModal.classList.add(
                "active"
            );

        }
    );


document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        function () {

            checkoutModal.classList.remove(
                "active"
            );

        }
    );


// ==========================================
// ยืนยันคำสั่งซื้อ
// ==========================================

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value;


            alert(
                "ขอบคุณคุณ " +
                name +
                " สำหรับการสั่งซื้อครับ 🎉"
            );


            cart = [];

            updateCart();

            checkoutModal.classList.remove(
                "active"
            );

            closeCart();

            this.reset();

        }
    );


// ==========================================
// DARK MODE
// ==========================================

document
    .getElementById("darkModeBtn")
    .addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                this.textContent = "☀️";

            } else {

                this.textContent = "🌙";

            }

        }
    );
