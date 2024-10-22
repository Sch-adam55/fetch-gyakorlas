import './style.css'


const apiUrl = 'https://retoolapi.dev/KpLmT7/data'; 

const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
};

const displayProducts = (products: any[]) => {
    const tableBody = document.getElementById('product-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const sortedProducts = products.sort((a, b) => a.rating - b.rating);

    sortedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.rating}</td>
            <td>${product.status}</td>
        `;
        tableBody.appendChild(row);
    });
};

const addProduct = async (product: { id: number; rating: number; status: string }) => {
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
};


window.onload = async () => {
    const products = await fetchProducts();
    displayProducts(products);
};

const form = document.getElementById('product-form') as HTMLFormElement;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idInput = document.getElementById('id') as HTMLInputElement;
    const ratingInput = document.getElementById('rating') as HTMLInputElement;
    const statusInput = document.getElementById('status') as HTMLInputElement;

    const newProduct = {
        id: Number(idInput.value),
        rating: Number(ratingInput.value),
        status: statusInput.value,
    };

    
    if (newProduct.rating < 1 || newProduct.rating > 5) {
        alert('Az értékelés 1 és 5 között kell legyen.');
        return;
    }

    await addProduct(newProduct);
    idInput.value = '';
    ratingInput.value = '1';
    statusInput.value = '';

    const products = await fetchProducts();
    displayProducts(products);
});

