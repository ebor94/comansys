FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm uninstall tailwindcss postcss autoprefixer
RUN npm install tailwindcss@3.4.1 postcss autoprefixer

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]