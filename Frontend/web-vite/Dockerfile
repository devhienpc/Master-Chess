# Stage 1 - Build the React app
FROM node:16 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

# Stage 2 - Serve the built app using a web server (e.g., Nginx)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
