# News Website

This project is a MySQL, Express.js, React.js, Node.js application that creates a News Website. It allows users to view and search for news articles, as well as add, edit, and delete articles. The project uses MySQL as the database system.

## Prerequisites

Before running this application, ensure that you have the following installed:

- Node.js (v12.18.3 or later)
- MySQL Server (v5.7 or later)

## Installation

To download and run this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/akshatgadodia/news-website.git
   ```

2. Change into the project directory:

   ```bash
   cd news-website
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

5. Rename the `.env.example` file in the `backend` directory to `.env`.

6. Open the `.env` file and update the `DB_USERNAME` and `DB_PASSWORD` fields with your own MySQL username and password.

   ```
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   ```

7. Create a MySQL database called `news_website`.

8. Start the frontend development server:

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

9. In a new terminal, start the backend server:

   ```bash
   cd ../backend
   npm run server
   ```

   The backend server will start on `http://localhost:5000`.

## Usage

Open your web browser and navigate to `http://localhost:3000` to access the News Website. From there, you can browse, search, add, edit, and delete news articles.