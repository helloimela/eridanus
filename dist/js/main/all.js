var app = angular.module('eridanus', [
  'ngRoute', 'ngAnimate', 'ngSanitize'
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

app.controller('MainCtrl', ['$sce','$http','$scope','$location','$rootScope',function($sce,$http, $scope, $location, $rootScope){
	$scope.go = function ( path ) {
	  $location.path( path );
	};
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    $rootScope.animation = currRoute.animation;
  });
  $scope.$sce = $sce;
  $scope.menuClick = function(){
    $scope.currPath = $location.$$path;
    if($scope.currPath==='/about'){
      window.history.back();
      $scope.menuState='';
    } else{
      $location.path('/about/');
      $scope.menuState = 'close';
    } 
  }

}]);

app.controller('HomeCtrl', ['$http','$location','$scope',function($http, $location, $scope, $rootScope){
	$http.get('js/portfolioData.json').then(function(data){
      $scope.items = data.data;
  });
  $scope.pageClass = 'home-anim';

  $scope.ptclick = function(pttarget){
     // $location.path('/portfolio/'+pttarget);
     // $scope.showModal=true;
     // $scope.paramdata = pttarget;
     $scope.activeMenu = pttarget.id;
     console.log(pttarget.id);
     $scope.pageStat='pageFade';
     $location.path('/portfolio/'+pttarget.id);
  };
}]);

app.controller('AboutCtrl', ['$http','$scope',function($http, $scope, $rootScope){
  $scope.pageClass = 'about-anim';
}]);

app.controller('PortItemCtrl', ['$scope','$http','$routeParams',function ($scope, $http, $routeParams ) {
  $scope.name = 'PortItemCtrl';
    $http.get('js/portfolioData.json').then(function(data){
        $scope.totalnum=data.data.length;
        $scope.trueID=$scope.totalnum-$routeParams.itemId-1;
        $scope.itemDetail = data.data[$scope.trueID];
        console.log(data);
    });
    $scope.$back = function() { 
      window.history.back();
    };
    $scope.pageClass='pt-anim-ctr';
}]);

app.directive('pageBg', [function(){
  return{
    templateUrl:'partials/pageBg.html'
  };
}]);
app.directive('pageBgpt', [function(){
  return{
    templateUrl:'partials/pageBgpt.html'
  };
}]);

app.directive('logo', [function(){
  return{
    templateUrl:'partials/logo.html'
  };
}]);

app.directive('nav', ['$location',function($location){
  return{
    restrict : 'E',
    templateUrl:'partials/nav.html'
  };
}]);