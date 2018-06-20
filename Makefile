all:
	@echo crashaskell-workshop-24233
	docker build -t crashaskell-workshop-24233 . 1>&2
	docker run -it -p 8888:8888 -v `pwd`/notebooks:/home/jovyan/notebooks crashaskell-workshop-24233
