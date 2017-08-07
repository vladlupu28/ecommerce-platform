addPollController = angular.module("myApp")
addPollController.controller("addPollController", [
    '$scope', '$http', '$rootScope', '$state', function($scope, $http, $rootScope, $state) {
        let $contructor = () => {
            $scope.communities = $rootScope.activeSubscriptions;
        }
        $contructor()
        $scope.show = true;
        $scope.selectedCommunity = $scope.communities[0];        
        $scope.poll = {}
        $scope.addPoll = (selectedCommunity, description) => {
            var community = selectedCommunity;
            var pollDescription = description;
            $http.post('/polls', {description : pollDescription, communityId : community.communityId, userId : $rootScope.userId})
                .then((response) => {
                    alert("Succes")
                    $scope.newPollId = response.data.pollId
                    $scope.show = false
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        $scope.addProducts = (product1Name, product1Description, product2Name, 
                        product2Description, product3Name, product3Description) => {
                            var proposedProducts = []
                            proposedProducts[0] = {}
                            proposedProducts[1] = {}
                            proposedProducts[2] = {}
                            proposedProducts[0].name = product1Name;
                            proposedProducts[0].description = product1Description;
                            proposedProducts[0].pollId = $scope.newPollId;
                            proposedProducts[0].numberOfVotes = 0;
                            proposedProducts[0].userIdVotes = [$rootScope.userId];
                            proposedProducts[1].name = product2Name;
                            proposedProducts[1].description = product2Description;
                            proposedProducts[1].pollId = $scope.newPollId;
                            proposedProducts[1].numberOfVotes = 0; 
                            proposedProducts[1].userIdVotes = [$rootScope.userId];
                            proposedProducts[2].name = product3Name;
                            proposedProducts[2].description = product3Description;
                            proposedProducts[2].pollId = $scope.newPollId;
                            proposedProducts[2].numberOfVotes = 0;
                            proposedProducts[2].userIdVotes = [$rootScope.userId];
                            $http.post(SERVER + "/proposedproducts", proposedProducts[0])
                                .then((response) => {
                                    return $http.post(SERVER + "/proposedproducts", proposedProducts[1])
                                })
                                .then((response) => {
                                    return $http.post(SERVER + "/proposedproducts", proposedProducts[2])
                                })
                                .then((response) => {
                                    alert("Produse adaugate cu succes")
                                    $scope.show = true
                                    $state.go('votes')
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        }
    }]
)
