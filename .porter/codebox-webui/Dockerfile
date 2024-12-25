FROM harbor.magedu.net/base/node:16.14.2-bullseye-slim as build

ADD . /workspace

WORKDIR /workspace

RUN mkdir -p /target/public \
    && npm install \
    && npm run build \
    && cp -r build /target \
    && cp -r public/build /target/public \
    && cp remix.config.js package.json package-lock.json /target


FROM harbor.magedu.net/base/node:16.14.2-bullseye-slim

WORKDIR /workspace

ENV NODE_ENV=production

COPY --from=build /target /workspace

RUN npm install --ignore-scripts

CMD ["npm", "start"]