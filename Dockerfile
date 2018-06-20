
FROM sordina/ihaskell:0.0.3

USER root
COPY ./notebooks ${HOME}
USER ${NB_USER}

CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--NotebookApp.token=''"]

