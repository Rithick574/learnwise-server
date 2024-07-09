FROM node:alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN ls -al

RUN pnpm build

EXPOSE 4006

CMD ["pnpm", "start"]

