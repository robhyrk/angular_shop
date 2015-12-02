app.controller('ConfirmationCtrl',ConfirmationCtrl);

function ConfirmationCtrl(api,productService){
	this.ProductService = productService;
	this.api = api;
	this.sendCart = {};
	this.sendCart = JSON.parse(localStorage.getItem('sendCart'));
	this.products = JSON.parse(localStorage.getItem('products'));

}

ConfirmationCtrl.prototype.sendOrder = function(){
	this.ProductService.verifyCart();
	this.api.request('/record_order',this.sendCart,'POST')
		.then(function(response){
			console.log(response);
		});
}

function confirmation() {
    alert("Thanks for you order! Your items are on their way");

		this.ProductService.updateLocalStorage();
}