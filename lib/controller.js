var doNothing = function(){ /* do nothing */ };

var controllerWith = function(code){
	return 'with(this){ ' + code + ' }';
}

var Controller = module.exports = function(){
	this.code = doNothing;
};

Controller.prototype.control = function(fighter){
	if (!fighter){return};
	try {
		this.code.call(fighter);
	} catch(error) {
		/* do nothing */
	}
}
Controller.prototype.update = function(code){
	var controlCode = controllerWith(code);
	try {
		this.code = Function(controlCode);
	} catch(error) {
		this.code = doNothing;
	}
}
