document.addEventListener('DOMContentLoaded', onContentLoaded, false);

function onContentLoaded() {
	addReviewCountOption();
	
	observeDOM(document.getElementById('main'), function(mutations) {	
		// Ignore our own change (addition of the option)
		for (var i = 0; i < mutations.length; i++) {
			if (mutations[i].target.id == 'resultsCol') {
				return;
			}
		}
		
		addReviewCountOption();
	});
}

function addReviewCountOption() {
	var sortSelectElement = document.getElementById("sort");

	if (sortSelectElement != null && sortSelectElement.tagName == 'SELECT') {
		var sortedReviewCount = false;
		
		if (getParameterByName('sort') == 'review-count-rank') {
			sortedReviewCount = true;
		}
		
		var options = sortSelectElement.options;
				
		for (var i= 0; i < options.length; i++) {
			if (options[i].value === 'price-desc-rank' || options[i].value === 'smooth-review-rank') {
				if (options[i + 1] == null || options[i + 1].value !== 'review-count-rank') {
					var numReviewsOption = document.createElement('option');
					numReviewsOption.value = 'review-count-rank';
					numReviewsOption.text = 'Number of Reviews';
					
					options.add(numReviewsOption, i + 1);
				}
				
				if (sortedReviewCount) {
					sortSelectElement.selectedIndex = i + 1;
				}
				
				break;
			}
		}
	}
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback) {
        if (MutationObserver) {
            var obs = new MutationObserver(function(mutations, observer){
                if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                    callback(mutations);
				}
            });

            obs.observe( obj, { childList:true, subtree:true });
        }
        else if(eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}