FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG BUILD_MODE=production
ARG VITE_APP_ENV
ARG VITE_STAGING_USERS
ARG VITE_FORMSPREE_ENDPOINT
ARG VITE_GTM_ID
ARG VITE_CLARITY_ID
ENV VITE_APP_ENV=${VITE_APP_ENV}
ENV VITE_STAGING_USERS=${VITE_STAGING_USERS}
ENV VITE_FORMSPREE_ENDPOINT=${VITE_FORMSPREE_ENDPOINT}
ENV VITE_GTM_ID=${VITE_GTM_ID}
ENV VITE_CLARITY_ID=${VITE_CLARITY_ID}
RUN npm run build:${BUILD_MODE}

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
