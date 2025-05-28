FROM node:slim
ENV NODE_ENV development

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install


COPY . .

CMD npm tsc
CMD node dist/index.js
EXPOSE 2705