
FROM sordina/ihaskell:0.0.3

USER ${NB_USER}
COPY ./notebooks ${HOME}
RUN chown ${NB_USER} ${HOME}/*
# USER root

CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--NotebookApp.token=''"]

