'use strict';
(function(angular) {
	var module = angular.module('moviecat.doubanlist', [
		'ngRoute',
		'moviecat.services.http'
	]);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'doubanlist/view.html',
			controller: 'MovieListController'
		});
	}])

	module.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function($scope,$route,$routeParams, HttpService) {
			var count = 8;
			var page = parseInt($routeParams.page);
			var start = (page-1)*count;

			$scope.subjects = [];
			$scope.message = "";
			$scope.total = 0;
			$scope.allpage = 0;
			$scope.loading = true;
		HttpService.jsonp(
        'http://api.douban.com/v2/movie/' + $routeParams.category, 
        {start:start,count:count,q:$routeParams.q},
        function(data) {
         $scope.subjects = data.subjects;
         $scope.title = data.title;
         $scope.total = data.total;
         $scope.allpage = Math.ceil($scope.total/count);
         $scope.currentPage = page;
         $scope.loading = false;
		 $scope.$apply();
        });

        $scope.turnPage = function  (page) {
        	if (page>=1&&page<=$scope.allpage) {
        		$route.updateParams({page:page});	
        	};
        }
		}
	]);
})(angular);

//$http.get('/app/douban.json').then(function(res) {
//				if(res.status == 200){
//				$scope.subjects = res.data.subjects;
//			}else{
//				$scope.message = "傻逼，请求出错了";
//			}
//			}, function(err) {
//				$scope.message = "傻逼，请求出错了";
//			});