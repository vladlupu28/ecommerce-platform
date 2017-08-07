  'use strict';
let ctrl = angular.module("myApp")
ctrl.controller('LoginController', ['authService', '$scope', function(authService, $scope){
    console.log("login controller")
    $scope.loginAuth = () => {
        var vm = this;
        vm.auth = authService;
        vm.auth.login();
    }
}])
//   angular
//     .module('myApp')
//     .controller('LoginController', loginController);

//   loginController.$inject = ['authService'];

//   function loginController(authService) {

//     var vm = this;
//     vm.auth = authService;

//   }