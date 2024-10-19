const axios = require('axios');
const express = require('express');
const router = express.Router();

let products = [];
let myProducts = [];

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products = response.data.map(product => ({
            ...product,
            bought: false
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// GET the available products
router.get('/products', (req, res) => {
    res.json(products);
})

// GET all products from the list
router.get('/items', (req, res) => {
    res.json(myProducts);
});

// POST add a new product to the list
router.post('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);
    if (product) {
        const productToAdd = { ...product, bought: false };
        myProducts.push(productToAdd);
        res.status(201).send('product added successfully.');
    } else {
        res.status(404).send('Product not found');
    }
})

// PUT buy a product from de list
router.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    myProducts.forEach(product => {
        if(product.id === id) {
            product.bought = true;
            bought = true;
        }
    });

    if (bought) {
        res.status(200).send('product bought successfully.');
    } else {
        res.status(404).send('Product not found');
    }

})

// DELETE a product from the list
router.delete('/items/:id/:bought', (req, res) => {
    const id = parseInt(req.params.id);
    const bought = req.params.bought === 'true';
    const intialLength = myProducts.length;

    myProducts = myProducts.filter(product => !(product.bought === bought && product.id === id));

    if (intialLength > myProducts.length) {
        res.status(200).send('Product deleted successfully.');
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = {
    router, fetchProducts
}