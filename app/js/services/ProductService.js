app.service('productService',ProductService);

function ProductService(api){
	//services
	this.api = api;
	this.cart = JSON.parse(localStorage.getItem('Cart'));
	this.sendCart = JSON.parse(localStorage.getItem('sendCart'));
	this.products = localStorage.getItem('products');
}


ProductService.prototype.retrieveProducts = function(){
	var self = this;
	return this.api.request('/retrieve_products/team2',{},'GET');
}

ProductService.prototype.setProducts = function(products){
	//store the products in local storage so you don't have to make an API
	//request each time you are on this page.
	localStorage.setItem('products',JSON.stringify(products));
	this.products = products;
}

ProductService.prototype.getProducts = function(){
	var self = this;
	//if there are no products stored in localStorage
	//grab them from the API,store them in localStorage
	//and pass back the products as a promise
	if(this.products == null){
		return this.retrieveProducts().then(function(response){
				self.setProducts(response.data.products);
				return response.data.products;
		   });
	}
	else{
		if (typeof(self.products) == "object"){
			return self.products;
		} else {
		return JSON.parse(self.products);
		}
	}
}
ProductService.prototype.addProduct = function(product){
 	//TODO: add the new product to the current product list and
 	//return the updated list
	return this.api.request('/newproduct',product,'POST')
			.then(function(response){
				var entry = response.data;
				console.log(entry);
				var existingEntries = [];

				existingEntries = JSON.parse(localStorage.getItem("products"));
				console.log(existingEntries);
	 			existingEntries.push(entry);
	 			
	 			localStorage.setItem('products', JSON.stringify(existingEntries));
			});
}
ProductService.prototype.getProduct = function(productId){
	if (typeof(this.products) !== "object"){
		this.products = JSON.parse(this.products);
	}
	return this.products.filter(function(product) {return product.productId == productId})[0];
}
ProductService.prototype.verifyCart = function(){
	var self = this;
	//Check if this.products is object or string
	if (typeof(this.products) !== "object"){
		this.products = JSON.parse(this.products);
	}
	//Find index of cart product in products array
	for (var i = 0; i < this.sendCart.cart.length; i++){
		self.index = _.findIndex(self.products, function(product){
			return product.productId == self.sendCart.cart[i].productId;
		});
		//Update product quantity
		self.products[self.index].quantity -= self.sendCart.cart[i].orderQuantity;
		//Edit product on server
		this.editProduct = angular.copy(self.products[self.index]);
		delete this.editProduct.productId;
		this.api.request('/editproduct/'+self.products[self.index].productId,this.editProduct,'POST')
			.then(function(response){
				console.log(response);
			});
	}
	//Update product quantity in localStorage
	localStorage.setItem('products', JSON.stringify(this.products));
	localStorage.removeItem('Cart');
	localStorage.removeItem('sendCart');
    alert("Thanks for you order! Your items are on their way");

}