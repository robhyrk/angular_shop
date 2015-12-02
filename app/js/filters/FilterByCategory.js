function filterByCategory() {
	return function(category) {
		var filterType = category;
		return filterType;
	}
}

angular.module('ShopApp').filter('filterByCategory', filterByCategory);