FROM node:14 AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn global add @nestjs/cli
RUN yarn install --production=true

COPY . .

RUN yarn build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]