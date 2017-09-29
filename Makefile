

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
	commando -p cat | grep --line-buffered 'md\|Make\|css\|js' | conscript make display-html

.PHONY: devel
open-devel:
	open crashkell.html
	make devel

.PHONY: display-html
display-html:
	@ make crashkell.html
	@ chromereload crashkell

.PHONY: progress
progress:
	grep '^\#' crashkell.md

crashkell.html: crashkell.md include/scripts.html include/css.html
	@ echo building
	@ cat crashkell.md            \
	  | pandoc --toc --toc-depth=2 -s      \
	    -H include/css.html                \
	    -H include/javascript.html         \
	    -A include/scripts.html            \
	-o crashkell.html
	@ echo built!

crashkell_inline.html: crashkell.html
	inliner -m crashkell.html > crashkell_inline.html
