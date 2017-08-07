let orderController = angular.module('myApp')
orderController.controller('orderController', ['$http', '$scope', '$rootScope', '$state', function($http, $scope, $rootScope, $state){
    let $contructor = () => {
        $scope.products = $rootScope.basket
        console.log($scope.products)
    }
    $contructor()
    $scope.removeFromCart = (product) => {
        $scope.products = $scope.products.filter(function(p){
            if (p != product) {
                return true;
            } else {
                product = null;
                return false;
            }
        })
        $rootScope.basket = $scope.product
        console.log(product)
        console.log($scope.products)
    }
    $scope.placeOrder = () => {
        var totalAmount = 0;
        var productIds = [];
        var numberOfProducts = 0;
        for (var prod of $scope.products) {
            totalAmount += prod.price;
            numberOfProducts += 1;
            productIds.push(prod.id)
        }
        $http.post(SERVER + '/orders', {totalAmount : totalAmount, productIds : productIds, numberOfProducts : numberOfProducts})
            .then((response) => {
                alert("Comandă finalizată cu succes!")
                $rootScope.emptyCart()
                $state.go('products')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}]) 