var timerController = angular.module("myApp")
timerController.controller('timerController', ['$http', '$rootScope', '$state', '$scope', function($http, $rootScope, $state, $scope) {
    let $constructor = () => {
        $http.get('/behaviour')
            .then((response) => {
                $scope.timeSpentOnProductsPage = response.data.timeSpentOnProductsPage;
                $scope.timeSpentOnDiscussionPage = response.data.timeSpentOnDiscussionPage;
                $scope.timeSpentOnVotePage = response.data.timeSpentOnVotePage;
                $scope.timeSpentOnPostPage = response.data.timeSpentOnPostPage;
                drawCharts()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    $constructor()
    function drawCharts() {
        $scope.labels = ['Pagina produselor/sec', 'Pagina discuțiilor/sec', 'Pagina chestionarelor/sec', 'Pagina unei singure discuții/sec']
        $scope.data = [$scope.timeSpentOnProductsPage, $scope.timeSpentOnDiscussionPage, $scope.timeSpentOnVotePage, $scope.timeSpentOnPostPage]
    }
}]
)