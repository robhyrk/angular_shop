var app = angular.module('ShopApp',['ngRoute','ngMessages']);

app.config(function($routeProvider,$httpProvider){
	$routeProvider.when('/',{
		templateUrl:'templates/home.html',
		controller:'MainCtrl as Ctrl',
		resolve:{
			products:function(productService){
					return productService.getProducts();
				}
			}
	})

	.when('/shop',{
		templateUrl:'templates/shop.html',
		controller:'ShopCtrl as Ctrl',
		resolve:{
			products:function(productService){
					return productService.getProducts();
				}
			}
	})

	.when('/product/:productId',{
		templateUrl:'templates/product.html',
		controller:'ProductPageCtrl as Ctrl'

	})
	.when('/login',{
		templateUrl:'templates/login.html',
		controller:'AuthCtrl as Ctrl'
	})
	.when('/admin/',{
		templateUrl:'templates/admin.html',
		controller:'AdminCtrl as Ctrl',
		resolve:{
			path:function($location){
					if(localStorage.getItem('authToken') == null){
						$location.path('/login');
					}
				},
			products:function(productService){
					return productService.getProducts();
				}
			}
	})
	.when('/add_product',{
		templateUrl:'templates/add_product.html',
		controller:'ProductCtrl as Ctrl'
	})
	.when('/edit_product',{
		templateUrl:'templates/edit_product.html',
		controller:'ProductCtrl as Ctrl'
	})
	.when('/view_orders',{
		templateUrl:'templates/view_orders.html',
		controller:'ViewOrdersCtrl as Ctrl',
		resolve:{
			orders: function(api){
				return api.request('/retrieve_orders/team2',{},'GET');
			}
		}
	})
	.when('/checkout',{
		templateUrl:'templates/checkout.html',
		controller:'CheckoutCtrl as Ctrl'
	})
	.when('/confirmation',{
		templateUrl:'templates/confirmation.html',
		controller:'CheckoutCtrl as Ctrl'
	})
	.otherwise({
		redirectTo:'/'
	});

	$httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if (localStorage.authToken) {
          config.headers.Authorization = localStorage.authToken;
        }
        return config;
      }
    };
  });
});