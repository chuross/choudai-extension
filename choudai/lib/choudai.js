var Choudai = (function() {
	var constructor = function() {
		this.parser = new ImageEntryParser();
		this.downloader = new ImageDownloader();
	}

	constructor.prototype.parse = function(entryUrl, successCallback, errorCallback) {
		this.parser.parse(entryUrl, successCallback, errorCallback);
	}

	constructor.prototype.download = function(imageUrlList, successCallback, progressCallback, failedCallback, finishCallback) {
		this.downloader.download(imageUrlList, successCallback, progressCallback, failedCallback, finishCallback);
	}

	return constructor;
})();