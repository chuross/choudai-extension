$(function() {
	$(document).ready(function() {
		onReady();
	});
});

function onReady() {
	var choudai = new Choudai();
	init(choudai);
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		executeParseImage(choudai, tabs[0].url);
	});
}

function init(choudai) {
	setVisibility('#choudai-container .header', false);
	$('#choudai-container .header .header-savezip').click(function() {
		onSaveZipButtonClick(choudai);
	});
	$('#choudai-container .header .header-checkall').click(function() {
		onCheckAllButtonClick();
	});
	$('#choudai-container .header .header-cancelall').click(function() {
		onCancelAllButtonClick();
	});
	setVisibility('#choudai-container .items', false);
	setVisibility('#choudai-container #download', false);
	setVisibility('#choudai-container #progress', false);
}

function onSaveZipButtonClick(choudai) {
	var imageUrlList = [];
	var checkedImages = $('#choudai-container .items .item .item-checkbox').filter(':checked');
	if(checkedImages.length <= 0) {
		return;
	}
	checkedImages.each(function(index, element) {
		imageUrlList.push($(element).parent().find('img').attr('src'));
	});
	$('#choudai-container .download-status-total').text(imageUrlList.length);
	setVisibility('#choudai-container .header', false);
	setVisibility('#choudai-container .items', false);
	setVisibility('#choudai-container .download-result', false);
	setVisibility('#choudai-container #download', true);
	setVisibility('#choudai-container #progress', true);
	progress(false);
	choudai.download(imageUrlList, function() {
		var element = $('#choudai-container .download-status-success');
		element.text(parseInt(element.text()) + 1);
	}, function() {
		var element = $('#choudai-container .download-status-failed');
		element.text(parseInt(element.text()) + 1);
	}, function() {
		var element = $('#choudai-container .download-status-current');
		element.text(parseInt(element.text()) + 1);
		progress(Math.floor(parseInt(element.text()) / parseInt($('#choudai-container .download-status-total').text()) * 100));
	}, function(url) {
		setVisibility('#choudai-container #download-progress', false);
		setVisibility('#choudai-container .download-result', true);
		$('#choudai-container .download-ziplink').attr('href', url).attr('download', new Date().getTime() + '.zip');
	});
}

function onCheckAllButtonClick() {
	$('#choudai-container .items .item .item-checkbox').prop('checked', true);
}

function onCancelAllButtonClick() {
	$('#choudai-container .items .item .item-checkbox').prop('checked', false);
}


function executeParseImage(choudai, entryUrl) {
	choudai.parse(entryUrl, function(imageUrlList) {
		onParseSuccess(imageUrlList);
	}, null);
}

function onParseSuccess(imageUrlList) {
	if(imageUrlList.length <= 0) {
		appendMessage("画像がありませんでした...");
		return;
	}
	$('#choudai-container .header').css('display', 'block');
	$('#choudai-container .loader').css('display', 'none');
	$('#choudai-container .items').css('display', 'block');
	for(i = 0; i < imageUrlList.length; i++) {
		appendItem(imageUrlList[i]);
	}
	$('#choudai-container .item-image').click(function(event) {
		onItemClick($(event.target).parent());
	});
}

function appendItem(href) {
	if(href == null) {
		return;
	}
	$('#choudai-container .items').append('<div class="item"><div class="item-image-box"><input type="checkbox" class="item-checkbox" /><img class="item-image" src="' + href + '" alt="" /></div></div>');
}

function onItemClick(element) {
	var checkbox = $(element).find('input[type = checkbox]');
	$(checkbox).prop('checked', !checkbox.is(':checked'));
}

function appendMessage(value) {
	setVisibility('.loader', false);
	$('#choudai-container').append('<div class="message">' + value + '</div>');
}

function setVisibility(element, visibility) {
		$(element).css('display', visibility ? 'block' : 'none');
}

function progress(value) {
	$('#choudai-container .download-progress-progressbar').progressbar({
		value: value
	});
}