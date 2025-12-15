<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Practice GraphQL API

A NestJS-based GraphQL API for practicing GraphQL concepts, including authentication, user management, posts, file uploads, and real-time subscriptions.

## Features

- **Authentication**: JWT-based authentication with register and login
- **User Management**: Update user profiles
- **Posts**: Create, read, update, delete posts with file uploads
- **File Uploads**: Image uploads using Cloudinary
- **Real-time Subscriptions**: GraphQL subscriptions for post creation and deletion events
- **Database**: MongoDB with Mongoose

## Tech Stack

- **Framework**: NestJS
- **GraphQL**: Apollo Server
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, Passport
- **File Storage**: Cloudinary
- **Language**: TypeScript

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary account (for file uploads)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AneshEbp/praticeGql.git
   cd praticeGql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/practicegql
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start MongoDB (if running locally)

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The server will start on `http://localhost:3000` with GraphQL playground at `http://localhost:3000/graphql`.

## Usage

### Authentication

Register a new user:
```graphql
mutation {
  register(registerUserInput: {
    username: "testuser"
    email: "test@example.com"
    password: "password123"
  }) {
    access_token
    user {
      id
      username
      email
    }
  }
}
```

Login:
```graphql
mutation {
  login(loginUserInput: {
    email: "test@example.com"
    password: "password123"
  }) {
    access_token
    user {
      id
      username
      email
    }
  }
}
```

### Posts

Create a post (include JWT token in Authorization header):
```graphql
mutation($file: Upload!) {
  createPost(createPostInput: {
    title: "My Post"
    content: "Post content"
  }, file: $file) {
    id
    title
    content
    imageUrl
    author {
      username
    }
  }
}
```

Get posts:
```graphql
query {
  posts {
    id
    title
    content
    imageUrl
    author {
      username
    }
  }
}
```

### Subscriptions

Subscribe to post creation:
```graphql
subscription {
  postcreated {
    message
  }
}
```

Subscribe to post deletion:
```graphql
subscription {
  postdeleted {
    message
  }
}
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts                # Application entry point
├── commons/               # Shared utilities
│   ├── config/            # Configuration files
│   ├── decorators/        # Custom decorators
│   └── guards/            # Authentication guards
├── modules/               # Feature modules
│   ├── auth/              # Authentication module
│   ├── post/              # Posts module
│   └── user/              # User management module
├── schema/                # GraphQL schema definitions
└── services/              # Shared services
```

## API Documentation

The GraphQL schema is auto-generated and can be explored using the GraphQL playground at `/graphql`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is unlicensed.
