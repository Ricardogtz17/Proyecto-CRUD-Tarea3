let products = JSON.parse(localStorage.getItem('products')) || [];

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

function saveToStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
  productList.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>RD$ ${Number(product.price).toFixed(2)}</td>
      <td>${product.stock}</td>
      <td>
        <button class="btn-edit" onclick="editProduct(${product.id})">Editar</button>
        <button class="btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const stock = parseInt(document.getElementById('stock').value, 10);

  const newProduct = {
    id: Date.now(),
    name,
    price,
    stock
  };

  products.push(newProduct);
  saveToStorage();
  renderProducts();
  form.reset();
});

renderProducts();