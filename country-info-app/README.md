# Country Info App

## Overview

A web application built with React and Next.js that displays information about countries, including population data, flags, and borders.

## Requirements

- Node.js (v14 or higher)
- npm (v7 or higher)

## Installation

Follow these steps to get your environment set up:

1. Clone the repository:

   ```bash
   git clone https://github.com/samuelgsousa/Country-info-app.git

   ```

2. Navigate into the project directory:
   cd country-info-app

3. Install the dependencies:
   npm install

## Configuration

Before running the application, configure the environment variables:

Create a .env.local file in the root directory of the project.

Add the following line to .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

## Running the Application

To start the development server, run:
npm run dev

This will start the application on http://localhost:3000

Directory Structure
/pages: Contains the main pages for the application, including the homepage and country details.

/components: Reusable components such as charts and country info displays.

/public: Static files such as images.

Notes:
Make sure the API endpoints used in the app are functional and accessible.
The app is responsive and optimized for desktop and mobile devices.
License
This project is licensed under the MIT License.
