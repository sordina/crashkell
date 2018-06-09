FROM sordina/ihaskell:latest

RUN mkdir -p /notebooks
COPY ./notebooks /notebooks/
