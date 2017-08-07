var topicsController = angular.module("myApp")
topicsController.controller('topicsController', [
    '$scope', '$http', '$rootScope', 'topicService', '$state', 'localStorageService', '$interval', function($scope, $http, $rootScope, topicService, $state, localStorageService, $interval) {
        let $constructor = () => {
            $scope.communities = $rootScope.activeSubscriptions;
            $scope.selectedCommunity = $scope.communities[0];                    
            $http.get(SERVER + '/topic')
                .then((response) => {
                    var communityTopics = []
                    for(var topic of response.data) {
                        if ($rootScope.activeSubscriptionsIds.indexOf(topic.communityId) > -1) {
                            communityTopics.push(topic)
                        }
                    }
                    $scope.topics = communityTopics;                    
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        $constructor()
        $scope.setTopic = (topic) => {
            topicService.sendTopic(topic)
        }

        $scope.show = true;
        $scope.change = () => {
            $schope.show = false
        }

        $scope.addTopicFunction = (selectedCommunity, name, description) => {
            $http.post(SERVER + '/topics', {name : name, topicSubject : description, communityId : selectedCommunity.communityId,
                 authorId :$rootScope.userId})
                 .then((response) => {
                     alert("Succes")
                     $scope.show = true;
                     $state.reload()
                 })
                 .catch((error) => {
                     console.log(error)
                 })
        }

        if(localStorageService.get('discussion')) {
            var count = localStorageService.get('discussion');
        } else {
            var count = 0;
        }
        var promise = $interval(function(){
            count +=1;
            localStorageService.set('discussion', count + 1)
            if (count == 60) {
                $http.put(SERVER + '/behaviour/discussion', {timeSpentOnDiscussionPage : count})
                    .then((response) => {
                        console.log(response)
                        count = 0;
                        localStorageService.set('discussion', 0)
                    })
            }        
        }, 1000)
        $rootScope.$on('$stateChangeStart', 
        function(event, toState){ 
            $interval.cancel(promise)
        })

    }]
)