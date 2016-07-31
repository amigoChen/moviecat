(function(angular) {
  'use strict';

  // 创建正在热映模块
  var module = angular.module(
    'moviecat.movie_detail', [
      'ngRoute',
      'moviecat.services.http'
    ]);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id', {
      templateUrl: 'movie_detail/view.html',
      controller: 'MovieDetailController'
    });
  }]);

  module.controller('MovieDetailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {
      $scope.movie = {};
      var id = $routeParams.id;
      $scope.loading = true;
      var apiAddress = 'http://api.douban.com/v2/movie/subject/' + id;

      HttpService.jsonp(apiAddress, {}, function(data) {
        $scope.movie = data;
        $scope.loading = false;
        $scope.$apply();
      });
    }
  ]);
})(angular);
