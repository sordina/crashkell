

function makeResults(elem) {
	var code    = elem.parent(".sourceCode")
	var parent  = code.parent("div.sourceCode")
	var wrapper = parent.next(".results-wrapper")
  var results = wrapper.find('.results')
	if(! results[0]) {
		var wrapper = $("<div class='results-wrapper'></div>")
		results     = $("<div class='results'></div>")
		wrapper.append(results)
		parent.after(wrapper)
	}
	results.empty()
	results.text("Results loading...");
	return results;
}

function nextWhy(e) {
	if(!e) { return; }
	if(!e[0]) { return; }
	if(e.prop("tagName").match(/^H/)) { return; }
	if(e.hasClass('why')) { return e; }
	return nextWhy(e.next());
}

function hook(el) {
	var elem    = $(el);
	var why     = nextWhy(elem.closest('div.sourceCode'))
	var results = makeResults(elem);

	return function(data) {
		console.log(data)
		data = $.parseJSON(data)

		results.empty()
		if(data.success) {
			if(data.success.value !== "()") {
				var valueText = data.success.value + "\n :: " + data.success.type;;
				var p = $("<pre class='success value'></pre>");
						p.text(valueText);
				results.append(p);
			}
			if(data.success.stdout[0]) {
				var p = $("<pre class='success stdout'></pre>");
				if(data.success.stdout[1]) {
						p.text("\n\n" + data.success.stdout.join(""));
					results.append(p);
				} else {
						p.text(data.success.stdout[0]);
					results.append(p);
				}
			}
		}
		if(data.error) {
			var p      = $("<pre class='error'></pre>");
			var button = $("<button>y tho</button>");
			button.css({float: "right"})
			button.click( function(){
					why.slideDown('slow');
					button.hide();
			});
			p.text(data.error);
			if(why && why[0] && ! why.is(':visible')) {
				console.log('why')
				console.log(why)
				p.prepend(button);
			}
			results.append(p);
		}
	}
}

function networkError(elem) {
	return function(data, status, msg) {
		console.log(data);
		console.log(status);
		console.log(msg);
		var results = makeResults(elem);
		var p = $("<pre class='error network'></pre>");
				p.text(status);
		results.empty()
		results.append(p);
	}
}

function tabCatcher(elem, button) {
	return function(e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode == 9) {
			console.log("catching tabs")
			e.preventDefault();
			button.focus()
		}
	}
}

function setup(e){
	var elem   = $(this);
	var parent = elem.parent('.sourceCode');
	var button = $("<button>Run!</button>");
	var why    = $(".why")

	why.hide()
	elem.prop('contenteditable', true);
	elem.on('keydown', tabCatcher(elem, button));
	parent.prepend( button );
	button.css({float: "right"})
	button.click(function() {
		var text = elem.text();
		console.log(text)
		$.post(
			"/eval",
			{"exp": text },
			hook(elem)
		).fail(networkError(elem))
	})
}

$.post(
	"/eval",
	{"exp": "1+1" },
	function(data) {
		console.log("Successful evaluation test, setting up");
		console.log(data);
		$("code.haskell").each( setup );
	}
).fail( function(error) {
	console.log("evaluation failed...");
	console.log(this);
	console.log(error);
})
