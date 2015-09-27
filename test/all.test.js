// --------------------
// bunyanesque module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	bunyanesque = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

describe('Tests', function() {
	it.skip('all', function() {
		expect(bunyanesque).to.be.ok;
	});
});
