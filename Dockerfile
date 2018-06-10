FROM sordina/ihaskell:latest

RUN mkdir -p /notebooks
COPY ./notebooks /notebooks/

EXPOSE 8888/tcp
