var app = angular.module('Meaniscule', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});

//app.factory('Socket', function ($location) {

    //if (!window.io) throw new Error('socket.io not found!');

    //var socket;

    //if ($location.$$port) {
        //socket = io('http://localhost:4545');
    //} else {
        //socket = io('/');
    //}

    //return socket;

//});

