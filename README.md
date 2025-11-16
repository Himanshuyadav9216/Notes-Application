React Notes App (Evernote-Style MVP)

This is a simple, responsive notes management application built with React and Tailwind CSS. Users can create, view, edit, delete, and categorize notes. The application persists all data in the browser's localStorage and loads initial data from a static notes.json file if no data is found.

Live Demo

[Link to your deployed application (e.g., on Vercel, Netlify, or GitHub Pages)]

Features

Responsive Design: Mobile-first layout that scales gracefully to desktop.

CRUD Operations: Full capabilities to Create, Read, Update, and Delete notes.

Category Sidebar: Filter notes by predefined or custom categories.

Note Creation/Editing: A clean modal form for creating and editing notes.

Delete Confirmation: A confirmation modal to prevent accidental deletion.

Data Persistence: All changes are saved to localStorage, so your notes are saved between sessions.

Initial Data: Loads from a public/notes.json file on the first run.

Duplicate Title Handling: Automatically appends a number (e.g., (1)) to a note's title if a note with the same title already exists in that category.

Technologies Used

React: (v18.0.0+) Used for building the user interface with functional components and hooks.

Tailwind CSS: For styling the application without writing custom CSS.

Vite (Recommended): As the build tool for a fast development experience.

Project Setup

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v16.x or later)

npm, pnpm, or yarn

Installation

Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name


Install dependencies:

npm install
# or
# yarn install
# or
# pnpm install


Set up the initial data:

This project expects an initial data file.

Create a public folder in the root of your project if it doesn't exist.

Create a file named notes.json inside the public folder.

Copy the content from the provided notes.json into your new public/notes.json file.

Available Scripts

In the project directory, you can run:

npm run dev (or yarn dev)

Runs the app in development mode. Open http://localhost:5173 (or a similar port) to view it in the browser. The page will reload if you make edits.

npm run build (or yarn build)

Builds the app for production to the dist folder. It correctly bundles React in production mode and optimizes the build for the best performance.

Folder Structure

The project is structured as a standard Vite + React application, with the core logic consolidated into App.jsx.

/
├── public/
│   └── notes.json    # Initial static data for the app
├── src/
│   ├── assets/       # (Optional) Static assets like logos
│   ├── App.jsx       # The single, complete React component for the app
│   └── main.jsx      # Entry point, renders App
├── .gitignore        # Git ignore file
├── index.html        # Main HTML file
├── package.json      # Project dependencies and scripts
├── postcss.config.js # Tailwind PostCSS config
├── tailwind.config.js # Tailwind config file
└── README.md         # This file


Deployment

This application is ready to be deployed on any static site hosting service.

Vercel (Recommended)

Push your code to a GitHub, GitLab, or Bitbucket repository.

Sign up for a free account on Vercel.

Click "Add New..." -> "Project".

Import your repository.

Vercel will automatically detect it as a Vite project, apply the correct build settings, and deploy.

Netlify

Push your code to a GitHub, GitLab, or Bitbucket repository.

Sign up for a free account on Netlify.

Click "Add new site" -> "Import an existing project".

Connect your repository.

Netlify will detect it's a Vite project. Set the build command to npm run build and the publish directory to dist.

Click "Deploy site".

GitHub Pages

Push your code to your GitHub repository.

Go to your repository's "Settings" tab.

Click on "Pages" in the left sidebar.

Under "Build and deployment", select "GitHub Actions" as the source.

Configure the action for a "Static" site or "Vite" if an option is available.

This will create a .github/workflows/deploy.yml file. You'll need to ensure it runs npm run build and deploys the dist directory.

You may also need to set the "base" path in your vite.config.js file to match your repository name (e.g., base: '/your-repo-name/').