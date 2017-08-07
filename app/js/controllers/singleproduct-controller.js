let singleProductController = angular.module('myApp')
let serverAddress = 'http://localhost:3000';
singleProductController.controller('singleProductController', 
 ['$scope', '$http', '$stateParams','$rootScope', function($scope, $http, $stateParams, $rootScope){
        let id = $stateParams.id;
        $scope.quantities = [{value : 1 }, {value : 2},{value : 3},{value : 4},{value: 5}]
        $scope.selectedQuantity = $scope.quantities[0];        
        let $constructor = () => {
            $http.get(serverAddress + '/products/' +id)
                .then((response) => {
                    $scope.product = response.data
                    return $http.get(serverAddress + '/products/community/' + $scope.product.communityId)
                })
                .then((response) => {
                    $scope.relatedProducts = response.data
                })
                .catch((error) => {
                    console.log('error')
                    $scope.product = 'error occured while retrieving products'
                })
        }
        $constructor()
        $scope.addToCart = (product, quantity) => {
            console.log(quantity)
            for (var i = 0; i < quantity.value; i++){
                $rootScope.basket.push(product)
            }
            if($rootScope.unfinishedTranzactionUserId != $rootScope.userId) {
                $rootScope.unfinishedTranzactionUserId = $rootScope.userId;
                $http.put('/behaviour/unfinished')
                    .then((response)=>{
                    console.log(response)
                    })
                    .catch((error)=>{
                    console.log(error)
                    })
            }
        }
 }]
)