'use strict';

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
'use strict';

app.controller('HomeController', function ($scope) {

    //create one of Tone's built-in synthesizers and connect it to the master output
    var synth = new Tone.SimpleSynth().toMaster();

    var socket = io();

    $scope.note = 'Learn Your Notes!';
    $scope.image = 'no';

    socket.on('note:change', function (note) {
        synth.triggerAttack(note);
        if (note.indexOf('#') > -1) $scope.image = note.replace('#', 's');else $scope.image = note;
        $scope.note = note;
        $scope.$digest();
    });

    socket.on('disconnect:phone', function () {
        console.log('disconnected phone');
        synth.triggerRelease();
    });
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pre-build/home/home.html',
        controller: 'HomeController'
    });
});
'use strict';

app.controller('ModulesController', function ($scope, $http, ModulesFactory) {

  $scope.$on('$stateChangeSuccess', function () {
    var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

    ModulesFactory.getNodeModules().then(function (modules) {
      $scope.nodeModules = modules;

      if (!$scope.nodeModules.length) {
        $scope.defaultMessage = defaultMessage;
      }
    });
  });
});
'use strict';

app.factory('ModulesFactory', function ($http) {
  return {
    getNodeModules: function getNodeModules() {
      return $http.get('/api/modules/').then(function (res) {
        return res.data;
      });
    }
  };
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/pre-build/modules/modules.html',
        controller: 'ModulesController'
    });
});
"use strict";

