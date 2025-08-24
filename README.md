# Blog App — Technical Specification

## Overview

A simple, production-minded blogging application where users can register, authenticate, create and publish posts, view posts, and manage their own profile. The API is implemented with **GraphQL** and **TypeScript**, using **PostgreSQL** as the data store and **Prisma** as the ORM.

---

## Requirements

* Users can create, edit, and publish blog posts.
* Users can view published posts (public).
* Users can authenticate (sign up / sign in).
* Authenticated users can view and update their own profile.

---

## Technology Stack

* **API:** GraphQL (schema & resolvers)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Auth (recommended):** JWT (access + refresh tokens)
* **Password hashing:** bcryptjs

---

## Data Model

### `User`

* `id` — `Int` (primary key, auto-increment)
* `name` — `String`
* `email` — `String` (unique)
* `password` — `String` (hashed; never store plaintext)
* `createdAt` — `DateTime` (default: now)
* `updatedAt` — `DateTime` (auto-update on change)
* Relation: one-to-one → `Profile`
* Relation: one-to-many → `Post`

### `Profile`

* `id` — `Int` (primary key, auto-increment)
* `bio` — `String?` (optional)
* `createdAt` — `DateTime` (default: now)
* `updatedAt` — `DateTime` (auto-update on change)
* `userId` — `Int` (unique, foreign key to `User`)

### `Post`

* `id` — `Int` (primary key, auto-increment)
* `title` — `String`
* `content` — `String` (rich text or markdown)
* `authorId` — `Int` (foreign key → `User`)
* `createdAt` — `DateTime` (default: now)
* `updatedAt` — `DateTime` (auto-update on change)
* `published` — `Boolean` (default: `false`)

---

## GraphQL API (suggested types & operations)

### Queries

* `posts(published: Boolean = true, skip: Int, take: Int): [Post!]!` — list posts (filter by published).
* `post(id: Int!): Post` — fetch single post (published or author-only).
* `me: User` — current authenticated user.
* `myProfile: Profile` — authenticated user's profile.

### Mutations

* `signup(name: String!, email: String!, password: String!): AuthPayload!`
* `signin(email: String!, password: String!): AuthPayload!`
* `createPost(title: String!, content: String!): Post!`
* `updatePost(id: Int!, title: String, content: String, published: Boolean): Post!`
* `deletePost(id: Int!): Boolean!`
* `updateProfile(bio: String): Profile!`

> **Authorization rules:**
>
> * Public `posts`/`post` (if `published: true`).
> * Mutations that alter posts/profile require authentication and must check ownership (e.g., only the post author can update/delete).
> * `post(id)` can return unpublished post only to its author.

---

## Authentication & Security

* **Passwords:** hash with bcryptjs before storing.
* **Tokens:** issue short-lived JWT access tokens + optional refresh tokens. Store refresh tokens securely (HTTP-only cookies or secure storage).
* **Authorization:** Middleware at GraphQL layer to identify `currentUser` and enforce field- or resolver-level permissions.
* **Rate limiting / brute force protection:** add login attempt limits and account lockout/alerts if needed.
* **Input validation & sanitization:** validate GraphQL inputs; sanitize rich text if allowing HTML.

---

## Development & Deployment Notes

* Add tests for resolver logic and auth flows.
* Consider GraphQL schema validation and rate-limiting in production.

---

## Best Practices

* Keep `password` field hashed and never expose it via GraphQL.
* Return only necessary fields in queries (avoid exposing internal metadata).
* Enforce ownership checks on update/delete resolvers.
* Log errors but avoid leaking sensitive details to clients.
* Version your API schema when making breaking changes.
