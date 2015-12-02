app.controller('MainCtrl',MainCtrl);

function MainCtrl(productService, products, $location){
	this.productService = productService;
	this.products = products;
	this.location = $location;
}

MainCtrl.prototype.goToProduct = function(product){
	this.location.path('product/'+product.productId);
}