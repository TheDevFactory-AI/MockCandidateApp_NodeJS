FROM node

WORKDIR /app/backendapp

COPY package.json .

RUN npm install\
        && npm install typescript -g

COPY . /app/backendapp

RUN ["tsc"]

EXPOSE 80

CMD ["node","./dist/app.js"]