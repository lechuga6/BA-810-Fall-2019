let SalesOrderItem = require('./salesOrderItem');
let SalesOrder = require('./salesOrder');

let item1 = new SalesOrderItem('Widget', 2.5, 10);
let item2 = new SalesOrderItem('Gidget', 1, 20);
let items = [item1, item2];

let order = new SalesOrder('Anthony', .10, items);


console.log(order.subtotal());

console.log(order.total());

