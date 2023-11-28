# Real Estate Application

Welcome to our Real Estate Application! This application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to register and log in, create properties for selling, and contact property owners for potential purchases.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Description

The Real Estate Application is designed to simplify the process of buying and selling properties. Users can register and log in to the system, create property listings, and connect with property owners to initiate purchase discussions. The application provides an intuitive and user-friendly interface to enhance the overall real estate experience.

## Features

- **User Authentication:**
  - Secure user registration and login functionality.

- **Property Management:**
  - Users can create, edit, and delete property listings.
  - Each property listing includes details such as images, description, and contact information.

- **Search and Filtering:**
  - **Search by Name:**
    - Users can search for properties by name, making it easy to find specific listings.

  - **Filter by Type:**
    - Properties can be filtered by type, including options for sale, rent, and offers.

- **Contact Property Owners:**
  - Interested buyers can contact property owners through the application.

## Installation

To run the Real Estate Application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-estate-app.git
   cd real-estate-app

2. Install dependencies for the frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install

3. Set up MongoDB:
   - Create a MongoDB database and obtain the connection URI.
   - Make .env file and update the database connection string.

4. Start the application:
   ```bash
   cd ../client
   npm run dev
   cd ../server
   npm run dev

## Usage   
  - Open your browser and go to http://localhost: to access the frontend.
  - Register or log in to start using the application.
  - Create property listings, providing all necessary details.
  - Use the search feature to find properties by name.
  - Filter properties by type (sale, rent, offers).
  - Browse through existing listings and contact property owners.

## Technologies Used
- Frontend:
  - React.js
  - Netlify (for deployment) [http](https://app.cyclic.sh/)

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Cyslic (for deployment) [http](https://www.netlify.com/)
 
## License
Feel free to further customize it based on your specific implementation or add any other features that might be relevant to your real estate application.

