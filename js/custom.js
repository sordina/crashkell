/*
$('.hint').addClass('hidden-hint')
$('.hint').click(function(){$(this).removeClass('hidden-hint')})
*/

$('.hint').hide()
$('.hint').each(function(){
	var h = $(this)
	var c = $("<h3 style='cursor: pointer;'>Click for hint...</h3>")
	h.before(c)
	c.click(function(){
		c.hide('slow')
		h.show('slow')
	})
})
