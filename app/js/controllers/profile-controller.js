  'use strict';
let profileController = angular.module("myApp")
profileController.controller('profileController', ['authService', '$scope', function(authService, $scope){
    var vm = this;
    vm.auth = authService;
    vm.profile;

    if (authService.getCachedProfile()) {
      vm.profile = authService.getCachedProfile();
      $scope.profile = vm.profile;
    } else {
      authService.getProfile(function(err, profile) {
        vm.profile = profile;
        $scope.profile = vm.profile;
      });
    }
}
])