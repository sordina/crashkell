FROM fpco/stack-build:lts-11.4

RUN apt-get update && apt-get install -y python3-pip libgmp-dev libmagic-dev libtinfo-dev libzmq3-dev libcairo2-dev libpango1.0-dev libblas-dev liblapack-dev gcc g++ && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install -U jupyter

ENV LANG en_US.UTF-8
ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/${NB_USER}

RUN adduser --disabled-password \
    --gecos "Default user" \
    --uid ${NB_UID} \
    ${NB_USER}

USER root
RUN chown -R ${NB_UID} ${HOME}
USER ${NB_USER}

ENV PATH $(stack path --local-install-root)/bin:$(stack path --snapshot-install-root)/bin:$(stack path --compiler-bin):${HOME}/.local/bin:${PATH}
RUN stack config set system-ghc --global true
RUN stack install ihaskell
RUN ihaskell install --stack

WORKDIR ${HOME}

USER root
RUN mkdir -p /notebooks
COPY ./notebooks /notebooks/
USER ${NB_USER}

ENV PASSWORD=password

CMD ["jupyter", "notebook", "--ip", "0.0.0.0", "--NotebookApp.token=''"]

