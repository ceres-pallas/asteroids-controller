var expect = require('chai').expect;

var Recorder = require('../lib/recorder');

describe('Recorder', function(){
    it('should exist', function() {
        expect(Recorder).to.exist;
    });

    it('should be a constructor', function() {
        expect(Recorder).to.be.a('function');
    });

	[
		'speedUp',
		'slowDown',
		'rotateLeft',
		'rotateRight',
		'turnLeft',
		'turnRight'
	].forEach(function(method){
		it('should respond to ' + method, function(){
			var recorder = new Recorder();

			expect(recorder).to.respondTo(method);
		});

		it('should set method', function(){
			var recorder = new Recorder();

			recorder[method]();

			expect(recorder.method).to.equal(method);
		});

		it('should receive arguments', function(){
			var recorder = new Recorder();

			recorder[method](37);

			expect(recorder.arguments).to.deep.equal([37])
		});
	});

	describe('control', function(){
		var controller;

		beforeEach(function(){
			controller = new Recorder();
		});

		it('should not perform without recording', function(){
			var target = new Recorder();

			controller.control(target);

			expect(target.method).to.be.undefined;
		});

		[
			'speedUp',
			'slowDown',
			'rotateLeft',
			'rotateRight',
			'turnLeft',
			'turnRight'
		].forEach(function(method){
			it('should perform ' + method, function(){
				controller[method]();
				var target = new Recorder();

				controller.control(target);

				expect(target.method).to.equal(method);
			});

			it('method should be undefined afterwards', function(){
				controller[method]();
				var target = new Recorder();

				controller.control(target);

				expect(controller.method).to.be.undefined;
			});

			it('should pass arguments', function(){
				controller[method](37);
				var target = new Recorder();

				controller.control(target);

				expect(target.arguments).to.deep.equal([37]);
			});

			it('arguments should be undefined afterwards', function(){
				controller[method]();
				var target = new Recorder();

				controller.control(target);

				expect(controller.arguments).to.be.undefined;
			});
		});
	});
});
