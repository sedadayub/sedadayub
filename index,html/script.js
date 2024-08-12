const accessCode = '1234';  // Your secret code

document.addEventListener('DOMContentLoaded', () => {
    loadGoods();
    loadSellGoods();
    calculateTotalPrice();

    document.getElementById('goods-form').addEventListener('submit', addGoods);
});

function checkAccess() {
    const enteredCode = document.getElementById('access-code').value;
    if (enteredCode === accessCode) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('admin-page').style.display = 'block';
    } else {
        alert('Access denied! Incorrect code.');
    }
}

function addGoods(e) {
    e.preventDefault();

    const name = document.getElementById('good-name').value;
    const price = document.getElementById('good-price').value;
    const limit = document.getElementById('good-limit').value;

    const goods = getGoods();
    goods.push({ id: Date.now(), name, price, limit });
    localStorage.setItem('goods', JSON.stringify(goods));

    document.getElementById('goods-form').reset();
    loadGoods();
    loadSellGoods();
    calculateTotalPrice();
}

function loadGoods() {
    const goods = getGoods();
    const goodsList = document.getElementById('goods-list');
    goodsList.innerHTML = '';

    goods.forEach(good => {
        const li = document.createElement('li');
        li.innerHTML = `
            Name: ${good.name}, Price: ${good.price}, Limit: ${good.limit}
            <div>
                <button class="edit" onclick="editGood(${good.id})">Edit</button>
                <button onclick="deleteGood(${good.id})">Delete</button>
            </div>
        `;
        goodsList.appendChild(li);
    });
}

function loadSellGoods() {
    const goods = getGoods();
    const sellGoodsList = document.getElementById('sell-goods-list');
    sellGoodsList.innerHTML = '';

    goods.forEach(good => {
        const li = document.createElement('li');
        li.textContent = `Name: ${good.name}, Price: ${good.price}`;
        sellGoodsList.appendChild(li);
    });
}

function calculateTotalPrice() {
    const goods = getGoods();
    let totalPrice = 0;

    goods.forEach(good => {
        totalPrice += parseFloat(good.price);
    });

    document.getElementById('total-goods-price').textContent = totalPrice.toFixed(2);
}

function getGoods() {
    return localStorage.getItem('goods') ? JSON.parse(localStorage.getItem('goods')) : [];
}

function deleteGood(id) {
    const goods = getGoods();
    const filteredGoods = goods.filter(good => good.id !== id);
    localStorage.setItem('goods', JSON.stringify(filteredGoods));

    loadGoods();
    loadSellGoods();
    calculateTotalPrice();
}

function editGood(id) {
    const goods = getGoods();
    const good = goods.find(g => g.id === id);

    document.getElementById('good-name').value = good.name;
    document.getElementById('good-price').value = good.price;
    document.getElementById('good-limit').value = good.limit;

    deleteGood(id);
}