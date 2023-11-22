ARG NODE_VERSION

FROM node:$NODE_VERSION-alpine

RUN mkdir -p /usr/app
COPY . /usr/app/
WORKDIR /usr/app
RUN npm ci
RUN npm run build

ENV NODE_ENV="production"

RUN npm ci --omit=dev
RUN chown -R node:node /usr/app
USER node

CMD npm start
