# Refactor Tractor - FitLit

## Contributors

* Matt McVey

## Overview
For this project, I was tasked with creating a booking application for a fake website. The point of the project was to display login page on load. Once logged in with appropriate credentials the user profile would display. The user displayed was based on the credntials. All information was gathered from APIs. The data was then filterd to show rooms booked and the amount the user had spent total on bookings. The user also has the ability to book new rooms based on search criteria which is then posted to the booking API.

## Outcome
Our app is fully responsive and testing 98 on accessibility in lighthouse with no major WAVE alerts. The site data is being pulled from the backend server via the API and a form allows users to add new data and post it to the backend. The UI is greatly improved and the overall experience is much simpler and enjoyable.

Responsive Design:  
![](assets/README-36fde8c1.gif)

Form input:  
![](assets/README-3757b7e5.gif)k

## Reflections
Our emphasis on autonomy gave each team member the chance to follow our own instincts when tackling our project scope. While this did produce some conflicts when reassembling our features, our regular communication and emphasis on group code reviews allowed us to catch and address most issue as they arose. The final sprint in which we each did a final refactor on a different scope of work, ensured that we each ended the project with a clear understanding of the app as a whole.

## Future Iterations
* Expand the use of inheritance across more classes
* Add card flip animation and further styling, TBD
* Reorganize the structure of heading elements in the markup to be inline with accessibility requirements
* Streamline data instantiation within scripts.js to improve code readability
* Implement 'trending steps' feature
* Replace console.log within the flipCard switch statement for improved user alert

## Tech Stack
* Languages
  * Vanilla JS
  * HTML
  * CSS & SASS (BEM styling for classes)
* Web browser engine & compiler
  * Webpack
* Testing suite
  * Mocha
  * Chai
* Project management tool
  * Trello - kanban board

## Installation and Setup
1. Clone down this repo.
2. Install dependencies in the root directory with `npm install`
3. Clone the backend api at https://github.com/turingschool-examples/fitlit-api
4. Start up the backend with `npm install` then `npm start`
5. Start the client with `npm start` in the root project directory
6. Go to http://localhost:8080/ to see the app.
