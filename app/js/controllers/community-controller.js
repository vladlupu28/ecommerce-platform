communityController = angular.module('myApp')
var userId = null;
communityController.controller('communityController', 
    ['$scope', '$http', '$state', 'authService', '$rootScope', function($scope, $http, $state, authService, $rootScope){
        let $constructor = () => {
            $scope.communities = $rootScope.communities
            getSubscriptions();
            
        }
        $constructor()
        $scope.getSelectedCommunities = (communities) => {
            var userProfile;
            var selectedCommunities = [];
            selectedCommunities = communities;
            if (authService.getCachedProfile()) {
                userProfile = authService.getCachedProfile();
                userId = subscribeUnsubscribe(userProfile.name, selectedCommunities, $scope.subscriptionArray);
            } else {
                authService.getProfile(function(err, profile) {
                userProfile = profile;
                userId = subscribeUnsubscribe(userProfile.name, selectedCommunities, $scope.subscriptionArray);
            });
            }
        }
        function getSubscriptions(){
            var subs = [];
            for (object of $rootScope.activeSubscriptions) {
                subs.push(object.communityId);
            }
            subs.sort();
            var subsBoolArray = [];
            for(i=1;i<9;i++){
                if(subs.indexOf(i) > -1) {
                    subsBoolArray[i-1] = "YES";
                } else {
                    subsBoolArray[i-1] = "NO";
                }
            }
            $scope.subscriptionArray = subs;
            $scope.subscriptions = subsBoolArray;
        }

        function subscribeUser(userEmail, subscribeTo){
            $http.post(SERVER + '/subscriptions', {email : userEmail, communityId : subscribeTo})
            .then((response) => {
                alert("Inregistrare cu succes")
                $state.go('callback')
            })
            .catch((error) => {
                console.log("eroare");
            })
        }

        function unsubscribeUser(unsubscribeFrom){
            for(communityId of unsubscribeFrom){
                $http.delete(SERVER + '/unsubscribe/'+ $rootScope.userId + '/community/' + communityId)
                    .then((response) => {
                        console.log("Dezabonare cu succes")
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }

        function subscribeUnsubscribe(userEmail, selectedCommunitiesIds, existingSubscriptions) {
            for (i = 0; i<selectedCommunitiesIds.length; i++){
                selectedCommunitiesIds[i] = parseInt(selectedCommunitiesIds[i]);
            }
            let unsubscribeFrom = existingSubscriptions.filter(function(x) { return selectedCommunitiesIds.indexOf(x) < 0});
            let subscribeTo = selectedCommunitiesIds.filter(function(x) { return existingSubscriptions.indexOf(x) < 0});
            subscribeUser(userEmail, subscribeTo);
            unsubscribeUser(unsubscribeFrom);
        }       
    }])