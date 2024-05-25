FROM node:alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["pnpm", "start"]

