

DATE = $(shell date +"%Y%m%d")

.PHONY: help
help:
	@echo
	@echo Targets:
	@echo
	@grep '^[a-z]' Makefile | sed 's/^/    /g; s/:.*//'
	@echo

.PHONY: all
all: crashkell.html crashkell_inline.html

.PHONY: devel
devel:
	open crashkell.html
	commando -p cat | grep --line-buffered casestudy.md | conscript make display-html

.PHONY: display-html
display-html:
	@ make crashkell.html
	@ chromereload crashkell

.PHONY: progress
progress:
	grep '^\#' crashkell.md

crashkell.html: crashkell.md
	@ cat crashkell.md            \
	  | pandoc --toc --toc-depth=2 -s      \
	    -H include/css.html                \
	    -H include/javascript.html         \
	    -A include/scripts.html            \
	-o crashkell.html

crashkell_inline.html: crashkell.html
	inliner -m crashkell.html > crashkell_inline.html
