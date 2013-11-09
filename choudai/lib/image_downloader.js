var ImageDownloader = (function() {
	var constructor = function() {
		this.zip = new JSZip();
		this.images = this.zip.folder('images');
	}

	constructor.prototype.download = function(urlList, successCallback, failedCallback, progressCallback, finishCallback) {
		if(urlList.length <= 0) {
			return;
		}
		var promises = [];
		for(i = 0; i < urlList.length; i++) {
			promises.push(this.execute(urlList[i], successCallback, failedCallback, progressCallback));
		}
		var context = this;
		$.when.apply(null, promises).done(function() {
			context.onFinished(finishCallback);
		});
	}

	constructor.prototype.execute = function(url, successCallback, failedCallback, progressCallback) {
		return $.ajax({
					context: this,
					url: url,
					dataType: 'text',
					beforeSend: function(x) {
						this.onBeforeSend(x);
					},
					success: function(data) {
						this.onSuccess(url, data, successCallback, failedCallback);
					},
					error: function() {
						this.onFailed(url, failedCallback);
					},
					complete: function() {
						this.onProgress(url, progressCallback);
					}
				});
	}

	constructor.prototype.onBeforeSend = function(x) {
		x.overrideMimeType('text/plain; charset=x-user-defined');
	}

	constructor.prototype.onSuccess = function(url, data, successCallback, failedCallback) {
		var bytes = "";
		for(i = 0; i < data.length; i++) {
			bytes += String.fromCharCode(data.charCodeAt(i) & 0xff);
		}
		var result = this.images.file(url.match(".+/(.+?)([\?#;].*)?$")[1], bytes, {
			base64: false,
			binary: true
		});
		if(result == null) {
			this.onFailed(url, failedCallback);
			return;
		}
		if(successCallback == null) {
			return;
		}
		successCallback(url);
	}

	constructor.prototype.onFailed = function(url, failedCallback) {
		if(failedCallback == null) {
			return;
		}
		failedCallback(url);
	}

	constructor.prototype.onProgress = function(url, progressCallback) {
		if(progressCallback == null){
			return;
		}
		progressCallback(url);
	}

	constructor.prototype.onFinished = function(finishCallback) {
		var blob = this.zip.generate({
			type:"blob",
			compression: 'STORE'
		});
		var href = URL.createObjectURL(blob);
        if(finishCallback == null) {
        	return;
        }
        finishCallback(href);
	}

	return constructor;	
})();