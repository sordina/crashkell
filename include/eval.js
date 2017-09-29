
ddd = null;

function hook(el) {
	var code    = $(el).parent(".sourceCode")
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
			var p = $("<pre class='success'></pre>");
					p.text(data.success.stdout);
			results.append(p);
		}
		if(data.error) {
			var p = $("<pre class='error'></pre>");
					p.text(data.error);
			results.append(p);
		}
	}
}

$("code.haskell").click(function(e){
	$.post(
		"/eval",
		{"exp": $(this).text()},
		hook(this)
	)
})
