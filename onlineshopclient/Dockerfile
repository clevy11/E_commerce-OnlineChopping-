# base node image
FROM node:18-bullseye-slim as base

# Install npm
RUN npm i -g serve

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json package-lock.json ./
# Instruct npm to install all dependencies, regardless of NODE_ENV
RUN npm i --frozen-lockfile --prod=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --prod

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

# ADD prisma .
# RUN npx prisma generate

ADD . .
# RUN npm run postinstall
RUN npm run build

# Run migrations
# ARG DATABASE_URL
# RUN npm deploy:db

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
# COPY --from=build /myapp/node_modules/prisma /myapp_node_modules/prisma
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public

ADD . .

# RUN npx prisma generate

# If you would like to explicitly set a port: https://docs.railway.app/guides/public-networking#user-defined-port
# ENV PORT 8080
# EXPOSE 8080

CMD ["npm", "start"]