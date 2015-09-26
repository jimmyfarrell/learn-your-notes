app.controller('HomeController', function($scope) {

   //create one of Tone's built-in synthesizers and connect it to the master output
	var synth = new Tone.SimpleSynth().toMaster();

    var socket = io();

    $scope.note = 'Learn Your Notes!';
    $scope.image = 'no';

    socket.on('note:change', function(note) {
		synth.triggerAttack(note);
        if (note.indexOf('#') > -1) $scope.image = note.replace('#', 's');
        else $scope.image = note;
        $scope.note = note;
        $scope.$digest();
    });

    socket.on('disconnect:phone', function() {
        console.log('disconnected phone')
        synth.triggerRelease();
    });

});

