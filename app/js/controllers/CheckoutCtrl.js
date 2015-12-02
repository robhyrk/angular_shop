app.controller('CheckoutCtrl', CheckoutCtrl);

function CheckoutCtrl($location,$route,productService,api) {
    this.api = api;
    this.ProductService = productService;
    this.route = $route;
    this.location = $location
    this.Cart = JSON.parse(localStorage.getItem('Cart'));
    this.products = localStorage.getItem('products')
    console.log(this.Cart);
    this.subtotal = 0;
    	for (i = 0; i < this.Cart.length; i++) {
        this.subtotal += this.Cart[i].price * this.Cart[i].orderQuantity;
        console.log(this.Cart[i].price);
    }
    this.tax = this.subtotal * 0.13;
    this.total = this.subtotal + this.tax;
    this.sendCart = {};
    this.sendCart.cart = JSON.parse(localStorage.getItem('Cart'));
    this.sendCart.total = this.subtotal;
    this.sendCart.tax = this.tax;
    this.sendCart.final_total = this.total;
    console.log(this.sendCart);
    localStorage.setItem('sendCart', JSON.stringify(this.sendCart));

}
CheckoutCtrl.prototype.gotoConfirmation = function() {
    this.location.path(/confirmation/);
}
CheckoutCtrl.prototype.sendOrder = function() {
    this.ProductService.verifyCart();
    this.api.request('/record_order', this.sendCart, 'POST')
        .then(function(response) {
            console.log(response);
        });
}
CheckoutCtrl.prototype.removeProduct = function(product) {
    var removeId = product.productId;
    console.log(removeId);
    console.log(localStorage.getItem('Cart'));
    for (index in this.Cart) {
        if (this.Cart[index].productId == removeId) {
            this.Cart.splice(index, 1);
            var newCart = this.Cart;
        }
    }
    console.log(newCart);
    localStorage.setItem('Cart', JSON.stringify(newCart));
}
CheckoutCtrl.prototype.updateCart = function(productId, quantity) {
    console.log(productId, quantity);
    for (index in this.Cart) {
        if (this.Cart[index].productId == productId) {
            this.Cart[index].orderQuantity = quantity;
            var newCart = this.Cart;
        }

    }
    localStorage.setItem('Cart', JSON.stringify(newCart));
    // this.getSubtotal();
    this.route.reload();
}

function confirmation() {
    alert("Thanks for you order! Your items are on their way");

    this.ProductService.updateLocalStorage();
}
