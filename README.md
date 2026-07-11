# Café Fausse - React Frontend

## Overview
I built the frontend pages for the Café Fausse restaurant website using React, JSX, and React Router. This includes the Home page, Menu page, About Us page, and navigation routing between them.

## Pages Implemented
- **Home Page** (`src/pages/Home.jsx`)
  - Restaurant name: Café Fausse
  - Contact information: Address and phone number
  - Hours of operation (Monday-Saturday 5 PM-11 PM, Sunday 5 PM-9 PM)
  - Welcome message with brief restaurant overview

- **Menu Page** (`src/pages/Menu.jsx`)
  - Complete menu organized by categories:
    - Starters: Bruschetta, Caesar Salad
    - Main Courses: Grilled Salmon, Ribeye Steak, Vegetable Risotto
    - Desserts: Tiramisu, Cheesecake
    - Beverages: Red Wine, White Wine, Craft Beer, Espresso
  - Each item includes name, description, and price

- **About Us Page** (`src/pages/AboutUs.jsx`)
  - Restaurant history and mission statement
  - Founder biographies (Chef Antonio Rossi & Maria Lopez)
  - Commitment values: Excellent Food, Unforgettable Experience, Local Sourcing

## Project Structure

src/
├── components/
│   ├── Navigation.jsx      (Navigation bar with routing links)
│   └── Navigation.css
├── pages/
│   ├── Home.jsx            (Home page component)
│   ├── Home.css
│   ├── Menu.jsx            (Menu page component)
│   ├── Menu.css
│   ├── AboutUs.jsx         (About Us page component)
│   └── AboutUs.css
├── App.jsx                 (Main app with routing setup)
├── App.css
└── index.js

## Technologies Used
- React 18
- React Router DOM (for page navigation)
- CSS3 (Flexbox and Grid for responsive design)
- JSX

## How to Run Locally
```bash
npm install
npm start
```
The app will open at http://localhost:3000

## Features
- Fully functional navigation between pages
- Responsive design that works on desktop and mobile
- Clean component-based architecture
- All content from SRS requirements implemented
