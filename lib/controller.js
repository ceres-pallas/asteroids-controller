var Listener = require('asteroids-listener');
var Recorder = require('./recorder');

var doNothing = function(){ /* do nothing */ };

var controllerWith = function(code){
	var controllerCode = '';
	controllerCode += 'var console = arguments[0]; '
	controllerCode += 'var context = arguments[1]; '
	controllerCode += 'var time = arguments[2]; '
	controllerCode += 'var state = arguments[3]; ';
	controllerCode += 'var asteroids = arguments[4]; '
	controllerCode += 'with(this){ ' + code + ' }';
	return controllerCode;
}

var Controller = module.exports = function(){
	Listener.call(this);
	this.code = doNothing;
};
Controller.prototype = new Listener();
Controller.prototype.control = function(fighter, logger, context, time, state, asteroids){
	if (!fighter){return};
	try {
		var recorder = new Recorder();
		this.code.call(recorder, logger, context, time, state, asteroids);
		recorder.control(fighter);
	} catch(error) {
		this.notifyOf('runtime error');
	}
}
Controller.prototype.update = function(code){
	var controlCode = controllerWith(code);
	try {
		this.code = Function(controlCode);
		this.notifyOf('compiled');
	} catch(error) {
		this.code = doNothing;
		this.notifyOf('compile error');
	}
}
