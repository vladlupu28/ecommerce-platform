 'use strict';

let app = angular.module("myApp", ['auth0.auth0', 'ui.router', 'chart.js', 'LocalStorageModule'])
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'angularAuth0Provider', function($stateProvider, $urlRouterProvider, $locationProvider, angularAuth0Provider){
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl : 'index.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('products', {
            url : '/products',
            templateUrl : 'views/products.html',
            controller : 'productsController'
        })
        .state('callback', {
            url: '/callback',
            controller: 'CallbackController',
            templateUrl: 'views/callback.html',
            controllerAs: 'vm'
        })
        .state('singleproduct', {
            url: '/products/:id',
            controller: 'singleProductController',
            templateUrl: 'views/singleproduct.html'
        })
        .state('communities', {
            url: '/communities',
            controller: 'communityController',
            templateUrl: 'views/communities.html'
        })
        .state('profile',{
            url: '/profile',
            controller: 'profileController',
            templateUrl: 'views/profile.html'
        })
        .state('votes',{
            url: '/votes',
            controller: 'votesController',
            templateUrl: 'views/votes.html'
        })
        .state('addpoll', {
            url: '/addpoll',
            controller: 'addPollController',
            templateUrl: 'views/addpoll.html'
        })
        .state('topics', {
            url: '/topics',
            controller: 'topicsController',
            templateUrl : 'views/topics.html'
        })
        .state('comments', {
            url: '/comments',
            controller : 'commentsController',
            templateUrl : 'views/comments.html'
        })
        .state('order', {
            url: '/finishorder',
            controller: 'orderController',
            templateUrl: 'views/order.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl : 'views/dashboard.html'
        })
        .state('dashboard.indicators', {
            url: '/indicators',
            controller: 'indicatorsController',
            templateUrl : 'views/dashboard.indicators.html'
        })
        .state('dashboard.manageproducts', {
            url: '/manageproducts',
            controller : 'manageproductsController',
            templateUrl : 'views/dashboard.manageproducts.html'
        })
        .state('dashboard.timer', {
            url : '/timer',
            controller: 'timerController',
            templateUrl: 'views/dashboard.timer.html'
        })
        angularAuth0Provider.init({
        clientID: 'QTo1KPOuS0hYXXzPJILfmDFY44M6iq1c',
        domain: 'vladlupu.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://vladlupu.eu.auth0.com/userinfo',
        redirectUri: 'http://localhost:3000/homepage.html',
        scope: 'openid profile'
        });
        // $locationProvider.hashPrefix('');

        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });
}])
    .config(function(localStorageServiceProvider){
        localStorageServiceProvider
            .setPrefix('market')
    })
app.service('topicService', function() {
    var topic;
    var sendTopic = function(newTopic) {
        topic = newTopic;
    }
    var getTopic = function() {
        return topic;
    }
    return {
        sendTopic : sendTopic,
        getTopic : getTopic
    }
}
)

app.service('userService',['$http', function($http) {
    var user;

    var getUser = function(userId) {
        $http.get(SERVER + "/users/" + userId)
            .then((response) =>{
                return response.data
            })
            .catch((error) => {
                console.log(error)
                return "user unknown"
            })
    }

    return {
        getUser : getUser
    }
}])

