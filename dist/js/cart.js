/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const cartContainer = document.querySelector('.cart-container');\r\nconst productList = document.querySelector('.product-list');\r\nconst cartList = document.querySelector('.cart-list');\r\nconst cartTotalValue = document.getElementById('cart-total-value');\r\nconst cartCountInfo = document.getElementById('cart-count-info');\r\nlet cartItemID = 1;\r\n\r\neventListeners();\r\n\r\n// all event listeners\r\nfunction eventListeners(){\r\n    window.addEventListener('DOMContentLoaded', () => {\r\n        loadJSON();\r\n        loadCart();\r\n    });\r\n   \r\n\r\n document.getElementById('cart-btn').addEventListener('click', () =>\r\n    {\r\n        cartContainer.classList.toggle('show-cart-container')\r\n    })\r\n\r\n    // add to cart\r\n    productList.addEventListener('click', purchaseProduct);\r\n\r\n    // delete from cart\r\n    cartList.addEventListener('click', deleteProduct);\r\n}\r\n\r\n// update cart info\r\nfunction updateCartInfo(){\r\n    let cartInfo = findCartInfo();\r\n    cartCountInfo.textContent = cartInfo.productCount;\r\n    cartTotalValue.textContent = cartInfo.total;\r\n}\r\n\r\n// load product items content form JSON file\r\nfunction loadJSON(){\r\n    fetch('https://fakestoreapi.com/products')\r\n    .then(response => response.json())\r\n    .then(data =>{\r\n        let html = '';\r\n        data.forEach(product => {\r\n            html += `\r\n                <div class = \"product-item\">\r\n                    <div class = \"product-img\">\r\n                        <img src = \"${product.image}\" alt = \"product image\">\r\n                        \r\n                    </div>\r\n                    <div class = \"product-content\">\r\n                        <h3 class = \"product-name\">${product.title}</h3>\r\n                        <span class = \"product-category\">${product.description}</span>\r\n                        <p class = \"product-price\">$${product.price}</p>\r\n                        <button type = \"button\" class = \"add-to-cart-btn\">\r\n                            <i class = \"fas fa-shopping-cart\"></i>Add To Cart\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            `;\r\n        });\r\n        productList.innerHTML = html;\r\n    })\r\n    .catch(error => {\r\n        alert(`User live server or local server`);\r\n        //URL scheme must be \"http\" or \"https\" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.\r\n    })\r\n}\r\n\r\n\r\n// purchase product\r\nfunction purchaseProduct(e){\r\n    if(e.target.classList.contains('add-to-cart-btn')){\r\n        let product = e.target.parentElement.parentElement;\r\n        getProductInfo(product);\r\n    }\r\n}\r\n\r\n// get product info after add to cart button click\r\nfunction getProductInfo(product){\r\n    let productInfo = {\r\n        id: cartItemID,\r\n        imgSrc: product.querySelector('.product-img img').src,\r\n        name: product.querySelector('.product-name').textContent,\r\n        category: product.querySelector('.product-category').textContent,\r\n        price: product.querySelector('.product-price').textContent\r\n    }\r\n    cartItemID++;\r\n    addToCartList(productInfo);\r\n    saveProductInStorage(productInfo);\r\n}\r\n\r\n// add the selected product to the cart list\r\nfunction addToCartList(product){\r\n    const cartItem = document.createElement('div');\r\n    cartItem.classList.add('cart-item');\r\n    cartItem.setAttribute('data-id', `${product.id}`);\r\n    cartItem.innerHTML = `\r\n        <img src = \"${product.imgSrc}\" alt = \"product image\">\r\n        <div class = \"cart-item-info\">\r\n            <h3 class = \"cart-item-name\">${product.name}</h3>\r\n            <span class = \"cart-item-category\">${product.category}</span>\r\n            <span class = \"cart-item-price\">${product.price}</span>\r\n        </div>\r\n        <button type = \"button\" class = \"cart-item-del-btn\">\r\n            <i class = \"fas fa-times\"></i>\r\n        </button>\r\n    `;\r\n    cartList.appendChild(cartItem);\r\n}\r\n\r\n// save the product in the local storage\r\nfunction saveProductInStorage(item){\r\n    let products = getProductFromStorage();\r\n    products.push(item);\r\n    localStorage.setItem('products', JSON.stringify(products));\r\n    updateCartInfo();\r\n}\r\n\r\n// get all the products info if there is any in the local storage\r\nfunction getProductFromStorage(){\r\n    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];\r\n    // returns empty array if there isn't any product info\r\n}\r\n\r\n// load carts product\r\nfunction loadCart(){\r\n    let products = getProductFromStorage();\r\n    if(products.length < 1){\r\n        cartItemID = 1; // if there is no any product in the local storage\r\n    } else {\r\n        cartItemID = products[products.length - 1].id;\r\n        cartItemID++;\r\n        // else get the id of the last product and increase it by 1\r\n    }\r\n    products.forEach(product => addToCartList(product));\r\n\r\n    // calculate and update UI of cart info \r\n    updateCartInfo();\r\n}\r\n\r\n// calculate total price of the cart and other info\r\nfunction findCartInfo(){\r\n    let products = getProductFromStorage();\r\n    let total = products.reduce((acc, product) => {\r\n        let price = parseFloat(product.price.substr(1)); // removing dollar sign\r\n        return acc += price;\r\n    }, 0); // adding all the prices\r\n\r\n    return{\r\n        total: total.toFixed(2),\r\n        productCount: products.length\r\n    }\r\n}\r\n\r\n// delete product from cart list and local storage\r\nfunction deleteProduct(e){\r\n    let cartItem;\r\n    if(e.target.tagName === \"BUTTON\"){\r\n        cartItem = e.target.parentElement;\r\n        cartItem.remove(); // this removes from the DOM only\r\n    } else if(e.target.tagName === \"I\"){\r\n        cartItem = e.target.parentElement.parentElement;\r\n        cartItem.remove(); // this removes from the DOM only\r\n    }\r\n\r\n    let products = getProductFromStorage();\r\n    let updatedProducts = products.filter(product => {\r\n        return product.id !== parseInt(cartItem.dataset.id);\r\n    });\r\n    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion\r\n    updateCartInfo();\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// const Cart = require(\"./services/Cart\");\r\n// const app = require(\"./app\");\r\n\r\n// Cart.list().then(res =>\r\n// {\r\n    \r\n//     let data = res.data;\r\n//     app.items = data\r\n//     app.render()\r\n   \r\n \r\n// })\r\n// window.remove = function (id)\r\n// {\r\n//     console.log(\"eman\")\r\n//     Cart.remove(id).then(res =>\r\n//     {\r\n//         let index;\r\n//         app.items.forEach((item,index)=>\r\n//         {\r\n//             if (item.id == id)\r\n//             {\r\n//                 app.items.splice(index, 1)\r\n//                 return; \r\n//             }\r\n//         })\r\n//         app.render()\r\n//         })\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;