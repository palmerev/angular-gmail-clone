
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/inbox', {
            templateUrl: 'views/inbox.html',
            controller: 'InboxCtrl',
            controllerAs: 'inbox'
        })
        .when('/inbox/email/:id', {
            templateUrl: 'views/email.html',
            controller: 'EmailCtrl',
            controllerAs: 'email'
        })
        .otherwise({
            redirectTo: '/inbox'
        });
});

// example factory for getting email data
app.factory('InboxFactory', function InboxFactory ($http){
  var exports = {};
  exports.getMessages = function () {
    return $http.get('../json/emails.json')
    .error(function (data) {
      console.log('An error occurred', data);
    });
  }
  exports.find = function (id) {
    return $http({
      method: 'GET',
      url: '../json/email_' + id + '.json',
      cache: true
    });
  }
  return exports;
});

// Example controller for one route
app.controller('InboxCtrl', ['$scope', 'InboxFactory', function ($scope, InboxFactory) {
    $scope.title = 'This is a title';
    InboxFactory.getMessages()
        .success(function(jsonData, statusCode) {
            console.log(
                'The request was successful!', statusCode, jsonData);
            $scope.emails = jsonData;
        });
}]);

app.controller('EmailCtrl', ['$scope', '$routeParams', 'InboxFactory', function ($scope, $routeParams, InboxFactory) {
  $scope.title = 'Message Details';
  InboxFactory.getMessages()
    .success(function(data) {
      $scope.messageInfo = data.filter(function (msg) {
        return msg.id == $routeParams.id;
      })[0];
    });
  InboxFactory.find($routeParams.id)
    .success(function(data) {
      $scope.bodyText = data.body;
    }).error(function(data) {
      $scope.bodyText = "Error loading message body";
    });
}]);
