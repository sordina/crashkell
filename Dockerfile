FROM sordina/ihaskell:0.0.1

RUN mkdir -p /notebooks
COPY ./notebooks /notebooks/

EXPOSE 8888/tcp

USER ${NB_UID}
