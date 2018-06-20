
FROM sordina/ihaskell:0.0.3

COPY ./notebooks ${HOME}
# USER root
# USER ${NB_USER}

CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--NotebookApp.token=''"]

