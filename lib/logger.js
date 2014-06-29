var Logger = module.exports = function(){
	this.history = [];
};
Logger.prototype.log = function(){
	this.history.push(Array.prototype.slice.call(arguments));
};
Logger.prototype.lines = function(){
	return this.history.map(function(args){ return args });
};
