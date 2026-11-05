FROM node:20-alpine AS deps
WORKDIR /app
COPY landing-frontend/package.json landing-frontend/package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY landing-frontend/ .
RUN npm run build

FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY landing-frontend/package.json landing-frontend/package-lock.json* ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY landing-frontend/package.json ./
EXPOSE 80
CMD ["npm", "run", "start"]
