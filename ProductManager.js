import crypto from 'crypto';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products.json'
    }

    addProduct(producto) {
        const camposRequeridos = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
        const tieneTodosLosCampos = camposRequeridos.every(campo => producto.hasOwnProperty(campo));

        if (!tieneTodosLosCampos) {
            console.log("ERROR - Todos los campos son obligatorios.") 
        } else{

            const existe = this.products.some(prod => prod.code === producto.code);

            if (existe) {
                return "Este Producto ya existe";
            } else {
                producto.id = crypto.randomBytes(16).toString('hex');
                this.products.push(producto);
            }
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.log("Not Found");
            return null;
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(prod => prod.id === id);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(prod => prod.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            console.log("Producto no encontrado");
        }
    }
}

const manager = new ProductManager();
const producto1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
};

manager.addProduct(producto1);
const productosDespuesDeAgregar = manager.getProducts();
console.log(productosDespuesDeAgregar);


const camposActualizados = {
    price: 100,
    stock: 10
}
manager.updateProduct(producto1.id, camposActualizados);
console.log(manager.getProductById(producto1.id));


manager.deleteProduct(producto1.id);
console.log(manager.getProducts());