app.directive("navbar", function () {
	return {
		restrict: "E",
		templateUrl: "/pre-build/navbar/navbar.html"
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibW9kdWxlcy9tb2R1bGVzLmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL21vZHVsZXMuZmFjdG9yeS5qcyIsIm1vZHVsZXMvbW9kdWxlcy5zdGF0ZS5qcyIsIm5hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7O0FBRXpELHFCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEMsc0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BILEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxNQUFNLEVBQUU7OztBQUdqRCxRQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFM0MsUUFBSSxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7O0FBRWxCLFVBQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFDbEMsVUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRXBCLFVBQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVMsSUFBSSxFQUFFO0FBQzFDLGFBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsWUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FDN0QsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDekIsY0FBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbkIsY0FBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3BCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFlBQVc7QUFDckMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ2pDLGFBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUM7OztBQ3ZCSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVMsY0FBYyxFQUFFO0FBQ2hDLGtCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFXLEVBQUUsMkJBQTJCO0FBQ3hDLGtCQUFVLEVBQUUsZ0JBQWdCO0tBQy9CLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7O0FDTkgsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFOztBQUUxRSxRQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDNUMsUUFBSSxjQUFjLEdBQUcsMEtBQTBLLENBQUM7O0FBRWhNLGtCQUFjLENBQUMsY0FBYyxFQUFFLENBQzVCLElBQUksQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUN0QixZQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQzlCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO09BQ3hDO0tBQ0YsQ0FBQyxDQUFDO0dBQ04sQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOzs7QUNkSCxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzVDLFNBQU87QUFDTCxrQkFBYyxFQUFFLDBCQUFXO0FBQ3pCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDOUIsSUFBSSxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQ2xCLGVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQztPQUNqQixDQUFDLENBQUM7S0FDTjtHQUNGLENBQUM7Q0FDSCxDQUFDLENBQUM7OztBQ1RILEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxjQUFjLEVBQUU7QUFDakMsa0JBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzVCLFdBQUcsRUFBRSxVQUFVO0FBQ2YsbUJBQVcsRUFBRSxpQ0FBaUM7QUFDOUMsa0JBQVUsRUFBRSxtQkFBbUI7S0FDbEMsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFVO0FBQ2pDLFFBQU87QUFDTixVQUFRLEVBQUUsR0FBRztBQUNiLGFBQVcsRUFBRSwrQkFBK0I7RUFDNUMsQ0FBQztDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnTWVhbmlzY3VsZScsIFsndWkucm91dGVyJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuXG4vL2FwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XG5cbiAgICAvL2lmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG5cbiAgICAvL3ZhciBzb2NrZXQ7XG5cbiAgICAvL2lmICgkbG9jYXRpb24uJCRwb3J0KSB7XG4gICAgICAgIC8vc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6NDU0NScpO1xuICAgIC8vfSBlbHNlIHtcbiAgICAgICAgLy9zb2NrZXQgPSBpbygnLycpO1xuICAgIC8vfVxuXG4gICAgLy9yZXR1cm4gc29ja2V0O1xuXG4vL30pO1xuXG4iLCJhcHAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgLy9jcmVhdGUgb25lIG9mIFRvbmUncyBidWlsdC1pbiBzeW50aGVzaXplcnMgYW5kIGNvbm5lY3QgaXQgdG8gdGhlIG1hc3RlciBvdXRwdXRcblx0dmFyIHN5bnRoID0gbmV3IFRvbmUuU2ltcGxlU3ludGgoKS50b01hc3RlcigpO1xuXG4gICAgdmFyIHNvY2tldCA9IGlvKCk7XG5cbiAgICAkc2NvcGUubm90ZSA9ICdMZWFybiBZb3VyIE5vdGVzISc7XG4gICAgJHNjb3BlLmltYWdlID0gJ25vJztcblxuICAgIHNvY2tldC5vbignbm90ZTpjaGFuZ2UnLCBmdW5jdGlvbihub3RlKSB7XG5cdFx0c3ludGgudHJpZ2dlckF0dGFjayhub3RlKTtcbiAgICAgICAgaWYgKG5vdGUuaW5kZXhPZignIycpID4gLTEpICRzY29wZS5pbWFnZSA9IG5vdGUucmVwbGFjZSgnIycsICdzJyk7XG4gICAgICAgIGVsc2UgJHNjb3BlLmltYWdlID0gbm90ZTtcbiAgICAgICAgJHNjb3BlLm5vdGUgPSBub3RlO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0OnBob25lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNjb25uZWN0ZWQgcGhvbmUnKVxuICAgICAgICBzeW50aC50cmlnZ2VyUmVsZWFzZSgpO1xuICAgIH0pO1xuXG59KTtcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvcHJlLWJ1aWxkL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgIH0pO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ01vZHVsZXNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgTW9kdWxlc0ZhY3RvcnkpIHtcbiAgXG4gICRzY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlZmF1bHRNZXNzYWdlID0gJ0lmIHlvdSBkb25cXCd0IHNlZSBhIGxpc3Qgb2YgbGlua3MgaGVyZSwgeW91IG5lZWQgdG8gc2VlZCB5b3VyIGRhdGFiYXNlIVxcbkluIHlvdXIgdGVybWluYWwsIGdvIHRvIHRoaXMgYXBwXFwncyBkaXJlY3RvcnkgYW5kIHJ1biBgZ3VscCBzZWVkREJgLlxcblRoZW4gdHJ5IHRoaXMgcGFnZSBhZ2Fpbi4nO1xuXG4gICAgTW9kdWxlc0ZhY3RvcnkuZ2V0Tm9kZU1vZHVsZXMoKVxuICAgICAgLnRoZW4oZnVuY3Rpb24obW9kdWxlcykge1xuICAgICAgICAkc2NvcGUubm9kZU1vZHVsZXMgPSBtb2R1bGVzO1xuICAgICAgICBcbiAgICAgICAgaWYgKCEkc2NvcGUubm9kZU1vZHVsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgJHNjb3BlLmRlZmF1bHRNZXNzYWdlID0gZGVmYXVsdE1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9KTtcbn0pOyIsImFwcC5mYWN0b3J5KCdNb2R1bGVzRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0Tm9kZU1vZHVsZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9tb2R1bGVzLycpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgfSk7ICAgIFxuICAgIH1cbiAgfTtcbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21vZHVsZXMnLCB7XG4gICAgICAgIHVybDogJy9tb2R1bGVzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvcHJlLWJ1aWxkL21vZHVsZXMvbW9kdWxlcy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ01vZHVsZXNDb250cm9sbGVyJ1xuICAgIH0pO1xufSk7IiwiYXBwLmRpcmVjdGl2ZShcIm5hdmJhclwiLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiBcIkVcIixcblx0XHR0ZW1wbGF0ZVVybDogXCIvcHJlLWJ1aWxkL25hdmJhci9uYXZiYXIuaHRtbFwiXG5cdH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=