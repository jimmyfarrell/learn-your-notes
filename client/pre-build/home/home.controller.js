app.controller('HomeController', function($scope) {

   //create one of Tone's built-in synthesizers and connect it to the master output
	var synth = new Tone.SimpleSynth().toMaster();

    var socket = io();

    $scope.note = 'Learn Your Notes!';

    socket.on('note:change', function(note) {
		synth.triggerAttack(note);
        $scope.note = note;
    });

    socket.on('disconnect:phone', function() {
        console.log('disconnected phone')
        synth.triggerRelease();
    });

});

