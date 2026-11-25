let products = JSON.parse(localStorage.getItem('products')) || [];

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const productIdInput = document.getElementById('product-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

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

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  productIdInput.value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('stock').value = product.stock;

  submitBtn.textContent = 'Actualizar Producto';
  cancelBtn.classList.remove('hidden');
}

function resetForm() {
  form.reset();
  productIdInput.value = '';
  submitBtn.textContent = 'Guardar Producto';
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = productIdInput.value;
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const stock = parseInt(document.getElementById('stock').value, 10);

  if (id) {
    const index = products.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      products[index] = { id: Number(id), name, price, stock };
    }
  } else {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      stock
    };
    products.push(newProduct);
  }

  saveToStorage();
  renderProducts();
  resetForm();
});

renderProducts();