var app = angular.module('Phone', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});

app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/phone',
        templateUrl: '/build/phone.html',
        controller: 'PhoneController'
    });
});

app.controller('PhoneController', function($scope) {

    Number.prototype.freq_map = function(in_min, in_max, out_min, out_max) {
      return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };

    var socket = io();
    $scope.currentNote = '';
    var C4 = 261.63;
    var C6 = 1046.50;
    var BETA_MIN = -45;
    var BETA_MAX = 45;
	var tone = new Tone();

	window.addEventListener('deviceorientation', function(event) {
  		var orientation = event.beta+0;
  		if (orientation < BETA_MIN) {
  			var freq = C4;
  		} else if (orientation > BETA_MAX) {
  			var freq = C6;
  		}
  		else {
			var freq = orientation.freq_map(BETA_MIN, BETA_MAX, C4, C6);
		}
		var note = tone.frequencyToNote(freq);
        if (note !== $scope.currentNote) {
            socket.emit('phone:newNote', note);
            $scope.currentNote = note;
            $scope.$digest();
        }
	});

});
