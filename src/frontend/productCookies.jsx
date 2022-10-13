import cookie from 'react-cookies'
const onSetProduct = (product, description, price, category, stock) => {
    cookie.save('product', product, { path: '/'})
    cookie.save('description', description, { path: '/'})
    cookie.save('price', price, { path: '/'})
    cookie.save('category', category, { path: '/'})
    cookie.save('stock', stock, {path: '/'})
}

const setProductName = (product) => {
    cookie.save('product', product, {path: '/'})
}

const getProduct = ()=>{
    return cookie.load('product')
}

const getDescription = () => {
    return cookie.load('description')
}

const getPrice = () => {
    return cookie.load('price')
}

const getCategory = () => {
    return cookie.load('category')
}

const getStock = () => {
    return cookie.load('stock')
}

const clearCookies = () => {
    cookie.remove('product')
    cookie.remove('category')
    cookie.remove('price')
    cookie.remove('description')
    cookie.remove('stock')
}

let productCookies = {
    setProductName: setProductName,
    onSetProduct: onSetProduct, 
    clearCookies: clearCookies,
    getProduct: getProduct,
    getCategory: getCategory,
    getDescription: getDescription,
    getPrice: getPrice,
    getStock: getStock,
}

export default productCookies;