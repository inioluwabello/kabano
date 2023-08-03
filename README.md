# Kabano

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/inioluwabello/kabano/blob/main/LICENSE)

Kabano is an open source task management application to help individuals and teams organize and track their tasks efficiently. With Kabano, you can easily create, edit, prioritize, and track tasks to stay on top of your work.

## Stack
React, Redux, Redux Toolkit, Next, Firebase

## Features

- Create and manage tasks with due dates, priorities, and statuses.
- Organize tasks into projects or categories.
- Assign tasks to team members and collaborate effectively.
- Get notifications for upcoming or overdue tasks.
- Easily filter and sort tasks based on different criteria.
- Responsive design for use on various devices.

## Installation

To run Kabano locally on your machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/inioluwabello/kabano.git
cd kabano
```

2. Install the dependencies
```bash
npm install
```

3. Set up your environment variables:
Create a .env file in the root directory with the following variables:
```rust
NEXT_PUBLIC_FIREBASE_API_KEY=api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storage
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=messaging
NEXT_PUBLIC_FIREBASE_APP_ID=app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=measurement_analytics

GITHUB_CLIENT_ID=github_client
GITHUB_CLIENT_SECRET=githu_secret
```
Replace with your values.

Start the development server:
```bash
npm run dev
```