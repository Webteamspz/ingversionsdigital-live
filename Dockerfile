FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Public analytics IDs. src/gtm.js only loads them after cookie consent;
# never hardcode them in index.html.
ARG VITE_GTM_ID=GTM-P5BGX7H7
ARG VITE_CLARITY_ID=wqx46kxwy8
ENV VITE_GTM_ID=$VITE_GTM_ID VITE_CLARITY_ID=$VITE_CLARITY_ID
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
