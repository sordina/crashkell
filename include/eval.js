
ddd = null;

function hook(el) {
	var elem    = $(el)
	var code    = elem.parent(".sourceCode")
	var results = code.next(".results")
	if(! results[0]) {
		results = $("<div class='results'></div>")
		code.after(results)
	}
	results.empty()
	results.text("Results loading...")

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
						p.text(data.success.stdout);
				results.append(p);
			}
		}
		if(data.error) {
			var p = $("<pre class='error'></pre>");
					p.text(data.error);
			results.append(p);
		}
	}
}

function setup(e){
	var elem   = $(this);
	var parent = elem.parent('.sourceCode');
	var button = $("<button>Run!</button>");

	elem.prop('contenteditable', true);
	parent.append( button );
	button.css({float: "right"})
	button.click(function() {
		var text = elem.text();
		console.log(text)
		$.post(
			"/eval",
			{"exp": text },
			hook(elem)
		)
	})
}

$("code.haskell").each( setup );
