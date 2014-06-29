var expect = require('chai').expect;

var Controller = require('../lib/controller.js');
var Fighter = require('asteroids-fighter');

describe('Controller', function() {
    it('should exist', function() {
        expect(Controller).to.exist;
    });

    it('should be a constructor', function() {
        expect(Controller).to.be.a('function');
    });

    it('should be an instance of listener', function() {
        expect(new Controller()).to.be.a.instanceof(require('asteroids-listener'));
    });

	describe('control', function(){
		var fighter;

		beforeEach(function(){
			fighter = new Fighter(function(fighter){
				fighter.orientation(0);
				fighter.heading(0);
				fighter.speed(0);
			}, { speedIncrement: 1, rotation: Math.PI/12 });
		});

		it('should do nothing per default', function(){
			var controller = new Controller();

			controller.control(fighter);

			expect(fighter.orientation()).to.equal(0);
			expect(fighter.heading()).to.equal(0);
			expect(fighter.speed()).to.equal(0);
		});

		[
			{ code: 'speedUp();',     orientation: 0,            heading: 0,           speed: 1 },
			{ code: 'rotateLeft();',  orientation: Math.PI/12 ,  heading: 0,           speed: 0 },
			{ code: 'rotateRight();', orientation: -Math.PI/12,  heading: 0,           speed: 0 },
			{ code: 'turnLeft();',    orientation: 0,            heading: Math.PI/12,  speed: 0 },
			{ code: 'turnRight();',   orientation: 0,            heading: -Math.PI/12, speed: 0 },
			{ code: 'rotateLeft(true);',  orientation:Math.PI/12, heading:Math.PI/12, speed:0 },
			{ code: 'rotateRight(true);', orientation:-Math.PI/12,heading:-Math.PI/12,speed:0 },
			{ code: 'turnLeft(true);',    orientation:Math.PI/12, heading:Math.PI/12, speed:0 },
			{ code: 'turnRight(true);',   orientation:-Math.PI/12,heading:-Math.PI/12,speed:0 },
		].forEach(function(testCase){
			it('should perform ' + testCase.code, function(){
				var controller = new Controller();
				controller.update(testCase.code);

				controller.control(fighter);

				expect(fighter.orientation()).to.equal(testCase.orientation);
				expect(fighter.heading()).to.equal(testCase.heading);
				expect(fighter.speed()).to.equal(testCase.speed);
			});
		});

		it('should be able to fire', function(){
			var called = false;
			fighter.addListener('fire', function(){ called = true; });
			var controller = new Controller();
			controller.update('fire();');

			controller.control(fighter);

			expect(called).to.be.ok;
		});

		it('should flag not \'compiling\' code',function(){
			var flagged = false;
			var controller = new Controller();
			controller.addListener('compile error', function(){ flagged = true });

			controller.update('{');

			expect(flagged).to.be.ok;
		});

		it('should flag not \'running\' code',function(){
			var flagged = false;
			var controller = new Controller();
			controller.addListener('runtime error', function(){ flagged = true });
			controller.update('foo.bar;');

			controller.control(fighter);

			expect(flagged).to.be.ok;
		});

		it('should only execute last statement', function(){
			var controller = new Controller();
			controller.update('speedUp(); turnLeft();');

			controller.control(fighter);

			expect(fighter.speed()).to.equal(0);
			expect(fighter.heading()).to.equal(Math.PI/12);
		});

		it('should have a \'time\' parameter', function(){
			var controller = new Controller();
			controller.update('if(time === 1) { turnLeft(); } else { turnRight(); }');

			controller.control(fighter, 1);

			expect(fighter.heading()).to.equal(Math.PI/12);
		});

		it('should have a \'state\' parameter', function(){
			var controller = new Controller();
			controller.update('if(state) { turnLeft(); } else { turnRight(); }');

			controller.control(fighter, 0, {});

			expect(fighter.heading()).to.equal(Math.PI/12);
		});

		it('should have a \'asteroids\' parameter', function(){
			var controller = new Controller();
			controller.update('if(asteroids.length > 0) { turnLeft(); } else { turnRight(); }');

			controller.control(fighter, 0, {}, [1]);

			expect(fighter.heading()).to.equal(Math.PI/12);
		});
	});
});
