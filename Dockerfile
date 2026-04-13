FROM node:22-alpine
WORKDIR /app
ARG CACHE_BUST=4
COPY app/package*.json ./
RUN npm install
COPY app/ ./
COPY harmony-data/ /harmony-data/
COPY harmony-styles/ /harmony-styles/
COPY reference-components/ /reference-components/
RUN npm run build
FROM caddy:alpine
COPY --from=0 /app/dist /srv
EXPOSE 80