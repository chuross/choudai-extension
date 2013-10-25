$(function() {
	$(document).ready(function(){
		onReady();
	});
});

function onReady() {
	chrome.tabs.getSelected(null, function(tab) {
		executeParseHtml(tab.url);
	});
}

function executeParseHtml(url) {
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'html',
		success: function(data) {
			onSuccess(data);
		},
		error: function() {
			onError();
		}
	});
}

function onSuccess(data) {
	objects = $(data).find('a[href $= ".jpg"], a[href $= ".jpeg"], a[href $= ".gif"], a[href $= ".png"]');
	if(objects.length <= 0) {
		appendEmpty();
		return;
	}
	$('body').empty();
	objects.each(function(index, element) {
		appendItem(element);
	});
}

function appendEmpty() {
	appendMessage("画像がありませんでした...");
}

function appendItem(element) {
	if(element.href == null) {
		return;
	}
	$('body').append('<a class="item" href="' + element.href + '" target="blank"><img class="itemImg" src="' + element.href + '" alt="" /></a>');
}

function onError() {
	appendMessage("通信に失敗しました");
}

function appendMessage(value) {
	$('body').empty().append('<div class="message">' + value + '</div>');
}