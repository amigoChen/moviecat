'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.doubanlist'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).controller('active',[
	'$scope',
	'$location',
	function  ($scope,$location) {
		$scope.$location = $location;
		$scope.$watch('$location.path()',function  (now) {
			if(now.startsWith('/in_theaters')){
				$scope.type = 'in_theaters';
			}else if(now.startsWith('/coming_soon')){
				$scope.type = 'coming_soon';
			}else if (now.startsWith('/top250')){
				$scope.type = 'top250';
			}
		});
	}
	] 
).controller('searchController',[
	'$scope',
	'$route',
	function  ($scope,$route) {
		$scope.input = '';
		$scope.search = function  () {
			$route.updateParams({category:'search',q:$scope.input});
			console.log($scope.input);
		}
}]);


