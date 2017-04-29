var app = angular.module('eridanus', [
  'ngRoute', 'ngAnimate'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl", animation:"home"})
    .when("/about", {templateUrl: "partials/about.html", controller: "AboutCtrl", animation:"about"})
    .when("/portfolio/:itemId", {templateUrl: "partials/portfolio.html", controller: "PortItemCtrl", animation:"pt"});
    // Pages

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
}]);

app.controller('MainCtrl', ['$http','$scope','$location','$rootScope',function($http, $scope, $location, $rootScope){
	$scope.go = function ( path ) {
	  $location.path( path );
	};
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    $rootScope.animation = currRoute.animation;
  });

}]);

app.controller('HomeCtrl', ['$http','$scope',function($http, $scope, $rootScope){
	$http.get('/dist/js/portfolioData.json').then(function(data){
      $scope.items = data.data;
      // $scope.bindHTML = $sce.trustAsHtml($scope.items);
  });
  $scope.pageClass = 'home-anim';

}]);

app.controller('AboutCtrl', ['$http','$scope',function($http, $scope, $rootScope){
  $scope.pageClass = 'about-anim';

}]);

app.controller('PortItemCtrl', ['$scope','$http','$routeParams',function ($scope, $http, $routeParams ) {
  $scope.name = 'PortItemCtrl';
    $http.get('/dist/js/portfolioData.json').then(function(data){
        $scope.itemDetail = data.data[$routeParams.itemId];
    });
    $scope.$back = function() { 
      window.history.back();
    };
    $scope.pageClass='pt-anim-ctr';
}]);

app.directive('itemPortfolio', ['$location', function($location){
  return{
    restrict : 'E',
    scope : {
      item : '='
    },
    transclude: true,
    templateUrl:'partials/portfolioItem.html',
    link : function(scope, element, attrs){
      element.on('click', function() {
            scope.$apply(function() {
                $location.path('/portfolio/'+scope.item.id);
            });
      });
    }
  };
}]);

app.directive('pageBg', [function(){
  return{
    templateUrl:'partials/pageBg.html'
  };
}]);

app.directive('nav', ['$location',function($location){
  return{
    restrict : 'E',
    templateUrl:'partials/nav.html',
    link:function(scope,element){
      element.on('click', function() {
        scope.currPath = $location.$$path;
        if(scope.currPath==='/about'){
          scope.$apply(function() {
            window.history.back();
          });
          scope.menuState='';
        } else{
          scope.$apply(function() {
            $location.path('/about/');
          });
          scope.menuState = 'close';
        } 
      });
    }
  };
}]);