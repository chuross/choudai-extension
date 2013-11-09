var ImageEntryParser = (function() {
	var constructor = function() {
	}

	constructor.prototype.parse = function(url, successCallback, errorCallback) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function(data) {
				onSuccess(data, successCallback);
			},
			error: function() {
				onError(errorCallback);
			}
		});
	}

	function onSuccess(data, successCallback) {
		var objects = $(data).find('a[href $= ".jpg"], a[href $= ".jpeg"], a[href $= ".gif"], a[href $= ".png"]');
		var results = [];
		objects.each(function(index, element) {
			results.push(element.href);
		});
		if(successCallback == null) {
			return;
		}
		successCallback(results);
	}

	function onError(errorCallback) {
		if(errorCallback == null) {
			return;
		}
		errorCallback();
	}

	return constructor;
})();