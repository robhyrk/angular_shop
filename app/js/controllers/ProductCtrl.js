app.controller('ProductCtrl',ProductCtrl);

function ProductCtrl($routeParams,productService,api){
	this.productService = productService;
	this.api = api;
	this.products = JSON.parse(localStorage.getItem('products'));
}
ProductCtrl.prototype.addProduct = function(name,description,image,price,category,quantity,status){
	//create the api request that makes the product on the backend
	//as part of your response you need to add it to your current
	//product array using the product service
	var request_body = {
		name:name,
		image:image,
		description:description,
		price:price,
		category:category,
		quantity:quantity,
		status:status
	}
	console.log(request_body);
	console.log(this.productService.getProducts());

	this.productService.addProduct(request_body);

}
ProductCtrl.prototype.findEditProduct = function(productId){
	this.editProduct = this.productService.getProduct(productId);
	self = this;
	this.index = _.findIndex(this.products, function(product){
		return product.productId == self.editProduct.productId;
	});
}
ProductCtrl.prototype.saveProduct = function(name, description, image, price, category, quantity, status){
	var saveProduct = {
		name:name,
		image:image,
		description:description,
		price:price,
		category:category,
		quantity:quantity,
		status:status,
		productId:this.editProduct.productId
	}
	var sendProduct = saveProduct;
	delete sendProduct.productId;
	console.log(sendProduct);

	this.products[this.index] = saveProduct;
	console.log(this.products);
	//Update localStorage
	localStorage.setItem('products', JSON.stringify(this.products));
	//Update server product
	return this.api.request('/editproduct/'+self.editProduct.productId,sendProduct,'POST')
			.then(function(response){
				console.log(response);
			});
}