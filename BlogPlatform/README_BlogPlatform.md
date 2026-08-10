# Blog Platform (In Progress)

A full stack blogging platform where users can sign up, write posts, and interact with each other's content through comments and likes.

## Live Demo
[Add your Vercel/Render link here once deployed]

## Status
🚧 In progress — see the roadmap below for what's built vs. planned.

## Features

### Done / In Progress
- User signup and login
- Create, edit, and delete blog posts (title + content)
- View all posts on the homepage
- Comments on posts
- Likes / upvotes on posts
- Filter posts by category/tag
- Authorization — users can only edit or delete their own posts

### Planned
- Image upload for post cover photos
- Search functionality
- User profile page showing all of a user's posts
- Live deployment on Vercel/Render

## Tech Stack

- **Backend:** ASP.NET Core (C#), Entity Framework Core
- **Database:** SQLite
- **Frontend:** React, Tailwind CSS

## Why This Stack

Built to practice a real backend-to-frontend flow: relational data modeling and API design in ASP.NET Core + EF Core, paired with a React frontend consuming those APIs — with SQLite chosen specifically to get hands-on with SQL fundamentals.

## Getting Started

### Backend
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
<!-- Update these commands to match your actual project structure -->

## Folder Structure

```
blog-platform/
├── backend/         # ASP.NET Core API
├── frontend/         # React + Tailwind app
└── README.md
```
<!-- Update this to match your actual folder structure -->

## Author

Anmol Chauhan
