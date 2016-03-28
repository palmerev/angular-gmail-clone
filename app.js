
var app = angular.module('app', ['ngRoute']);
function TestCtrl($scope) {
    $scope.title = 'Write a title here...';
}

app.config(function ($routeProvider) {
    $routeProvider
        .when('/inbox', {
            templateUrl: 'views/inbox.html',
            controller: 'InboxCtrl',
            controllerAs: 'inbox'
        })
        .when('inbox/email/:id', {
            templateUrl: 'views/email.html',
            controller: 'EmailCtrl',
            controllerAs: 'email'
        })
        .otherwise({
            redirectTo: '/inbox'
        });
});
