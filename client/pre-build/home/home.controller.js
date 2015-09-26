Number.prototype.freq_map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


app.controller('HomeController', function($scope, $http) {
  
  var C4 = 261.63;
  var C6 = 1046.50;
  var BETA_MIN = -45;
  var BETA_MAX = 45;

   //create one of Tone's built-in synthesizers and connect it to the master output
	var synth = new Tone.SimpleSynth().toMaster();
	var tone = new Tone();

	window.addEventListener('deviceorientation', function(event) {
  		console.log("Orientation val: " + event.beta);
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
		$scope.msgFromScope = "I'm playing " + note + ".\n" +
								"My frequency is " + freq + "Hz\n" +
								"\nbecause the phone's orientation is " + orientation;
  		$scope.$digest();


		synth.triggerAttack(note);
	}); 
	
	


});

