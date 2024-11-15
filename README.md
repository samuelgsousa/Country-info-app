# Country Info App

## Overview

A web application built with React and Next.js that displays information about countries, including population data, flags, and borders.

## Requirements

- Node.js (v14 or higher)
- npm (v7 or higher)

## Installation

Follow these steps to set up your environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/samuelgsousa/Country-info-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd country-info-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

## Configuration

Before running the application, configure the environment variables:

1. Create a `.env.local` file in the root directory of the project.

2. Add the following line to `.env.local`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. Start the backend server:

   Navigate to the backend folder and run:

   ```bash
   npm start
   ```

2. Start the frontend development server:

   In the main project directory, run:

   ```bash
   npm run dev
   ```

This will start the application on http://localhost:3000 and the backend on http://localhost:5000.

## Directory Structure

- `/public`: Static files such as images.

## Notes

- Ensure that the API endpoints used in the app are functional and accessible.
- The app is responsive and optimized for desktop and mobile devices.

## License

This project is licensed under the MIT License.
