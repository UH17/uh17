'use strict';

var app = angular.module('wtfApp', [
  'btford.socket-io',
  'ui.bootstrap',
  'ui.router',
  'wtfControllers',
  'wtfFactory'
]);


app.config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        views: {
            '': { templateUrl: 'assets/templates/main.html', controller: 'globalCtrl'},
            'nav@home': { templateUrl: 'assets/templates/nav.html'},
            'body@home': { templateUrl: 'assets/templates/sites/home.html'}
        }
    })
    .state('home.pattern', {
        url: 'pattern/:id',
        views: {
            '': { templateUrl: 'assets/templates/main.html', controller: 'globalCtrl'},
            'nav@home': { templateUrl: 'assets/templates/nav.html'},
            'body@home': { templateUrl: 'assets/templates/sites/modify.html', controller: 'modCtrl'}
        }
    })

}]).run(function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})