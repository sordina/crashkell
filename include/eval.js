
ddd = null;

function makeResults(elem) {
	var code    = elem.parent(".sourceCode")
	var results = code.next(".results")
	if(! results[0]) {
		results = $("<div class='results'></div>")
		code.after(results)
	}
	return results;
}

function hook(el) {
	var elem    = $(el);
	var results = makeResults(elem);
	results.empty();
	results.text("Results loading...");

	return function(data) {
		console.log(data)
		data = $.parseJSON(data)
		ddd  = data;

		results.empty()
		if(data.success) {
			if(data.success.value !== "()") {
				var p = $("<pre class='success value'></pre>");
						p.text(data.success.value);
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
			var p = $("<pre class='error'></pre>");
					p.text(data.error);
			results.append(p);
		}
	}
}

function error(elem) {
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
		).fail(error(elem))
	})
}

$("code.haskell").each( setup );
