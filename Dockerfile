
FROM sordina/ihaskell:0.0.2

USER root
COPY ./notebooks ${HOME}
USER ${NB_USER}

ENV PASSWORD=password

CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--NotebookApp.token=''"]

