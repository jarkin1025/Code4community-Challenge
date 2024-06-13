# C4C Partners Admin Dashboard

This app is an admin dashboard for managing partner organizations. Users can view, add, edit, and delete partner info.

## Overview
The dashboard allows users to manage partner organizations. The main features include:
- Viewing partner organization information including name, logo, description, and active status
- Adding new partner organizations
- Editing existing partner organizations.
- Deleting partner organizations.

The backend uses Express.js to handle API requests, while the frontend is built with React and styled using Material-UI.


## How to Run

### Prerequisites
- Node.js
- npm
- Material UI (MUI)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/jarkin1025/Code4community-Challenge.git
   cd c4c-challenge-fall-2024
   ```

2. Install dependencies:
   ```sh
   npm install
   npm install @mui/material @emotion/react @emotion/styled
   ```

### Running the Application
1. Start the backend server:
   "npm run dev"

3. Open your browser and go to http://localhost:3000


## Design Decisions

### Material UI
My initial implementation looked super bare-bones and I wasn't happy with the formatting, so I decided to look into the Material UI library, since I'd heard of it and never used it before. This made it much easier to ensure a consistent and modern feel for different components on the page than it would have been if I tried to edit the css myself, as someone who doen't have a lot of experience with design. I also found it cool how many sites I've visited seem to use this library or something similar.
I Replaced standard HTML elements with MUI components like TextField, Button, Checkbox, FormControlLabel, Container, and Box to make my final app more visually appealing.

### Bonus Feature: Editing
After implementing the base functionality, I was interested in how I could work more with updating states. If I'd had more time for this activity, I would have liked to explore using SQLite or another database server, since I do not have any database experience and am really curious about it.
I would have felt more confident implementing file persistence, but while looking through the suggestions for bonus features I wondered which type of HTTP request I'd use to update the info and decided to jump in and figure it out.


### Challenges
- One of the challenges at the beginning was deciding what should be a component. Understanding the component-based architecture of React was crucial in managing the UI. I ended up only needing to add an AddPartner component to handle the form submission.
-  Initially, I had an issue where I could delete an organization from the frontend, but it would reappear upon refreshing the page. This was because the data was only deleted from the frontend state, not from the backend. Solving this required updating the backend to handle deletion requests correctly and ensuring the frontend sent a DELETE request to the backend.
-  I had initialized the 'partners' variable in the Dashboard component as an object instead of an array due to a small syntax error. This caused issues when treating it as an array later on, and it took me a while to notice. Fixing this by initializing partners as an array allowed me to continue, and clarified some things about adjusting state updates.



Overall, this project increased my confidence in handling React components, integrating with a backend, improving my ability to research and read documentation, and using UI libraries to enhance the user experience.