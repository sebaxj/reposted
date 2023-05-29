# Building...
FROM node:alpine as builder

# Set working directory
WORKDIR /usr/app

# Copy dependencies for build
COPY package.json .
RUN npm cache clean --force && npm install

# Copy source code
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./base.json .

# Build the app
RUN npm run build

# Running...
FROM node:alpine

# Set working directory
WORKDIR /usr/app
COPY ./.env .
COPY ./package.json .
COPY --from=builder /usr/app/package-lock.json .
RUN npm cache clean --force && npm ci --only=production

# Copy build directory from builder stage
COPY --from=builder /usr/app/build ./build

# Run
EXPOSE ${NODE_DOCKER_PORT}
CMD ["npm", "run", "start"]
