var expect = require('chai').expect;

var Controller = require('../lib/controller.js');

describe('Controller', function() {
    it('should exist', function() {
        expect(Controller).to.exist;
    });

    it('should be a constructor', function() {
        expect(Controller).to.be.a('function');
    });
});
