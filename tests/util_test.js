var assert =require ('assert');
var util = require ('./util');


suite('arraySum', function() {
	test('should sum the array [1,2,3]', function () {
		var sum = util.arraySum([1,2,3]);
		assert.equal(sum,6);
	});
	test('should sum the array [1,2,3,10]', function () {
		var sum = util.arraySum([1,2,3, 10]);
		assert.equal(sum,16);
	});
	test('should sum the array [0,0,7]', function () {
		var sum = util.arraySum([0,0,7]);
		assert.equal(sum,7);
	});
	test('should sum the array [-1,-3]', function () {
		var sum = util.arraySum([-1,-3]);
		assert.equal(sum,-4);
	});
	test('should sum the array [0,null]', function () {
		var sum = util.arraySum([0,null]);
		assert.equal(sum,0);
	});
	test('should sum the array [0,undefined]', function () {
		var sum = util.arraySum([0, undefined]);
		assert.equal(sum,0);
	});					
});
