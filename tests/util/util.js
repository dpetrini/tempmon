var arraySum = function (arr) {
	var sum = 0;
	for (let i=0,  max = arr.length; i < max; i++)
		sum += (isNaN(arr[i])? 0 : arr[i]);
	return sum;
};

module.exports = {
	arraySum: arraySum
};