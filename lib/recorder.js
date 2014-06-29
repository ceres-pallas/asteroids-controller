var Recorder = module.exports = function(){
	this.method = undefined;
	this.arguments = undefined;
};

[
		'speedUp',
		'slowDown',
		'rotateLeft',
		'rotateRight',
		'turnLeft',
		'turnRight'
].forEach(function(method){
	Recorder.prototype[method] = function(){
		this.method = method;
		this.arguments = Array.prototype.slice.call(arguments);
	}
});

Recorder.prototype.control = function(fighter){
	if (this.method) {
		fighter[this.method].apply(fighter, this.arguments);
		this.method = undefined;
		this.arguments = undefined;
	}
}
