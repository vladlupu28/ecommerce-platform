  'use strict';
let indicatorsController = angular.module('myApp');
indicatorsController.controller('indicatorsController', ['$http', '$rootScope', '$state', '$scope', function($http, $rootScope, $state, $scope) {
    let $contructor = () => {
        $http.get('/countusers')
            .then((result) => {
                $scope.numberOfUsers = result.data.count;
                console.log(result)
                return $http.get('/behaviour')
            })
            .then((result) => {
                $scope.behaviour = result.data;
                return $http.get('/orders')
            })
            .then((result) => {
                $scope.orders = []
                $scope.orders = result.data;
                console.log(result.data)
                processOrders()

            })
    }
    $contructor()

    function processOrders() {
        $scope.totalNumberOfOrders = $scope.orders.length;
        var totalAmountOfOrders = 0;
        var totalAmountOfProducts = 0;
        for (var order of $scope.orders){
            totalAmountOfOrders += order.totalAmount
            totalAmountOfProducts += order.productIds.length
        }
        $scope.totalAmountOfOrders = totalAmountOfOrders;
        $scope.totalAmountOfProducts = totalAmountOfProducts;
        console.log($scope.totalNumberOfOrders)
        console.log($scope.totalAmountOfOrders)
        console.log($scope.totalAmountOfProducts)
        console.log($scope.numberOfUsers)
        console.log($scope.behaviour)
        drawCharts()
    }

    function drawCharts() {
        $scope.labels = ["Users", "Bounced visitors"];
        $scope.data = [(1-($scope.numberOfUsers/$scope.behaviour.bouncedUsers))*100, 
        ($scope.numberOfUsers/$scope.behaviour.bouncedUsers)*100];
        $scope.labels1 = ['Rata de abandon %']
        var datas =
        $scope.data1 = [(1- ($scope.totalNumberOfOrders/$scope.behaviour.noOfUserWithUnfinishedTranzactions))*100];
        $scope.options1 = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                       }]
                    }
               };
               
        $scope.labels2=["Venit mediu per utilizator LEI"]
        $scope.data2 = [$scope.totalAmountOfOrders/$scope.numberOfUsers]
        $scope.options2 = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                }
                       }]
                    }
               };
        $scope.labels3=["Rata de conversie %"]
        $scope.data3=[(($scope.totalNumberOfOrders/$scope.numberOfUsers)*100)]
        $scope.options3 = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                    max: 100
                                }
                       }]
                    }
               };
        $scope.labels4=["Valoarea medie a unei comenzi LEI"]
        $scope.data4=[$scope.totalAmountOfOrders/$scope.totalNumberOfOrders]
        $scope.options4 = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                }
                       }]
                    }
               };
        $scope.labels5=["Numărul mediu de produse per comandă LEI"]
        $scope.data5=[$scope.totalAmountOfProducts/$scope.totalNumberOfOrders]
        $scope.options5 = {
                    scales: {
                       xAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0,
                                }
                       }]
                    }
               };
    }
   }]
)
