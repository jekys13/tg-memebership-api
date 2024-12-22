FROM node:18-alpine

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      librdkafka \
      py3-pip \
      python3 \
      dumb-init

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers bash

RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY ./src /app/src/

RUN yarn build

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

ENV NODE_ENV=production

USER node

CMD ["sh", "-c", "node dist/index.js"]