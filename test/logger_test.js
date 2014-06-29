var expect = require('chai').expect;

var Logger = require('../lib/logger.js');

describe('Logger', function(){
	it('should exist', function() {
        expect(Logger).to.exist;
    });

    it('should be a constructor', function() {
        expect(Logger).to.be.a('function');
    });


	['log', 'lines'].forEach(function(method){
		it('should respond to ' + method, function(){
			expect(new Logger()).to.respondTo(method);
		});
	});

	describe('log', function(){
		var logger;

		beforeEach(function(){
			logger = new Logger();
		});

		it('should record history of the arguments', function(){
			logger.log('Hello World');

			expect(logger.lines()).to.deep.equal([['Hello World']]);
		});

		it('should record history of the arguments', function(){
			logger.log('Hello World');
			logger.log('Goodbye World');

			expect(logger.lines()).to.deep.equal([['Hello World'], ['Goodbye World']]);
		});
	});
});
