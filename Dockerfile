FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy all the files from the project’s root to the working directory
COPY . .

# Install PNPM to 
RUN npm install -g pnpm

# Install Turbo
RUN npm install -g turbo

# Install app dependencies
RUN pnpm install

# Generate Prisma Client
RUN pnpm db:generate

#Install Doppler CLI
# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# Expose the port that your NestJS app will run on
EXPOSE 3002

# Build Nestjs app
RUN pnpm build --filter backend

# Command to run the application
CMD cd apps/backend && doppler run -- pnpm run start:prod