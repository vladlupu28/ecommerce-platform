 'use strict';
let manageproductsController = angular.module('myApp');
manageproductsController.controller('manageproductsController', ['$http', '$rootScope', '$state', '$scope', function($http, $rootScope, $state, $scope) {
    let $constructor = () => {
        $scope.selectedCommunity = $rootScope.communities[0];      
    }
    $constructor()
    $scope.addProducts = (productName, productDescription, productTag, productSeries, productPrice, selectedCommunity) => {
        $http.post('/products', {name : productName, series : productSeries, tag : productTag, price : productPrice,
             description : productDescription, communityId : selectedCommunity.communityId})
             .then((response) => {
                 console.log(response)
                 alert("Produs adăugat cu succes")
             })
             .catch((error) => {
                 console.log(error)
             })
    }

    $scope.deleteProduct = (productIdOrSeries) => {
        $http.delete('/products/' + productIdOrSeries)
            .then((response) => {
                console.log(response)
                alert("Produs șters")
            })
            .catch((error) => {
                console.log(error)
            })
    }
}]
)