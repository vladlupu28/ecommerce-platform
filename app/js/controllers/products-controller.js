let ctrl = angular.module('myApp')
const SERVER = 'http://localhost:3000'
ctrl.controller('productsController', 
    ['$scope', '$http', '$state', '$rootScope', 'localStorageService', '$interval', function($scope, $http, $state, $rootScope, localStorageService, $interval){
        let $constructor = () => {
            $http.get(SERVER + '/prod')
                .then((response) => {
                    var communityProducts = []
                    for(var prod of response.data) {
                        if ($rootScope.activeSubscriptionsIds.indexOf(prod.communityId) > -1) {
                            communityProducts.push(prod)
                        }
                    }
                    $scope.products = communityProducts
                })
                .catch((error) => {
                    console.log('error')
                    $scope.products = 'error occured while retrieving products'
                })
                
        }
        $constructor()

        $scope.getCategory = (communityId) => {
            for(com of $rootScope.communities){
                if (com.communityId == communityId) {
                    return com.name;
                }
            }
        
        }
        $scope.addToCart = (product) => {
            console.log($rootScope.basket)
            $rootScope.basket.push(product)
            console.log($rootScope.basket)
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
        if(localStorageService.get('products')) {
            var count = localStorageService.get('products');
        } else {
            var count = 0;
        }
        var promise =  $interval(function(){
            count +=1;
            localStorageService.set('products', count + 1)
            if (count == 60) {
                $http.put(SERVER + '/behaviour/products', {timeSpentOnProductsPage : count})
                    .then((response) => {
                        console.log(response)
                        count = 0;
                        localStorageService.set('products', 0)
                    })
            }        
        }, 1000)
        $rootScope.$on('$stateChangeStart', 
        function(event, toState){ 
            $interval.cancel(promise)
        })

            // switch(categoryId) {
            //     case 1 : 
            //         categoryName = "Tech"
            //         break
            //     case 2 : 
            //         categoryName = "Sport"
            //         break
            //     case 3 :
            //         categoryName = "Automobile"
            //         break
            //     case 4 : 
            //         categoryName = "Îmbrăcăminte"
            //         break
            //     case 5 : 
            //         categoryName = "Electrocasnice"
            //         break
            //     case 6 :
            //         categoryName = "Cărți"
            //         break
            //     case 7 :
            //         categoryName = "Fotografie"
            //         break
            //     case 8 :
            //         categoryName = "Ceasuri"
            //         break
            //     default :
            //         categoryName = "Produsul nu face parte din nicio categorie"
            // }
    }])