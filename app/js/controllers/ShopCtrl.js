app.controller('ShopCtrl',ShopCtrl);

function ShopCtrl(productService, products, $location){
	this.productService = productService;
	this.products = products;
	this.location = $location;
	this.showCategory = [false, false, false];
	this.limit = [3, 3, 3];
	this.categories = ["Essential Oils", "Cosmetics", "Healthy Environment"];
	// this.subcategory = '';
	// this.subcategory = ['Single Oils', 'Blends', 'Fragnant Oils', 'Carrier Oils', 'Massage Oils'];
	this.subcategoryEE = '';
	this.subcategoryC = '';
	this.subcategoryHE = '';
}

ShopCtrl.prototype.goToProduct = function(product) {
    this.location.path('product/'+product.productId);
}

ShopCtrl.prototype.showAll = function(category) {
	var filterType = category;
	console.log(filterType);
	for(index in this.categories) {
		if (this.categories[index] == filterType) {
			this.showCategory[index] = true;
			this.limit[index] = 200;
		} else {
			this.showCategory[index] = false;
			this.limit[index] = 3;
		}
	}
	console.log(this.subcategory);
	for(index in this.products) {
		console.log(this.products[index].description);
	}
}


// ShopCtrl.prototype.changeSubcategory = function() {
//    console.log('subcategory');
// }
