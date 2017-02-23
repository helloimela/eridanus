var app = angular.module('eridanus', [
  'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    .when("/portfolio",{templateUrl: "partials/portfolio.html", controller: "PortfolioCtrl"});
    // Pages

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
}]);

app.controller('MainCtrl', ['$http','$scope','$location',function($http, $scope, $location){
	$scope.go = function ( path ) {
	  $location.path( path );
	};
}]);

app.controller('HomeCtrl', ['$http','$scope',function($http, $scope, $rootScope){
	
}]);