function SalesOrder(customer, salesTaxRate, salesOrderItems) {
    let salesOrder = [];
    salesOrder.salesOrderItems = salesOrderItems ? salesOrderItems : [];
    salesOrder.customer = customer;
    salesOrder.salesTaxRate = salesTaxRate;

    salesOrder.subtotal = function() {
        let subTotal = 0;
        salesOrder.salesOrderItems.forEach(item => {
            subTotal += item.value();
        });

        return subTotal;
    }

    salesOrder.total = function() {
        return salesOrder.subtotal() * salesOrder.salesTaxRate + salesOrder.subtotal();
    }

    return salesOrder;
}

module.exports = SalesOrder; 