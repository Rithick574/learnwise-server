FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]