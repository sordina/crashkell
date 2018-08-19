/*
$('.hint').addClass('hidden-hint')
$('.hint').click(function(){$(this).removeClass('hidden-hint')})
*/

$('.hint').hide()
$('.hint').each(function(){
	var h = $(this)
	var c = $("<span style='font-weight: bold; color: #116; cursor: pointer;'>Click for hint...</span>")
	h.before(c)
	c.click(function(){
		c.hide()
		h.show('slow')
	})
})

var toc = $('#crashkell-toc')
var tocp = toc.parent()
var c = $('<h3 style="cursor: pointer; color: #116;">Click for table of contents...</h3>')
tocp.before(c)
tocp.hide()
c.click(function(){
	$(this).hide()
	tocp.show('slow')
})
