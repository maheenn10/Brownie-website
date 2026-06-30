Brownie Website

A simple brownie e-commerce website built with HTML, CSS, and JavaScript.

Setup

No build tools or dependencies required — this is a static site.


Clone or download this repository.
Open the project folder.


Running Locally

You have a few options:

Option 1: Open directly in browser
Double-click index.html to open it in your default browser.

Option 2: Use a local server (recommended)
Running through a local server avoids issues with relative paths and fetch requests.

Using VS Code:


Install the Live Server extension.
Right-click index.html → Open with Live Server.


Using Python:

bashpython3 -m http.server 8000

Then visit http://localhost:8000 in your browser.

Using Node:

bashnpx serve .

Project Structure

.
├── index.html
├── style.css
├── scipt.js
└── assets/
    ├── M's Logo.jpg
    ├── ingre.png
    ├── IMG_1969.JPG
    └── pexels-jb-jorge-barreto-...jpg

Notes


No installation or environment setup needed beyond a browser.
Edit index.html, style.css, and scipt.js directly — changes will reflect on refresh (or live-reload if using Live Server).
