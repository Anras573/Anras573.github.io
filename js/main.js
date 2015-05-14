var cvApp = angular.module('cvApp', ['ui.router']);

cvApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/experience");
    
    $stateProvider
        .state('experience', {
            url: '/experience',
            templateUrl: 'partials/experience.html'
    })
        .state('education', {
            url: '/education',
            templateUrl: 'partials/education.html'
    })
        .state('tech', {
            url: '/tech',
            templateUrl: 'partials/tech.html'
    })
        .state('leisure', {
            url: '/leisure',
            templateUrl: 'partials/leisure.html'
    })
    ;
});

cvApp.controller('cvController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(location) {
            return location === $location.path();
        };
}]);

