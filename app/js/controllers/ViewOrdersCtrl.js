app.controller('ViewOrdersCtrl',ViewOrdersCtrl);

function ViewOrdersCtrl(api,orders){
	var self = this;
	this.api = api;
	this.orders = orders.data.orders;
	// console.log(typeof(this.orders));
	// console.log(this.orders);
	// console.log(typeof(this.orders[0].cart));
	console.log(orders.data.orders[0]);
	console.log(JSON.parse(orders.data.orders[0].cart));

	for (var i=0;i<orders.data.orders.length;i++) {
		this.orders[i].cart = JSON.parse(orders.data.orders[i].cart);
	}
	console.log(this.orders);

}