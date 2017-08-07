  'use strict';
let callbackController = angular.module('myApp');
var userProfile;
callbackController.controller('CallbackController', ['authService', '$http', '$rootScope', '$state', function(authService, $http, $rootScope, $state) {
   let $contructor = () => {
     $rootScope.isAdmin = false
     if ($rootScope.basketTotalAmount === undefined) {
       $rootScope.basketTotalAmount = 0;
       $rootScope.unfinishedTranzactionUserId = -1;
     }
     if(!$rootScope.basket) {
      $rootScope.basket = [];
     }
     $rootScope.getTotalAmount = () => {
        var total = 0
        for (var product of $rootScope.basket) {
          total = total + product.price;
        }
        $rootScope.basketTotalAmount = total;
        
       return $rootScope.basketTotalAmount;
        
      }
      $rootScope.emptyCart = () => {
        $rootScope.basketTotalAmount = 0;
        $rootScope.basket = [];
      }
      
     $http.get(SERVER + '/communities')
                .then((response) => {
                    $rootScope.communities = response.data
                })
                .catch((error) => {
                    $scope.communities = "error occured in retrievieng communities"
                    console.log(error)
                })
      
   }
   $contructor()
   if (authService.getCachedProfile()) {
      userProfile = authService.getCachedProfile();
      verifyUser(userProfile);
    } else {
      authService.getProfile(function(err, profile) {
        userProfile = profile;
        verifyUser(userProfile);
      });
    }

    function verifyUser(userProfile)  {
      $http.post(SERVER +'/verifyuser', userProfile)
      .then((response) => {
        console.log(response.data)
        $rootScope.userId = response.data;
        return $http.get(SERVER + '/subscriptions/'+ $rootScope.userId)
      })
      .then((subscriptions) => {
              $rootScope.activeSubscriptions = subscriptions.data;
              $rootScope.activeSubscriptionsIds =[]
              for(var i =0;i<$rootScope.activeSubscriptions.length; i++){
                $rootScope.activeSubscriptions[i].name;
                $rootScope.activeSubscriptions[i].name = getName($rootScope.activeSubscriptions[i].communityId)
              }
              for (var sub of $rootScope.activeSubscriptions) {
                $rootScope.activeSubscriptionsIds.push(sub.communityId)
              }
              if($rootScope.activeSubscriptions.length == 0) {
                alert("Bine ai venit! Pentru a continua, te rugam sa alegi una sau mai multe din comunitatile existente")
                $state.go('communities')
              } else {
                $state.go('products')
              }
              return $http.get(SERVER + '/admin/' + $rootScope.userId)
      })
      .then((response) => {
        console.log(response)
        if (response.data) {
          $rootScope.isAdmin = true;
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
    function getName(communityId){
      let communityName = ""
            switch(communityId) {
                case 1 : 
                    communityName = "Cărți"
                    break
                case 2 : 
                    communityName = "Sport"
                    break
                case 3 :
                    communityName = "Automobile"
                    break
                case 4 : 
                    communityName = "Îmbrăcăminte"
                    break
                case 5 : 
                    communityName = "Tech"
                    break
                case 6 :
                    communityName = "Fotografie"
                    break
                case 7 :
                    communityName = "Ceasuri"
                    break
                case 8 :
                    communityName = "Electrocasnice"
                    break
                default :
                    communityName = "Unknown"
            }
            return communityName
    }
}]);

