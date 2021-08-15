FROM debian:latest

RUN apt-get update && apt-get clean && apt-get install bash curl unzip ffmpeg -y

RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh -s v1.13.0 \
  && export DENO_INSTALL="/root/.local" \
  && export PATH="$DENO_INSTALL/bin:$PATH"