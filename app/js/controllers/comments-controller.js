var commentsController = angular.module("myApp")
commentsController.controller('commentsController', [
    '$scope', '$http', '$rootScope', 'topicService', '$state', '$interval', 'localStorageService', function($scope, $http, $rootScope, topicService, $state, $interval, localStorageService) {
        $contructor = () => {
            $scope.topic = topicService.getTopic()
            $http.get(SERVER + "/comments/" + $scope.topic.topicId)
                .then((response) => {
                    $scope.comments = response.data
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        $contructor()
        $scope.showComments = true;
        $scope.add = () => {
            $scope.showComments = false;
        }
        $scope.show = () => {
            $scope.showComments = true;
        }
        $scope.addComment = (comment) => {
            $http.post(SERVER + '/comments', {message : comment, topicId : $scope.topic.topicId, userId : $rootScope.userId})
                .then((response) => {
                    alert("Succes")
                    $state.reload()

                })
                .catch((error) => {
                    console.log(error)
                })
        }
        setTimeout(function(){}, 1000)
        if(localStorageService.get('comment')) {
            var count = localStorageService.get('comment');
        } else {
            var count = 0;
        }
        var promise = $interval(function(){
            count +=1;
            localStorageService.set('comment', count + 1)
            if (count == 60) {
                $http.put(SERVER + '/behaviour/post', {timeSpentOnPostPage : count})
                    .then((response) => {
                        console.log(response)
                        count = 0;
                        localStorageService.set('comment', 0)
                    })
            }        
        }, 1000)
        $rootScope.$on('$stateChangeStart', 
        function(event, toState){ 
            $interval.cancel(promise)
        })
    }]
    
)