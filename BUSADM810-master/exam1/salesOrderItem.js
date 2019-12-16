function SalesOrderItem(product, price, quantity) {
    let item = {};
    item.product = product;
    item.quantity = quantity;
    item.price = price;

    item.value = function() {
        return item.price * item.quantity;
    }

    return item;
}

module.exports = SalesOrderItem; 