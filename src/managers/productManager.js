const fs = require('fs');
const path = require('path');
const Product = require('../models/Product'); 

const productsFile = path.join(__dirname, '../data/products.json');


const getAllProduct = async ({ limit = 10, page = 1, sort = '', query = '' }) => {
    try {
        const queryObj = {};
        const options = {
            limit: parseInt(limit),
            skip: (page - 1) * limit,
            sort: {},
        };

   
        if (query) {
            if (query.category) {
                queryObj.category = query.category;
            }
            if (query.available !== undefined) {
                queryObj.available = query.available === 'true'; 
            }
        }

       
        if (sort === 'asc') {
            options.sort.price = 1;  
        } else if (sort === 'desc') {
            options.sort.price = -1; 
        }

      
        const products = await Product.find(queryObj, null, options);
        const totalProducts = await Product.countDocuments(queryObj);  
        const totalPages = Math.ceil(totalProducts / limit);  
        const prevPage = page > 1 ? page - 1 : null;  
        const nextPage = page < totalPages ? page + 1 : null;  

        return {
            products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: prevPage ? `/api/products?page=${prevPage}&limit=${limit}&sort=${sort}` : null,
            nextLink: nextPage ? `/api/products?page=${nextPage}&limit=${limit}&sort=${sort}` : null
        };
    } catch (error) {
        throw new Error(error.message);
    }
};


function readProducts() {
    if (!fs.existsSync(productsFile)) {
        return [];
    }
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
}

function writeProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}


function getAllProducts(limit) {
    const products = readProducts();
    return products.slice(0, limit);  
}

function getProductById(pid) {
    const products = readProducts();
    return products.find(p => p.id === pid); 
}

function addProduct(product) {
    const products = readProducts();
    const id = Date.now().toString();
    const newProduct = { id, ...product };
    products.push(newProduct);
    writeProducts(products);
    return newProduct;
}

function updateProduct(pid, updates) {
    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) return null;
    
    Object.assign(product, updates);
    writeProducts(products);
    return product;
}

function deleteProduct(pid) {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) return null;

    products.splice(productIndex, 1);
    writeProducts(products);
    return true;
}


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
};




