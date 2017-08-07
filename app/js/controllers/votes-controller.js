votesController = angular.module("myApp")
votesController.controller("votesController", [
    '$scope', '$http', '$rootScope', '$state', '$interval', 'localStorageService', function($scope, $http, $rootScope, $state, $interval, localStorageService) {
        dataArray = [];
        let $constructor = () => {
            $http.get(SERVER + '/polls')
                .then((response) => {
                    var communityPolls = []
                    for(var poll of response.data) {
                        if ($rootScope.activeSubscriptionsIds.indexOf(poll.communityId) > -1) {
                            communityPolls.push(poll)
                        }
                    }
                    $scope.polls = communityPolls
                    for (i = 0; i< $scope.polls.length; i++){                        
                        $http.get(SERVER + '/proposedproducts/' + $scope.polls[i].pollId)
                            .then((response) => {
                                for (j=0;j<$scope.polls.length;j++){
                                    if ($scope.polls[j].pollId == response.data[0].pollId){
                                        $scope.polls[j].products = [];
                                        $scope.polls[j].products = response.data;
                                        $scope.polls[j].check = false;
                                        for (prod of $scope.polls[j].products){
                                              if(prod.userIdVotes.indexOf($rootScope.userId) > -1) {
                                                  $scope.polls[j].check = true;
                                            }
                                        }
                                        dataArray[j] = [];
                                        for (prod of $scope.polls[j].products) {
                                            dataArray[j].push(prod.numberOfVotes)
                                        }
                                    }
                                }
                                
                                return "succes on retrieving proposed products";
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                })
                .catch((error) => {
                    console.log('error')
                    $scope.products = 'error occured while retrieving products'
                })
        }
        $constructor()
        

        $scope.addVote = (prod, poll) => {
            var index = $scope.polls.indexOf(poll)
            $scope.polls[index].check = true;
            prod.numberOfVotes +=1;
            $http.put(SERVER + '/voteproposedproduct/' + prod.proposedProductId, {userId : $rootScope.userId})
            .then((response) => {
                console.log(response.data)
                // $state.reload()
            })
            .catch((error) => {
                console.log(error)
            })
        }
            
        $scope.options = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                    max: 50
                                }
                       }]
                    }
               };
        if(localStorageService.get('vote')) {
            var count = localStorageService.get('vote');
        } else {
            var count = 0;
        }
        var promise = $interval(function(){
            count +=1;
            localStorageService.set('vote', count + 1)
            if (count == 60) {
                $http.put(SERVER + '/behaviour/vote', {timeSpentOnVotePage : count})
                    .then((response) => {
                        console.log(response)
                        count = 0;
                        localStorageService.set('vote', 0)
                    })
            }        
        }, 1000)
        $rootScope.$on('$stateChangeStart', 
        function(event, toState){ 
            $interval.cancel(promise)
        })
    }
])