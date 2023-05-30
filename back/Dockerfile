FROM node:16-alpine

WORKDIR /usr/arturasmckwcz

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install --pure-lockfile

COPY dist ./dist
COPY src/graphql/schema.graphql ./src/graphql/schema.graphql
COPY src/db/images ./src/db/images

EXPOSE 3000

CMD ["yarn", "docker:run"]
