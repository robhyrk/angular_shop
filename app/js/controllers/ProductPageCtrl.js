app.controller('ProductPageCtrl',ProductPageCtrl);

function ProductPageCtrl(productService,$routeParams,$location){
	this.productService = productService;
	this.productId = $routeParams.productId;
	this.location = $location;
	this.orderQuantity = 1;
	this.cart = JSON.parse(localStorage.getItem('Cart'));
	if(this.cart == null){
		this.cart = [];
	}

	this.product = productService.getProduct(this.productId);
}

ProductPageCtrl.prototype.addToCart = function(product, orderQuantity){
	var duplicate = false;
	for (var i=0;i<this.cart.length;i++){
		console.log(product);
		if (this.cart[i].productId == product.productId){
			this.cart[i].orderQuantity += orderQuantity;
			duplicate = true;
		}
	};
	if (duplicate == false) {
		product.orderQuantity = orderQuantity;
		this.cart.push(product);
	}
	console.log(duplicate);
	localStorage.setItem('Cart', JSON.stringify(this.cart));
	console.log(this.cart);
	// this.location.path(/home/);
}

ProductPageCtrl.prototype.plus = function() {

	this.orderQuantity++;
	console.log(typeof(this.orderQuantity));
	console.log(this.orderQuantity);
}
ProductPageCtrl.prototype.minus = function() {

	console.log(this.orderQuantity);

	if (this.orderQuantity > 1) {
		this.orderQuantity--;	
	}
	console.log(this.orderQuantity);

}

function inCartAlert() {
    alert("Item added to cart");
}

