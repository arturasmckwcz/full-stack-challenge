FROM node:16-alpine

WORKDIR /usr/arturasmckwcz

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install --pure-lockfile

COPY dist ./dist
COPY src/graphql/schema.graphql ./src/graphql/schema.graphql

EXPOSE 3000

CMD ["yarn", "docker:run"]
